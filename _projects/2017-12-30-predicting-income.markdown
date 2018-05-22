---
layout: single
title:  "Predicting Income from Census Data"
date:   2017-12-30 17:44:44 -0400
categories:
  - projects
excerpt: "From the 1994 Census Data, can we predict who makes over or under $50k?"
header:
  teaser: "/assets/images/confusion.png"
author_profile: true
---
The goal of this data science project is to predict if an individual makes greater than or less than $50K based on certain attributes using R. The data set is sourced from the 1994 United States census and is provided by the [UC Irvine Machine Learning Repository][uc_irvine]. I fit my model using a logistic regression to better understand the effect of various variables on the likelihood that an individual earns more or less than fifty thousand dollars. You can find my source code on [Github][git].

## About the Data
The data set is composed of two partitions: training and test data. The data was split using MLC++ GenCVFiles with ⅔ of the data serving as training data and ⅓ serving as testing data. The training data set is composed of 32,561 observations and the test data is composed of 16,281 observations. The data set includes 15 variables: 6 continuous and 9 discrete.

### Continuous Variables:
```
age
fnlwgt
education-num
capital-gain
capital-loss
hours-per-week
```
#### Description of fnlwgt
fnlwgt is the final sampling weight. This measure is included because a portion of the United States population is unable to complete a census including citizens in incarceration and active duty military members. The inclusion of final weight attempts to correct the systematic differences in selection probabilities.
### Discrete Variables:
```
>50K or ≤50K
workclass
education
marital-status
occupation
relationship
race
sex
native-country
```
>The target variable is the >50K or ≤50K discrete variable.

There is a possibility of unknown values in the data set and they are represented by ‘?’s in the data. 3,620 observations include unknown values.

## Exploratory Data Analysis
Before we jump right in to creating a classification model, let's first learn about our data.
### Explore Continuous Variables
I began my exploratory data analysis by first examining the continuous variables. I created relative frequency histograms for each variable using the R libraries `ggplot2` and `gridExtra`.
<figure class="half">
    <a href="/assets/images/census/age.png"><img src="/assets/images/census/age.png"></a>
    <a href="/assets/images/census/fnlwgt.png"><img src="/assets/images/census/fnlwgt.png"></a>
    <a href="/assets/images/census/education_num.png"><img src="/assets/images/census/education_num.png"></a>
    <a href="/assets/images/census/cap_gain.png"><img src="/assets/images/census/cap_gain.png"></a>
    <a href="/assets/images/census/cap_loss.png"><img src="/assets/images/census/cap_loss.png"></a>
    <a href="/assets/images/census/hours.png"><img src="/assets/images/census/hours.png"></a>
    <figcaption>The frequency histograms for continuous variables</figcaption>
</figure>
The relative frequency histograms of capital gain and capital loss lead to valuable insight. Since both of the variables are very tightly distributed at 0, I will not include them in my initial model.

To further explore the continuous variables, I created box plots of the remaining variables to compare the above 50K and below 50K distributions.
<figure class="half">
    <a href="/assets/images/census/age_rel.png"><img src="/assets/images/census/age_rel.png"></a>
    <a href="/assets/images/census/fnlwgt_rel.png"><img src="/assets/images/census/fnlwgt_rel.png"></a>
    <a href="/assets/images/census/education_num_rel.png"><img src="/assets/images/census/education_num_rel.png"></a>
    <a href="/assets/images/census/hours_rel.png"><img src="/assets/images/census/hours_rel.png"></a>
    <figcaption>The box plots for continuous variables</figcaption>
</figure>
The distributions of >50K and ≤50K in the fnlwgt box plot are nearly identical. For this reason, I will not include fnlwgt in my initial model. The >50K distribution seems to correlate to higher education levels.

### Explore Discrete Variables
To begin my exploratory data analysis on the discrete variables, I plotted the relative frequency bar graphs as opposed to the histograms for the continuous variables.
<figure class="half">
    <a href="/assets/images/census/work.png"><img src="/assets/images/census/work.png"></a>
    <a href="/assets/images/census/education.png"><img src="/assets/images/census/education.png"></a>
    <a href="/assets/images/census/marital.png"><img src="/assets/images/census/marital.png"></a>
    <a href="/assets/images/census/occupation.png"><img src="/assets/images/census/occupation.png"></a>
    <a href="/assets/images/census/relationship.png"><img src="/assets/images/census/relationship.png"></a>
    <a href="/assets/images/census/race.png"><img src="/assets/images/census/race.png"></a>
    <a href="/assets/images/census/sex.png"><img src="/assets/images/census/sex.png"></a>
    <a href="/assets/images/census/native.png"><img src="/assets/images/census/native.png"></a>
    <figcaption>The relative frequency bar graphs of discrete variables.</figcaption>
</figure>
The native.country has a very tight distribution with 89.59% of the population having a native country of the United States. For this reason, I will not include native.country in my model. In addition, the education variable seems to perfectly correlate with the education.num year value - that is, a value of HS-grad in education correlates with 12 years in education.num. Thus since education.num is finer grained, I chose to only include education.num in my model.

To further investigate the discrete variables, I created stacked bar graphs to include the relative frequencies of >50K and ≤50K.
<figure class="half">
    <a href="/assets/images/census/work_rel.png"><img src="/assets/images/census/work_rel.png"></a>
    <a href="/assets/images/census/marital_rel.png"><img src="/assets/images/census/marital_rel.png"></a>
    <a href="/assets/images/census/occupation_rel.png"><img src="/assets/images/census/occupation_rel.png"></a>
    <a href="/assets/images/census/relationship_rel.png"><img src="/assets/images/census/relationship_rel.png"></a>
    <a href="/assets/images/census/race_rel.png"><img src="/assets/images/census/race_rel.png"></a>
    <a href="/assets/images/census/sex_rel.png"><img src="/assets/images/census/sex_rel.png"></a>
    <figcaption>The relative frequency bar graphs of discrete variables.</figcaption>
</figure>
The variables all seem to have varying distributions, so I will include all of these in my model. It also is apparent from these plots that the distribution of >50K is much larger in male citizens

## Model Selection
Since the goal is the classification of a dichotomous variable, I will use a logistic regression model. The features that I included in my model are age, education.num, hours.per.week, workclass, marital.status, occupation, relationship, race, and sex.
### Training
Using the `glm` function in R, I trained my model on the training partition of the dataset.
```R
m <- glm(income ~ age + education.num + hours.per.week
     + workclass + marital.status + occupation + relationship
     + race + sex, family=binomial("logit"), data=train)
sum <- summary(m)$coefficients
sort <- order(sum[,4])
sum <- data.frame(sum[sort,])
print(sum)
```

The coefficients of the features below show the change in the predicted log likelihood of the outcome for a one unit increase in the feature.

| Feature | Estimate | Std. Error | z-value | Pr(>\|z\|) |
|:--------|:-------:|:--------:|:--------:|--------:|
| hours.per.week | 0.031 | 1.53E-03 | 20.0733 | 1.26E-89 |
| education.num | 0.296 | 8.67E-03 | 34.137 | 2.09E-255 |
| age | 0.0296 | 1.54E-03 | 19.280 | 7.91E-83 |
| (Intercept) | -10.147 | 3.78E-01 | -26.848 | 8.94E-159 |
| **_workclass Self-emp-not-inc_** | **_0.0753_** | **_1.28E-01_** | **_0.586_** | **_5.58E-01_** |
| **_workclass Never-worked_** | **_-9.716_** | **_1.63E+02_** | **_-0.060_** | **_9.52E-01_** |
| workclass Local-gov | 0.334 | 1.32E-01 | 2.531 | 1.14E-02 |
| workclass Self-emp-inc | 0.770 | 1.40E-01 | 5.500 | 3.81E-08 |
| **_race Black_** | **_0.385_** | **_2.18E-01_** | **_1.768_** | **_7.71E-02_** |
| relationship Not-in-family | 0.565 | 2.51E-01 | 2.248 | 2.46E-02 |
| relationship Wife | 1.360 | 9.52E-02 | 14.287 | 2.65E-46 |
| **_relationship Unmarried_** | **_0.356_** | **_2.65E-01_** | **_1.344_** | **_1.79E-01_** |
| race White | 0.504 | 2.08E-01 | 2.425 | 1.53E-02 |
| occupation Prof-specialty | 0.708 | 8.78E-02 | 8.069 | 7.09E-16 |
| occupation Protective-serv | 0.653 | 1.25E-01 | 5.241 | 1.59E-07 |
| **_relationship Other-relative_** | **_-0.351_** | **_2.31E-01_** | **_-1.521_** | **_1.28E-01_** |
| **_race Asian-Pac-Islander_** | **_0.339_** | **_2.28E-01_** | **_1.491_** | **_1.36E-01_** |
| occupation Farming-fishing | -0.838 | 1.33E-01 | -6.296 | 3.05E-10 |
| marital.status Married-civ-spouse | 2.080 | 2.54E-01 | 8.194 | 2.54E-16 |
| occupation Craft-repair | 0.194 | 8.08E-02 | 2.403 | 1.63E-02 |
| **_marital.status Separated_** | **_-0.125_** | **_1.50E-01_** | **_-0.837_** | **_4.02E-01_** |
| sex Male | 0.856 | 7.18E-02 | 11.928 | 8.43E-33 |
| **_workclass Without-pay_** | **_-11.439_** | **_1.18E+02_** | **_-0.097_** | **_9.23E-01_** |
| relationship Own-child | -0.671 | 2.52E-01 | -2.664 | 7.73E-03 |
| occupation Machine-op-inspct | -0.188 | 1.02E-01 | -1.851 | 6.41E-02 |
| **_occupation Adm-clerical_** | **_0.121_** | **_9.38E-02_** | **_1.291_** | **_1.97E-01_** |
| occupation Priv-house-serv | -2.571 | 1.13E+00 | -2.281 | 2.25E-02 |
| **_race Other_** | **_-0.165_** | **_3.25E-01_** | **_-0.506_** | **_6.13E-01_** |
| **_workclass State-gov_** | **_0.156_** | **_1.43E-01_** | **_1.093_** | **_2.74E-01_** |
| **_occupation Armed-Forces_** | **_-0.710_** | **_1.26E+00_** | **_-0.563_** | **_5.74E-01_** |
| **_marital.status Widowed_** | **_0.113_** | **_1.39E-01_** | **_0.813_** | **_4.16E-01_** |
| workclass Private | 0.529 | 1.18E-01 | 4.502 | 6.73E-06 |
| workclass Federal-gov | 0.975 | 1.45E-01 | 6.735 | 1.64E-11 |
| occupation Sales | 0.414 | 8.52E-02 | 4.866 | 1.14E-06 |
| marital.status Married-AF-spouse | 2.450 | 5.43E-01 | 4.513 | 6.39E-06 |
| occupation Other-service | -0.802 | 1.19E-01 | -6.755 | 1.43E-11 |
| occupation Handlers-cleaners | -0.583 | 1.40E-01 | -4.177 | 2.95E-05 |
| **_marital.status Spouse-absent_** | **_-0.087_** | **_2.08E-01_** | **_-0.421_** | **_6.74E-01_** |
| marital.status Never-married | -0.430 | 7.93E-02 | -5.425 | 5.80E-08 |
| occupation Tech-support | 0.728 | 1.14E-01 | 6.406 | 1.49E-10 |
| occupation Exec-managerial | 0.931 | 8.24E-02 | 11.308 | 1.20E-29 |

By analyzing the feature coefficients, it is apparent that a large number of features are not statistically significant (p > .05), and thus do not contribute meaningfully to the model. These features are bolded and italicized in the table above. It appears that the features I selected through my exploratory data analysis are not be the most optimal subset of features. Let's see if we can do better.  
### The Lasso Technique   
[The Lasso][lasso] is a feature selection and shrinkage method for linear models. The name, Lasso, is actually an acronym for _Least Absolute Selection and Shrinkage Operator_. The Lasso estimate is defined as:

$$
\underset{\beta\,\in\,\mathbb{R}^{p}}{\operatorname{argmin}}
\underbrace{||y\,-\,X\,\beta||^{2}_{2}}_{Loss}+\lambda
\underbrace{||\,\beta\,||_{1}}_{Penalty}
$$

In this case, the _tuning parameter_ $$\lambda$$ controls the effect of the penalty.
In R, we can use the `glmnet` function to find the optimal value for lambda.
```R
cv.out <- cv.glmnet(x,y,alpha=1,family="binomial", type.measure = "mse")
```
This function outputs two values: `lambda.1se` and `lambda.min`. `lambda.min` is the best model with the lowest CV error. `lambda.1se` is the value of lambda that is a simpler model than `lambda.min`, but still maintains an error within 1 standard error of the best model. I chose to use `lambda.1se` versus `lambda.min` since it is a simpler model with an error that is comparable to the best model. The simpler model is preferable because it is less prone to overfitting.

The resulting feature coefficients and odds ratio are listed below.

| Feature | Coefficients | Odds Ratio |
|:--------|:-------:|--------:|
| (Intercept) | -8.115833261 | 0.000298771 |
| **_age_** | **_0.022234722_** | **_1.022483756_** |
| workclass Federal-gov | 0.42175318 | 1.524632169 |
| workclass Private | 0.032164565 | 1.032687436 |
| workclass Self-emp-inc | 0.194814933 | 1.215086093 |
| workclass Self-emp-not-inc | -0.263976328 | 0.767991719 |
| workclass State-gov | -0.013690425 | 0.986402862 |
| education Assoc-acdm | -0.120690198 | 0.886308498 |
| education Prof-school | 0.070479572 | 1.07302265 |
| **_education.num_** | **_0.271707016_** | **_1.31220249_** |
| **_marital.status Married-AF-spouse_** | **_1.476782832_** | **_4.378835544_** |
| **_marital.status Married-civ-spouse_** | **_1.759282125_** | **_5.808266286_** |
| marital.status Never-married | -0.322028381 | 0.724677623 |
| **_occupation Exec-managerial_** | **_0.688178679_** | **_1.990087641_** |
| occupation Farming-fishing | -0.778132972 | 0.459262668 |
| occupation Handlers-cleaners | -0.379597994 | 0.684136381 |
| occupation Machine-op-inspct | -0.14071935 | 0.868733088 |
| occupation Other-service | -0.58675557 | 0.556128682 |
| **_occupation Prof-specialty_** | **_0.409664395_** | **_1.506312174_** |
| occupation Protective-serv | 0.279387174 | 1.322319212 |
| occupation Sales | 0.170704398 | 1.186140072 |
| **_occupation Tech-support_** | **_0.435470246_** | **_1.545689743_** |
| relationship Other-relative | -0.182299291 | 0.833351889 |
| relationship Own-child | -0.621429641 | 0.537175919 |
| **_relationship Wife_** | **_0.878403791_** | **_2.407054476_** |
| race White |0.102088171 | 1.107481115 |
| **_sex Male_** | **_0.545103832_** | **_1.724787461_** |
| capital.gain | 0.0002304 | 1.000230427 |
| capital.loss | 0.000558734 | 1.00055889 |
| hours.per.week | 0.026468125 | 1.026821517 |
| native.country Cambodia | 0.205780038 | 1.228482954 |
| native.country Columbia | -0.2567686 | 0.773547192 |
| native.country Italy | 0.147862783 | 1.159353802 |
| native.country Mexico | -0.031542921 | 0.968949368 |
| native.country Philippines | 0.031896842 | 1.032410998 |
| native.country South | -0.08434675 | 0.919112498 |
| native.country United-States | 0.099264715 | 1.104358601 |


### Model Performance
I used the test partition of the data set as my validation set when performing cross-validation. I predicted the values of the target variable, income, using my new simpler model.
Then to test for the model’s accuracy, I constructed a confusion matrix.
```R
lasso.probs <- predict(cv.out, newx=x_test,s=lambda1se, type="response")
lasso.income <- rep(" <=50K.", length(test$income))
lasso.income[lasso.probs >= .5] <- " >50K."
confusion.matrix <- table(test$income, lasso.income)
```
The resulting confusion matrix is displayed below.

$$
\begin{array}{|c|c|c|c|}
\hline
& <= $50K & > $50K & Sum \\ \hline
 <= $50K & 11669 & 766 & 12435 \\ \hline
 > $50K & 1642 & 2204 & 3846 \\ \hline
 Sum & 13311 & 2970 & 16281 \\ \hline
\end{array}
$$

The accuracy of the model when tested against the validation set was 85.21%. On the other hand, the specificity (true negative rate) of the model was lacking at 57.31%.


### Conclusion
The largest indicator of a citizen making greater than $50K is having a marital status of ‘married’. The fitted model says that, holding all other variables constant, the odds that a citizen makes over $50K increases by a factor of 4.379 or 5.808 if the citizen is an armed forces married person or a civilian married person, respectively. This may be slightly misleading since households typically complete one census, so the reported income may be a combination of both the spouse’s income. A person is 2.407 times more likely to make over $50K if their relationship status is Wife. This also may be a result of the nature of completing a census as a household.

Another strong indicator is years of education. Controlling for all other variables, for every one year increase in education, the inhabitant is 1.312 times more likely to make more than $50K. Occupations in which one needs higher education, such as executive/managerial, professional/specialty, and tech support positions, also have a positive effect on the odds of making greater than $50K.

In 1994, the gender wage gap appears to have been quite large. The odds that a citizen makes more than $50K increases by a factor of 1.725 if that citizen is male.

[uc_irvine]: https://archive.ics.uci.edu/ml/datasets/Adult
[git]: https://github.com/ltmorro/CensusDataScience/blob/master/census.R
[lasso]: http://statweb.stanford.edu/~tibs/lasso/lasso.pdf
[equation]: /assets/images/lasso.png
