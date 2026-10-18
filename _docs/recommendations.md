---
title: Recommendations
description: Recommendations for running LDAK-KVIK
---

# Recommendations

Below, we list some recommendations for running LDAK-KVIK:


- [Analysing imputed data](#analysing-imputed-data)  
- [Genotype data format](#genotype-data-format)  
- [Parallelisation](#parallelisation)  
- [Analysing multiple phenotypes](#analysing-multiple-phenotypes)  
- [Analysing small sample sizes](#analysing-small-sample-sizes)  

### Analysing imputed data

Step 1 of LDAK-KVIK can be slow when there are very many predictors. Therefore, if your dataset contains over one million predictors, we recommend you only use a subset of these in Step 1 (e.g., 500,000 predictors). This has a limited impact on statistical power, but will greatly reduce runtime. Note that you should continue to use all predictors in Step 2 for association analysis.

You may already have a suitable subset of predictors (e.g., you may have a list of directly-genotyped SNPs, or those passing stringent quality control). Otherwise, you can obtain a SNP subset for LDAK-KVIK step 1 by performing a moderate thinning of the common predictors (e.g., if analysing SNP data, we suggest identifying SNPs with MAF > 0.01, then filtering so there are no predictors within 100kb with squared correlation above 0.5).

To restrict to fewer SNPs in Step 1 and speed up the run time, we recommend running `--thin-common` prior to LDAK-KVIK Step 1:

```
./{{ site.ldak_linux }} --thin-common thin --bfile data --max-threads 4
```
This function identifies SNPs with MAF > 0.01, that have been filtered so there are no SNPs within 100kb that have a squared correlation above 0.5. The resulting SNPs can be used in LDAK-KVIK Step 1 by adding the `--extract` flag:
```
./{{ site.ldak_linux }} --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --extract thin.in --max-threads 4
```
The next steps of LDAK-KVIK can be done as usual, without the `--extract` flag.

#### Data divided by chromosome

Large datasets (e.g., imputed biobank data) are often stored as separate bed/bim/fam files for each chromosome. Note that `--mbfile` can not be used with `--thin-common` (or with most other LDAK commands, except when making data). Instead, run `--thin-common` for each chromosome separately, extract the thinned SNPs for each chromosome, then merge these across chromosomes:
```
for j in {1..22}; do
./{{ site.ldak_linux }} --thin-common thin$j --bfile chr$j --max-threads 4
./{{ site.ldak_linux }} --make-bed subset$j --bfile chr$j --extract thin$j.in
done

for j in {1..22}; do echo subset$j; done > list.txt
./{{ site.ldak_linux }} --make-bed subset --mbfile list.txt
```
The merged (thinned) data can then be used in LDAK-KVIK Step 1, while Step 2 is run using the full per-chromosome data. **Please note** that in Step 2 you must add `--chr`, otherwise LDAK will write the results for all chromosomes to the same output file:
```
./{{ site.ldak_linux }} --kvik-step1 kvik --bfile subset --pheno phenofile --covar covfile --max-threads 4

for j in {1..22}; do
./{{ site.ldak_linux }} --kvik-step2 kvik --bfile chr$j --pheno phenofile --covar covfile --chr $j --max-threads 4
done
```
This creates chromosome-specific results with prefix `kvik.step2.chr<j>`. A worked example (using simulated data) is available as Example 5 on [dougspeed.com/ldak-kvik](https://dougspeed.com/ldak-kvik/).

---

Alternatively, to restrict to directly genotyped SNPs in step 1 of LDAK-KVIK, the user can create a list of directly genotyped SNP IDs. It is then possible to restrict to these SNPs in step 1 using the `--extract` flag:
```
./{{ site.ldak_linux }} --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --extract <snpfile> --max-threads 4
```

Step 2 and step 3 can subsequently be run without the `--extract` flag, to include all SNPs for single-SNP association analysis and gene-based association analysis.

**Please note** that although it is beneficial to restrict to a smaller genotype data set (such as directly genotyped SNPs) in LDAK-KVIK Step 1, it is not beneficial to further reduce the number of SNPs used in Step 1. We found that using 500k–1M SNPs in LDAK-KVIK Step 1 provides good statistical power while maintaining high computational efficiency, whereas using fewer SNPs noticeably reduces power, so we advise against this.

### Genotype data format

LDAK accepts genotype data of both `.bed` format (using flag `--bfile`) and `.bgen` format (using flag `--bgen` and `--sample`), although LDAK processes `.bed` files faster than `.bgen` files due to their simpler genotype coding. To optimise LDAK-KVIK run time, it is therefore beneficial to convert `.bgen` files to `.bed` files prior to GWAS analyses. Although converting `.bgen` files to `.bed` files loses part of the genotype information (hardcoding dosage values), we find that the resulting outcomes are highly similar. 

### Parallelisation

When running LDAK-KVIK, the user has the option to specify the number of threads. This allows parts of the algorithm to run in parallel, reducing run time. For best performance, set `--max-threads` to the number of available threads.

For example, if the user has 16 threads available, it is best to run LDAK-KVIK using the command:
```
./{{ site.ldak_linux }} --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 16
```

However, please note that the performance improvement of LDAK-KVIK by using multiple threads is limited. When using cloud-based analyses such as the UKB-RAP, where additional costs are incurred when using more threads, we recommend using 4 or fewer threads.

### Analysing multiple phenotypes

LDAK-KVIK can analyse multiple phenotypes simultaneously. The input phenotype file should contain the FIDs and IIDs in the first two columns, followed by their phenotypic values. For example:
```
FID IID Pheno1 Pheno2 Pheno3
1 1 0.25 25 14
2 2 0.42 12 2
3 3 0.32 36 38
...
```

To analyse a single phenotype, specify it using the `--mpheno` flag. For example, `--mpheno 3` indicates that the third phenotype in the phenotype file should be analysed.

It is also possible to analyse all phenotypes simultaneously by adding `--mpheno ALL`. This feature reduces the total computational demands, and is recommended when analysing multiple phenotypes. Example command lines for analysing multiple phenotypes are:

```
./{{ site.ldak_linux }} --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --mpheno ALL --max-threads 4
./{{ site.ldak_linux }} --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile --mpheno ALL --max-threads 4
```
The resulting summary statistics will be saved in `kvik.step2.pheno1.assoc`, `kvik.step2.pheno2.assoc`, etc.

**Please note** that the gene-based analysis in step 3 cannot be run simultaneously for all phenotypes, and should be performed separately for each phenotype. For example, when analysing 10 phenotypes, this can be done using a for loop:

```
for i in {1..10}; do
  ./{{ site.ldak_linux }} --cut-genes kvik_gbat_${i} --bfile data --genefile RefSeq_GRCh38.txt --max-threads 4
  ./{{ site.ldak_linux }} --calc-genes-reml kvik_gbat_${i} --bfile data --summary kvik.step2.pheno${i}.summaries --power -0.25 --max-threads 4 --allow-ambiguous YES
  ./{{ site.ldak_linux }} --join-genes-reml kvik_gbat_${i}
done
```
The gene-based summary statistics are then saved in the files `kvik_gbat_${i}/remls.all`.

### Analysing small sample sizes

Although LDAK-KVIK has primarily been tested on datasets with more than 50,000 individuals, it can also be applied to smaller datasets. Note that the benefit of mixed-model association analysis is likely to be smaller for smaller datasets, because it is harder to construct accurate LOCO PRS in Step 1 and thus there is a lower benefit in statistical power (see [Campos et al.](https://www.nature.com/articles/s41588-023-01500-0)). However, in smaller datasets with high degrees of relatedness, LDAK-KVIK still offers control of type 1 error (which would be inflated using classical regression). When analysing binary traits, it is still useful to apply the saddlepoint approximation to overcome inflation due to case:control imbalance. 

It is also possible to run classical linear regression in LDAK using the command lines:

```
./{{ site.ldak_linux }} --linear kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
```

Logistic regression can be run using:

```
./{{ site.ldak_linux }} --logistic kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
```
This performs logistic regression using a [saddlepoint approximation](/docs/assoc/spa) by default.

