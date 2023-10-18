---
title: Jasper test page
description: Single-SNP analysis
---

Here we describe how to run LDAK-KVIK for single SNP analysis

# Step 1

First, it is necessary to compute the LOCO predictors

```
ldak.out --elastic kvik --bfile data
```

# Step 2

The computed LOCO predictors of the previous step can be used as offset in the GWAS step.

Binary traits can be analysed using a saddlepoint approximation by setting --spa-test YES.