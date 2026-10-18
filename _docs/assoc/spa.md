---
title: Saddlepoint approximation
description: Information about using the saddlepoint approximation in LDAK
---

# Saddlepoint approximation

When analysing binary traits, we recommend running single-SNP analysis using a saddlepoint approximation (SPA). Classical logistic regression may result in inflation of type 1 error when testing phenotypes with case:control imbalance. The SPA implemented in LDAK guards against false positives and can robustly test SNPs for association, even when the case:control ratio is highly imbalanced.

The SPA is included in LDAK by default when running `--logistic`, or when running `--kvik-step2` on binary traits, for example:
```
./{{ site.ldak_linux }} --logistic out --bfile data --pheno phenofile --covar covfile
``` 
The SPA can be turned off by adding `--spa-test NO`, in which case LDAK uses classical logistic regression.
