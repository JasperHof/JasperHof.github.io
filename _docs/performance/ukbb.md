---
title: UK Biobank application
description: Results of application LDAK-KVIK to UK Biobank traits
---

## Application to UK Biobank 

We applied **LDAK-KVIK** to 40 quantiative traits from the UK Biobank, and compared its performance to Regenie, Bolt-LMM, and classical regression. 

For every trait, we first evaluated the number of independent significantly associated loci for each method. Next, we computed the percentage difference in number of significant loci with linear regression. These are plotted against the estimated SNP heritability of the trait.

<img title="UK Biobank application" alt="UK Biobank application" src="/assets/img/ukbb_power_poster.png">

We found that LDAK-KVIK, Regenie and Bolt-LMM all had increased power over classical linear regression, with increasing power for SNPs with higher heritabiliy. For most traits, LDAK-KVIK identified more statistically significant loci compared to Regenie, but less than Bolt-LMM.
