---
title: Simulations
description: Power comparison of LDAK-KVIK with other mixed-model association analysis methods for GWAS
---

## Simulations

We simulated quantitative outcomes for 70k white British individuals from the UK Biobank. We simulated under heritabilities 0.2, 0.5, and varied the number of causal SNPs between 5000 and 20000. In addition, the top principal component explained 5% of phenotypic variance. For every scenario, we generated ten phenotypes.

Next, we ran LDAK-KVIK for every phenotype, and compared its performance with the following methods:
1. Classical linear regression
2. FastGWA
3. GCTA-LOCO 
4. Regenie
5. Bolt-LMM

All methods included the top ten principal components as covariates. 

<img title="Run time" alt="Run time" src="/assets/img/sim_power_poster.png">