---
title: Single-SNP analysis
description: Single-SNP analysis
---

Here we describe how to run **LDAK-KVIK** for single SNP analysis. Running LDAK-KVIK can be broken down into two steps, which are executed by running two command lines.

# Step 1

In Step 1, an elastic net model is fitted to compute polygenic risk scores for every chromosome. This step can be broken down into different sub-steps:

1. Compute the SNP heritabilities used in the fitting the prediction model
2. Determine the optimal hyperparameters for the elastic net using training samples
3. Construct the best-fitting model and compute a polygenic risk score for every chromosome being tested

An example command line of Step 1 in LDAK-KVIK is as follows:

```
./ldak5.2.linux --elastic kvik --bfile data --LOCO YES --pheno phenofile --covar covfile --ignore-weights YES \
    --fast YES --cv-proportion 0.1  --power -0.25 --max-threads 2 --bit-size 256
```

This command line can be broken down as follows:

|------------|--------|
|**--elastic**    | indicates that an elastic net model is fitted. While   |
|**--bfile**   | indicates the name of the .bed file to be analyzed.      |
|**--LOCO**   | has two options. The option `--LOCO YES` indicates that for every chromosome, an elastic net should be fitted *excluding* SNPs on the chromosome, which is needed to run LDAK-KVIK. Conversely, `--LOCO NO` fits the elastic net for the whole genome.  |
|**--pheno**   | specifies the name of the phenotype file      |
|**--covar**   | indicates the name of the covariate file     |
|**--ignore-weights**   | indicates there are no SNP weightings for computing the elastic net model.  |
|**--fast**   | has two options. The option `--fast YES`   |
|**--cv-proportion**   | indicates the name of the .bed file to be analyzed.      |
|**--power**   | indicates the name of the .bed file to be analyzed.      |
|**--max-threads**   | indicates the name of the .bed file to be analyzed.      |
|**--bit-size**   | indicates the name of the .bed file to be analyzed.      |





The `elastic` command indicates that we are fitting an elastic net polygenic risk score model. The `--bfile` command specifies the .bed file to be analysed (without .bed name extension).


### Speficying SNP heritability

It is possible to use SNP annotations for computing SNP heritabilities, which can improve the prediction model. However, in most cases, the largest gain

When testing imputed data, it is possible to restrict to a subset of SNPs in Step 1, for example the directly genotyped SNPs or SNPs that remain after pruning. This can be achieved by adding the option `--extract <extractfile>`.

The elastic net model accounts for linkage disequilibrium between SNPs. 

# Step 2

The computed LOCO predictors of the previous step can be used as offset in the GWAS step.

```
./ldak.out --linear outcome --bfile data ----pheno phenofile --covar covfile --predictions kvik --max-threads 2
```

# Saddlepoint approximation

We recommand using the saddlepoint approximation (SPA) when analysing binary traits. SPA robustly tests binary traits in presence of case:control imbalance, controlling Type I error. 