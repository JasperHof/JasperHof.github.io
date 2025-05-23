---
title: LDAK-KVIK options
description: User options for running LDAK-KVIK
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# LDAK-KVIK options

Default parameters in LDAK-KVIK can be modified by adding options to the command line. Below, we present a list of options for each step.

## Step 1

| Argument |  Description |
|--------------------|--------|
|`--kvik-step1`    | Name of the output files of the step 1   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--bgen`   | Name of the .bgen file to be analyzed      |
|`--sample`   | Name of the .sample file corresponding to the .bgen file      |
|`--pheno`   | Name of the phenotype file      |
|`--covar`   | Name of the quantitative covariate file     |
|`--covar-numbers`   | Specify a subset of covariates by number. For example, `--covar-numbers 1,2,4-6,8`     |
|`--covar-names`   | Specify a subset of covariates by names. For example, `--covar-names PC1,PC3,age`     |
|`--factor`   | Name of the categorical covariate file     |
| `--max-threads` | Number of threads (used for parallel computing) |
| `--binary YES`    |  Indicates that the analysed phenotype is binary |
| `--num-pedigree-predictors`    |  The number of SNPs used when testing for structure (default: 512)   |
| `–-check-pedigree NO`   |  Indicates that there will be no check for structure. In this case, it is assumed that there is structure    |
| `-–num-MCMC`   | Number of random vectors used to compute the heritability estimate in randomized Haseman-Elston regression (default: ten if $$n$$ < 40000, three if $$n$$ > 40000)     |
| `-–num-divide`   | Number of partitions used to compute the heritability estimate in randomized Haseman-Elston regression (default: 40)    |
| `-–num-scans`   | Number of scans performed by the Variational Bayes algorithm to construct PRS   |
| `-–cv-proportion`   | Proportion of individuals used to determine elastic net hyperparameters   |
| `-–tolerance`   | This number is multiplied by $$n$$, and specifies the threshold for convergence for the likelihood in the Variational Bayes algorithm (default: $$10^{-6}$$)   |
| `–-num-calibration-predictors`   | Number of SNPs used to compute the Grammar-Gamma scaling factor (default: 20)  |

## Step 2

Please note that several arguments must match those used in Step 1 (i.e., you must use the same output filename, provide the same data and phenotype files, and if you used covariates in Step 1, you must also use them in Step 2).

| Argument |  Description |
|--------------------|--------|
|`--kvik-step2`    | Name of the output files of Step 2. Note that this should have the same name as Step 1.   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--bgen`   | Name of the .bgen file to be analyzed      |
|`--sample`   | Name of the .sample file corresponding to the .bgen file      |
|`--pheno`   | Name of the phenotype file      |
|`--covar`   | Name of the quantitative covariate file     |
|`--covar-numbers`   | Specify a subset of covariates by number. For example, `--covar-numbers 1,2,4-6,8`     |
|`--covar-names`   | Specify a subset of covariates by names. For example, `--covar-numbers PC1,PC3,age`     |
|`--factor`   | Name of the categorical covariate file     |
| `--max-threads` | Number of threads (used for parallel computing) |
| `–-spa-test NO`   | Indicates that no saddlepoint approximation will be used when testing binary phenotypes  |

## Step 3

| Argument |  Description | 
|------------|--------|
|`--kvik-step3`    | Name of the output files of Step 3. Note that this should have the same name as Step 1 and Step 2.   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--genefile`   | Name of the gene annotation file. Instructions for downloading this can be found on the [input](input) page       |
| `--max-threads` | Number of threads (used for parallel computing) |
