---
title: Preparation
description: Preparing your data for using LDAK-KVIK on the UK Biobank Research Analysis Platform
---

These web pages include a tutorial for using **LDAK-KVIK** on the UK Biobank Research Analysis Platform (UKB-RAP). We include a guide for preparing your data, example commands for running LDAK-KVIK, and recommendations for efficient use of the UKB-RAP. The recommendations listed on these pages also apply to other cloud-based computing facilities. Note that several of the recommendations listed here have also been described [elsewhere](https://github.com/dnanexus/UKB_RAP/tree/main/GWAS).

The presented guide uses bash scripts that interact with the [Swiss-Army-Knife](https://dnanexus.gitbook.io/uk-biobank-rap/working-on-the-research-analysis-platform/accessing-data/accessing-bulk-data#analyzing-files-with-swiss-army-knife), which sends command-line executables to the RAP server. However, note that is is also possible to perform these commands directly on the [Cloud Workstation](https://documentation.dnanexus.com/developer/cloud-workstation), which is also used in our [YouTube tutorial](https://www.youtube.com/watch?v=e8hSDNR-Edw). In this case, a local environment is set up in which you can download and analyse UKB data, and upload to your project after.

---------------

<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/e8hSDNR-Edw" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
    style="display: block; margin: 0 auto;">
</iframe>


---------------

# Preparing data

Before running **LDAK-KVIK**, you will need to install the [`dx-toolkit`](https://documentation.dnanexus.com/downloads). Moreover, you need to have a RAP project with data dispensed, and log in using `dx login`. The example command lines below assume you have a working directory `data` which can be constructed using `dx mkdir data`.

Prior to running LDAK-KVIK, the user should extract phenotypes and covariates from the Bulk data and perform quality control on the genotype data. Below, we list some recommendations and example code demonstrating how to perform this using the Command-Line Interface (CLI). Note that these steps are just one way to do this, it is also possible to use R, Python or Bash scripts using JupyterLab.

### Constructing phenotypes

After loading the Bulk data in the RAP-environment, the function `dx extract_dataset` can be used to extract specific phenotype fields from the dataset. For example:
```
dx extract_dataset [app_id].dataset --fields "participant.eid,participant.eid,participant.p50_i0" \ 
  -o "data_height"
```
loads the variables `participant.eid` (participant ID number) and `participant.p50_i0` (height) into a comma-separated file called `data_height`. It is possible to load additional phenotypes by including them in the `--fields` string. An overview of all possible phenotypes is displayed by running `dx extract_dataset [app_id].dataset --list-fields`.

Note that the header of `data_height` contains the original fields name, and should be converted to PLINK format before running LDAK. Moreover, LDAK only accepts space- or tab-separated files, so we should convert the comma-separated data file (coding double comma as missing value 'NA'):
```
sed -i '1s/.*/FID,IID,Pheno/' data_height
sed -E 's/(^|,)(,|$)/\1NA\2/g' data_height | sed -E 's/(^|,)(,|$)/\1NA\2/g' | awk 'gsub(",","\t",$0)' > data_height_tab
```
Note that it is also possible to load phenotype data directly as tab-seperated file by adding `--delim '\t'` to `dx extract_dataset`, however, our approach ensures that missing values are coded as NA instead of blank entries.

The phenotype file is now suitable for analysis in LDAK. It should be uploaded from the local directory to the RAP enviroment:
```
dx upload "data_height_tab"
```

### Constructing covariates

Similarly to creating phenotypes, it is possible to use the `dx extract_dataset` commands to extract covariate information. Useful covariates include sex, age, principal components, and other predictors that may be relevant to the phenotype of interest.

The following script can be used to extract the top ten principal components:
```
dx extract_dataset [app_id].dataset --fields "participant.eid,participant.eid,participant.p22009_a1,participant.p22009_a2,participant.p22009_a3,participant.p22009_a4,participant.p22009_a5,participant.p22009_a6,participant.p22009_a7,participant.p22009_a8,participant.p22009_a9,participant.p22009_a10" -o "data_pcs"
```
Then change the head of this file, and recode from a comma-separated format to a tab-separated format:
```
sed -i '1s/.*/FID,IID,PC1,PC2,PC3,PC4,PC5,PC6,PC7,PC8,PC9,PC10/' data_pcs
sed -E 's/(^|,)(,|$)/\1NA\2/g' data_pcs | sed -E 's/(^|,)(,|$)/\1NA\2/g' | awk 'gsub(",","\t",$0)' > data_pcs_tab
```
The covariate file is now suitable for analysis in LDAK, and should be uploaded to the RAP environment:
```
dx upload "data_pcs_tab"
```

### Constructing genotypes

The 'Bulk' folder contains several sources of genotype data, including directly genotyped data, imputed data, and whole exome sequencing data. In this tutorial, we will focus on preparing the directly genotyped data (used in LDAK-KVIK Step 1) and imputed data (used in LDAK-KVIK Step 2).

To prepare the **directly genotyped** data for LDAK-KVIK Step 1, we recommend using the Swiss-Army-Knife to merge the chromosome-specific genotype files in the Bulk folder: 

```
### Perform QC and merge .bed files for Step 1 ###
data_field="22418"          # Data number corresponding to the .bed files
project="Basic GWAS"        # Example name of the project
data_file_dir="data"        # Name of the output directory (create this before running)

# Specify the command line to run
run_merge="cp /mnt/project/Bulk/Genotype\ Results/Genotype\ calls/ukb${data_field}_c{1..22}_b0_v2.{bed,bim,fam} . ;\     
    ls *bed | sed -e 's/.bed//g' > files_to_merge.txt ;\                                            
    plink --merge-list files_to_merge.txt --make-bed --maf 0.01 --mind 0.1 --geno 0.1 \            
    --hwe 1e-15 --out ukb_merged"

# Run using Swiss-Army-Knife
dx run swiss-army-knife  \
  -icmd="${run_merge}" \
  --instance-type "mem1_ssd1_v2_x16" 
  --destination="${project}:${data_file_dir}"
```

To prepare the **imputed** data for LDAK-KVIK Step 2, we recommend using the Swiss-Army-Knife to perform quality control for each chromosome:

```
### Perform QC and create .bed files for Step 2 ###
file_dir="/Bulk/Imputation/UKB imputation from genotype"    # Directory of imputed genotype data
data_field="22828"                                          # Data number corresponding to the .bgen files
project="Basic GWAS"                                        # Name of the project 
data_file_dir="data"                                        # Name of the working directory

# Perform QC for each chromosome
for i in {1..22}; do

    # Specify the command line
    run_plink_bgen="plink2 --bgen ukb${data_field}_c${i}_b0_v3.bgen 'ref-first' \       
    --sample ukb${data_field}_c${i}_b0_v3.sample \                                     
    --maf 0.001 --mac 20 --geno 0.1 --hwe 1e-15 --mind 0.1 --rm-dup 'force-first' \     
    --make-bed --out imp_chr${i}" \                                                                                            
    

    # Run using Swiss-Army-Knife
    dx run swiss-army-knife -iin="${file_dir}/ukb${data_field}_c${i}_b0_v3.bgen" \
    -iin="${file_dir}/ukb${data_field}_c${i}_b0_v3.bgen.bgi" \
    -iin="${file_dir}/ukb${data_field}_c${i}_b0_v3.sample" \
    -icmd="${run_plink_bgen}" --tag="make_bed" --instance-type "mem1_ssd1_v2_x36" \
    --destination="${project}:${data_file_dir}" --brief --yes
done
```

Note that we also convert these `.bgen` format to `.bed` format, which enables faster analyses in LDAK-KVIK Step 2. In case the `.bgen` format is preferred for association analysis, consider running PLINK with `--write-snplist` and  `--write-samples` to get a list of SNPs and sample IDs that passed QC. These can be used in combination with the original .bgen file to run LDAK-KVIK Step 2 on the cleaned genotype subset.
