# Create spacy files on disk to speed load time on webapp


from nlp import create_parsed_file, NLP
from model import President, Year, Speech, Word
from model import connect_to_db, db
from flask_sqlalchemy import SQLAlchemy
from server import app
connect_to_db(app)
# print("Connected to DB.")

# All the speech filepaths
all_speeches = Speech.query.all()
all_presidents = President.query.all()


# Create the parsed files and save to speech_doc folder

def create_speech_doc(speeches):

    i = 0

    for speech in all_speeches:

        path_ending = speech.text.split('/')[2][:-4]

        speech_doc = create_parsed_file(speech.text)

        speech_doc.to_disk('./speech_doc/' + path_ending)

        i += 1

        print(path_ending)



def create_presidential_doc(presidents):

    for president in presidents:

        speeches = president.speeches

        path_ending = str(president.pres_id) + '_' + president.name.split()[-1]

        pres_speeches = ''

        for speech in speeches:

            path = speech.text
            text = open(path)

            pres_speeches += '\n' + text.read()

            text.close()

        pres_doc = NLP(pres_speeches)

        pres_doc.to_disk('./president_doc/' + path_ending)

        print(path_ending)








