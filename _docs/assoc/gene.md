---
title: Gene-based testing
description: Gene-based association analysis for genome-wide association studies
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Gene-based association analysis

LDAK-KVIK uses the summary statistics of single-SNP analysis to run [LDAK-GBAT](https://www.cell.com/ajhg/fulltext/S0002-9297(22)00501-8?dgcid=raven_jbs_aip_email). LDAK-GBAT can perform gene-based association analysis using GWAS summary statistics and a reference panel, and uses REstricted Maximum Likelihood (REML) to solve the model:

$$
Y \sim N(0,K_S\sigma^2_S + I(1-\sigma^2_S))
$$

Here, $$K_S$$ is a "genomic" relatedness matrix constructed using only SNPs within the gene being tested. LDAK-GBAT performs a likelihood ratio test of $$\sigma^2_S>0$$ (using permutations to estimate the null distribution of the likelihood ratio test statistic). When applied to 109 phenotypes from the UK Biobank, Million Veterans Program and Psychiatric Genomics Consortium, LDAK-GBAT found at least 19% more significant genes than the existing tools MAGMA, fastBat, SKAT-O, PCA and ACAT (the last three tools are contained within the sumFREGAT software).

## Performing gene-based association analysis

After performing LDAK-KVIK [Step 1 and Step 2](/docs/assoc/singlesnp), it is possible to perform gene-based association analysis using the command line:

```
./ldak6.linux --kvik-step3 kvik --bfile data --genefile <annotfile> --max-threads 4
```

LDAK-GBAT can also be used to perform gene-based analysis using **existing** summary statistics. This requires a three-step process, in which the SNPs are allocated to genes and tested using a permutation-based test. The following command lines can be used to run LDAK-GBAT:

```
./ldak6.linux --cut-genes gbat --bfile data --genefile <annotfile> --max-threads 4
./ldak6.linux --calc-genes-reml gbat --bfile data --summary <sumstats> --power -0.25 --max-threads 4
./ldak6.linux --join-genes-reml gbat
```

The results of gene-based association analysis are then stored in the `gbat` folder as `remls.all`.

## Gene annotation files

Gene-based association analysis requires a gene annotations file, which should be in 'Browser Extensible Data' format. This means that it should contains one row for each gene, and four columns, that report the gene name and chromosome, and its start and end basepairs. For example, if the file contained a single line, with entries "ABC 7 0 10", this would indicate there is one gene, called ABC, which spans the first ten basepairs of Chromosome 7. For the gene-based association analyses of UK Biobank data in the LDAK-KVIK publication, we tested 17,332 genes defined based on RefSeq annotations (the corresponding annotations file is provided at [resources](http://www.dougspeed.com/resources)).

It is possible to download gene annotation files (hg37 and hg38) in a Linux terminal using
``` 
wget https://dougspeed.com/wp-content/uploads/RefSeq_GRCh37.txt
wget https://dougspeed.com/wp-content/uploads/RefSeq_GRCh38.txt
```