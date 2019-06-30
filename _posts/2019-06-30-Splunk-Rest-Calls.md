---
layout: post
title: Splunk REST Calls in Search
categories: [splunk]
date: 2019-06-30 12:00:00
excerpt_separator: <!--more-->
---

The Splunk REST API is a powerful thing. You can even call it in your searches using `| rest [path]` and get back Splunk data. But what if you want to get dynamic details back, or call several endpoints, without knowing the exact URIs? Turns out, there's a *very* awesome way to do this.

<!--more-->

Let's say we want to get all the alerts fired on record. `/servicesNS/alerts/fired_alerts` can provide a list of the alerts that have had events, but not the details of those events, such as times or the actions associated with the alert. So starting out with the `fired_alerts` endpoint, we'll use the following to get all alerts that belong to someone with 'sparks' in their username:

```
| rest /servicesNS/alerts/fired_alerts
| where match(author, "sparks")
| fields title author link
```

Resulting in the following table output, since behind-the-scenes Splunk turns the REST response into a table:

|title|author|link|
|-----|------|----|
|test-alert|jsparks|/servicesNS/admin/search/alerts/fired_alerts/test-alert|
|test-2|sparksma|/servicesNS/admin/search/alerts/fired_alerts/test-2|

*Caveat: I'm only showing a couple of fields here; you can find all of them at the REST API Documentation for [fired_alerts](https://docs.splunk.com/Documentation/Splunk/7.3.0/RESTREF/RESTsearch#alerts.2Ffired_alerts).*

Notice the `link` column? This is huge; this means we now know the REST API endpoint for that specific alert, and moreover every alert listed in the response body. So how can we make a call to the results of one search to get the contents of the next?

This is where the [map](https://docs.splunk.com/Documentation/Splunk/7.3.0/SearchReference/Map) command comes into play. The `map` command lets us build a subsearch for *each row* in the table we already have, meaning that here we can iterate through the various alert entries and get their details back.

So if we add the `map` command, here's how we can get each of the detailed records back:

```
| rest /servicesNS/alerts/fired_alerts
| where match(author, "sparks")
| map search="| rest $link$"
| fields savedsearch_name actions sid 
```

What we're really doing here is executing a command that says, for each resulting entry listed in the fired alerts, call the `alerts/fired_alerts/{name}` endpoint and get me the details.

**Important:** The results that come back are *only* the detail records; those first records we had have been lost in the mapping process.

|savedsearch_name|actions|sid|
|test-alert|email|rt_scheduler__admin__search__test-alert_at_1351181001_5.31|
|test-2|email,webhook|rt_scheduler__admin__search__test-2_at_1351181023_6.19|
|test-alert|email|rt_scheduler__admin__search__test-alert_at_1351181009_7.42|

It's worth noting that there are some limitations; map cannot be used after an `append` command, and it defaults to only making a max of 10 calls (thought this is configurable). As always, I strongly recommend checking out the documentation to understand exactly what you're working with and how to fine tune each command. Additional details can be found at the [fired alerts details](https://docs.splunk.com/Documentation/Splunk/7.3.0/RESTREF/RESTsearch#alerts.2Ffired_alerts.2F.7Bname.7D) documentation.

The implications of this functionality are pretty fantastic. For this scenario alone, I can build a dashboard, for instance, that lets me see the details of all of the triggered alerts that Splunk has historically (24 hours by default). Or I can build an alert that sends a page if we've had a certain number of alerts triggered overall in a certain period of time. The variances are limited only by the use cases you can think of.

On top of that, if you're using a search API call to get your results, this expands the capabilities of manipulation and server-side processing. The cost of making several API calls for sets of results, especially if your Splunk server is somewhere quite remote or you're trying to minimize network traffic, can really be reduced. Assuming your Splunk instance can take more load, you're actually reducing the load on your local process and shifting it upstream. (Of course, depending on how you do this, your Splunk server admins might have something to say about it.)

I've got a few places where this is going to help streamline some of my processing, taking me from ~20+ API calls down to 2. Sure, the load is shifted and not necessarily removed, but in my case, that makes a huge difference in performance. After all, Splunk is very good at handling its own API calls and turning them into something useable.