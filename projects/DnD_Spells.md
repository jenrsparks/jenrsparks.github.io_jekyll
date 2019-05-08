---
layout: project
title: D&D Spells
custom_css: dnd_spells
custom_js: dnd_spells
---



{:.requirements}
- Filter buttons:
  - [ ] Build the list based on the contents of the data file
  - [x] Limit or display classes, defaulted to on
  - [ ] Should only remove visibility of a card if *all* classes are hidden
- Cards:
  - [ ] Click to expand / collapse

{:.credits}
Shout-outs to the folks that created some awesome online resources that got me where I was going:
- [Checkbox Trickery with CSS](https://codersblock.com/blog/checkbox-trickery-with-css/)

---

<input type="checkbox" class="filters" id="wizardFlag" onclick="showOrHide('Wizard')" checked="true"/><label for="wizardFlag" class="filters">Wizard</label>
<input type="checkbox" class="filters" id="druidFlag" onclick="showOrHide('Druid')" checked="true"/><label for="druidFlag" class="filters">Druid</label>
<input type="checkbox" class="filters" id="sorcererFlag" onclick="showOrHide('Sorcerer')" checked="true"/><label for="sorcererFlag" class="filters">Sorcerer</label>

<div class="wrapper">
  <div class="auto-grid">
  
    {%- for spell in site.data.DnD_Spells -%}
      <div class="card">
        <h2 class="title">{{ spell.name }} <span class="type">({{ spell.type }})</span></h2>
        <p>{{ spell.description }}</p>
        <p><b>Classes:</b> <span  class="classes">{{ spell.classes | sort | join: ', ' }}</span></p>
        <p><b>Level:</b> {{ spell.level }}</p>
        <p><b>Duration:</b> {{ spell.duration }}</p>
        <p><b>Casting Time:</b> {{ spell.casting-time }}</p>
        <p><b>Type:</b> {{ spell.type | capitalize }}</p>
        {%- if spell.type == "damage" -%}
        <p><b>Damage:</b> {{ spell.damage }} {{ spell.damage-type }}</p>
        {%- endif -%}
      </div>
    {%- endfor -%}
  </div>
</div>

