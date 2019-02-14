from nlp_functions import *
from collections import Counter
from model import President, Year, Speech
from model import connect_to_db, db
from flask_sqlalchemy import SQLAlchemy
from server import app
connect_to_db(app)

large_NLP = spacy.load('en_vectors_web_lg')

def get_similarity_pres(pres_1, pres_2):

    p1_speeches = President.query.filter_by(name=pres_1).one().speeches
    p2_speeches = President.query.filter_by(name=pres_2).one().speeches

    vocab = large_NLP.vocab
    count = 0
    similarity = 0

    for speech in p1_speeches:
        p1_doc = Doc(vocab).from_disk(speech.doc_path)
        print('in p1 speech', speech)
        for speech in p2_speeches:
            p2_doc = Doc(vocab).from_disk(speech.doc_path)
            print('in p2 speech', speech)
            print(p1_doc.similarity(p2_doc))
            similarity += p1_doc.similarity(p2_doc)
            count += 1

    return (similarity / count)












