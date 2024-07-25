---
title: Single-SNP analysis
description: Single-SNP analysis
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# LDAK-KVIK steps

**LDAK-KVIK** has two steps when used for single-SNP association analysis, and three steps when used for both single-SNP and gene-based association analysis. These steps should be run consecutively; each next step is dependent on the results of the previous step. 

An example run of LDAK-KVIK is as follows:
```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
./ldak6.linux --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
./ldak6.linux --kvik-step3 kvik --bfile data --genefile genefile --max-threads 4
```

An overview of the LDAK-KVIK algorithm is included in the [Technical Details](/docs/technical). Here, we describe the command lines used the the main input options. Note that a more extensive list of input options is included in the [LDAK-KVIK options](/docs/input).

---

# Step 1

An example command line of Step 1 in LDAK-KVIK is given by:

```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
```

This input options are as follows:

| Argument |  Description | 
|------------|--------|
|`--kvik-step1`    | Name of the output files of the step 1   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--pheno`   | Name of the phenotype file      |
|`--covar`   | Name of the covariate file     |
|`--max-threads`   | Integer value, specifying the number of available threads for fitting the elastic net. By default, LDAK assumes `--max-threads` equals 1      |
|`--binary` | Indicates that the analysed trait is binary |

When analysing binary traits, the user should add `--binary YES` to the command. All operations in Step 1 will then be based on weighted linear regression, instead of linear regression. When analysing imputed data, it is not necessary to include all SNPs in Step 1. To reduce computational time, it is possible to run Step 1 with all directly genotyped SNPs, which typically yields a similar PRS accuracy compared to all SNPs. A more extensive list of options can be found in [data filtering](/docs/input#filtering) and [LDAK-KVIK options](/docs/input#kvik).

---

# Step 2

An example command line of Step 2 in LDAK-KVIK is given by:

```
./ldak6.linux --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
```

This main input options are as follows:

| Argument |  Description | 
|------------|--------|
|`--kvik-step2`    | Name of the output files of Step 2   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--pheno`   | Name of the phenotype file      |
|`--covar`   | Name of the covariate file     |

Note that the input argument of `--kvik-step2` (in this case, 'kvik') should match the argument previously used in `--kvik-step1`. In case the `--binary YES` flag is used in Step 1, this will automatically be used in Step 2, and a [saddlepoint approximation](/docs/assoc/spa) will be used for association analysis. Note that Step 2 can only be run after Step1 has been run. More options for can be found in [Data Filtering](/docs/input#filtering).

---

# Step 3

An example command line of Step 3 in LDAK-KVIK is given by:

```
./ldak6.linux --kvik-step3 kvik --bfile data --genefile <annotfile> --max-threads 4
```

Note that a gene annotation file is needed to specify the locations of the genes on the genome. The [gene-based](/docs/assoc/gene) testing page includes command lines for downloading gene annotation files.