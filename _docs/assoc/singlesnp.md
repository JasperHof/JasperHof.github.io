---
title: Single-SNP analysis
description: Single-SNP analysis
---

Here we describe how to run **LDAK-KVIK** for single SNP analysis. LDAK-KVIK can be broken down into two steps, which are executed by running two command lines.

# Step 1

In Step 1, an LDAK-KVIK fits an elastic net model to compute polygenic risk scores, for every chromosome separately. This step can be broken down into the following sub-steps:

1. Compute the SNP heritabilities for the prediction model
2. Determine the optimal hyperparameters for the elastic net using training samples
3. Construct the best-fitting model and compute a polygenic risk score for every chromosome being tested

An example command line of Step 1 in LDAK-KVIK is given by:

```
./ldak5.2.linux --elastic kvik --bfile data --LOCO YES --pheno phenofile --covar covfile --ignore-weights YES \
    --fast YES --cv-proportion 0.1  --power -0.25 --max-threads 2 --bit-size 256
```

This input options are as follows:

| Argument |  Description | 
|------------|--------|
|`--elastic`    | Name of the output file of the elastic net model   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--LOCO`   | Indicator for Leave-One-Chromosome-Out prediction. The option `--LOCO YES` indicates that for every chromosome, an elastic net is fitted *excluding* SNPs on the chromosome, which is needed to run LDAK-KVIK. Conversely, `--LOCO NO` fits the elastic net for the whole genome  |
|`--pheno`   | Name of the phenotype file      |
|`--covar`   | Name of the covariate file     |
|`--ignore-weights` | Indicates there are no SNP weightings for computing the elastic net model. Alternatively, these can be specified using `--weights <weightsfile>` |
|`--fast`   | Indicator for faster, approximate computations of the elastic net. The option `--fast YES` applies the approximate elastic net, whereas `--fast NO` applies an exact elastic net  |
|`--cv-proportion`   | Numerical value, speficying the proportion of the sample used to esitmate the optimal hyperparameters of the elastic net      |
|`--power`   | Numerical value, specifying the scaling of predictors according to their minor allele frequency    |
|`--max-threads`   | Integer value, specifying the number of available threads for fitting the elastic net      |
|`--bit-size`   | Integer value, specifying how many SNPs are read in at the same time in the elastic net      |

### Recommendations

We recommend running LDAK-KVIK with `--power -0.25`, since [previous works](https://www.nature.com/articles/ng.3865) have shown that this value is on average the best fit for constructing prediction models. We also recommend using a CV-proportion of 0.1, as we found that this generally suffices in accurately assessing the best hyperparameters for LDAK-KVIK. Finally, we recommend using `--fast YES` when analysing large-scale data, as this leads to a significant increase of run time at a minimal loss of predictive accuracy of the elastic net.

It is possible to use [SNP annotations](http://dougspeed.com/pre-computed-tagging-files/) for computing SNP heritabilities, which can improve the prediction model. When analysing imputed data, it is often unnecessary to analyse include all SNPs in the elastic net model. Instead, it is possible to restrict to a subset of SNPs in Step 1, for example the directly genotyped SNPs or SNPs that remain after pruning. This can be achieved by adding the option `--extract <extractfile>`. The elastic net model accounts for linkage disequilibrium between SNPs. 

# Step 2

The LOCO predictions computed in Step 1 are subsequently used as offset when testing SNPs for association. Both quantitative traits and binary traits can be analysed using a linear regression, using the command line:

```
./ldak.out --linear outcome --bfile data ----pheno phenofile --covar covfile --predictions kvik --max-threads 2
```

Here, the `--predictions` argument speficies the output files of the first step. The `--linear` argument specifies the name of the output file. For the analysis of binary traits, we recommend using a [saddlepoint approximation](/docs/assoc/spa), which can be achieved by including the option `--spa-test YES`. 

