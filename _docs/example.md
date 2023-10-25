---
title: Example code
description: Example code for running LDAK-KVIK
---

# Example code for running LDAK-KVIK

This page provides with example code to run LDAK-KVIK. It is possible to run LDAK-KVIK direclty on your own data, or first try it on simulated data. 

LDAK can be used to generated genotype data using the command line:
```
./ldak5.2.linux --make-snps data --num-samples 10000 --num-snps 50000
```
This generates the files `data.bed`, `data.bim` and `data.fam`, containing SNP data for 10000 individuals and 50000 genetic variants. The minor allele frequencies of these SNPs are randomly sampled from the [0, 0.5] interval, and SNPs are generated in linkage equilibrium.

Next, it is possible to generate phenotype data using the command line:
```
./ldak5.2.linux --make-phenos pheno --bfile data --ignore-weights YES --power -1 --her 0.5 --num-phenos 1 --num-causals 1000
```
This command generates one phenotype using the previously generated SNP data. The generated phenotype is simulated under a SNP heritability of 0.5, based on 1000 SNPs that are randomly selected from the 50000 SNPs. The SNP effects are sampled from a normal distribution, and scaled to match the heritability. The argument `--power -1` indicates that the variance explained by the SNPs is independent of their minor allele frequency. Finally, the argument `--ignore weights YES` indicates that we do not assume a weighting of SNPs for simulating the phenotype data.    