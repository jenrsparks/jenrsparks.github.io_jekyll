---
layout: post
title: DevOps World | Jenkins World 2019
categories: [ci/cd]
date: 2019-08-18 13:48:00
excerpt_separator: <!--more-->
---

This week, I had the fortunate opportunity to attend DevOps World / Jenkins World. Cloudbees, the "headline sponsor," shaped the event with a couple of interesting announcements, and several technologies dominated the sessions Tuesday through Thursday.

<!--more-->

First and foremost: [Kubernetes](https://kubernetes.io/) is leading the game, and is now considered the de facto winner of the container wars (at least to date). For those folks who haven't made the move yet, this is step zero. Without it, one is not going to get so many of the gains that come from the rest of the tools, and ultimately is trailing too far behind to be considered relavent. This is one of those cases where it's time to catch up or become obsolete.

The next takeaway: we really are landing in a level of maturity wherein the tools can help us to start building our pipelines without needing to know the programmatic components. [Jenkins X](https://jenkins-x.io/) offers end to end pipeline generation, giving us a framework for CI/CD that plugs straight into our git system and providing GitOps and environment promotion baked right in. While built and touted for it's native Kubernetes integration, it turns out it has equal integration for non-K8S using a feature flag to swap over to classic support. Even if the project isn't quite ready to move to Kubernetes, it can at least make the jump to Jenkins X, using the classic buildpack, and work its way incrementally over to the newer technologies in time.

Of course, there are the sponsored products getting highlights that I'm excited to learn more about. Cloudbees has recently made some acquisitions, specifically [Electric Cloud](https://electric-cloud.com/) and [Rollout](https://rollout.io/). With these new features added to their portfolio, it was the perfect time to announce [Software Delivery Management](https://www.cloudbees.com/press/cloudbees-presents-software-delivery-management-sdm-vision-turning-software-delivery-core), or SDM for short. Mind you, it was [mentioned back in April 2019](https://www.cloudbees.com/blog/introducing-software-delivery-management), however the new tools that have been added have helped solidify the offering even more.

There's not a lot of clarity as to how it might integrate with the rest of your toolchain if you're working outside of the Cloudbees ecosystem. More likely than not, this is an angle to bring you all the way in - the appeal of an end to end offering to bring all of your processes into a unified experience, with a consoldiated data lake. When more information comes out, however, I'm hoping that we see a better integration available so that the rest of the best-in-class offerings are accepted as piecemeal connections into the unifying system.

The appearance of the [Continuous Delivery Foundation](https://cd.foundation/), or CDF, actually helps to encourage that exact culture of interoperability, letting the best-in-class tools thrive alongside each other. There's a lot of maturity in this industry to come, and I'm hopeful for it all.