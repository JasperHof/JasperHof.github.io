---
layout: page
title: LDAK-KVIK
permalink: /
---

# Welcome to LDAK-KVIK!

**LDAK-KVIK** is a tool for mixed-model association analysis for genome-wide association studies (GWAS). LDAK-KVIK is included in the [LDAK](http://www.dougspeed.com) software, which is coded in C.

Features of LDAK-KVIK include:

 - **High efficiency**, capable of analysing 100,000s of individuals in hours
 - Increased **statistical power** by jointly modelling all SNPs using an Elastic Net
 - LDAK-KVIK enables analysis of structured data, including data with high **relatedness**
 - Efficient **saddlepoint approximation** for robust association analysis of binary traits
 - Direct implementation of **gene-based association analysis**

For instructions on downloading LDAK, please go to [downloads](/docs/downloads). Example code of LDAK-KVIK can be found in [example code](/docs/example). An overview of the steps involved in running LDAK-KVIK are included in the [LDAK-KVIK steps](/docs/assoc/singlesnp) page.

To stay tuned about updates regarding LDAK software, please sign up for the [LDAK mailing list](https://dougspeed.com/downloads/).

## Example code

**LDAK-KVIK** is run in three steps:

1. Compute PRS using an Elastic Net model
2. Run single-SNP analysis with PRS as offset
3. Perform gene-based analysis using summary statistics of single-SNP analysis

Example command lines are:

```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
./ldak6.linux --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
./ldak6.linux --kvik-step3 kvik --bfile data --genefile genefile --max-threads 4
```

## Installation

LDAK-KVIK can be run on both [Linux and Mac](/docs/downloads). It is also possible to install the Linux-version of LDAK via [conda](http://anaconda.org/genomedk/ldak5) using the command lines:
```
conda install genomedk::ldak5
```

## Contact

If you have any questions about LDAK-KVIK or the LDAK software, please contact [Doug Speed](mailto:doug@qgg.au.dk).