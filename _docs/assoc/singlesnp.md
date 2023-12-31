---
title: Single-SNP analysis
description: Single-SNP analysis
---

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Here we describe how to run **LDAK-KVIK** for single SNP analysis. LDAK-KVIK can be broken down into two steps, which are executed by running two command lines.

# Step 1

In Step 1, an LDAK-KVIK fits an elastic net model to compute polygenic risk scores, for every chromosome separately. This step can be broken down into the following sub-steps:

1. Compute the SNP heritabilities for the prediction model
2. Determine the optimal hyperparameters for the elastic net using training samples
3. Construct the best-fitting model and compute a polygenic risk score for every chromosome being tested

An example command line of Step 1 in LDAK-KVIK is given by:

```
./ldak5.2.linux --kvik step1 --bfile data --pheno phenofile --covar covfile  --max-threads 2
```

This input options are as follows:

| Argument |  Description | 
|------------|--------|
|`--kvik`    | Name of the output file of the elastic net model   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--pheno`   | Name of the phenotype file      |
|`--covar`   | Name of the covariate file     |
|`--max-threads`   | Integer value, specifying the number of available threads for fitting the elastic net. By default, LDAK assumes `--max-threads` = 1      |

LDAK-KVIK first searches for an optimal value of $$\alpha$$, which scales the elastic net prior of SNP effects based on their minor allele frequency (see [Overview of LDAK-KVIK](/docs/assoc)). For most real traits, this value lies between -0.5 and 0. This value can also be specified using the option `--power <alpha>`.

We recommend running LDAK-KVIK with `--power -0.25`, since [previous works](https://www.nature.com/articles/ng.3865) have shown that this value is on average the best fit for constructing prediction models. We also recommend using a CV-proportion of 0.1, as we found that this generally suffices in accurately assessing the best hyperparameters for LDAK-KVIK.

It is possible to use [SNP annotations](http://dougspeed.com/pre-computed-tagging-files/) for computing SNP heritabilities, which can improve the prediction model. When analysing imputed data, it is often unnecessary to analyse include all SNPs in the elastic net model. Instead, it is possible to restrict to a subset of SNPs in Step 1, for example the directly genotyped SNPs or SNPs that remain after pruning. This can be achieved by adding the option `--extract <extractfile>`. The elastic net model accounts for linkage disequilibrium between SNPs. 

# Step 2

The LOCO predictions computed in Step 1 are subsequently used as offset when testing SNPs for association. Both quantitative traits and binary traits can be analysed using a linear regression, using the command line:

```
./ldak.out --linear step2 --bfile data ----pheno phenofile --covar covfile --predictions step1 --max-threads 2
```

Here, the `--predictions` argument speficies the output files of the first step. The `--linear` argument specifies the name of the output file. For the analysis of binary traits, we recommend using a [saddlepoint approximation](/docs/assoc/spa), which can be achieved by including the option `--spa-test YES`. 

