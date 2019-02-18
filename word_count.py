import json
import datetime

from collections import Counter
from model import President, Year, Speech, Word
from model import connect_to_db, db
from flask_sqlalchemy import SQLAlchemy
from server import app
connect_to_db(app)

def word_count_all(speeches):
    """ Get the word count for all speech objects passed in """

    # initialize the counter for use in the for loop
    # word_count_lemmas = Counter()
    word_count_text = Counter()

    for speech in speeches:

        # speech_index = speech.doc_path.split('_')[-1]
        # retrieve the spaCy doc object from the file path
        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        # create lemmas word count dict
        lemma_list = []
        word_list = []

        for token in doc:

            if token.is_punct or '\n' in token.text:
                continue

            word_list.append(token.text.lower())

            # lemma_list.append(token.lemma_)


        # word_count_lemmas += Counter(lemma_list)
        word_count_text += Counter(word_list)

    return word_count_text


def get_word_freq(word_count):
    """ Takes in a counter object and returns a list of lists
        with the word and the freq number
     """
    
    word_total = sum(word_count.values())

    word_frequency = []

    for word in word_count:

        count = word_count[word]

        normalized_wc = (count * 10000) / word_total

        word_frequency.append([word, normalized_wc])

    word_frequency = sorted(word_frequency, 
                            key=lambda word: word[1],
                            reverse=True)

    return word_frequency



def is_punctuation(speeches):

    punctuation = set()

    for speech in speeches:

        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        for token in doc:

            if token.is_punct:
                punctuation.add(token.text)

    return punctuation


def get_pronouns(speeches):

    pronouns = set()

    for speech in speeches:

        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        for token in doc:

            if token.lemma_ == '-PRON-':
                pronouns.add(token.text.lower())

    return pronouns    


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
    f.write(json.dumps(word_counts))



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
                            'freq': word.freq_corpus})

    f = open('static/word_freq.json', 'w')
    f.write(json.dumps(word_freq))


