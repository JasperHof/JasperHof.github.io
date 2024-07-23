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
 - Improved **gene-based association analysis** by using polygenic risk scores as offset

For instructions on downloading LDAK, please go to [downloads](/docs/downloads). Example code of LDAK-KVIK can be found in [example code](/docs/example). An overview of the steps involved in running LDAK-KVIK are included in the [LDAK-KVIK steps](/docs/assoc/singlesnp) page.

To stay tuned about updates regarding LDAK software, please sign up for the [LDAK mailing list](https://dougspeed.com/downloads/).

## Installation

LDAK-KVIK can be run on both [Linux and Mac](/docs/downloads). It is also possible to install the Linux-version of LDAK via [conda](http://anaconda.org/genomedk/ldak5) using the command lines:
```
conda install genomedk::ldak5
```

## Contact

If you have any questions about LDAK-KVIK or the LDAK software, please contact [Doug Speed](mailto:doug@qgg.au.dk).