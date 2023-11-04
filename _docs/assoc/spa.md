---
title: Saddlepoint approximation
description: Information about using the saddlepoint approximation in LDAK
---

# Saddlepoint approximation

We recommend using a saddlepoint approximation (SPA) when testing binary traits with imbalanced case:control ratio. The SPA can robustly test SNPs for association, whereas classical regression methods may suffer from inflated Type I errors. 

The SPA can be run in LDAK by including the arguments `--spa-test YES`, for example:
```
./ldak.out --logistic step2 --bfile data ----pheno phenofile --covar covfile --spa-test YES --max-threads 2
``` 
It is also possible to analyse quantitative traits using the SPA, in which case `--logistic` should be replaced by `--linear`. By default, LDAK applies a score test to analyse binary traits. To switch to a Wald test instead, use `--score-test NO`.

When running a linear- or logistic regression with `--spa-test YES`, LDAK first pre-computes the SPA for a grid of values, which are related to the values of the score statistics and the standardized genotype values. When SNPs are tested for association, these pre-computed values are used in combination with a Taylors expansion.
