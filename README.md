
## SOTU - State of the Union

This app brings visualizations to the analysis of language in the State of the Union Speeches of American presidents.

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
* **Front-End:** HTML/CSS, Bootstrap, JQuery, JavaScript, AJAX, d3

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

Head to (127.0.0.1/5000) on your computer to explore the app in depth!

