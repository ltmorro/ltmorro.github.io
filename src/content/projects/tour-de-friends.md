---
title: "Tour de Friends"
date: 2026-07-15
excerpt: "A Grand Tour for your friend group: Strava rides become a multi-week stage race with replays, rivalries, and rider archetypes."
image: "/images/tdf/stage-replay.webp"
---

Every July the Tour de France rolls around, and every July my friends and I — scattered across different cities — talk about riding together more. Tour de Friends is my answer: a web app that turns everyone's ordinary Strava rides into a proper multi-week stage race. It's live at [tour-de-friends.fly.dev](https://tour-de-friends.fly.dev/), where Tour de Friends 2026 is currently underway.

## How it works

A competition is a series of stages spread over several weeks, each categorized like the real thing — flat, sprint, mountain. Riders connect their Strava accounts (the app is built on the Strava API — "Powered by Strava," as the footer dutifully notes), and their rides are scored against each stage. From there the app keeps a running general classification: stage times, per-stage results, and cumulative time gaps to the race leader.

<figure>
<img src="/images/tdf/competitions.webp" alt="Tour de Friends competitions screen showing Tour de Friends 2026 in progress with 3 riders and 11 days remaining" loading="lazy">
<figcaption>Competitions run for weeks — Tour de Friends 2026 spans late June through July.</figcaption>
</figure>

## Stage replays

My favorite feature: every stage can be replayed as a ghost race. Riders are animated over a Leaflet map with a synchronized elevation profile and live-updating panels for each rider — time, distance, speed, elevation, heart rate, and power — so you can watch a sprint up Deaf School Hill unfold long after everyone has showered.

<figure>
<img src="/images/tdf/stage-replay.webp" alt="Stage replay view with a map, elevation profile, playback controls, and per-rider speed, heart rate, and power panels" loading="lazy">
<figcaption>Stage 7, a 0.25-mile sprint at 4.3% — replayed with full telemetry.</figcaption>
</figure>

## Rider profiles and archetypes

Each rider gets a profile built from their results: a radar chart across five axes — Verticality, Snap, Gravity, Engine, and Grit — that resolves into an archetype. (I'm "The All-Rounder": <em>no weakness, no superpower — the complete rider.</em> I choose to read that as a compliment.) Every axis expands into detailed stats with min–max ranges, the peloton median, your placement, and a 1v1 rival overlay for settling specific scores.

<figure>
<img src="/images/tdf/rider-profile.webp" alt="Rider profile for Luke Morrow with a five-axis radar chart and the archetype The All-Rounder" loading="lazy">
<figcaption>The rider radar: Verticality, Snap, Gravity, Engine, Grit.</figcaption>
</figure>

<figure>
<img src="/images/tdf/flat-stage-speed.webp" alt="Flat stage speed chart comparing a rider's average speed per stage against the pack, with a placement card reading Top 50%, mid-pack, number 2 of 3" loading="lazy">
<figcaption>Per-axis deep dives compare you against the pack, stage by stage.</figcaption>
</figure>

## The race, evolving

The general classification page charts the cumulative gap to the race leader across all 21 stages, which is where the real drama lives — every attack, bonk, and skipped weekend ride is right there in the lines.

<figure>
<img src="/images/tdf/race-evolution.webp" alt="Race evolution chart showing cumulative time gaps to the race leader across 21 stages for three riders" loading="lazy">
<figcaption>Race evolution: cumulative time gap to the leader. Dashed lines are projections.</figcaption>
</figure>

The peloton is small — three riders this year — but the trash talk is world class.
