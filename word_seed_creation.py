# Create spacy files on disk to speed load time on webapp


from nlp_functions import *
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

# word_csv = open("words.csv", "a")


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


def write_words_to_file(speeches):

    word_first_appearance = find_word_first_appearance(speeches)
    print('word_first_appearance finished')

    word_freq = get_word_freq(word_count_all(speeches))
    print('word_freq finished')

    for word in word_freq:
        print('word is ', word)

        row = '\n'

        if not word_first_appearance.get(word[0]):
            continue

        row += f'{word[0]},{word_first_appearance[word[0]]},{word[1]}'

        print('row is ', row)

        word_csv.write(row)









