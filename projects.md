---
title: Projects
layout: page
---

{% comment %}
  The code below dynamically generates a sidebar nav of pages with
  `layout: project` in the front-matter. See readme for usage.
{% endcomment %}

<ul>
{%- assign pages_list = site.pages -%}
{%- for node in pages_list -%}
  {%- if node.title != null -%}
  {%- if node.layout == "project" -%}
    <li><a class="sidebar-nav-item{% if page.url == node.url %} active{% endif %}" href="{{ node.url }}">{{ node.title }}</a></li>
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}
</ul>
