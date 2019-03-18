"""Presidential State of the Union Speeches"""

import json

from jinja2 import StrictUndefined
from flask import (Flask,
                   render_template,
                   redirect,
                   request,
                   flash,
                   session,
                   jsonify)
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

from sotu.secrets import secret_key
from sotu.model import connect_to_db, db, President, Year, Speech, Word


app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar

app.secret_key = secret_key

# Normally, if you use an undefined variable in Jinja2, it fails
# silently. This is horrible. Fix this so that, instead, it raises an
# error.
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def index():
    """Homepage."""

    presidents = President.query.all()

    return render_template("homepage.html", presidents=presidents)


@app.route('/president', methods=['GET'])
def show_president_details():
    """ Display all of the details of the selected president """

    presidents = President.query.all()

    president_name = request.args.get('president')
    president = President.query.filter_by(name=president_name).one()

    similar_pres = []
    with open('static/data/sim_matrix_updated.csv') as f:
        sim_matrix = f.read()
        sim_matrix = sim_matrix.split('\n')[1:]

        for line in sim_matrix:
            line = line.split(',')
            if (int(line[0]) == president.pres_id
               and int(line[1]) != president.pres_id):
                pres_obj = President.query.get(int(line[1]))
                similar_pres.append((pres_obj, line[2]))

    similar_pres = sorted(similar_pres, key=lambda x: x[1], reverse=True)

    similar_pres = similar_pres[:5]

    top_words = jsonify(president.top_words)

    return render_template("president.html",
                           president=president,
                           similar_pres=similar_pres,
                           top_words=top_words,
                           presidents=presidents,
                           )


@app.route('/presidents', methods=['GET'])
def show_presidents():
    """ Display all of the speeches given by the selected president """

    presidents = President.query.all()

    return render_template("presidents.html",
                           presidents=presidents,)


@app.route('/speech/<int:speech_id>')
def show_speech(speech_id):
    """ Display all of the speeches given by the selected president """

    presidents = President.query.all()

    speech = Speech.query.filter_by(speech_id=speech_id).one()
    president = President.query.get(speech.pres_id)

    with open(speech.text) as f:
        speech_text = f.read()

    return render_template("speech_text.html",
                           speech_text=speech_text,
                           speech=speech,
                           president=president,
                           presidents=presidents,
                           )


@app.route('/comparison', methods=['GET'])
def compare_speeches():
    """Compare the presidents speeches"""

    presidents = President.query.all()

    return render_template('comparison.html',
                           presidents=presidents,
                           )


@app.route('/words_by_decade', methods=['GET'])
def show_words_by_decade():
    """Show the words by decade bubble visualization"""

    presidents = President.query.all()

    return render_template('words_by_decade.html',
                           presidents=presidents,
                           )


@app.route('/word_freq', methods=['GET'])
def wf_by_decade():
    """"""

    presidents = President.query.all()

    return render_template('wf_visualization.html',
                           presidents=presidents)


@app.route('/wc_visualization')
def show_wc_visualization():
    """Show visualization."""

    presidents = President.query.all()

    return render_template("wc_visualization.html",
                           presidents=presidents,
                           )


@app.route('/decade_speeches.json', methods=['GET'])
def show_decade_speeches():

    with open('static/data/wc_by_decade.json') as f:
        words = f.read()
        word_counts = json.loads(words)

    return jsonify(word_counts)


# Create a route that will get the speeches in text for the visualization
@app.route("/speech_text.json")
def get_speech_text_data():
    """pass the speech text to d3"""

    with open('static/data/speech_text.json') as f:
        speech_text = f.read()
        speeches = json.loads(speech_text)

    # render json to homepage
    return jsonify({'data': speeches})


@app.route("/word_counts.json")
def get_word_count_data():
    """pass the word_counts to d3"""

    with open('static/data/word_counts.json') as f:
        word_counts = f.read()
        wc_json = json.loads(word_counts)

    # render json to homepage
    return jsonify({'data': wc_json})


@app.route("/pres_word_counts.json")
def get_pres_word_count_data():
    """pass the word_counts to d3"""

    with open('static/data/hierarchy.json') as f:
        hierarchy = f.read()
        h_json = json.loads(hierarchy)

    # render json to homepage
    return jsonify(h_json)


@app.route("/word_freq.csv")
def get_word_freq_data():
    """create and pass the word_freq to d3"""

    with open('static/data/wf_by_decade.csv') as f:
        word_freq = f.read()

    # render json to homepage
    return word_freq


@app.route("/word_context.json")
def get_word_context_data():
    """pass the word_context to d3"""

    with open('static/data/word_context.json') as f:
        word_context = f.read()
        wcon_json = json.loads(word_context)

    # render json to homepage
    return jsonify({'data': wcon_json})


@app.route("/pres_sim.json")
def get_pres_sim_data():
    """pass the word_context to d3"""

    with open('static/data/pres_sim.json') as f:
        pres_sim = f.read()
        sim_json = json.loads(pres_sim)

    # render json to homepage
    return jsonify({'data': sim_json})


@app.route("/pres_sim_2.json")
def get_pres_sim_2_data():
    """pass the word_context to d3"""

    with open('static/data/pres_sim_2.json') as f:
        pres_sim = f.read()
        sim_json = json.loads(pres_sim)

    # render json to homepage
    return jsonify({'data': sim_json})


@app.route("/sim_matrix.csv")
def get_pres_sim_matrix():
    """pass the word_context to d3"""

    with open('static/data/sim_matrix_updated.csv') as f:
        sim_matrix = f.read()

    # render json to homepage
    return sim_matrix


#################################################################
if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    app.run(port=5000, host='0.0.0.0')
