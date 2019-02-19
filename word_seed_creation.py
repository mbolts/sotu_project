# Create spacy files on disk to speed load time on webapp


from nlp import NLP, Doc
from word_count import *
from model import President, Year, Speech, Word
from model import connect_to_db, db
from flask_sqlalchemy import SQLAlchemy
from server import app
connect_to_db(app)
# print("Connected to DB.")

# All the speech filepaths
all_speeches = Speech.query.all()

one_speech = [Speech.query.first()]



# Create the parsed files and save to speech_doc folder


vocab = NLP.vocab

word_all_appearances_csv = open("words.csv", "a")


def find_word_first_appearance(speeches):
# Dictionary of each word with the year they first appeared as the key
    word_dict = {}

    for speech in speeches:

        speech_doc = Doc(vocab).from_disk(speech.doc_path)

        for token in speech_doc:

            text = token.text.lower()
            # print('text is ', text, 'speech.year is ', speech.year)

            if word_dict.get(text):
                continue

            if not token.is_alpha:
                continue

            if text.startswith('-'):
                text = text[1:]

            word_dict[text] = speech.date

    return word_dict


def find_word_appearance(speeches):
# Dictionary of each word with the year they first appeared as the key
    word_dict = {}

    for speech in speeches:

        speech_doc = Doc(vocab).from_disk(speech.doc_path)

        for token in speech_doc:

            text = token.text.lower()
            # print('text is ', text, 'speech.year is ', speech.year)

            if not token.is_alpha:
                continue

            if text.startswith('-'):
                text = text[1:]

            if word_dict.get(text):
                word_dict[text][1].add(speech.date.strftime('%Y-%m-%d'))

            else:
                word_dict[text] = [speech.date.strftime('%Y-%m-%d'), 
                                    {speech.date.strftime('%Y-%m-%d'),}]

    return word_dict


def write_words_to_file(speeches):

    word_appearances = find_word_appearance(speeches)
    print('word_appearance finished')

    word_freq = get_word_freq(word_count_all(speeches))
    print('word_freq finished')

    for word in word_freq:
        print('word is ', word)

        row = '\n'

        if not word_appearances.get(word[0]):
            continue

        row += f'{word[0]},{word[1]},{word[2]},{word_appearances[word[0]]}'

        print('row is ', row)

        word_all_appearances_csv.write(row)









