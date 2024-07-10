---
title: Single-SNP analysis
description: Single-SNP analysis
---

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

**LDAK-KVIK** has two steps when used for single-SNP association analysis, and three steps when used for both single-SNP and gene-based association analysis.


**Step 1.** Construct LOCO PRS and estimate $$\lambda$$
   1. Test for structure
   2. Estimate $$\alpha$$ and $$h^2_j$$ using partitioned randomized Haseman-Elston Regression
   3. Revise the estimates of $$h^2_j$$ using Monte Carlo REML
   4. Determine suitable elastic net hyperparameters via cross-validation
   5. Contruct LOCO PRS and estimate $$\lambda$$


# Step 1

In Step 1, an LDAK-KVIK fits an elastic net model to compute LOCO polygenic risk scores, for every chromosome separately. This step can be broken down into the following sub-steps:

1. Test the data for structure (e.g., relatedness) using 512 semi-randomly picked SNPs
2. Compute the heritability and power parameter alpha using randomized, partitioned Haseman-Elston regression
3. Determine the optimal hyperparameters for the elastic net using training samples
4. Construct the best-fitting model and compute a polygenic risk score for every chromosome being tested

An example command line of Step 1 in LDAK-KVIK is given by:

```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile
```

This input options are as follows:

| Argument |  Description | 
|------------|--------|
|`--kvik`    | Name of the output file of the elastic net model   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--pheno`   | Name of the phenotype file      |
|`--covar`   | Name of the covariate file     |
|`--max-threads`   | Integer value, specifying the number of available threads for fitting the elastic net. By default, LDAK assumes `--max-threads` equals 1      |

LDAK-KVIK first searches for an optimal value of $$\alpha$$, which scales the elastic net prior of SNP effects based on their minor allele frequency (see [Overview of LDAK-KVIK](/docs/assoc)). For most real traits, this value lies between -0.5 and 0. This value can also be specified using the option `--power <alpha>`.

It is possible to specify [SNP annotations](http://dougspeed.com/pre-computed-tagging-files/) for computing SNP heritabilities, which can improve the prediction model. When analysing imputed data, it is often unnecessary to analyse include all SNPs in the elastic net model. Instead, it is possible to restrict to a subset of SNPs in Step 1, for example the directly genotyped SNPs or SNPs that remain after pruning. This can be achieved by adding the option `--extract <extractfile>`. The elastic net model accounts for linkage disequilibrium between SNPs. 

# Step 2

The LOCO predictions computed in Step 1 are subsequently used as offset when testing SNPs for association. Both quantitative traits and binary traits can be analysed using a linear regression, using the command line:

```
./ldak6.linux --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile
```

Here, the `--predictions` argument speficies the output files of the first step. The `--linear` argument specifies the name of the output file. For the analysis of binary traits, we recommend using a [saddlepoint approximation](/docs/assoc/spa), which can be achieved by including the option `--spa-test YES`. 

# Step 3

```
./ldak6.linux --kvik-step3 kvik --bfile data --annot <annotfile>
```