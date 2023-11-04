---
title: Example code
description: Example code for running LDAK-KVIK
---

# Example code for running LDAK-KVIK

This page includes example code to run **LDAK-KVIK**. It is possible to run LDAK-KVIK directly on your own data, or to first try it out on simulated data. In case you wish to directly apply LDAK-KVIK to your own data, please skip to [Running LDAK-KVIK](#Running-LDAK-KVIK).

## Generating genotypes and phenotypes

LDAK can be used to generated genotype data using the command line
```
./ldak5.2.linux --make-snps data --num-samples 10000 --num-snps 50000
```
This generates the files `data.bed`, `data.bim` and `data.fam`, containing SNP data for 10000 individuals and 50000 genetic variants. The minor allele frequencies of these SNPs are randomly sampled from the [0, 0.5] interval, and SNPs are generated in linkage equilibrium.

Currently, all SNPs in the `data.bim` file are allocated to Chromosome 1. It is possible to distribute these over 20 chromosomes by running the commands:
```
awk 'NR==1{print; next} {$1 = int((NR-1)/2500) + 1; print}' data.bim > data2.bim
mv data2.bim data.bim
``` 

Next, it is possible to generate phenotype data using the command line
```
./ldak5.2.linux --make-phenos pheno --bfile data --power -1 --her 0.5 --num-phenos 1 --num-causals 1000
```
This command generates one phenotype using the previously generated SNP data. The generated phenotype is simulated under a SNP heritability of 0.5, based on 1000 SNPs that are randomly selected from the 50000 SNPs. The SNP effects are sampled from a normal distribution, and scaled to match the heritability. The argument `--power -1` indicates that the variance explained by the SNPs is independent of their minor allele frequency.   

<a id="Running-LDAK-KVIK"></a>

## Running LDAK-KVIK

**LDAK-KVIK** is run in two steps. In the first step, we compute the Leave-One-Chromosome-Out (LOCO) predictors using an elastic net model. This can be run using the command:
```
./ldak5.2.linux --elastic step1 --bfile data --pheno pheno.pheno --power -0.25 --LOCO YES 
```
This command first computes the optimal hyperparameters, and subsequently fits the elastic net model. The estimates SNP effects are saved in `step1.effects`, the LOCO estimators are saved in `step1.loco.prs`.

After computing the LOCO estimators, the association analysis can be run using the command lines:
```
./ldak5.2.linux --linear step2 --bfile data --pheno pheno.pheno --predictions step1
```

## Viewing the Output

The results of the association analysis can be viewed using
```
head step2.assoc
```
