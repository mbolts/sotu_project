import spacy

NLP = spacy.load('en')

def create_parsed_text(filename):
    """ Function to get file ready for linguistic analysis """

    parsed_file = NLP(filename)

    return parsed_file


def create_lemma_wc_dict(parsed_file):

    parsed_dict = {}

    for token in parsed_file:
        token = token.lemma_
        parsed_dict[token] = parsed_dict.get(token, 0) + 1

    return parsed_dict

