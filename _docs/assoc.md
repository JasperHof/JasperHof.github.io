---
title: Association
description: Association analysis
---

# Association analysis

Running LDAK-KVIK constists of two steps:
1. In the first step, LDAK-KVIK fits an elastic net model, one for each chromosome being tested. Based on these models, the Leave-One-Chromosome-Out (LOCO) predictors are computed for all chromosomes and all individuals.
2. In step two, the LOCO estimators are substracted from the phenotype, and used for running a linear regression analysis.

