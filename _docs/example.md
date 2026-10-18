---
title: Example code
description: Example code for running LDAK-KVIK
---

# Example code for running LDAK-KVIK

It is possible to run LDAK-KVIK directly on your own data, or to first try it out on simulated data. To apply LDAK-KVIK directly to your own data, please skip to [Running LDAK-KVIK](#Running-LDAK-KVIK).

### Simulating genotypes and phenotypes

Genotype data can be generated using the command line:
```
./{{ site.ldak_linux }} --make-snps data --num-samples 10000 --num-snps 50000
```
This generates the files `data.bed`, `data.bim` and `data.fam`, containing SNP data for 10,000 individuals and 50,000 SNPs. The generated SNPs are evenly distributed across 22 chromosomes, with minor allele frequencies randomly sampled from the [0, 0.5] interval. Note that SNPs are generated in linkage equilibrium. The `--make-snps` command also generates the toy covariate file `data.covar`. 

Next, a quantitative phenotype can be generated using the command line:
```
./{{ site.ldak_linux }} --make-phenos pheno --bfile data --power -0.25 --her 0.5 --num-phenos 1 --num-causals 1000
```
This command generates one phenotype using the previously generated SNP data. The phenotype is simulated under a SNP heritability of 0.5, with 1,000 randomly selected causal SNPs. The power parameter is set to -0.25, indicating that common SNPs (with higher MAF) tend to explain more phenotypic variance (a phenomenon observed in human traits). SNP effect sizes are sampled from a normal distribution, and scaled to match the heritability.   

To generate binary phenotypes, the user should add a flag indicating the prevalence:
```
./{{ site.ldak_linux }} --make-phenos pheno --bfile data --power -0.25 --her 0.5 --num-phenos 1 --num-causals 1000 --prevalence 0.2
```
This generates a binary phenotype with 20% cases, and a liability heritability of 50%. 

<a id="Running-LDAK-KVIK"></a>

### Running LDAK-KVIK

An explanation of the input options of LDAK-KVIK can be found in the [LDAK-KVIK steps](/docs/assoc/singlesnp). Here, we demonstrate the basic command lines used to run LDAK-KVIK.

LDAK-KVIK is run in three steps. In Step 1, the Leave-One-Chromosome-Out (LOCO) PRS are computed using an Elastic Net model. Step 2 runs the single-SNP analysis, and Step 3 runs the gene-based association analysis. These steps are run consecutively using the following commands:

```
./{{ site.ldak_linux }} --kvik-step1 kvik --bfile data --pheno pheno.pheno --covar data.covar --max-threads 2
./{{ site.ldak_linux }} --kvik-step2 kvik --bfile data --pheno pheno.pheno --covar data.covar --max-threads 2
./{{ site.ldak_linux }} --kvik-step3 kvik --bfile data --genefile <gene annotation file> --max-threads 2
```

When analysing a binary trait, add the `--binary YES` flag in Step 1. Instructions for downloading the gene annotation file are described in the [gene-based analysis section](/docs/assoc/gene). An explanation of the generated output files is included in the [LDAK-KVIK output](/docs/output) page.