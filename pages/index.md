---
layout: page
title: LDAK-KVIK
permalink: /
---

# Welcome to LDAK-KVIK!

**LDAK-KVIK** is a method for mixed-model association analysis for genome-wide association studies (GWAS). LDAK-KVIK is highly efficient, and offers a high power to detect trait-associated loci.

Features of LDAK-KVIK include:

 - Increased **statistical power** by jointly modelling all SNPs
 - The LDAK-KVIK model naturally **accounts for relatedness** 
 - Efficient **saddlepoint approximation** for robust association analysis of binary traits
 - Improved **gene-based association analysis** by using polygenic risk scores as offset
 - Option to specify the **heritability model**

## Recommendations

We recommend using LDAK-KVIK for analysing GWAS data sets of larger sample sizes (N > 5000). Mixed-model association analysis is most beneficial when it is possible to predict phenotypes using polygenic risk scores. The power gain from mixed-model association analysis is directly linked to the prediction accuracy of the model (see [Campos et al.](https://www.nature.com/articles/s41588-023-01500-0)). LDAK-KVIK has not been tested on datasets of smaller sample sizes.

When analysing smaller sample sizes, it is still possible to make use of the [saddlepoint approximation](docs/assoc/spa). The saddlepoint approximation can assist in controlling the Type I error of GWAS, which is particularly useful when testing binary data with an imbalanced case:control ratio.

## Contact

If you have any questions about LDAK-KVIK or the LDAK software, please contact [Doug Speed](mailto:doug@qgg.au.dk).