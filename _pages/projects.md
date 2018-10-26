---
title: Projects
layout: archive
permalink: /projects/

header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/headers/code.jpg
  caption: "Photo credit: [**@StockSnap**](https://pixabay.com/en/users/StockSnap-894430/)"
excerpt: "Exploring practical applications of my interests."

privacy:
  - image_path: "/assets/images/Cooccurrence.png"
    alt: "Cooccurrence network"
    title: "Detecting Privacy-Sensitive Objects"
    excerpt: "Detecting and classifying objects in images as public and private to make better privacy setting recommendations on social media."
    url: "/projects/2018-4-30-detecting-privacy-sensitive-objects/"
    btn_label: "Read More"
    btn_class: "btn--primary"

income:
  - image_path: "/assets/images/census/teaser.png"
    alt: "income pic"
    title: "Predicting Income from Census Data"
    excerpt: "From the 1994 Census Data, can we predict who makes over or under $50k? In this project, I utilize R to perform my analysis."
    url: "/projects/2017-12-30-predicting-income/"
    btn_label: "Read More"
    btn_class: "btn--primary"

adoption:
  - image_path: "/assets/images/adoption.png"
    alt: "adoption"
    title: "Adoption Incentive Program Visualization"
    excerpt: "A visual exploration of the effectiveness of the Adoption Incentive Program. This project utilizes a combination of Apache Spark, R, and R Shiny."
    url: "/projects/2017-12-30-adoption-incentive-program-visualization/"
    btn_label: "Read More"
    btn_class: "btn--primary"

mcadams:
  - image_path: "/assets/images/mcadams/mcadams.png"
    alt: "mcadams map"
    title: "School of Computing Map"
    excerpt: "An interactive map to assist visitors with navigation. In this project, I use Python and Tkinter to implement the map."
    url: "/projects/2018-6-30-mcadams-map/"
    btn_label: "Read More"
    btn_class: "btn--primary"

data_science:
  - image_path: "/assets/images/datascience/new_york.png"
    alt: "data science jobs"
    title: "Data Science Job Skills"
    excerpt: "I mined data scientist job postings to find out what skills were the most common across the country. I use Python for this exploratory analysis."
    url: "/projects/2018-9-30-data-science-jobs/"
    btn_label: "Read More"
    btn_class: "btn--primary"

recipe:
  - image_path: "/assets/images/recipes/cuisine_bar.png"
    alt: "recipe classification"
    title: "Cuisine Classification"
    excerpt: "From the ingredients in a recipe, can we predict the cuisine? I train several models and evaluate their performance in Python."
    url: "/projects/2018-9-30-predicting-cuisine/"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="data_science" type="left" %}

{% include feature_row id="privacy" type="left" %}

{% include feature_row id="income" type="left" %}

{% include feature_row id="adoption" type="left" %}

{% include feature_row id="mcadams" type="left" %}
