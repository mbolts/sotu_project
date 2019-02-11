import sys
import os

import time
from model import Speech
import spacy

nlp = spacy.load('en')


# path = './speech_text'
# file_list = []


# Open all the files in the SOTU folder, add the read-in file and year 
# as a list to the file_list
# for filename in os.listdir(path):
#     print('filename is', filename)
#     # print('type of name', type(filename))
#     file = open('./speech_text/' + filename)
#     file_list.extend([[file.read(), filename[-8:-4]]])



def create_speech_list(speeches):
    """ Create a list with all of the speech file paths """
    file_list = []

    for speech in speeches:
        file_list.append(speech.text)

    return file_list


def open_file(file):

    f = open(file)

    return f.read()

def create_unparsed_wc_dictionary(files):
    start = time.time()

    unparsed_wc_dictionary = {}

    for file in files:

        speech = open_file(file)
        words = speech.split()

        for word in words:
            # print(word)
            unparsed_wc_dictionary[word] = unparsed_wc_dictionary.get(word, 1) + 1

    end = time.time()
    print('Time Elapsed: ', end - start)

    return unparsed_wc_dictionary

def create_master_doc(files):
    """ Create a master file for the full speech corpus """

    master_doc = ''

    for file in files:
        speech = open_file(file)

        master_doc += '\n' + speech

    return master_doc

def create_pres_corpus(files):

    pres_speeches = ''

    for file in files:

        speech = open_file(file)

        pres_speeches += '\n' + speech

    return pres_speeches

def create_decade_corpus(files, year):

    decade_speeches = ''

    



# create_dictionary(file_list[0], file_list[1])

# import spacy

# nlp = spacy.load('en')

# file = open('Adams_1797.txt')

# adams_1797 = file.read()
# adams_1797 = nlp(adams_1797)
# adams_1797_sents = list(adams_1797.sents)

# adams_dict = {}


# for token in adams_1797:

#     if token.text == '\n' or token.text == '\n\n':
#         continue

#     adams_dict[token.text] = [token, token.pos_, token.dep_]

# import spacy
# from spacy import displacy

# nlp = spacy.load('en')
# doc = nlp(u'Apple is looking at buying U.K. startup for $1 billion')
# displacy.serve(doc, style='dep')