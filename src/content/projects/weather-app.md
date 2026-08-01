---
title: "Weather App"
description: "A Flutter weather client with location-aware forecasts and a layout that adapts to the conditions."
date: 2021-11-20
category: "Mobile"
tags: ["Flutter", "Dart", "REST API", "Mobile"]
cover: "../../assets/projects/weather-app.png"
coverAlt: "Weather app icon"
repo: "https://github.com/nipunrautela/weatherappflutter"
status: "shipped"
---

A cross-platform weather client built with Flutter. It resolves the device
location, fetches current conditions and a multi-day forecast, and presents both
in a single scrollable view.

## Notes

Weather APIs return a lot more than any one screen should show, so most of the
work was deciding what to drop. The current conditions card carries temperature,
the "feels like" value and the day's range; everything secondary (humidity,
wind, pressure) sits below the fold for people who actually want it.

The palette shifts with the conditions, so a storm and a clear afternoon do not
look identical at a glance.
