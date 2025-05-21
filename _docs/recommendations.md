---
title: Recommendations
description: Recommendations for running LDAK-KVIK
---

# Recommendations

Below, we list some recommendations for running LDAK-KVIK. 

## Analysing imputed data

Step 1 of LDAK-KVIK can be slow when there are very many predictors. Therefore, if your dataset contains over one million predictors, we recommend you only use a subset of these in Step 1 (e.g., 500,000 predictors). This has a limited impact on statistical power, but will greatly reduce runtime. Note that you should continue to use all predictors in Step 2.

You may already have a suitable subset of predictors (e.g., you may have a list of directly-genotyped SNPs, or those passing stringent quality control). Otherwise, we you can obtain a SNP subset for LDAK-KVIK step 1 by performing a moderate thinning of the common predictors (e.g., if analyzing SNP data, we suggest identifying SNPs with MAF > 0.01, then filtering so there are no predictors within 100kb with squared correlation above 0.5).

To restrict to fewer SNPs in Step 1 and speed up the run time, we recommend running `--thin-common` prior to LDAK-KVIK Step 1:

```
./ldak6.linux --thin-common thin --bfile data --max-threads 4
```
This function identifies SNPs with MAF > 0.01, that have been filtered so there are no SNPs within 100kb that have a squared correlation above 0.5. It is then possible to restrict to the resulting SNPs using the `--extract` flag in LDAK-KVIK Step 1:
```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --extract thin.in --max-threads 4
```
The next steps of LDAK-KVIK can be done as usual, without the `--extract` flag.

---

Alternatively, to restrict to directly genotyped SNPs in step 1 of LDAK-KVIK, the user can create a list of directly genotyped SNP IDs. It is then possible to restrict to these SNPs in step 1 using the `--extract` flag:
```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --extract <snpfile> --max-threads 4
```

Step 2 and step 3 can subsequently be run without the `--extract` flag, to include all SNPs for single-SNP association analysis and gene-based association analysis.

**Please note** that although it is beneficial to restrict to a smaller genotype data set (such as directly genotyped SNPs) in LDAK-KVIK Step 1, it is not beneficial to further reduce the number of SNPs used in Step 1. We found that using 500k - 1M SNPs in LDAK-KVIK Step 1 offers a good statistical power while maintaining high computational efficiency.  Meanwhile, further reducion of the number of Step 1 SNPs results in a noticeable reduction in detection power, and thus we advise against this approach.

## Genotype data format

LDAK accepts genotype data of both `.bed` format (using flag `--bfile`) and `.bgen` format (using flag `--bgen` and `--sample`), however, LDAK processes `.bed` files faster than `.bgen` files due to simpler genotype coding. To optimize LDAK-KVIK run time, it is therefore beneficial to convert `.bgen` files to `.bed` files prior to GWAS analyses. Although converting `.bgen` files to `.bed` files loses part of the genotype information (hardcoding dosage values), we find that the resulting outcomes are highly similar. 

## Parallelization

When running LDAK-KVIK, the user has the option to specify the number of threads. This facilitates the parallel run of parts of the LDAK-KVIK algorithm and decreases run time. For optimal implementation of LDAK-KVIK, the user should select the available number of threads in `--num-threads`.

For example, if the user has 16 threads available, it is best to run LDAK-KVIK using the command:
```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 16
```

## Analysing multiple phenotypes

LDAK-KVIK can analyse multiple phenotypes simultaneously. The input phenotype file should contain the FIDs and IIDs in the first two columns, followed by their phenotypic values. For example:
```
FID IID Pheno1 Pheno2 Pheno3
1 1 0.25 25 14
2 2 0.42 12 2
3 3 0.32 36 38
...
```

In case one of the phenotypes should analysed, the user can specify the phenotype using the `--mpheno` flag. For example, `--mpheno 3` indicates that the third phenotype of the phenotype should be analysed.

It is also possible to simultaneously analyse all phenotypes in step 1 by adding `--mpheno ALL`. This feature reduces the total computational demands, and is recommended when analysing multiple phenotypes. An example command line for analysing multiple phenotypes is:

```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --mpheno ALL --max-threads 4
```

The single-SNP analysis and gene-based analysis in step 2 and step 3 cannot be run simultaneously for all phenotypes, and should be performed for seperately. For example, when analysing 10 phenotypes, this can be achieved by running using a for loop:

```
for i in {1..10}; do
  ./ldak6.linux --linear kvik.pheno${i} --bfile data --phenofile phenofile --covar covfile --mpheno ${i} --PRS kvik.step1.pheno${i} --max-threads 4
done
```

The resulting summary statistics will be saved in `kvik.pheno1.assoc`, `kvik.pheno2.assoc`, etc.

## Analysing small sample sizes

Although LDAK-KVIK is primarily tested on data sets of size > 50,000, it can validly be applied to smaller data sets. It should be noted that when analysing smaller data sets, there is likely a smaller benefit from using mixed-model association analysis. This is, because it is harder to construct accurate LOCO PRS in Step 1 and thus there is a lower benefit in statistical power (see [Campos et al.](https://www.nature.com/articles/s41588-023-01500-0)). However, in smaller data sets with high degrees of relatedness, LDAK-KVIK still offers control of type 1 error (which would be inflated using classical regression). When analysing binary traits, it is still useful to apply the saddlepoint approximation to overcome inflation due to case:control imbalance. 

It is also possible to run classical linear regression in LDAK using the command lines:

```
./ldak6.linux --linear kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
```

Logistic regression can be run using:

```
./ldak6.linux --logistic kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
```
This performs logistic regression using a [saddlepoint approximation](/docs/assoc/spa) by default.

