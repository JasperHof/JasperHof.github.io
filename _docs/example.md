---
title: Example code
description: Example code for running LDAK-KVIK
---

# Example code for running LDAK-KVIK

This page includes example code to run **LDAK-KVIK**. It is possible to run LDAK-KVIK directly on your own data, or to first try it out on simulated data. In case you wish to directly apply LDAK-KVIK to your own data, please jump to [Running LDAK-KVIK](#Running-LDAK-KVIK).

## Generating genotypes and phenotypes

LDAK can be used to generated genotype data using the command line
```
./ldak6.linux --make-snps data --num-samples 10000 --num-snps 50000
```
This generates the files `data.bed`, `data.bim` and `data.fam`, containing SNP data for 10000 individuals and 50000 genetic variants. The generated SNPs are evenly distributed across 22 chromosomes. The minor allele frequencies of these SNPs are randomly sampled from the [0, 0.5] interval, and SNPs are generated in linkage equilibrium.

Next, it is possible to generate phenotype data using the command line
```
./ldak6.linux --make-phenos pheno --bfile data --power -0.25 --her 0.5 --num-phenos 1 --num-causals 1000
```
This command generates one phenotype using the previously generated SNP data. The generated phenotype is simulated under a SNP heritability of 0.5, based on 1000 SNPs that are randomly selected from the 50000 SNPs. The power is set to -0.25, indicating that more common SNPs (with higher MAF) tend to explain more phenotypic variance (a phenomenon observed in human traits). All SNP effects are sampled from a normal distribution, and scaled to match the specified heritability.   

<a id="Running-LDAK-KVIK"></a>

## Running LDAK-KVIK

**LDAK-KVIK** is run in three steps. In the first step, we compute the Leave-One-Chromosome-Out (LOCO) PRS using an Elastic Net model. This can be run using the command:
```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno pheno.pheno
```
A detailed explanation of Step 1 is included in [Overview of LDAK-KVIK](/docs/assoc/singlesnp)

After computing the LOCO estimators, the association analysis can be run using the command lines:
```
./ldak5.2.linux --linear step2 --bfile data --pheno pheno.pheno --predictions step1
```

## Viewing the Output

The results of the association analysis can be viewed using
```
head step2.assoc
```
    