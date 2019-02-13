
from model import connect_to_db, db
from model import Speech, President, Year
from flask_sqlalchemy import SQLAlchemy
from server import app
connect_to_db(app)


SPEECHES = Speech.query.all()

def create_speech_list(speeches):
    """ Create a list with all of the speech file paths """
    file_list = []

    for speech in speeches:
        file_list.append(speech.text)

    return file_list


def open_file(file):
    """ Utility function to open and read files """

    f = open(file)

    file = f.read()

    f.close()

    return file

def create_unparsed_wc_dictionary(files):

    unparsed_wc_dictionary = {}

    for file in files:

        speech = open_file(file)
        words = speech.split()

        for word in words:
            # print(word)
            unparsed_wc_dictionary[word] = unparsed_wc_dictionary.get(word, 1) + 1


    return unparsed_wc_dictionary

def create_master_doc(files):
    """ Create a master file for the full speech corpus """

    master_doc = ''

    for file in files:
        speech = open_file(file)

        master_doc += '\n' + speech

    return master_doc


def create_decade_corpus(files, year):

    decade_speeches = ''

    decade = year[:-1]

    for file in files:

        if decade in file:

            speech = open_file(file)

            decade_speeches += '\n' + speech

    return decade_speeches




###############################################################################
if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.
    from flask_sqlalchemy import SQLAlchemy
    from server import app
    connect_to_db(app)
    print("Connected to DB.")