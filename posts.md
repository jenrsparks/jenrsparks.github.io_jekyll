---
title: Posts
layout: page
---

{%- for category in site.categories -%}
  {%- capture category_name %}{{ category | first }}{% endcapture -%}
  <h2>{{ category_name | capitalize }}</h2>
  <ul>
  {%- assign postlist = site.categories[category_name] | sort: 'date' | reverse -%}
  {%- for post in postlist -%}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> <sub>{{ post.date | date: "%b %-d '%y" }}</sub>
    </li>
  {%- endfor -%}
  </ul>
{%- endfor -%}
