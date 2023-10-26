---
title: File formats
description: File formats for GWAS anlysis
---

<a id="gen"></a>

# Genotype format

LDAK accepts genetic data in many formats, including:

 - **Binary (PLINK) format**, which accommodates (hard-coded) SNP genotypes
 - **Gen format** (sometimes referred to as Oxford or Chiamo format), which is designed for reading genotype probabilities created by IMPUTE2
 - **Sparse Partitioning (SP) format**, which simply requires data in a large matrix (rows are predictors, columns are samples)

To filter either samples or predictors, see the [Data Filtering](https://dougspeed.com/data-filtering/) options on the LDAK website. LDAK is usually applied to SNP data, in which case all predictors take values between 0 and 2 (representing the count of the A1 allele). However, LDAK can also be applied to other datatypes; for this your data should be in either gen or SP format and you should use the option `--SNP-data NO`.

More details about genotype formatting can be found on the [LDAK webpage](https://dougspeed.com/file-formats/).

<a id="pheno"></a>

# Phenotype format

Phenotype files should be in PLINK format. The first two columns should provide sample IDs, with subsequent columns providing values for each phenotype. For example:
```
FID IID Pheno1 Pheno2
1 1 0.25 25
2 2 0.42 12
3 3 0.32 36
...
```
LDAK accepts phenotype files both with and without a header. In casea header is included, the first two elements must be named either FID & IID or ID1 & ID2. When a phenotype file contains more than one phenotype (i.e., more than three columns), you should specify which to analyse using the option `--mpheno <integer>` (to specify by number) or `--pheno-name <name>` (to specify by name). Alternatively, some functions (most notably REML) allow for testing of all phenotypes by adding --mpheno -1. There is no option to select covariates (all covariates will be used, so to use only a subset, you should first make a reduced covariate file).

Missing values should be denoted by NA. Note that whereas PLINK also treats -9 as missing, this is not the case in LDAK. Binary phenotypes should only take values:
- 0 (control), 1 (case) or NA; or
- 1 (control), 2 (case) or NA

When a phenotypic values is NA for a particular sample, then that sample is excluded from the analysis; however, if a covariate is NA, its value is replaced by the mean.

<a id="covar"></a>

# Covariate format

Similarly as phenotype files, covariate files should be in PLINK format. The first two columns provide the sample IDs, with subsequent columns providing covariate values. For example: 
```
FID IID PC1 PC2 PC3 Age Sex
1 1 0.42 -0.12 1.23 41 0
2 2 0.42 -0.12 1.23 41 0
3 3 0.42 -0.12 1.23 41 0
...
```

