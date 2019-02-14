"""Presidential State of the Union Speeches"""

from jinja2 import StrictUndefined

from flask import (Flask, render_template, redirect, request, flash, session, jsonify)
from flask_debugtoolbar import DebugToolbarExtension

from model import connect_to_db, db, President, Year, Speech


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

    print('\n\n\n\n\n\n\n')

    pres_1 = request.args.get('pres_1')
    print('pres_1 is', pres_1, 'type is ', type(pres_1))
    pres_2 = request.args.get('pres_2')
    print('pres_2 is', pres_2, 'type is ', type(pres_2))

    pres_1 = President.query.get(pres_1)
    pres_2 = President.query.get(pres_2)

    return render_template('comparison.html', pres_1=pres_1, pres_2=pres_2)




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
