import json
import datetime
import numpy as np

from model import President, Year, Speech, Word
from model import connect_to_db, db
from flask_sqlalchemy import SQLAlchemy
from server import app
from nlp import NLP, Doc
connect_to_db(app)



def make_json_freq():
    """
    Create a list of dictionaries of word frequencies

    """

    word_freq = []

    # get list of president objects
    words = Word.query.all()

    for word in words:
        # initiate an empty dictionary, and populate it
        word_freq.append({'word': word.text,
                            'first_user': word.get_first_use_president().name,
                            'first_date': word.get_first_use_date().strftime('%B %d, %Y'),
                            'freq': word.freq_corpus,
                            'count': word.count,
                            })

    f = open('static/word_freq.json', 'w')
    f.write(json.dumps(word_freq))


def make_json_freq_curated():
    """
    Create a list of dictionaries of word frequencies
    excluding George Washington's speeches

    """

    word_freq = []

    # get list of president objects
    words = Word.query.all()

    for word in words:
        # initiate an empty dictionary, and populate it

        if word.get_first_use_president().name != 'George Washington':

            word_freq.append({'word': word.text,
                                'first_user': word.get_first_use_president().name,
                                'first_date': word.get_first_use_date().strftime('%B %d, %Y'),
                                'freq': word.freq_corpus,
                                'count': word.count,
                                })

    f = open('static/word_freq.json', 'w')
    f.write(json.dumps(word_freq))


def make_json_wc():
    """
    Create a list of dictionaries of word counts

    """

    word_counts = []

    # get list of president objects
    presidents = President.query.all()

    for president in presidents:
        # initiate an empty dictionary, and populate it
        if len(president.years) > 0:

            word_counts.append({'name': president.name,
                                'words_per': president.get_word_count_per_speech(),
                                'total': president.get_total_word_count(),
                                'first_year': president.years[0].year,
                                'party': president.party_affiliation})

        elif president.name == 'William Henry Harrison':
            word_counts.append({'name': president.name,
                                'words_per': president.get_word_count_per_speech(),
                                'total': president.get_total_word_count(),
                                'first_year': 1841,
                                'party': president.party_affiliation})            

        elif president.name == 'James A. Garfield':
            word_counts.append({'name': president.name,
                                'words_per': president.get_word_count_per_speech(),
                                'total': president.get_total_word_count(),
                                'first_year': 1881,
                                'party': president.party_affiliation})

    f = open('static/word_counts.json', 'w')
    f.write(json.dumps(word_countsm))


def get_first_use_context():
    """ Get the context for the first usage of each word """

    word_context = []
    vocab = NLP.vocab


    # get list of speech objects
    speeches = Speech.query.all()

    # get a list of the text of each word
    words = [word.text for word in Word.query.all()]

    # loop through each speech object
    for speech in speeches:

        # create a tokenized file of the doc from the speech
        tokens = Doc(vocab).from_disk(speech.doc_path)

        # loop through each token in the speech
        for token in tokens:
            # check to see if the text of the token is in the words list
            if token.text in words:
                print('in if')
                # Get the context of the token, and the word object
                sent = token.sent
                word = Word.query.filter_by(text=token.text).first()

                # append the context and information to the word_context list
                word_context.append({'word': word.text,
                                    'first_user': word.get_first_use_president().name,
                                    'first_date': word.get_first_use_date().strftime('%B %d, %Y'),
                                    'sentence': sent.text,
                                    })

                words.remove(word.text)
                print('word (', word,') context: ', sent)



    f = open('static/word_context.json', 'w')
    f.write(json.dumps(word_context))


def make_similarity_json():

    presidents = President.query.all()

    pres_sim = {}

    for pres_1 in presidents:
        pres_sim[pres_1.name] = {}
        print(pres_1)

        for pres_2 in presidents:
            sim = pres_1.get_similarity(pres_2)

            pres_sim[pres_1.name][pres_2.name] = sim

    f = open('static/pres_sim.json', 'w')
    f.write(json.dumps(pres_sim))

    return pres_sim



def make_similarity_json_2():

    presidents = President.query.all()

    pres_sim = []

    for pres_1 in presidents:
        pres_sim.append({'name': pres_1.name,
            'similarity': [{pres_2.name: pres_1.get_similarity(pres_2)
                            for pres_2 in presidents}][0],
            'party': pres_1.party_affiliation,
            'birth_decade': pres_1.decade_of_birth(),
            'pres_id': pres_1.pres_id})
        print(pres_1)

    f = open('static/pres_sim_2.json', 'w')
    f.write(json.dumps(pres_sim))

    return pres_sim


def make_similarity_matrix():    

    presidents = President.query.all()

    ordered_names = [president.name for president in presidents]

    with open('static/pres_sim.json') as f:

        pres_sim = json.load(f)

        sim_matrix = []

        for pres in ordered_names:
            sim_matrix.append([pres_sim[pres][name]
                                for name in ordered_names])

    return sim_matrix




