---
layout: page
title: Getting started
permalink: /docs/
---

# Getting started 

The menu on the left lists several relevant topics for successfully running LDAK-KVIK. After [downloading](/docs/downloads) LDAK, it is possible to prepare your data using the [input options](/docs/input). If you do not (yet) have genotype or phenotype data available, it is still possible to try out LDAK-KVIK by generating your own data in [example code](/docs/example). A summary of the LDAK-KVIK algorithm is included in the [steps](/docs/assoc/singlesnp) of LDAK-KVIK, and the performance of LDAK-KVIK is showcased in [performance](/docs/performance/).


It is also possible to directly jump to a topic using the menu below. In case you have any questions regarding LDAK-KVIK or the LDAK software, feel free to contact [Doug Speed](mailto:doug@qgg.au.dk) (doug@qgg.au.dk).

<div class="section-index">
    <hr class="panel-line">
    {% for post in site.docs  %}        
    <div class="entry">
    <h5><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h5>
    <p>{{ post.description }}</p>
    </div>{% endfor %}
</div>
