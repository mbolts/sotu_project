"""Create dictionaries from the state of the union speeches"""

from flask_sqlalchemy import SQLAlchemy
from model import connect_to_db, db
from model import Speech, President, Year
from server import app

import nlp

connect_to_db(app)


all_speeches = Speech.query.all()


def create_speech_list(speeches):
    """ Create a list with all of the speech file paths """
    file_list = []

    for speech in speeches:
        file_list.append(speech.text)

    return file_list


def create_unparsed_wc_dictionary(files):
    """Create a dictionary of the unparsed word counts"""
    unparsed_wc_dictionary = {}

    for f in files:

        speech = nlp.open_file(f)
        words = speech.split()

        for word in words:
            # print(word)
            unparsed_wc_dictionary[word] = unparsed_wc_dictionary.get(word, 1) + 1

    return unparsed_wc_dictionary


def create_master_doc_from_files(files):
    """ Create a master file for the full speech corpus """

    master_doc = ''

    for f in files:
        speech = nlp.open_file(f)

        master_doc += '\n' + speech

    return master_doc


def create_decade_corpus(files, year):
    """Create a text file of all speeches in a given decade"""
    decade_speeches = ''

    decade = year[:-1]

    for f in files:

        if decade in f:

            speech = nlp.open_file(f)

            decade_speeches += '\n' + speech

    return decade_speeches

