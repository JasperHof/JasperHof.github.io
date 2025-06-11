---
title: Overview of LDAK-KVIK
description: Overview of LDAK-KVIK
---

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>


# Overview of LDAK-KVIK

LDAK-KVIK is a method for performing mixed-model association analysis (MMAA) for GWAS. LDAK-KVIK uses a three-step process to test SNPs and genes for association with the phenotype:

1. Compute a Leave-One-Chromosome-Out (LOCO) PRS using an Elastic Net model
2. Use the PRS as offset in single-SNP analysis 
3. Use the summary statistics of single-SNP analysis to run a gene-based association analysis LDAK-GBAT.

A summary of the each step is included in the [LDAK-KVIK steps](/docs/assoc/singlesnp), and a detailed description of LDAK-KVIK is included in the LDAK-KVIK publication (see [preprint](https://www.medrxiv.org/content/10.1101/2024.07.25.24311005v2)). Below, we list some innovations of LDAK-KVIK.

## Key innovations of LDAK-KVIK

LDAK-KVIK never needs to store genotypes for more than 512 SNPs, and thus has **low memory demands**. LDAK-KVIK constructs PRS in Step 1 using a chunk-based variational Bayes solver that requires 5-20 times fewer updates than conventional variational Bayes solvers. This step is also used to efficiently compute a test statistic scaling factor.

LDAK-KVIK increases statistical power, relative to existing MMAA tools, by using more **realistic models** for how SNP effect sizes vary across the genome (specifically, the dependency between SNP heritability and MAF). An **Elastic Net** prior distribution is used for SNP effect sizes (i.e., a mixture of a Gaussian and a Laplace distribution), whereas existing MMAA tools generally restrict to mixtures of Gaussian distributions.

LDAK-KVIK includes a fast empirical algorithm for computing the **saddlepoint approximation** (SPA), which is used for controlling type 1 errors when testing binary traits with case:control imbalance. 

LDAK-KVIK includes a novel **test for structure**, based on the average pairwise correlation between 512 SNPs randomly picked from the genome (the correlation is calculated after regressing out covariates). The outcome of this test determines how LDAK-KVIK calculates the test statistic scaling factor.

In addition to testing SNPs individually for association with the phenotype, LDAK-KVIK can also perform **gene-based association analysis**. This is achieved by providing the results of the single-SNP analysis to our existing software LDAK-GBAT.
