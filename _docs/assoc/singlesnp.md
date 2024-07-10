---
title: Single-SNP analysis
description: Single-SNP analysis
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
## **Overview of LDAK-KVIK**

**LDAK-KVIK** has two steps when used for single-SNP association analysis, and three steps when used for both single-SNP and gene-based association analysis. These steps should be run consecutively; each next step is dependent on the results of the previous step. 

Below, we describe the LDAK-KVIK algorithm for each step, and detail the input options.

---

**Step 1.** Construct LOCO PRS and estimate $$\lambda$$
   1. Test for structure
   2. Estimate $$\alpha$$ and $$h^2_j$$ using partitioned randomized Haseman-Elston Regression
   3. Revise the estimates of $$h^2_j$$ using Monte Carlo REML
   4. Determine suitable elastic net hyperparameters via cross-validation
   5. Contruct LOCO PRS and estimate $$\lambda$$

**Step 2.** Single-SNP association analysis
   1. Calculate uncalibrated test statistics
   2. Scale test statistics

**Step 3.** Gene-based association analysis
   1. Run LDAK-GBAT using results from single-SNP association analysis 

---

First we describe each operation in turn, then we explain some implementation details. As a reminder, all regressions use residual genotypes and phenotypes, because this removes the need to include the covariate matrix Z (see Supplementary Note 3 for a justification). The residual phenotypes (genotypes) are obtained by computing $$Y = HY^{\top} (X = HX^{\top})$$, where $$H = I − Z(Z^{\top}Z)^{−1}Z^{\top}$$, then scaling Y (columns of X) to have variance one.

---

# Step 1

An example command line of Step 1 in LDAK-KVIK is given by:

```
./ldak6.linux --kvik-step1 kvik --bfile data --pheno phenofile --covar covfile --max-threads 2
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

When analysing binary traits, the user should add `--binary YES` to the command. All operations in Step 1 will then be based on weighted linear regression, instead of linear regression. When analysing imputed data, it is not necessary to include all SNPs in Step 1. To reduce computational time, it is possible to run Step 1 with all directly genotyped SNPs, which typically yields a similar PRS accuracy compared to all SNPs. A more extensive list of options can be found in [Data Filtering](/docs/input#filtering)

---

**Operation 1a - Test for structure.**

This test is fully described in the Online Methods of the LDAK-KVIK publication. In brief, LDAK-KVIK picks 512 SNPs semi-randomly from across the genome, then computes $$\bar \rho^2$$, the average squared correlation between pairs of SNPs on different chromosomes. LDAK-KVIK determines there is strong structure if both $$\bar \rho^2$$ is significantly greater than $$1/(n-1)$$, its expectation when the data are homogeneous, and $$n \bar \rho^2>0.1$$ (the latter is considered an estimate of the maximum average inflation of test statistics due to structure).

---

**Operation 1b - Estimate $$\alpha$$ and $$h^2_j$$ using partitioned randomized Haseman-Elston Regression.**  

LDAK-KVIK obtains $$\hat \alpha$$ and $$\hat h^2$$, estimates of the power parameter and heritability parameter, respectively, by running randomized Haseman-Elston Regression. LDAK-KVIK considers five different values for $$\alpha$$ (-1, -0.75, -0.5, -0.25, 0), then sets $$\hat \alpha$$ to the value that results in best-fitting covariance matrix, and sets $$\hat h^2$$ to the corresponding estimate of $$h^2$$. LDAK-KVIK then obtains $$\hat h^2_j$$, estimates of the per-SNP heritabilties, by setting $$\hat h^2_j = w_j \hat h^2/W$$, where $$w_j=[f_j (1-f_j)]^{1+\hat \alpha}$$.

---

**Operation 1c - Operation 1c - Revise the estimates of $$h^2_j$$ using Monte Carlo REML.**  

LDAK-KVIK computes the REML estimate of $$h^2$$ by iteratively solving equations involving the heritability estimate, covariance matrix and phenotype (see Supplemenatary for more details). The Haseman-Elston estimate of $$h^2$$ is used in the first iteration, and updated until converged to an approximate solution of the system of equations. Finally, LDAK-KVIK recomputes the estimates of $$h^2_j$$ using the revised estimate of $$h^2$$ (continuing to use the estimate of $$\alpha$$ from randomized Haseman-Elston Regression)

---

**Operation 1d - Determine suitable elastic net hyperparameters via cross-validation** 

Note that LDAK-KVIK only performs this step in case Operation 1a found weak structure. When constructing Elastic Net PRS, LDAK-KVIK assumes

$$
\gamma_j \sim p DE\left ( \left[\frac{2p}{(1-F)\hat h^2_j} \right ]^{0.5} \right ) + (1-p)N\left(0,\frac{F\hat h^2_j}{1-p}\right )~~~~ \mbox{and} ~~~~ e\sim N(0,1-\hat h^2).
$$

In the prior distribution for SNP effect sizes, the parameter $$p$$ determines the contribution of the lasso component, while the parameter $$F$$ determines the expected contribution to variance from the ridge regression component. Note that this prior distribution is constructed so that $$E[h^2_j]=\hat h^2_j$$ (i.e., the expected per-SNP heritabilities match their estimates from Operation 1c).

LDAK-KVIK uses cross-validation to obtain suitable values for $$p$$ and $$F$$. By default, it uses 90% of individuals to construct ten genome-wide PRS, for $$(p,F)$$ equal to (0.5,0.5), (0.5,0.3), (0.5,0.1), (0.1,0.5), (0.1,0.3), (0.1,0.1), (0.01,0.5), (0.01,0.3), (0.01,0.1) and (0,1). It then measures the accuracy of these PRS on the remaining 10% of individuals, selecting the values for $$p$$ and $$F$$ that result in the PRS with smallest mean-squared error. Note that if $$MSE$$ denotes the smallest mean-squared error, then LDAK-KVIK uses $$n/MSE$$ as an estimate of the effective sample size for the final association analysis (recall that $$Var(Y)=1$$, so $$1/MSE$$ estimates the reduction in phenotypic variance when using the LOCO Elastic Net PRS as offsets).

---

**Operation 1e - Construct LOCO PRS and estimate $\lambda$.**

The type of PRS and value of $$\lambda$$ depend on the outcome of the test for structure in Operation 1a. In case the test found only weak structure, LDAK-KVIK constructs $$P_c$$, the $$c$$th LOCO PRS, assuming the Elastic Net prior distribution for SNP effect sizes defined in Ooeration 1d, with $$p$$ and $$F$$ set to the best-fitting values. LDAK-KVIK sets $$\lambda=1$$. If the test in Operation 1a found strong structure, LDAK-KVAK instead constructs $P_c$ assuming the Ridge Regression prior distribution $$\gamma_j \sim N (0, \hat h^2_j)$$, then estimates $$\lambda$$ using the Grammar-Gamma Formula (using, by default, 20 randomly-picked SNPs).

---

# Step 2

An example command line of Step 2 in LDAK-KVIK is given by:

```
./ldak6.linux --kvik-step2 kvik --bfile data --pheno phenofile --covar covfile
```

This input options are as follows:

| Argument |  Description | 
|------------|--------|
|`--kvik-step2`    | Name of the output files of Step 2   |
|`--bfile`   | Name of the .bed file to be analyzed      |
|`--pheno`   | Name of the phenotype file      |
|`--covar`   | Name of the covariate file     |

Note that the input argument of `--kvik-step2` (in this case, 'kvik') should match the argument previously used in `--kvik-step1`. In case the `--binary YES` flag is used in Step 1, this will automatically be used in Step 2, and a [saddlepoint approximation](/docs/assoc/spa) will be used for association analysis. Note that Step 2 can only be run after Step1 has been run. More options for can be found in [Data Filtering](/docs/input#filtering)

---

**Operation 2a - Calculate uncalibrated test statistics.** 

If SNP $$j$$ lies on Chromosome $$c$$, then LDAK-KVIK tests for association using ordinary least-squares regression with the model $$E[Y-P_c]=  X_j \beta_j$$, where $$P_c$$ is the LOCO PRS constructed in Operation 1e. The estimated effect size is

$$\hat \beta_j = \frac{X^T_j (Y-P_c)}{X^T_jX_j},$$

with estimated variance 

$$Var(\hat \beta_j) = \frac{\hat s^2}{X^T_jX_j} ~~~~ \mbox{where} ~~~~ \hat s^2= \frac{(Y-P_c)^T(Y-P_c)}{n-q},$$

and the corresponding $$\chi^2(1)$$ test statistic is 

$$U_j = \frac{(X^T_j (Y-P_c))^2}{X^T_jX_j \times \hat s^2}.$$

---

**Operation 2a - Calculate uncalibrated test statistics.** 

If SNP $$j$$ lies on Chromosome $$c$$, then LDAK-KVIK tests for association using ordinary least-squares regression with the model $$E[Y-P_c]=  X_j \beta_j$$, where $$P_c$$ is the LOCO PRS constructed in Operation 1e. The estimated effect size is

$$\hat \beta_j = \frac{X^T_j (Y-P_c)}{X^T_jX_j},$$

with estimated variance 

$$Var(\hat \beta_j) = \frac{\hat s^2}{X^T_jX_j} ~~~~ \mbox{where} ~~~~ \hat s^2= \frac{(Y-P_c)^T(Y-P_c)}{n-q},$$

and the corresponding $$\chi^2(1)$$ test statistic is 

$$U_j = \frac{(X^T_j (Y-P_c))^2}{X^T_jX_j \times \hat s^2}.$$

---

**Operation 2b - Scale test statistics.**

LDAK-KVIK reports three values for each SNP: an effect size estimate $$\epsilon_1$$, an estimate of the variance of the effect size estimate $$\epsilon_2$$, and a $$\chi^2(1)$$ test statistic $$\epsilon_3$$. LDAK-KVIK sets $$\epsilon_1 =\lambda \hat \beta_j$$ and $$\epsilon_3=\lambda U_j$$, where $$\hat \beta_j$$ and $$U_j$$ are, respectively, the estimated effect size and test statistic calculated in Operation 2a, while $$\lambda$$ is the estimated scaling factor from Operation 1e. LDAK-KVIK then sets $$\epsilon_2=\epsilon_1^2/\epsilon_3$$, which ensures that the three reported values are consistent (i.e., that $$\epsilon_3=\epsilon_1^2/\epsilon_2$$).

---

# Step 3

```
./ldak6.linux --kvik-step3 kvik --bfile data --annot <annotfile>
```

**Operation 3a - Run LDAK-GBAT using the results from single-SNP association analysis.** 

LDAK-GBAT requires four inputs, a file containing gene annotations, a value for $$\alpha$$, GWAS summary statistics, and a reference panel. The gene annotations must be provided by the user (if analyzing human data, the user can download annotations from \url{www.dougspeed.com/resources}). LDAK-KVIK uses the estimate of $$\alpha$$ from Operation 1b and the summary statistics from Operation 2b. Finally, LDAK-KVIK randomly picks 5000 of the $$n$$ individuals, and uses their genotypes as an (in-sample) reference panel.\\