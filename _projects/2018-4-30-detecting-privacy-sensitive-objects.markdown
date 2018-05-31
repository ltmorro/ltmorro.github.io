---
layout: single
title:  "Detecting Privacy-Sensitive Objects"
date:   2018-4-30 17:44:44 -0400
categories:
  - projects
excerpt: "Detecting and classifying objects as public and private to make better privacy setting recommendations on social media."
header:
  teaser: "/assets/images/Cooccurrence.png"
author_profile: true

---
This page is still a work in progress.

The privacy concerns and issues with regard to online social media networks are continually burgeoning as more global users adopt the social platforms. To alleviate these concerns, many social media networks allow users to configure their privacy preferences in a coarse-grained manner. Unfortunately, many users are unaware of the privacy implications that exist with oversharing on social media platforms. Thus, the need arises for an automated approach to analyze photo content and recommend privacy settings to users.

This project is largely inspired by this [paper][iprivacy] in which the researchers develop a novel approach, iPrivacy, for suggesting privacy settings with deep learning technologies. iPrivacy strives to recommend privacy settings based on the content of the image. I wanted to try to implement a portion of their system as a proof of concept. I was mainly interested in their random walk algorithm which aligns objects with their appropriate privacy labels (more on this later).
## About the Data ##
To train my model to identify private and public objects I have utilized this [dataset][data]. The researchers crawled Flickr, and downloaded 90,000 images in 2010. Since labeling such a large scale dataset is difficult and time-consuming, the researchers crowd sourced the picture labeling. They provided the following guidance for users to label the image: “Private are photos which have to do with the private sphere (like self-portraits, family, friends, your home) or contain objects that you would not share with the entire world (like a private email). The rest is public. In case no decision can be made, the picture should be marked as undecidable.”

The creators of the photo dataset provide a cleaned csv file that includes the photo id and the photo's labeled class. In order to download the actual images, I wrote this simple python script.
```python
import csv #file i/o for original dataset
from requests import get #library used for http web requests
from ast import literal_eval #used to parse response from flickr

#using the flickr api, download the json information for a photo ID
def downloadJSON(photo_id, file_path):
    url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=cb9885c06e1861ad49bad63b6a6714d9&photo_id=" + photo_id + "&format=json&nojsoncallback=1"
    #get request
    response = get(url)
    #convert byte response to json string format
    json_response = literal_eval(response.content.decode('utf8'))
    if json_response["stat"] == "ok":
        if json_response["sizes"]["candownload"]==1:
            image_url = json_response["sizes"]["size"][-1]['source'].replace("\\", "")
            downloadImage(image_url, file_path)

#using the json output, download the image from the provided link
def downloadImage(url, file_name):
    #open file
    with open(file_name, "wb") as file:
        #get request
        response = get(url)
        #write to file
        file.write(response.content)

dataReader = csv.reader(open('cleaned.csv'), delimiter='\t')

#index 0 represents photoID, index 3 represents private/public class
for row in dataReader:
    if row[3] == "private":
        downloadJSON(row[0], "private/"+row[0]+".jpg")
    if row[3] == "public":
        downloadJSON(row[0], "public/"+row[0]+".jpg")
```

Once I obtained all of the images that were still available, I had collected 10,427 photos labeled public and 2,275 photos labeled private. This was far fewer than the number of photos I had hoped for, but this was the only publicly available dataset of the sort. The researchers in the iPrivacy paper had a much larger dataset of ~800,000 images which is very helpful when training deep learning models.

## Semantic Segmentation ##
The privacy labels for the dataset are vaguely given at the image level without clear reasoning behind the influences for an image’s privacy labels. Initially, we do not have knowledge of any correspondence between objects in images and the label assigned to the image. To learn the correspondence between objects and privacy settings, we must first have the capability to detect and segment object regions in images. Therefore, the first step of the system, following the collection of the image dataset, is semantic image segmentation.

For my project, I leveraged one popular object detector which employs neural networks, [YOLO9000][yolo]. Shortly after I started working on this project, version three of YOLO was released. The upgrade to YOLOv3 included a complete overhaul of the neural network it employs. Version 3 is a hybrid between Convolutional Neural Networks (CNNs) and Residual Neural Networks (RNNs) in that it includes convolutional and residual layers. The new network uses sequential 3x3 and 1x1 convolutional layers; in total it has 53 convolutional layers as seen below.
<figure>
<a href="/assets/images/privacy/yolo.png"><img src="/assets/images/privacy/yolo.png"></a>
</figure>
## Co-Occurrence Network ##
<figure>
<a href="/assets/images/privacy/cooccurrence.png"><img src="/assets/images/privacy/cooccurrence.png"></a>
</figure>

## Object Privacy Alignment ##
<figure>
<a href="/assets/images/privacy/privacy.png"><img src="/assets/images/privacy/privacy.png"></a>
</figure>

photo IDs, credit cards, license plates, intimate photos, etc.

[data]: http://l3s.de/picalert/
[iprivacy]: http://web.mst.edu/~lindan/papers/iprivacy.pdf
[yolo]: https://pjreddie.com/darknet/yolo/
