---
title: Input options
description: Overview of genotype, phenotype and covariate formatting options in LDAK-KVIK
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
<a id="gen"></a>

# Data format

To run LDAK, you require genotypes and phenotypes, while it is common to also include covariates. When performing gene-based analysis, you additionally require a gene annotations file.

## Genotypes

LDAK accepts genetic data in three formats, using one of the following arguments:

| Argument    |  Description |
|-----------------------------|--------|
| `--bfile <datastem>`    | BED (binary PLINK) format, which accomodates hard-coded SNP genotypes. LDAK will expect to find the files `<datastem>.bed`, `<datastem>.bim` and `<datastem>.fam`   |
| `--bgen <datafile>`    | BGEN format, which accomodates genotype probabilties. Note then if `<datastem>` does not include sample IDs, it necessary to provide these separately using `--sample`.   |
| `--speed <datastem>`    | LDAK binary format (see https://dougspeed.com/file-formats for details). LDAK will expect to find the files `<datastem>.speed`, `<datastem>.bim` and `<datastem>.fam`   |

To filter either samples or predictors, see [Data Filtering](/docs/input#filtering). LDAK is usually applied to SNP data, in which case all predictors take values between 0 and 2 (representing the count of the A1 allele). However, LDAK can also be applied to other datatypes; for this your data should be in either gen or SP format and you should use the option `--SNP-data NO`.

Notably, LDAK is not able to process data of `pgen` format and `vcf` format. For application of LDAK-KVIK on these data types, we recommend first converting the genotype data to Binary PLINK format.

<a id="pheno"></a>

## Phenotypes

Phenotype files should be in PLINK format. The first two columns should provide sample IDs, with subsequent columns providing the phenotype values. This can be one phenotype, or multiple phenotypes. An example phenotype input file looks like this:
```
FID IID Pheno1 Pheno2
1 1 0.25 25
2 2 0.42 12
3 3 0.32 36
...
```
LDAK accepts phenotype files both with and without a header. In case a header is included, the first two elements must be named either FID & IID or ID1 & ID2. If a phenotype file contains more than one phenotype (i.e., more than three columns), the user must specify the phenotype to analyse in LDAK using the option `--mpheno <integer>` (to specify by number) or `--pheno-name <name>` (to specify by name). Alternatively, some functions (most notably REML) allow for testing of all phenotypes by adding --mpheno -1.

Missing values should be denoted by NA. Note that whereas PLINK also treats -9 as missing, this is not the case in LDAK. Binary phenotypes should only take values:
- 0 (control), 1 (case) or NA; or
- 1 (control), 2 (case) or NA

When a phenotypic values is NA for a particular sample, then that sample is excluded from the analysis.

<a id="covar"></a>

## Covariates

Covariate files should be in PLINK format. The first two columns should provide the sample FIDs and IIDs, with subsequent columns providing covariate values. For example: 
```
FID IID PC1 PC2 PC3 Age Sex
1 1 0.42 -0.12 1.23 41 0
2 2 -0.1 0.23 0.49 64 1
3 3 0.21 -0.14 -0.23 27 0
...
```
There is no option to select a subset of covariates, all covariates will be used. Therefore, the user should make a separate covariate file in case not all covariates should be included in analysis.

Note that if a covariate is NA, its value is replaced by the mean.

<a id="gene"></a>

## Gene annotations

Gene-based association analysis requires a gene annotations file, which should be in 'Browser Extensible Data' format. This means that it should contains one row for each gene, and four columns, that report the gene name and chromosome, and its start and end basepairs. For example, if the file contained a single line, with entries "ABC 7 0 10", this would indicate there is one gene, called ABC, which spans the first ten basepairs of Chromosome 7. 

It is possible to download gene annotation files (hg37 and hg38) in a Linux terminal using:
``` 
wget https://dougspeed.com/wp-content/uploads/RefSeq_GRCh37.txt
wget https://dougspeed.com/wp-content/uploads/RefSeq_GRCh38.txt
```
The gene annotations files can also be downloaded from [GitHub](https://github.com/dougspeed/LDAK).

<a id="filtering"></a>

## Data filtering

For most commands, it is possible to filter on SNPs or filter on samples using the following arguments:

| Argument |  Description |
|--------------------|--------|
| `--extract <extractfile>`    | Tells LDAK to use only the predictors specified in `<extractfile>`   |
| `--exclude <excludefile>` | Tells LDAK to not use the predictors specified in `<excludefile>`. Note that predictors in --exclude <excludefile> takes priority over predictors in --extract <extractfile> |
| `--chr <integer>` | Tells LDAK to only use predictors on a particular chromosome. If you use --chr AUTO, LDAK will only use Chromosomes 1-22 (in humans, these are the autosomes) |
| `--snp <predname>` | Tells LDAK to only use the named predictor |
| `--keep <keepfile>` | Tells LDAK to only use the samples specified in <keepfile> |
| `--remove <removefile>` | Tells LDAK to not use the samples specified in <removefile>. Note that predictors in --remove <removefile> takes priority over predictors in --keep <keepfile> |

In addition, for many commands, you can add `--pheno <phenofile>` and LDAK will only consider samples for which phenotypes are available.

Note that if you would like to filter predictors based on minor allele frequency, variance, missingness or information score, you must first remake the data (this filtering can not be done on-the-fly).
