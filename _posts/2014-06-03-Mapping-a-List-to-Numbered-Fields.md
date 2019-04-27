---
layout: default
title: Mapping a List to Numbered Fields
categories: java
excerpt_separator: <!--more-->
---

One of my oh-so-favorite (*cough*) things to do lately in Java has been mapping one type of object to another with no particular transformation. Among these has been the act of taking a list and shifting its contents into a series of fields, depending on how many items are availble in the list. It's been driving me nuts to consider using nested if statements, as such:

<!--more-->

{% highlight java %}
    ArbitraryTarget target = new ArbitraryObject();
    if(list.size() >= 3) {
        target.setItem3(list.get(2));
    }
    if(list.size() >= 2) {
        target.setItem2(list.get(1));
    }
    if(list.size() >= 1) {
        target.setItem1(list.get(0));
    }
{% endhighlight %}

I'm sorry, but this is ugly, dense, and generally gross. I needed another solution. It finally occurred to me while staring at the conditions that I could easily just leverage a switch statement; after all, all I was doing was considering an int value repeatedly. Let's see how we can do this a little more elegantly.

{% highlight java %}
    ArbitraryTarget target = new ArbitraryObject();
    int maxSize = NumberUtils.min(list.size(), 3, 3);

    switch(maxSize) {
    case 3:
        target.setItem3(list.get(2));
    case 2:
        target.setItem2(list.get(1));
    case 1:
        target.setItem1(list.get(0));
    }
{% endhighlight %}

Fortunately, I even have Apache Commons functionality to make it a tad bit cleaner, if a bit hackish for repeating `3` twice. I could just as easily have done a ternary statement:

{% highlight java %}
    int maxSize = list.size() >= 3 ? 3 : list.size();
{% endhighlight %}

It occurs to me that, while perhaps not as clean of a solution, this could be made to be infinitely scalable using reflection. Unfortunately, especially once we get into a higher number of fields (item256?!), there would likely be a performance hit, so it somehow seems prudent to back up and reconsider the design decision behind having numbered fields.
