---
title: Single-SNP analysis
description: Single-SNP analysis
---

Here we describe how to run LDAK-KVIK for single SNP analysis

# Step 1

In Step 1, an elastic net model is fitted to compute polygenic risk scores for every chromosome being tested. For this step, LDAK-KVIK first computes an optimal set of hyperparameters for the elastic net model. 

The elastic net model accounts for linkage disequilibrium between SNPs. 

```
./ldak5.2.linux --elastic kvik --bfile data --LOCO YES --pheno phenofile --covar covfile --ignore-weights YES \
    --fast YES --cv-proportion 0.1  --power -0.25 --max-threads 2 --bit-size 256
```

The `elastic` command indicates that we are fitting an elastic net polygenic risk score model. The `--bfile` command specifies the .bed file to be analysed (without .bed name extension).


# Step 2

The computed LOCO predictors of the previous step can be used as offset in the GWAS step.

```
./ldak.out --linear outcome --bfile data ----pheno phenofile --covar covfile --predictions kvik --max-threads 2
```

# Saddlepoint approximation

We recommand using the saddlepoint approximation (SPA) when analysing binary traits. SPA robustly tests binary traits in presence of case:control imbalance, controlling Type I error. 