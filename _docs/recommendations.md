---
title: Recommendations
description: Recommendations for running LDAK-KVIK
---

# Recommendations

Below, we list some recommendations for running LDAK-KVIK. 

## Using imputed data

When analysing imputed data, it is often not necessary to include all SNPs in step 1 of LDAK-KVIK. There is often little to no gain in the accuracy of step 1 PRS when analysing all imputed SNPs compared to when analysing all directly genotyped SNPs. 

## Paralellization

When running LDAK-KVIK, the user has the option to specify the number of threads to facilitate parallel running of parts of the code. For optimal implementation of LDAK-KVIK, select the number of threads available in `--num-threads`.

For example, if the user has 4 threads available, it is best to run LDAK-KVIK using the command:
```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 4
```

Although LDAK-KVIK is primarily tested on data sets of size > 50,000, it is possible to apply LDAK-KVIK to smaller data sets. It should be noted that when analysing smaller data sets, there is likely a smaller power gain from using mixed-model association analysis, as it is harder to construct accurate LOCO PRS in Step 1 (see [Campos et al.](https://www.nature.com/articles/s41588-023-01500-0)). For binary traits, it is still useful to use the [saddlepoint approximation](docs/assoc/spa) to overcome inflation due to case:control imbalance. 