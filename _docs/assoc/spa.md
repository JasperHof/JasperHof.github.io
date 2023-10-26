---
title: Saddlepoint approximation
description: Information about using the saddlepoint approximation in LDAK
---

# Saddlepoint approximation

We recommend using the saddlepoint approximation (SPA) when testing binary traits with imbalanced case:control outcomes. The SPA can robustly test SNPs for association, whereas classical regression methods offer suffer from inflated Type I errors. 

The SPA can be run in LDAK by including the arguments `--spa-test YES`, for example:
```
./ldak.out --linear step2 --bfile data ----pheno phenofile --covar covfile --spa-test YES --max-threads 2
``` 
When running a linear- or logistic regression with `--spa-test YES`, LDAK first pre-computes the SPA for a grid of values, which are related to the values of the score statistics and the standardized genotype values. When SNPs are tested for association, these pre-computed values are used in combination with a Taylors expansion.

[... more information will follow! ...]
