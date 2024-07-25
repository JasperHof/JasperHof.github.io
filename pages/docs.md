---
layout: page
title: Getting started
permalink: /docs/
---

# Getting started 

The menu on the left lists several relevant topics for successfully running LDAK-KVIK. After [downloading](/docs/downloads) LDAK, it is possible to prepare your data using the [input options](/docs/input). The command lines used to run LDAK-KVIK are included in the [example code](/docs/example) page. The [example code](/docs/example) page also includes command lines for generating fake genotype and phenotype data, and demonstrates how these can be used to run LDAK-KVIK.

 A summary of the LDAK-KVIK algorithm is included in the [steps](/docs/assoc/singlesnp) of LDAK-KVIK, and the performance of LDAK-KVIK is showcased in [performance](/docs/performance/) page. It is possible to directly jump to a topic using search bar or the menu below. In case you have any questions regarding LDAK-KVIK or the LDAK software, please create an issue on the [LDAK GitHub page](https://github.com/dougspeed/LDAK/issues).

<div class="section-index">
    <hr class="panel-line">
    {% for post in site.docs  %}        
    <div class="entry">
    <h5><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h5>
    <p>{{ post.description }}</p>
    </div>{% endfor %}
</div>
