---
title: Run time
description: Comparison of computational requirements between LDAK-KVIK and alternatives
---

## Computational Requirements for a GWAS

We compared the run time and memory requirements of LDAK-KVIK with Bolt-LMM and Regenie using data from the UK Biobank. We applied all methods to quantitative traits from the UK Biobank, and varied the sample size between 10k and 430k, genotyped for 690k SNPs. The results are visualised below.

<img title="Run time" alt="Run time" src="/assets/img/runtime_poster.png">

We found that LDAK-KVIK required approximately 12 CPU hours to analyse 430k individuals for 690k SNPs.

## Steps

The computational costs were evaluated for two separate parts of the mixed-model association analysis: Step 1, in which the LOCO estimator is computed, and Step 2, in which the single-SNP analysis is performed. 

