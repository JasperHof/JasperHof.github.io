---
layout: page
title: LDAK-KVIK
permalink: /
---

# Welcome to LDAK-KVIK

**LDAK-KVIK** is a powerful and computationally efficient method for mixed-model association analysis in genome-wide association studies (GWAS). It is part of the [LDAK](http://www.dougspeed.com) software, which is written in C. LDAK-KVIK has been published in [Nature Genetics](https://www.nature.com/articles/s41588-025-02286-z).

### 🚀 Why use LDAK-KVIK?
 - **Scalability**: Analyses hundreds of thousands of individuals within hours, with low memory requirements
 - **Statistical power**: Improved detection of associated loci using an elastic net model
 - **Handles structure**: Robust to relatedness and population stratification
 - **Saddlepoint approximation**: Controls type 1 error when analysing rare diseases or skewed quantitative traits
 - **Gene-based testing**: Uses the single-SNP summary statistics for gene-based association testing

To download LDAK, please visit our [downloads](/docs/downloads) page. Example code for LDAK-KVIK can be found on the [example code](/docs/example) page. An overview of the steps involved in the LDAK-KVIK algorithm is included on the [LDAK-KVIK steps](/docs/assoc/singlesnp) page.

Stay updated with the latest developments regarding LDAK software by signing up for the [LDAK mailing list](https://dougspeed.com/downloads/).

### 🔧 Example code

**LDAK-KVIK** is run in three steps:

1. Compute polygenic risk scores (PRS) using an elastic net model
2. Run single-SNP association analysis using PRS as an offset
3. Conduct gene-based analysis using summary statistics

Example command lines are:

```
./{{ site.ldak_linux }} --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
./{{ site.ldak_linux }} --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
./{{ site.ldak_linux }} --kvik-step3 kvik --bfile data --genefile genefile --max-threads 4
```

The main output files are:
 -  `kvik.step2.assoc` (results from single-SNP association analysis)
 -  `kvik.step3.remls.all` (results from gene-based association analysis)

### 💻 Getting started

LDAK is available for Linux and Mac. On the [Downloads](/docs/downloads) page, we list several options for loading or installing the LDAK software. Explore [example code](/docs/example) and a detailed overview of the [KVIK algorithm](/docs/technical) to get started.

<!-- 
It is also possible to install the Linux-version of LDAK via [conda](http://anaconda.org/genomedk/ldak5) using the following command:
```
conda install genomedk::ldak6
```
-->
### ❓ Questions or issues

If you have questions or run into issues, please [open an issue on GitHub](https://github.com/dougspeed/LDAK/issues).