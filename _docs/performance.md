---
title: Performance
description: Performance of LDAK-KVIK
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Performance of LDAK-KVIK

We assessed the performance of LDAK-KVIK based on run time, type 1 error and power using both simulated data and data from the UK Biobank.

<a id="runtime"></a>

## Run time

We compared the run time and memory requirements of LDAK-KVIK with BOLT-LMM, Regenie, fastGWA and GCTA-LOCO when applied to 690k SNPs, using either 63k or 368k individuals. Regenie and fastGWA were used for both quantitative and binary phenotypes, while BOLT-LMM and GCTA-LOCO were only applied to quantitative traits. The results are presented in the table below:

|   |                         |  63k individuals |   | 368k individuals  | |
|---|-------------------------|---|---|---|---|
|   |      **MMAA Tool**      | **CPU hours**  | **Memory (Gb)**  | **CPU hours**  | **Memory (Gb)** |
|  **Quantitative phenotypes** | BOLT-LMM  |  18 | 12  | 452 | 61 |
|   |      Regenie                     |  2.4 | 3  | 11  |  16 | 
|   |      fastGWA                     | 0.2 (24)  | 1 (1) | 0.3 (763) | 3 (3) | 
|   |      GCTA-LOCO                   | 488 | 167 | Not Feasible  | | 
|   |      LDAK-KVIK                   | 2.5 | 2 | 15 | 6 | 
| **Binary phenotypes**  |   REGENIE       | 3.3 | 3 | 15  | 16 | 
|   |      fastGWA                     | 0.3 (24) | 1 (46) | 1.8 (764) | 3 (3) | 
|   |      LDAK-KVIK                   | 2.7 | 2 | 19 | 6 | 

All analyses were performed on AMD/"EPYC Genoa" 9654 CPU processors, using either 4 CPUs (LDAK-KVIK, REGENIE and fastGWA) or 12 CPUs (BOLT-LMM and GCTA-LOCO). Values report the mean CPU hours and memory usage across either the five quantitative or five binary phenotypes. We report two sets of values for fastGWA, depending on whether we exclude or include the computation of the genomic-relatedness matrix (which only needs to be done once per dataset).

<a id="ukbb"></a>

## Application to UK Biobank 

### Single-SNP analysis

We applied LDAK-KVIK to 40 quantiative traits from the UK Biobank, and compared its performance to BOLT-LMM, Regenie, fastGWA, and classical regression. 

For every trait, we evaluated the number of independent significantly associated loci per method. This was compared to the number of significant loci using linear regression, and plotted against the estimated SNP heritability of the trait.

<img title="UK Biobank application - single SNP" alt="UK Biobank application single SNP" src="/assets/img/Figure3.png" style="display: block; margin: 0 auto; width: 600px">

LDAK-KVIK found 16% more significant loci than classical linear regression, whereas BOLT-LMM
and REGENIE found 15% and 11% more, respectively. 

Note that we compare LDAK-KVIK with 'BOLT-LMM-Unscaled', which is based on BOLT-LMM results, except we force the test statistic scaling factor to be 1. This is, because the the BOLT-LMM tends to overestimate the test statistic scaling scaling factor, leading to inflation of type 1 error (see [preprint](https://www.medrxiv.org/content/10.1101/2024.07.25.24311005v1)). 

### Gene-based analysis

We applied the gene-based analysis of LDAK-KVIK to 40 quantiative and 20 binary traits from the UK Biobank, and compared its performance to LDAK-GBAT. 

<img title="UK Biobank application - gene-based" alt="UK Biobank application gene-based" src="/assets/img/gene_based.png" style="display: block; margin: 0 auto; width: 500px">


<a id="sim"></a>

We see that LDAK-KVIK-GBAT has improved power over LDAK-GBAT when analysing quantitative traits. For binary traits, LDAK-KVIK-GBAT and LDAK-GBAT detect a similar number of significant genes. This reflects that for binary phenotypes, there is a smaller power gain when using mixed-model association analysis.

## Simulation study

We simulated quantitative and binary phenotypes for various data sets:
   - 'Homogeneous' dataset (63k unrelated White British individuals)
   - 'Twins' dataset (constructed by duplicating the genotypes of 31,500 individuals of homogeneous dataset)
   - 'Multi-ancestry' dataset (63k individuals of various ethnic backgrounds)

Phenotypes were generated under different heritabilities (0.2 and 0.5) and number of causal SNPs (5k and 20k), with ten replicates for each scenario. Causal SNPs were randomly selected from the start of each chromosome, while SNPs located on the end of each chromosome served as null SNPs to evaluate type 1 error. For binary traits, we also varied the prevalance (10% and 1%).

## Type 1 error

We evaluated the type 1 error of LDAK-KVIK for all scenarios as the mean $$\chi^2(1)$$ statistic of null SNPs, and as the fraction of SNPs exceeding P value thresholds 0.05, 0.001 and 0.00005.

<img title="Simulation study - type 1 error" alt="Simulation study type 1 error" src="/assets/img/type1.png" style="display: block; margin: 0 auto; width: 700px">

LDAK-KVIK offers good control of type 1 error across all scenarios, although a slight deflation can be observed when analysing the multi-ancestry data set for binary traits with prevalence 10%.

## Power

We compared the power of classical regression, fastGWA, GCTA-LOCO, REGENIE, BOLT-LMM and LDAK-KVIK by evaluating the mean $$\chi^2(1)$$ statistics of causal SNPs.

<img title="Simulation study - power" alt="Simulation study power" src="/assets/img/power.png" style="display: block; margin: 0 auto; width: 400px">

For the quantitative phenotypes, LDAK-KVIK and BOLT-LMM are the two most powerful MMAA tools, ahead of REGENIE and GCTA-LOCO, while fastGWA generally has lowest power. For the binary phenotypes, the three MMAA tools have similar power.