"""Presidential State of the Union Speeches"""

import json

from jinja2 import StrictUndefined

from flask import (Flask, render_template, redirect, request, flash, session, jsonify)
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

from model import connect_to_db, db, President, Year, Speech, Word




app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
from secrets import secret_key
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


@app.route('/speeches', methods=['GET'])
def show_speeches():
    """ Display all of the speeches given by the selected president """

    president_name = request.args.get('president')
    president = President.query.filter_by(name=president_name).one()

    return render_template("speeches.html", president=president)


@app.route('/speech/<int:speech_id>')
def show_speech(speech_id):
    """ Display all of the speeches given by the selected president """

    speech = Speech.query.filter_by(speech_id=speech_id).one()

    speech_text = open(speech.text)
    speech_text = speech_text.read()

    return render_template("speech_text.html", speech=speech_text)


@app.route('/comparison', methods=['GET'])
def compare_presidents():

    pres_1 = request.args.get('pres_1')
    pres_2 = request.args.get('pres_2')

    pres_1 = President.query.get(pres_1)
    pres_2 = President.query.get(pres_2)

    return render_template('comparison.html', 
                            pres_1=pres_1, 
                            pres_2=pres_2,
                            )


@app.route("/word_counts.json")
def get_word_count_data():
    """pass the word_counts to d3"""
   
    f = open('static/word_counts.json')
    word_counts = f.read()
    wc_json = json.loads(word_counts)

    # render json to homepage
    return jsonify({'data': wc_json})


@app.route("/word_freq.json")
def get_word_freq_data():
    """create and pass the word_freq to d3"""

    f = open('static/word_freq.json')
    word_freq = f.read()
    wf_json = json.loads(word_freq)

    # render json to homepage
    return jsonify({'data': wf_json})


@app.route("/word_context.json")
def get_word_context_data():
    """pass the word_context to d3"""
   
    f = open('static/word_context.json')
    word_context = f.read()
    wcon_json = json.loads(word_context)

    # render json to homepage
    return jsonify({'data': wcon_json})


@app.route("/pres_sim.json")
def get_pres_sim_data():
    """pass the word_context to d3"""
   
    f = open('static/pres_sim.json')
    pres_sim = f.read()
    sim_json = json.loads(pres_sim)

    # render json to homepage
    return jsonify({'data': sim_json})


@app.route("/pres_sim_2.json")
def get_pres_sim_2_data():
    """pass the word_context to d3"""
   
    f = open('static/pres_sim_2.json')
    pres_sim = f.read()
    sim_json = json.loads(pres_sim)

    # render json to homepage
    return jsonify({'data': sim_json})


@app.route("/sim_matrix.csv")
def get_pres_sim_matrix():
    """pass the word_context to d3"""
   
    f = open('static/sim_matrix.csv')
    sim_matrix = f.read()

    # render json to homepage
    return sim_matrix


@app.route('/wc_visualization')
def show_wc_visualization():
    """Show visualization."""

    return render_template("wc_visualization.html")


@app.route('/wf_visualization')
def show_wf_visualization():
    """Show visualization."""
    
    return render_template("wf_visualization.html")

#################################################################
if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(port=5000, host='0.0.0.0')

    # word_counts = [(president.name, 
    #             president.get_word_count_per_speech(),
    #             president.get_total_word_count())
    #             for president
    #             in President.query.options(db.joinedload('speeches')).all()]
