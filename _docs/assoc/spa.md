---
title: Saddlepoint approximation
description: Information about using the saddlepoint approximation in LDAK
---

# Saddlepoint approximation

When analysing binary traits, we recommend running single-SNP analysis using a saddlepoint approximation (SPA). Classical logistic regression may result in inflation of type 1 error when testing phenotypes with case:control imbalance. The SPA implemented in LDAK guards against false positives and can robustly test SNPs for association, even when testing data with highly imbalanced case:control ratio.

The SPA is included in LDAK by default when running `--logistic`, for example:
```
./ldak.out --logistic out --bfile data ----pheno phenofile --covar covfile
``` 
The SPA can be turned off by specifying `--spa-test NO`, in this case LDAK switches to classical logistic regression.
