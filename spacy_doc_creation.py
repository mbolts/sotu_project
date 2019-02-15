# Create spacy files on disk to speed load time on webapp


from nlp_functions import *
from model import President, Year, Speech
from model import connect_to_db, db
from flask_sqlalchemy import SQLAlchemy
from server import app
connect_to_db(app)
# print("Connected to DB.")

# All the speech filepaths
SPEECHES = Speech.query.all()


# Create the parsed files and save to speech_doc folder

i = 0

for speech in SPEECHES:

    path_ending = speech.text.split('/')[2][:-4]

    speech_doc = create_parsed_file(speech.text)

    speech_doc.to_disk('./speech_doc/' + path_ending)

    i += 1

    print(path_ending)






