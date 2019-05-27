---
layout: project
title: D&D Spells
custom_css: dnd_spells
custom_js: dnd_spells
---


{:.requirements}
- Data:
  - [ ] Populate spell data in dnd_spells.yaml
- Filter buttons:
  - [ ] Build the list based on the contents of the data file
  - [x] Limit or display classes, defaulted to on
  - [ ] Should only remove visibility of a card if *all* classes are hidden
- Cards:
  - [ ] Click to expand / collapse

{:.credits}
Shout-outs to the folks that created some awesome online resources that got me where I was going:
- [Create a responsive grid layout with no media queries, using CSS Grid](https://andy-bell.design/wrote/create-a-responsive-grid-layout-with-no-media-queries-using-css-grid/)
- [Checkbox Trickery with CSS](https://codersblock.com/blog/checkbox-trickery-with-css/)
- [List of Spells from D&D 5th Edition Wikia](https://dnd5e.fandom.com/wiki/List_of_Spells)

---

<input type="checkbox" class="filters" id="wizardFlag" onclick="showOrHide('Wizard')" checked="true"/><label for="wizardFlag" class="filters">Wizard</label>
<input type="checkbox" class="filters" id="druidFlag" onclick="showOrHide('Druid')" checked="true"/><label for="druidFlag" class="filters">Druid</label>
<input type="checkbox" class="filters" id="sorcererFlag" onclick="showOrHide('Sorcerer')" checked="true"/><label for="sorcererFlag" class="filters">Sorcerer</label>

<div class="wrapper">
  <div class="auto-grid">
    {%- for spell in site.data.spells_phb.spell -%}
      <div class="card" classlist="wizard" level="{{ spell.level }}">
        <h2 class="title">{{ spell.name }} <span class="type">({{ spell.school }})</span></h2>
<!--        <p>{{ spell.entries[0] }}</p> -->
        <p><b>Classes:</b>&nbsp;
          {%- for class in spell.classes.fromClassList -%}
            {{ class.name }}
            {%- if forloop.last == false -%},&nbsp;{%- endif -%}
          {%- endfor -%}
        </p>
        <p><b>Level:</b> {{ spell.level }}</p>
        <p>
        <b>Duration: </b>
        {%- if spell.duration[0].type == 'timed' -%}
          {{ spell.duration[0].duration.amount }} {{spell.duration[0].duration.type }}
        {%- else -%}
          {{ spell.duration[0].type }}
        {%- endif -%}
        
        </p>
        <p><b>Casting Time:</b> {{ spell.time[0].number }} {{ spell.time[0].unit }}</p>
      </div>
    {%- endfor -%}
  </div>
</div>
