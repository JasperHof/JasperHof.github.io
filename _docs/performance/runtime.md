---
title: Run time
description: Comparison of computational requirements between LDAK-KVIK and alternatives
---

## Computational Requirements for a GWAS

We compared the run time and memory requirements of LDAK-KVIK with Bolt-LMM and Regenie using data from the UK Biobank. We applied all methods to quantitative traits from the UK Biobank, and varied the sample size between 10k and 430k. For all sample sizes, we analysed 690k SNPs, that were included in both Step 1 (computing the LOCO estimator) and Step 2 (association analysis). The results are visualised below.

<img title="Run time" alt="Run time" src="/assets/img/runtime_poster.png">

LDAK-KVIK required approximately 12 CPU hours to analyse 430k individuals for 690k SNPs, whereas Bolt-LMM required >150 hours. Regenie required 32 CPU hours to analyse the same data.

<!-- 

## Steps

The computational costs were evaluated for two separate parts of the mixed-model association analysis: Step 1, in which the LOCO estimator is computed, and Step 2, in which the single-SNP analysis is performed. 

-->