---
title: Performance
description: Performance of LDAK-KVIK
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Performance of LDAK-KVIK

We evaluated **LDAK-KVIK** in terms of computational cost, statistical power and type 1 error, using both simulated data and real data from the UK Biobank. A complete description of these analyses is provided in the [LDAK-KVIK publication](https://www.nature.com/articles/s41588-025-02286-z).

<a id="runtime"></a>

## Biobank-scale simulation

To illustrate the performance of LDAK-KVIK at the scale of current biobanks, we simulated a dataset matching the size of the directly genotyped data in [Our Future Health](https://ourfuturehealth.org.uk): 755,000 individuals and 659,000 SNPs. We then generated ten quantitative phenotypes, each with SNP heritability 0.3 and 1,000 causal SNPs (with power parameter -0.25, so that common SNPs tend to have larger effect sizes), and analysed each phenotype using LDAK-KVIK, REGENIE and classical linear regression. The script used to run this simulation is available on the [LDAK GitHub](https://github.com/dougspeed/LDAK/blob/main/Resources/simulate_ofh).

<img class="zoomable" title="LDAK-KVIK vs REGENIE in Our Future Health-scale data" alt="Power, runtime and memory of LDAK-KVIK and REGENIE for 755,000 individuals and 659,000 SNPs" src="/assets/img/ofh_kvik_regenie.jpg" style="display: block; margin: 0 auto; width: 900px; max-width: 100%">

We measured power as the mean $$\chi^2(1)$$ test statistic at the causal SNPs (left panel; each point is one phenotype). Relative to linear regression, LDAK-KVIK increased the mean test statistic by 38.9%, compared to 18.1% for REGENIE. LDAK-KVIK also required roughly seven times less memory than REGENIE (approximately 8 GB, compared to 52 GB), while the run times of the two tools were similar (on average, approximately 5.4 hours for LDAK-KVIK and 4.4 hours for REGENIE).

<a id="ukbb"></a>

## Application to UK Biobank

### Single-SNP analysis

We applied LDAK-KVIK to 40 quantitative traits from the UK Biobank, and compared its performance to that of BOLT-LMM, REGENIE, fastGWA and classical linear regression. For each trait, we counted the number of independent significant loci found by each method, relative to the number found by fastGWA (left panel). We also compared the mean $$\chi^2(1)$$ test statistics of SNPs that were significant in linear regression, again relative to fastGWA (right panel). Both relative differences are plotted against the estimated SNP heritability of the trait.

<img class="zoomable" title="UK Biobank application - single SNP" alt="UK Biobank application single SNP" src="/assets/img/ukbb_power_poster_with_bolt-1.png" style="display: block; margin: 0 auto; width: 900px; max-width: 100%">

On average, LDAK-KVIK found 17.9% more significant loci than fastGWA, compared to 17.6% for BOLT-LMM and 13.5% for REGENIE. The right panel shows that the ranking of methods is similar when comparing the test statistics of SNPs significant in linear regression.

### Gene-based analysis

We applied the gene-based analysis of LDAK-KVIK (LDAK-KVIK-GBAT) to 40 quantitative and 20 binary traits from the UK Biobank, and compared its performance to that of LDAK-GBAT.

<img class="zoomable" title="UK Biobank application - gene-based" alt="UK Biobank application gene-based" src="/assets/img/gene_based.png" style="display: block; margin: 0 auto; width: 500px; max-width: 100%">

For quantitative traits, LDAK-KVIK-GBAT found on average 18.4% more significant genes than LDAK-GBAT. For binary traits, the two methods found a similar number of significant genes, reflecting that the power gain from mixed-model association analysis is smaller for binary traits.

<a id="sim"></a>

## Simulation study

We simulated quantitative and binary phenotypes using three datasets:
   - 'Homogeneous' dataset (63,000 unrelated White British individuals)
   - 'Family' dataset (63,000 White British individuals, half of whom have a first-degree relative in the dataset)
   - 'Twins' dataset (constructed by duplicating the genotypes of 31,500 individuals from the homogeneous dataset)

Phenotypes were generated with SNP heritability 0.2 or 0.5 and with 5,000 or 20,000 causal SNPs, with ten replicates for each scenario. For binary traits, we also varied the prevalence (10% and 1%). Causal SNPs were randomly selected from the start of each chromosome, while SNPs located at the end of each chromosome served as null SNPs for evaluating type 1 error.

### Type 1 error

For each scenario, we evaluated type 1 error using the mean $$\chi^2(1)$$ test statistic of null SNPs, and the proportion of null SNPs with P values below 0.05, 0.001 and 0.00005.

<img class="zoomable" title="Simulation study - type 1 error" alt="Simulation study type 1 error" src="/assets/img/kvik_typei-1.png" style="display: block; margin: 0 auto; width: 700px; max-width: 100%">

LDAK-KVIK controls type 1 error across all datasets and scenarios. For example, the highest mean test statistic of null SNPs (averaged across ten replicates) is 1.0049, which occurs when analysing quantitative phenotypes with heritability 0.5 and 20,000 causal SNPs in the homogeneous dataset (the tenth box in the first panel).

### Power

For quantitative traits, we compared the power of fastGWA, GCTA-LOCO, REGENIE, BOLT-LMM and LDAK-KVIK, measured as the mean $$\chi^2(1)$$ test statistic of causal SNPs.

<img class="zoomable" title="Simulation study - power" alt="Simulation study power" src="/assets/img/sim_power_quant-1.png" style="display: block; margin: 0 auto; width: 800px; max-width: 100%">

The symbols "*" and "+" indicate that a mixed-model association analysis (MMAA) tool showed significant deflation (mean test statistic below 0.98) or inflation (above 1.02), respectively, for the corresponding scenario.

Across all scenarios, LDAK-KVIK and BOLT-LMM are the two most powerful MMAA tools, followed by REGENIE and GCTA-LOCO, while fastGWA generally has the lowest power.

<script src="{{ '/assets/js/image-zoom.js' | relative_url }}"></script>
