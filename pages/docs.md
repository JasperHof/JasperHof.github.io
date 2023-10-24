---
layout: page
title: Getting started
permalink: /docs/
---

# Getting started

Welcome to the **LDAK-KVIK** pages! 

LDAK-KVIK is a method for mixed-model assocation analysis for genome-wide association studies. For more instructions about downloading, formatting, or running the assocation analysis, select a topic on the drop-down menu on the left.

It is also possible to directly jump to a topic. Use the search option, or select a topic from the menu below.

<div class="section-index">
    <hr class="panel-line">
    {% for post in site.docs  %}        
    <div class="entry">
    <h5><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h5>
    <p>{{ post.description }}</p>
    </div>{% endfor %}
</div>
