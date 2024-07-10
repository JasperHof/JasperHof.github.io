---
title: Overview of LDAK-KVIK
description: Overview of LDAK-KVIK
---

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Overview of LDAK-KVIK

LDAK-KVIK uses a two-step process to test SNPs for association with the phenotype. In Step 1, it computes Leave-One-Chromosome-Out (LOCO) predictors and, in case of high structure, a test statistic scaling factor. In Step 2, it regresses the phenotype on each SNP, including the corresponding LOCO predictor as offset. In case of high structure, the resulting test statistics are scaled. Here we summarize the two steps.

Suppose we have $$n$$ individuals genotyped for $$m$$ SNPs and recorded for a quantitative or binary phenotype. Let the $$n\times m$$ matrix $$X$$ contain the genotypes (coded $$0,1,2$$), let the $$n\times p$$ matrix $$Z$$ contain covariates, and let the length $$n$$ vector $$Y$$ contain the phenotypes.

## Constructing LOCO predictions

When constructing LOCO predictions for Chromosome $$c$$, we consider the linear model 

$$
E(Y_i) = Z_i \theta + \sum_{j=1}^{m}X_{i,j}\gamma_{j}.
$$

Note that we use a linear model, regardless of whether the phenotype is quantitative or binary. We estimate the $$\gamma_j$$ in a Bayesian fashion. First, we construct a likelihood by assuming the residuals are normally distributed:

$$
e_i = Y_i - Z_i \theta - \sum_{j=1}^{m}X_{i,j}\gamma_{j} \sim N(0, \sigma_j^2).
$$

We assume an elastic net prior distribution for each effect size $$\gamma_j \sim p\cdot DE + (1-p)N$$, where the first term corresponds to a lasso penalty on effect size, while the secont term corresponds to a ridge regression penalty.

The prior distribution of $$\gamma_j$$ has three free parameters $$(p, \lambda, \sigma^2)$$, which we specify by choosing values for $$p$$, $$h^2_{SNP}$$ and $$f_2$$ using cross-validation. The posterior distribution of $$\gamma_j$$ is obtained by multiplying the likelihood by the priors. Our estimate of $$\gamma_j$$ is $$\hat{\gamma_j}$$, the posterior mean of the effect size for SNP $$j$$, which is computed via Variational Bayes. The LOCO predictor of individual $$i$$ for Chromosome $$c$$ is then

$$
P_{c,i} = \sum_{SNP_j \notin Chr_c}^{m}X_{i,j}\hat{\gamma_j}.
$$

## Single-SNP analysis

Both quantitative and binary phenotypes are analysed using linear regression. When testing SNPs on Chromosome $$c$$ for association with the phenotype, we use the LOCO predictor $$P_c$$ as offset:

$$
Y_i - P_{c,i} = Z_i\theta + X_i\beta + e_i.
$$

When testing binary traits, it is also possible to apply a [saddlepoint approximation](/docs/assoc/spa).