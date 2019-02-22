import json
import datetime

from collections import Counter
from model import President, Year, Speech, Word
from model import connect_to_db, db
from flask_sqlalchemy import SQLAlchemy
from server import app
from nlp import NLP, Doc
connect_to_db(app)

all_speeches = Speech.query.all()
ten_speeches = all_speeches[:11]
two_speeches = all_speeches[:2]
one_speech = all_speeches[0]


BORING_WORDS = set('the', 'in', 'and', 'if', 'then', 'but', 'than')


def word_count_all(speeches):
    """ Get the word count for all speech objects passed in """

    # initialize the counter for use in the for loop
    # word_count_lemmas = Counter()
    word_count_text = Counter()
    all_words = []

    # for speech in speeches:



        # speech_index = speech.doc_path.split('_')[-1]
        # retrieve the spaCy doc object from the file path
    vocab = NLP.vocab
    doc = Doc(vocab).from_disk(speeches.doc_path)

    # create lemmas word count dict
    # lemma_list = []
    word_list = []

    thes = []

    for token in doc:
        if token.text.lower() == 'the':
            thes.append(token)            

        if token.is_punct or '\n' in token.text:
            continue

        word_list.append(token.text.lower())


        # lemma_list.append(token.lemma_)


    # word_count_lemmas += Counter(lemma_list)
    word_count_text += Counter(word_list)
    all_words += word_list

    return all_words, thes


def lemma_word_count_all(speeches):
    """ Get the word count for all speech objects passed in """


    # initialize the counter for use in the for loop
    word_count_lemmas = Counter()

    for speech in speeches:

        # speech_index = speech.doc_path.split('_')[-1]
        # retrieve the spaCy doc object from the file path
        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        # create lemmas word count dict
        lemma_list = []
        thes = []

        for token in doc:

            if (token.is_punct 
                or token.like_num
                or '\n' in token.text
                or token.text == "$"):
                continue

            # if token.is_stop:
            #     continue

            if token.lemma_ in BORING_WORDS:
                continue

            if token.lemma_ == '-PRON-':
                continue

            lemma_list.append(token.lemma_)

        word_count_lemmas += Counter(lemma_list)

    return word_count_lemmas


def get_the_thes(speeches):

    thes = []
    for speech in speeches:

        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        for token in doc:
            if token.text.lower() == 'the':
                thes.append(token)

    return thes


def get_word_freq(word_count):
    """ Takes in a counter object and returns a list of lists
        with the word and the freq number
     """
    
    word_total = sum(word_count.values())

    word_frequency = []

    for word in word_count:

        count = word_count[word]

        normalized_wc = (count * 10000) / word_total

        word_frequency.append([word, normalized_wc, count])

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


def is_stop_word(speeches):

    stop_words = set()

    for speech in speeches:

        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        for token in doc:

            if token.is_stop:
                stop_words.add(token.text)

    return stop_words


def get_pronouns(speeches):

    pronouns = set()

    for speech in speeches:

        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        for token in doc:

            if token.lemma_ == '-PRON-':
                pronouns.add(token.text.lower())

    return pronouns    




