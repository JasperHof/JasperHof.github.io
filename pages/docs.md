---
layout: page
title: Getting started
permalink: /docs/
---

# Getting started

Welcome to the LDAK-KVIK pages! We first describe how to install LDAK-KVIK and get the formatting of the data right.

<div class="section-index">
    <hr class="panel-line">
    {% for post in site.docs  %}        
    <div class="entry">
    <h5><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h5>
    <p>{{ post.description }}</p>
    </div>{% endfor %}
</div>
