<link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css">
<link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css">
<link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css">
<link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css">
<link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css">
<link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css">



## SOTU - State of the Union

This app brings visualizations to the analysis of language in the State of the Union Speeches of American presidents.
You can visit it here : <http://madelainebolton.com>

### List of Presidents
![Presidents](/static/img/presidents.png)


### Presidential Details
![George Washington Details](/static/img/details.png)


### Average Words per Speech
![Words per Speech](/static/img/words_per_speech.png)


### Comparisons of Presidential Speeches
![Comparison of Speeches](/static/img/comparison.gif)


### Word Frequency over Time
![Word Frequency](/static/img/frequency.gif)


### Popular Words by Decade and President
![Words by Decade](/static/img/word_decade.svg)


## Navigation
* [Tech Stack](#tech-stack)
* [Setup and Installation](#setup)

## <a name="tech-stack"></a>Tech Stack
* **Back-End:** Python, Flask, Jinja, SQLAlchemy, PostgreSQL
<i class="devicon-python-plain"></i> 
<i class="devicon-postgresql-plain"></i>
* **Front-End:** HTML/CSS, Bootstrap, JQuery, JavaScript, AJAX, d3
<i class="devicon-html5-plain-wordmark"></i> 
<i class="devicon-javascript-plain"></i> 
<i class="devicon-d3js-plain"></i>
<i class="devicon-jquery-plain-wordmark"></i>

## <a name="setup"></a>Setup/ Installation
Python 3.6 (or higher) and PostgreSQL are required.

Create a virtual environment:
```
> virtualenv env
> source env/bin/activate
```

Install dependencies:
```
> pip3 install -r requirements.txt 
```

Create database:
```
> createdb SOTU
```

Build database tables and seed file:
```
> python3 seed.py
```
Run the app via command line:
```
> python3 server.py
```

Head to <127.0.0.1:5000> on your computer to explore the app in depth!

