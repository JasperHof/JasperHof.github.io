---
layout: page
title: LDAK-KVIK
permalink: /
---

# Welcome to LDAK-KVIK!

**LDAK-KVIK** is a tool for mixed-model association analysis for genome-wide association studies (GWAS). LDAK-KVIK is highly efficient, and offers a high power to detect trait-associated loci.

Features of LDAK-KVIK include:

 - **Highly efficient**, able to analyse 100,000s of individuals in hours
 - Increased **statistical power** by jointly modelling all SNPs using an Elastic Net
 - LDAK-KVIK enables analysis of structured data, including data with high **relatedness**
 - Efficient **saddlepoint approximation** for robust association analysis of binary traits
 - Improved **gene-based association analysis** by using polygenic risk scores as offset

 To stay tuned about updates regarding LDAK software, please sign up for the [LDAK mailing list](https://dougspeed.com/downloads/).

## Recommendations

LDAK-KVIK can be validly applied to quantitative and binary traits, for both homogeneous datasets and structured datasets (e.g., data of multiple ancestries or high relatedness). 

When running LDAK-KVIK, the user has the option to specify the number of threads to facilitate parallel running of parts of the code. For optimal implementation of LDAK-KVIK, select the number of threads available in `--num-threads`.

Although LDAK-KVIK is primarily tested on data sets of size > 50,000, it is possible to apply LDAK-KVIK to smaller data sets. It should be noted that when analysing smaller data sets, there is likely a smaller power gain from using mixed-model association analysis, as it is harder to construct accurate LOCO PRS in Step 1 (see [Campos et al.](https://www.nature.com/articles/s41588-023-01500-0)). For binary traits, it is still useful to use the [saddlepoint approximation](docs/assoc/spa) to overcome inflation due to case:control imbalance. 

## Contact

If you have any questions about LDAK-KVIK or the LDAK software, please contact [Doug Speed](mailto:doug@qgg.au.dk).