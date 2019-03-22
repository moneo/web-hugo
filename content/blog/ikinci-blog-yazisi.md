---
title:  "İkinci Blog Yazısı"
date: 2018-12-02T01:24:48+03:00
tags: ["php", "mysql"]
categories: ["PHP", "Kategori"]
thumbnail: "https://picsum.photos/270/270/?random=31"
draft: false
author: "Mücahit Cücen"
type: "blog"
featured: secondary
---

_While effective bundling of resources on the web has received a great deal of mindshare in recent times, how we ship front-end resources to our users has remained pretty much the same. The average weight of JavaScript and style resources that a website ships with is rising — even though build tooling to optimize the website has never been better. With the marketshare of evergreen browsers rising fast and browsers launching support for new features in lockstep, is it time we rethink asset delivery for the modern web?_

---

A quick look at caniuse.com’s usage table reveals that evergreen browsers occupy a lion’s share of the browser market — more than 75%. In spite of this, the norm is to prefix CSS, transpile all of our JavaScript to ES5, a nd include polyfills to support every user we care about.

`While` this is understandable from a historical context — the web has always been about progressive enhancement — the question remains: Are we slowing down the web for the majority of our users in order to support a diminishing set of legacy browsers?
<center>
![The different compatibility layers of a web app.](https://moneo.dev/assets/image/blog/content.jpg)

<span style="color:gray">_The different compatibility layers of a web app._</span>
</center>

```
test
```

## The Cost Of Supporting Legacy Browsers

Let’s try to understand how different steps in a typical build pipeline can add weight to our front-end resources.

On average, untranspiled bundles are about 25% smaller than those that have been transpiled down to ES5. This isn’t surprising given that ES6+ provides a more compact and expressive way to represent the equivalent logic and that transpilation of some of these features to ES5 can require a lot of code.