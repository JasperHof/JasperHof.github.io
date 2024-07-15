---
title: Performance of LDAK-KVIK
description: Performance of LDAK-KVIK
---

We assessed the run time, type 1 error and power of LDAK-KVIK using both simulated data and data from the UK Biobank.

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

All analyses were performed on AMD/”EPYC Genoa” 9654 CPU processors, using either 4 CPUs (LDAK-KVIK, REGENIE and fastGWA) or 12 CPUs (BOLT-LMM and GCTA-LOCO). Values report the mean CPU hours and memory usage across either the five quantitative or five binary phenotypes. We report two sets of values for fastGWA, depending on whether we exclude or include the computation of the genomic-relatedness matrix (which only needs to be done once per dataset). It was not feasible for us to apply GCTA-LOCO to 368k samples (we estimate it would require over 500Gb memory and
over 10,000 CPU hours).

<a id="ukbb"></a>

## Application to UK Biobank 

We applied **LDAK-KVIK** to 40 quantiative traits from the UK Biobank, and compared its performance to BOLT-LMM, Regenie, fastGWA, and classical regression. 

For every trait, we first evaluated the number of independent significantly associated loci for each method. This was compated to the number of significant loci using linear regression, and plotted against the estimated SNP heritability of the trait.

<img title="UK Biobank application" alt="UK Biobank application" src="/assets/img/Figure3.png">

We found that LDAK-KVIK, Regenie and Bolt-LMM all had increased power over classical linear regression, with increasing power for SNPs with higher heritabiliy. For most traits, LDAK-KVIK identified more statistically significant loci compared to Regenie, but less than Bolt-LMM.

<a id="sim"></a>

## Simulation study

<a id="type1"></a>

## LDAK-KVIK type 1 error

<a id="gene"></a>

## Gene-based association testing