---
title: LDAK-KVIK on UKB-RAP
description: Running LDAK-KVIK on the UK Biobank Research Analysis Platform
---

These web pages include a tutorial for using **LDAK-KVIK** on the UK Biobank Research Analysis Platform (UKB-RAP). We include a guide for preparing your data, example commands for running LDAK-KVIK, and recommendations for efficient use of the UKB-RAP. The presented guide uses bash scripts that interact with the [Swiss-Army-Knife](https://dnanexus.gitbook.io/uk-biobank-rap/working-on-the-research-analysis-platform/accessing-data/accessing-bulk-data#analyzing-files-with-swiss-army-knife), which enables command-line executables on the RAP server.

The recommendations listed on these pages also apply to other cloud-based computing facilities. Note that several of the recommendations listed here have also been described [elsewhere](https://github.com/dnanexus/UKB_RAP/tree/main/GWAS).

---------------
# Running LDAK-KVIK on UKB-RAP

After the data has been prepared, it is possible to run **LDAK-KVIK** on the UKB-RAP using the Swiss-Army-Knife app. The example commands lines included in this page build upon the genotype and phenotype data that have been prepared on the [Preparation](/docs/ukbrap/preparation) page.

### LDAK-KVIK Step 1

**LDAK-KVIK** Step 1 is best performed using the directly genotyped SNPs of the UK Biobank. This is, because including more SNPs (e.g., imputed SNPs) do not improve the accuracy of the polygenic risk scores resulting from Step 1. Moreover, Step 1 is much faster when restricted to directly genotyped SNPs, hence it is best to restrict to directly genotyped SNPs in this step.

The following example command runs LDAK-KVIK Step 1 using the Swiss-Army-Knife:
```
project="Basic GWAS"                                        # Name of the project 
data_file_dir="data"                                        # Name of the working directory

# Specify the command line to install LDAK and run LDAK-KVIK Step 1
run_ldak="wget https://github.com/dougspeed/LDAK/raw/refs/heads/main/ldak6.1.linux;\ 
        chmod a+x ldak6.1.linux;\
        ./ldak6.1.linux --kvik-step1 kvik --bfile ukb_merged --pheno data_height_tab --covar data_pcs_tab --max-threads 4"

# Run using Swiss-Army-Knife
dx run swiss-army-knife  \
  -iin="${data_file_dir}/ukb_merged.bed" \
  -iin="${data_file_dir}/ukb_merged.bim" \
  -iin="${data_file_dir}/ukb_merged.fam" \
  -iin="${data_file_dir}/data_height_tab" \
  -iin="${data_file_dir}/data_pcs_tab" \
  -icmd="${run_ldak}" \
  --instance-type "mem3_ssd1_v2_x4" \
  --destination=${project}:${data_file_dir}
```
The commands produce several files with prefix `kvik.step1`, including the LOCO PRS estimates and a root file, which are uploaded to the `data` folder.

### LDAK-KVIK Step 2

It is possible to run **LDAK-KVIK** Step 2 for each chromosome separately, or using a combined genotype file. LDAK accepts both `.bed` files (using the `--bfile` flag) and `.bgen` files (using the `--bgen` and `--sample` flags). Is it possible to run LDAK-KVIK using chromosome-specific `.bed` files using the following commands:

```
data_file_dir="data"                                        # Name of the working directory

for i in {1..22}; do

# Specify the command line to run LDAK-KVIK Step 2 for each chromosome
run_ldak="chmod a+x ldak6.linux ;\
  ./ldak6.linux --kvik-step2 kvik --bfile imp_chr${i} --pheno data_height_tab \
  --covar data_pcs_tab --max-threads 4"

# Run using Swiss-Army-Knife 
dx run swiss-army-knife -iin="data_height_tab" \
  -iin="data_pcs_tab" \
  -iin="${data_file_dir}/imp_chr${i}.bed" \
  -iin="${data_file_dir}/imp_chr${i}.bim" \
  -iin="${data_file_dir}/imp_chr${i}.fam" \
  -iin="${data_file_dir}/kvik.step1.loco.details" \
  -iin="${data_file_dir}/kvik.step1.loco.prs" \
  -iin="${data_file_dir}/kvik.step1.effects" \
  -iin="${data_file_dir}/kvik.step1.root" \
  -iin="${data_file_dir}/ldak6.linux" \
  -icmd="${run_ldak}" --tag="kvik_step2_bed" --instance-type "mem1_ssd1_v2_x16" \
  --destination=${project}:${data_file_dir} --brief --yes
done
```
This command returns chromosome-specific GWAS results with prefix `kvik.step2.chr<chromosome_number>`. 

### Merging LDAK-KVIK output

When analysed separately, LDAK-KVIK produces output files per chromosome. One way to merge these output files is using a Python script, which can be done using JupyterLab. Below, we present some example steps.

First, some libraries should be loaded:
```
import pandas as pd
import glob
import dxpy
```
It is then possible to identify the files to merge using the `glob` function:
```
file_pattern = "/mnt/project/data/kvik.step2.chr*.assoc"   # Define the file pattern of the LDAK-KVIK output
file_list = glob.glob(file_pattern)                        # Use glob to get the matching files
```
These can then be merged by reading and appending them:
```
dataframes = []                                            # First create an empty data frame

for file in file_list:                                     # Loop through each file and read and append it
    df = pd.read_table(file)
    dataframes.append(df)
```
These files can then be concatenated and locally written to a file (e.g., `kvik.assoc`):
```
merged_data = pd.concat(dataframes, ignore_index=True)
merged_data.to_csv("kvik.assoc", sep='\t', index=False)
```
Finally, a the file can be uploaded to the working folder using `dx` commands in bash:
```
%%bash
dx upload kvik.assoc --path Jasper/kvik.assoc
```