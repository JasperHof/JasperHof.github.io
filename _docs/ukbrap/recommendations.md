---
title: Recommendations
description: Recommendations for using LDAK-KVIK on the UK Biobank Research Analysis Platform
---

These web pages include a tutorial for using **LDAK-KVIK** on the UK Biobank Research Analysis Platform (UKB-RAP). We include a guide for preparing your data, example commands for running LDAK-KVIK, and recommendations for efficient use of the UKB-RAP. The recommendations listed on these pages also apply to other cloud-based computing facilities. Note that several of the recommendations listed here have also been described [elsewhere](https://github.com/dnanexus/UKB_RAP/tree/main/GWAS).

The presented guide uses bash scripts that interact with the [Swiss-Army-Knife](https://dnanexus.gitbook.io/uk-biobank-rap/working-on-the-research-analysis-platform/accessing-data/accessing-bulk-data#analyzing-files-with-swiss-army-knife), which sends command-line executables to the RAP server. However, note that is is also possible to perform these commands directly on the [Cloud Workstation](https://documentation.dnanexus.com/developer/cloud-workstation), which is also used in our [YouTube tutorial](https://www.youtube.com/watch?v=e8hSDNR-Edw). In this case, a virtual environment is set up in which you can download and analyse UKB data, and upload to your project after.

---------------
# Recommendations

There are several ways to optimize the use of **LDAK-KVIK** on the RAP, enabling more computionally efficient and cheaper GWAS analyses.

### Swiss-Army-Knife

When performing analyses using LDAK that have larger computational demands (e.g., processing imputed data, running a GWAS on the full UK Biobank data set), we recommend using the Swiss-Army-Knife. This provides an easy way to run any LDAK command on the background in a Linux Virtual Machine.

### Input genotype files

In general, we recommend running LDAK using `.bed` files. Although LDAK also accepts genotype data of `.bgen` format, this format requires more time to load in LDAK software and increases the computational demands for GWAS. Therefore, other genotype formats are preferably converted to `.bed` files prior to analysis. Although this means that genotype dosage data should be hardcalled, losing part of the genotype information, we find that this approach results in near identical GWAS results.

We recommend running LDAK-KVIK Step 1 using only directly genotyped SNPs, which are available in folder "/Bulk/Genotype Results/Genotype calls". Although it is possible to include more SNPs (e.g., imputed SNPs), including these will significantly increase run time. Moreover, including more SNPs does not result in improved association analysis in Step 2, so better to ignore them.

### Selecting the instance

The UKB-RAP has several instances available, each with a different number of cores, memory, storage, and cost. The costs of instances increase linearly with the resources requested; a list of available instances and their related costs are available on the UKB-RAP website. 

When running LDAK-KVIK Step 1, we recommend running LDAK-KVIK on instances `mem1_ssd1_v2_x4` (4 CPUs, 8GiB memory), `mem2_ssd1_v2_x2` (2 CPUs, 8GiB memory), `mem2_ssd2_v2_x2` (2 CPUs, 8 GiB memory), or `mem3_ssd1_v2_x2` (2 CPUs, 16 GiB memory). These instances fit computational requirements for LDAK-KVIK, including memory usage (approx. 10GB for the full UKB dataset) and parallelization (highest efficiency on a small number of cores), at minimal costs.
