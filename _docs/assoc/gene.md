---
title: Gene-based testing
description: Gene-based association analysis for genome-wide association studies
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Gene-based association analysis

We have previously developed [LDAK-GBAT](https://www.cell.com/ajhg/fulltext/S0002-9297(22)00501-8?dgcid=raven_jbs_aip_email), a tool for gene-based association analysis using GWAS summary statistics and a reference panel. LDAK-GBAT uses REML to solve the model

$$
Y \sim N(0,K_S\sigma^2_S + I(1-\sigma^2_S))
$$

where $$K_S$$ is a "genomic" relatedness matrix constructed using only SNPs within the gene being tested, then performs a likelihood ratio test of $$\sigma^2_S>0$$ (using permutations to estimate the null distribution of the likelihood ratio test statistic). When applied to 109 phenotypes from the UK Biobank, Million Veterans Program and Psychiatric Genomics Consortium, LDAK-GBAT found at least 19% more significant genes than the existing tools MAGMA, fastBat, SKAT-O, PCA and ACAT (the last three tools are contained within the sumFREGAT software).

Note that LDAK-GBAT requires a gene annotations file, which should be in 'Browser Extensible Data'; i.e., it should contains one row for each gene, and four columns, that report the gene name and chromosome, and its start and end basepairs. For example, if the file contained a single line, with entries "ABC 7 0 10", this would indicate there is one gene, called ABC, which spans the first ten basepairs of Chromosome 7. For the gene-based association analyses of UK Biobank data in the LDAK-KVIK publication, we tested 17,322 genes defined based on RefSeq annotations (the corresponding annotations file is provided at [resources](http://www.dougspeed.com/resources)).

It is possible to download gene annotation files (hg37 and hg38) in a Linux terminal using
``` 
wget https://dougspeed.com/wp-content/uploads/RefSeq_GRCh37.txt
wget https://dougspeed.com/wp-content/uploads/RefSeq_GRCh38.txt
```