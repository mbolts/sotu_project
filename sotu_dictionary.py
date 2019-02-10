import sys
import os

path = './speech_text'
file_list = []


# Open all the files in the SOTU folder, add the read-in file and year 
# as a list to the file_list
for filename in os.listdir(path):
    print('filename is', filename)
    # print('type of name', type(filename))
    file = open('./speech_text/' + filename)
    file_list.extend([[file.read(), filename[-8:-4]]])

# for file in file_list



def open_file(file):
    # file = sys.argv[1] + '.txt'

    f = open(file)
    # year = sys.argv[1][-4:]

    return f.read()

def create_dictionary(file, year):
    sotu_dictionary = {}
    speech = open_file(file)
    words = speech.split()

    for word in words:
        # print(word)
        sotu_dictionary[word] = sotu_dictionary.get(word, [year])

    return sotu_dictionary


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