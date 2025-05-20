---
title: Performance
description: Performance of LDAK-KVIK
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Performance of LDAK-KVIK

We assessed the performance of **LDAK-KVIK** based on run time, type 1 error and power using both simulated data and data from the UK Biobank.

<a id="runtime"></a>

## Computational costs

We compared the run time and memory requirements of LDAK-KVIK with those of REGENIE when applied to 690k SNPs, using various sample sizes.

<img title="UK Biobank application - single SNP" alt="UK Biobank application single SNP" src="/assets/img/REBUTTAL_runtime_1M.pdf" style="display: block; margin: 0 auto; width: 900px">

These results indicate that it is feasible to apply LDAK-KVIK to very large datasets (e.g., a million individuals). In general, we find that LDAK-KVIK is faster than REGENIE for all sample sizes, and for both quantitative and binary phenotypes. While the two tools have similar memory requirements for small samples sizes, LDAK-KVIK uses noticeably less memory than REGENIE for larger sample sizes (e.g., more than 50\,k individuals).

<a id="ukbb"></a>

## Application to UK Biobank 

### Single-SNP analysis

We applied LDAK-KVIK to 40 quantiative traits from the UK Biobank, and compared its performance to BOLT-LMM, Regenie, fastGWA, and classical regression. For every trait, we evaluated the number of independent significantly associated loci for each method, and compared those the number of significant loci obtained using fastGWA. The relative differences are plotted against the estimated SNP heritability of the trait.

<img title="UK Biobank application - single SNP" alt="UK Biobank application single SNP" src="/assets/img/ukbb_power_poster_with_bolt.pdf" style="display: block; margin: 0 auto; width: 900px">

LDAK-KVIK found 17% more significant loci than fastGWA, whereas BOLT-LMM
and REGENIE found 16% and 11% more, respectively. 

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