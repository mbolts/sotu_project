from nlp_functions import *
import time
from collections import Counter
from model import President, Year, Speech
from model import connect_to_db, db
from flask_sqlalchemy import SQLAlchemy
from server import app
connect_to_db(app)
# print("Connected to DB.")

vocab = NLP.vocab

# All the speech filepaths
SPEECHES = Speech.query.all()


# Small test string

test_string = """The State of the Union Address is an annual message delivered by the President of the United States to a joint session of the United States Congress at the beginning of each calendar year in office. The message typically includes a budget message and an economic report of the nation, and also allows the President to propose a legislative agenda and national priorities."""


# List of Speech objects that Ike made
ike_speeches = President.query.filter_by(name='Dwight D. Eisenhower').one().speeches

ike_speech = ike_speeches[0]

ike_doc = Doc(vocab).from_disk(ike_speech.doc_path)

# Create a spaCy object out of each speech

# start = time.time()
# print(start)

# ike_speeches_parsed = [create_parsed_file(speech.text) 
#                         for speech in ike_speeches]

# end = time.time()
# print(end)
# print('time elapsed creating ike_speeches_parsed', end - start)
# takes 8.5 seconds

# Create a spaCy object out of all the speeches combined into one text

# start = time.time()
# print(start)

# ike_master_speech = create_master_doc(ike_speeches)
# print('processed ike_master_speech')

# ike_master_parsed = NLP(ike_master_speech)
# print('processed ike_speeches_parsed')

# end = time.time()
# print(end)
# print('time elapsed creating ike_speeches_parsed', end - start)
# takes 10 seconds

# create a lemmatized word count dict of all of ike's parsed speeches

# start = time.time()
# print(start)

# ike_word_count = create_lemma_wc_dict(ike_master_parsed)

# end = time.time()
# print(end)
# print('time elapsed creating lemmatized wc dict', end - start)






