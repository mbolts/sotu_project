import spacy
from spacy.tokens import Doc
from spacy.vocab import Vocab

NLP = spacy.load('en')
vocab = NLP.vocab




def open_file(file):
    """ Utility function to open and read files """

    f = open(file)

    file = f.read()

    f.close()

    return file


def create_parsed_file(filepath):
    """ Function to get file ready for linguistic analysis """

    file = open_file(filepath)

    parsed_file = NLP(file)

    return parsed_file


def create_lemma_wc_dict(parsed_file):

    parsed_dict = {}

    for token in parsed_file:

        if not token.is_alpha:
            continue

        else:
            token = token.lemma_
            parsed_dict[token] = parsed_dict.get(token, 0) + 1

    return parsed_dict

def create_master_doc_from_speech(files):
    """ Create a master file for the passed in Speech objects """

    master_doc = ''

    for file in files:
        speech = open_file(file.text)

        master_doc += '\n' + speech

    return master_doc


def normalize_text(textfile):
    """ Return a normalized version of the text file for non-spaCy processing """

    normalized_text = ''

    for word in textfile.split():
        word = word.lower()
        normalized_text += f"{word} "

    return normalized_text


def create_lemma_file(doc):
    """ Create a text file of just the lemmas, excluding stop words """

    lemma_file = ''

    for token in doc:

        if (token.is_punct or 
            '\n' in token.text or 
            token.is_stop or
            token.like_num):
                continue

        lemma_file += f'{token.lemma_} '

    return lemma_file


def get_doc_similarity(doc1, doc2):
    """ Gets the similarity between two documents

        Takes in two doc objects created using spaCy

        Returns the built in similarity of these two docs:

        Make a semantic similarity estimate. 
        The default estimate is cosine similarity 
        using an average of word vectors.

        Returns as a float, a scalar similarity score. 
        Higher is more similar.

     """

    similarity = doc1.similarity(doc2)

    return similarity



