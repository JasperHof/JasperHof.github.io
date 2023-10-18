---
title: Single-SNP analysis
description: Single-SNP analysis
---

Here we describe how to run LDAK-KVIK for single SNP analysis

# Step 1

First, it is necessary to compute the LOCO predictors

```
./ldak.out --elastic kvik --bfile data --LOCO YES --pheno phenofile --covar covfile --ignore-weights YES \
    --fast YES --cv-proportion 0.1  --power -0.25 --max-threads 2 --bit-size 256
```



# Step 2

The computed LOCO predictors of the previous step can be used as offset in the GWAS step.

```
./ldak.out --linear outcome --bfile data ----pheno phenofile --covar covfile --predictions kvik --max-threads 2
```

# Saddlepoint approximation

We recommand using the saddlepoint approximation (SPA) when analysing binary traits. SPA robustly tests binary traits in presence of case:control imbalance, controlling Type I error. 