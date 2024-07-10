---
title: Saddlepoint approximation
description: Information about using the saddlepoint approximation in LDAK
---

# Saddlepoint approximation

When analysing binary traits, we recommend running single-SNP analysis using a saddlepoint approximation (SPA). Classical logistic regression is not robust against case:control imbalancedness, resulting in inflation of type 1 errors (and possibly false positive results). The SPA implemented in LDAK can robustly test SNPs for association, even when testing data with highly imbalanced case:control ratio.

The SPA is included in LDAK by default when running `--logistic`, for example:
```
./ldak.out --logistic out --bfile data ----pheno phenofile --covar covfile
``` 
The SPA can be turned off by `--spa-test NO`, in this case LDAK switches to classical logistic regression.
