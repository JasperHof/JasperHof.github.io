---
title: Single-SNP analysis
description: Single-SNP analysis
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# LDAK-KVIK steps

**LDAK-KVIK** uses a three-step process to test SNPs and genes for association with the phenotype:

1. Compute a Leave-One-Chromosome-Out (LOCO) PRS using an Elastic Net model
2. Use the PRS as offset in single-SNP analysis 
3. Use the summary statistics of single-SNP analysis to run a gene-based association analysis LDAK-GBAT

These steps should be run consecutively; each next step is dependent on the results of the previous step. 

An example run of LDAK-KVIK is as follows:
```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 2
./ldak6.linux --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile --max-threads 2
./ldak6.linux --kvik-step3 kvik --bfile data --genefile genefile --max-threads 2
```

An overview of the LDAK-KVIK algorithm is included in the [technical details](/docs/technical). Here, we describe the command lines used the the main input options. Note that a more extensive list of input options is included in the the [data format](/docs/input) page. 

---

## Step 1

**Please note** that it is not necessary to use the full genotype data in LDAK-KVIK Step 1. Instead, we recommend using a subset of SNPs to compute LOCO PRS and estimate $$\lambda$$, which substantially reduces run time with minimal impact on statistical performance. The [Recommendations](/docs/recommendations) page provides example code for reducing the number of SNPs used in Step 1.

An example command line of Step 1 in LDAK-KVIK is given by:

```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 2
```

The main input options are as follows:

<table>
  <tr>
    <th style="width: 20%;">Argument</th>
    <th style="width: 80%;">Description</th>
  </tr>
  <tr>
    <td><code>--kvik-step1</code></td>
    <td>Name of the output files of the step 1</td>
  </tr>
  <tr>
    <td><code>--bfile</code></td>
    <td>Name of the .bed file to be analyzed</td>
  </tr>
  <tr>
    <td><code>--pheno</code></td>
    <td>Name of the phenotype file</td>
  </tr>
  <tr>
    <td><code>--covar</code></td>
    <td>Name of the covariate file</td>
  </tr>
  <tr>
    <td><code>--max-threads</code></td>
    <td>Integer value, specifying the number of available threads for fitting the elastic net. By default, LDAK assumes <code>--max-threads</code> equals 1</td>
  </tr>
  <tr>
    <td><code>--binary</code></td>
    <td>Indicates that the analysed trait is binary</td>
  </tr>
</table>



When analysing binary traits, the user should add `--binary YES` to the command. All operations in Step 1 will then be based on weighted linear regression, instead of linear regression. When analysing imputed data, it is not necessary to include all SNPs in Step 1 (see [Recommendations](/docs/recommendations/#analysing-imputed-data) for alternative options). A more extensive list of options can be found in [data format](/docs/input).

---

## Step 2

An example command line of Step 2 in LDAK-KVIK is given by:

```
./ldak6.linux --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile --max-threads 2
```

The main input options are as follows:

| Argument |  Description | 
|------------|--------|
|`--kvik-step2`    | Name of the output files of Step 2. Note that this should have the same name as Step 1.   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--pheno`   | Name of the phenotype file      |
|`--covar`   | Name of the covariate file     |

Note that the input argument of `--kvik-step2` (in this case, 'kvik') should match the argument previously used in `--kvik-step1`. In case the `--binary YES` flag is used in Step 1, this will automatically be used in Step 2, and a [saddlepoint approximation](/docs/assoc/spa) will be used for association analysis. Note that Step 2 can only be run after Step1 has been run. More options for can be found in [Data Filtering](/docs/input#filtering).

---

## Step 3

An example command line of Step 3 in LDAK-KVIK is given by:

```
./ldak6.linux --kvik-step3 kvik --bfile data --genefile <annotfile> --max-threads 2
```

The main input options are as follows:

| Argument |  Description | 
|------------|--------|
|`--kvik-step3`    | Name of the output files of Step 3. Note that this should have the same name as Step 1 and Step 2.   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--genefile`   | Name of the gene annotation file      |

Note that a gene annotation file is needed to specify the locations of the genes on the genome. The [gene-based](/docs/assoc/gene) testing page includes command lines for downloading gene annotation files.