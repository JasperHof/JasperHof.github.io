---
title: Simulations
description: Power comparison of LDAK-KVIK with other mixed-model association analysis methods for GWAS
---

## Simulations

To compare the empiral power and Type I error with existing mixed-model association methods, we simulated quantitative and binary outcomes for 70k white British individuals from the UK Biobank. We simulated under heritabilities 0.2 and 0.5, and varied the number of causal SNPs between 5000 and 20000. In addition, the top principal component explained 5% of phenotypic variance. For every scenario, we generated ten phenotypes.

Next, we ran LDAK-KVIK for every phenotype, and compared its performance with the following methods:
1. Classical linear regression
2. FastGWA
3. GCTA-LOCO 
4. Regenie
5. Bolt-LMM

All methods included the top ten principal components as covariates. The results are visualised in the Figure below.

<img title="Run time" alt="Run time" src="/assets/img/sim_power_poster.png">

LDAK-KVIK outperformed FastGWA, GCTA-LOCO and Regenie in terms of statistical power, but was beaten by Bolt-LMM.

