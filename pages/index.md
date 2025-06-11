---
layout: page
title: LDAK-KVIK
permalink: /
---

# Welcome to LDAK-KVIK!

**LDAK-KVIK** is a tool for mixed-model association analysis for genome-wide association studies (GWAS). It is part of the [LDAK](http://www.dougspeed.com) software, which is written in C. A [preprint](https://www.medrxiv.org/content/10.1101/2024.07.25.24311005v2) of LDAK-KVIK is now online.

Key Features of LDAK-KVIK:
 - **High efficiency**: Capable of analysing 100,000s of individuals within hours
 - **High statistical power**: Improved detection of associated loci using an elastic net model
 - **Structured data**: Robust analysis of data with high levels of relatedness or multiple ancestries
 - **Saddlepoint approximation**: Control of type 1 error when testing rare diseases or variants
 - **Gene-based association analysis**: Leverage summary statistics in a gene-based association test

To download LDAK, please visit our [downloads](/docs/downloads) page. Example code of LDAK-KVIK can be found on the [example code](/docs/example) page. An overview of the steps involved in the LDAK-KVIK algorithm is included on the [LDAK-KVIK steps](/docs/assoc/singlesnp) page.

Stay updated with the latest developments regarding LDAK software by signing up for the [LDAK mailing list](https://dougspeed.com/downloads/).

## Example code

**LDAK-KVIK** is run in three steps:

1. Compute PRS using an Elastic Net model
2. Run single-SNP analysis with PRS as an offset
3. Conduct gene-based analysis using summary statistics from the single-SNP analysis

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

LDAK is compatible with both Linux and Mac. On the [Downloads](/docs/downloads) page, we list several options for loading or installing the LDAK software.

<!-- 
It is also possible to install the Linux-version of LDAK via [conda](http://anaconda.org/genomedk/ldak5) using the following command:
```
conda install genomedk::ldak5
```
-->
## Questions or issues

For any questions or issues about LDAK-KVIK or the LDAK software, please [Raise an Issue](https://github.com/dougspeed/LDAK/issues).