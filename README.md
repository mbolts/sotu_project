
## SOTU - State of the Union

This app brings visualizations to the analysis of language in the State of the Union Speeches of American presidents.

### List of Presidents
![Presidents](/static/img/presidents.png)


### Presidential Details
![George Washington Details](/static/img/details.png)


### Average Words per Speech
![Words per Speech](/static/img/word_count_1.svg)


### Comparisons of Presidential Speeches
![Comparison of Speeches](/static/img/comparison.svg)


### Word Frequency over Time
![Word Frequency](/static/img/word_freq.svg)


### Popular Words by Decade and President
![Words by Decade](/static/img/word_decade.svg)


## Navigation
* [Tech Stack](#tech-stack)
* [Setup and Installation](#setup)

## <a name="tech-stack"></a>Tech Stack
* **Back-End:** Python, Flask, Jinja, SQLAlchemy, PostgreSQL
* **Front-End:** HTML/CSS, Bootstrap, JQuery, JavaScript, AJAX, d3

## <a name="setup"></a>Setup/ Installation
Please be sure to have Python 3.6 and PostgreSQL downloaded before you clone this repository. 

Create a virtual environment:
```
> virtualenv env
> source env/bin/activate
```

Install dependencies:
```
> pip install -r requirements.txt 
```

Create database:
```
$createdb SOTU
```

Build database tables and seed file:
```
$ python3 seed.py
```
Run the app via command line:
```
$ python3 server.py
```

