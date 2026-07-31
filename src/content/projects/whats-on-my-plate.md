---
title: "What's On My Plate"
description: "A web app that turns whatever is left in your fridge into things you can actually cook."
date: 2023-02-18
category: "Web"
tags: ["JavaScript", "REST API", "Web"]
cover: "../../assets/projects/whats-on-my-plate.jpg"
coverAlt: "What's On My Plate interface"
repo: "https://github.com/nipunrautela/whatsonmyplate"
status: "shipped"
---

You have four ingredients and no idea what to make. What's On My Plate takes the
ingredients you have on hand and suggests recipes you can cook without another
trip to the shop.

## Design

The interesting constraint is that recipe matching is not a simple set
intersection — a recipe you can *almost* make is often more useful than one you
can make exactly, provided the missing item is salt rather than saffron. The
ranking therefore weights matches by how central each missing ingredient is to
the dish.

Results are filterable by cuisine and preparation time, since "what can I cook"
usually really means "what can I cook in twenty minutes".
