---
title: Recommendations
description: Recommendations for running LDAK-KVIK
---

# Recommendations

Below, we list some recommendations for running LDAK-KVIK. 

## Analysing imputed data

When analysing imputed data, it is often not necessary to include all SNPs in step 1 of LDAK-KVIK. For example,  including only directly genotyped SNPs reduces computational time, and often results in a similar PRS accuracy compared to when including all imputed SNPs.

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

It is also possible to simultaneously analyse all phenotypes in step 1 by adding `--mpheno ALL`. This feature reduces computational demands, and is recommended when analysing multiple phenotypes. An example command line for analysing multiple phenotypes is:

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

Although LDAK-KVIK is primarily tested on data sets of size > 50,000, it can validly be applied to smaller data sets. It should be noted that when analysing smaller data sets, there is likely a smaller benefit from using mixed-model association analysis, as it is harder to construct accurate LOCO PRS in Step 1 (see [Campos et al.](https://www.nature.com/articles/s41588-023-01500-0)). For binary traits, it is still useful to apply the saddlepoint approximation to overcome inflation due to case:control imbalance. 

It is possible to run classical linear regression using the command lines:

```
./ldak6.linux --linear kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
```

Logistic regression can be run using:

```
./ldak6.linux --logistic kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
```
This performs logistic regression using a [saddlepoint approximation](/docs/assoc/spa) by default.

