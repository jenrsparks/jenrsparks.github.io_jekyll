---
title: Categories
layout: page
---

{% for category in site.categories %}
<h2 class="cat-list">{{ category | first | capitalize }}</h2>
{% for posts in category %}
{% for post in posts | sort: 'date' %}
{% if post.url %}
{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
{% if forloop.first %}
<h3 class="cat-year">{{this_year}}</h3>
<ul class="cat-year-items">
{% endif %}
<li class="cat-year-item">{{ post.date | date: "%m/%d"}} - <a href="{{ post.url }}">{{ post.title }}</a></li>

{% if forloop.last %}
</ul>
{% elsif this_year != next_year %}
</ul>
<h3 id="cat-year">{{next_year}}</h3>
<ul class="cat-year-items">

{% endif %}

{% endif %}

{% endfor %}
{% endfor %}
{% endfor %}
