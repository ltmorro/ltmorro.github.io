---
title: "School of Computing Map"
date: 2018-06-30
archived: true
---

The goal of this project is to create an interactive map for visitors of McAdams Hall. McAdams Hall is the home of Clemson's School of Computing. To implement the map, I used Python's de-facto GUI, Tkinter. The full source code can be found on my [Github](https://github.com/ltmorro/mcadamsMap)

## Motivation
McAdams Hall is easily one of the most confusing buildings on Clemson's campus. My office is situated in the perfect location for lost visitors to poke their head in and ask for directions. I became tired of getting up and walking the visitor to their desired location, so I decided to build a map.

## Implementation
The map is implemented in Python and utilizes the library Tkinter for graphical elements. I followed a Model-View-Controller design paradigm.

For the pathing, I created a graph of the building's rooms and used a variant of Dijkstra's algorithm to find the shortest path between two rooms.

## Video Showcase
<video src="/images/mcadams/project_video.mp4" controls preload="metadata"></video>
