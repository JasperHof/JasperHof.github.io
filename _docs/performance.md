---
title: Performance of LDAK-KVIK
description: Performance of LDAK-KVIK
---

# Performance

We assessed the performance of LDAK-KVIK based on run time, type 1 error and power. Both simulated data and UK Biobank data were used.

<a id="runtime"></a>

## Run time of LDAK-KVIK

We compared the run time and memory requirements of LDAK-KVIK with Bolt-LMM, Regenie, fastGWA and GCTA-LOCO when applied to 690k SNPs, using either 63k or 368k individuals. Note that Regenie and fastGWA were used for both quantitative and binary phenotypes, while BOLT-LMM and GCTA-LOCO were only applied to quantitative traits. The results are presented in the table below:

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

For every trait, we first evaluated the number of independent significantly associated loci for each method. This was compated to the number of significant loci using linear regression, and plotted against the estimated SNP heritability of the trait.

<img title="UK Biobank application" alt="UK Biobank application" src="/assets/img/Figure3.png" style="display: block; margin: 0 auto; width: 600px">

LDAK-KVIK found 16% more significant loci than classical linear regression, whereas BOLT-LMM
and REGENIE found 15% and 11% more, respectively. 

Note that we compare LDAK-KVIK with 'BOLT-LMM-Unscaled', which is based on BOLT-LMM results, except we force the test statistic scaling factor to be 1. This is, because the the BOLT-LMM tends to overestimate the test statistic scaling scaling factor, leading to inflation of type 1 error (see LDAK-KVIK publication). 

### Gene-based analysis

We applied the gene-based analysis of LDAK-KVIK to 40 quantiative and 20 binary traits from the UK Biobank, and compared its performance to LDAK-GBAT. 

<img title="UK Biobank application" alt="UK Biobank application" src="/assets/img/gene_based.png" style="display: block; margin: 0 auto; width: 500px">



<a id="sim"></a>

## Simulation study

## Type 1 error

## Power