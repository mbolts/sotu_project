"""Create spacy files on disk to speed load time on webapp"""

from flask_sqlalchemy import SQLAlchemy

from sotu import nlp

from sotu.model import President, Year, Speech, Word
from sotu.model import connect_to_db, db
from server import app
connect_to_db(app)


# All the speech filepaths
all_speeches = Speech.query.all()
all_presidents = President.query.all()


def create_speech_doc(speeches):
    """Create the parsed files and save to speech_doc folder"""
    for speech in speeches:

        path_ending = speech.text.split('/')[2][:-4]

        speech_doc = nlp.create_parsed_file(speech.text)

        speech_doc.to_disk('./speech_doc/' + path_ending)

        # print(path_ending)


def create_presidential_doc(presidents):
    """Create the parsed file for a presidents corpus of speeches and save"""
    for president in presidents:

        speeches = president.speeches

        path_ending = f'{president.pres_id}_{president.name.split()[-1]}'

        pres_speeches = ''

        for speech in speeches:

            path = speech.text
            text = open(path)

            pres_speeches += '\n' + text.read()

            text.close()

        pres_doc = nlp.NLP(pres_speeches)

        pres_doc.to_disk('./president_doc/' + path_ending)
