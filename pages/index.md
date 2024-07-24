---
layout: page
title: LDAK-KVIK
permalink: /
---

# Welcome to LDAK-KVIK!

**LDAK-KVIK** is a tool for mixed-model association analysis for genome-wide association studies (GWAS). It is part of the [LDAK](http://www.dougspeed.com) software, which is written in C.

Key Features of LDAK-KVIK:
 - **High efficiency**: Capable of analysing 100,000s of individuals within hours
 - **High statistical power**: Accurately models the phenotype using all SNPs with an elastic net
 - **Structured data**: Robustly analyses data with high relatedness or multiple ancestries
 - **Saddlepoint approximation**: Robust association analysis of imbalanced binary traits
 - **Gene-based association analysis**: Direct implementation of gene-based testing

To download LDAK, please visit our [downloads](/docs/downloads) page. Example code of LDAK-KVIK can be found in the [example code](/docs/example) page. An overview of the steps involved in the LDAK-KVIK algorithm are included in the [LDAK-KVIK steps](/docs/assoc/singlesnp) page.

Stay tuned with the latest developments regarding LDAK software by signing up for the [LDAK mailing list](https://dougspeed.com/downloads/).

## Example code

**LDAK-KVIK** is run in three steps:

1. Compute PRS using an Elastic Net model
2. Run single-SNP analysis with PRS as an offset
3. Conduct gene-based analysis using summary statistics of single-SNP analysis

Example command lines are:

```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
./ldak6.linux --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
./ldak6.linux --kvik-step3 kvik --bfile data --genefile genefile --max-threads 4
```

The main output files are:
 -  `kvik.step2.assoc` (results from single-SNP association analysis)
 -  `kvik.step3.remls.all` (results from gene-based association analysis)

## Installation

LDAK-KVIK is compatible with both [Linux and Mac](/docs/downloads). It is also possible to install the Linux-version of LDAK via [conda](http://anaconda.org/genomedk/ldak5) using the following command:
```
conda install genomedk::ldak5
```

## Contact

For any questions about LDAK-KVIK or the LDAK software, please contact [Doug Speed](mailto:doug@qgg.au.dk).