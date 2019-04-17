"""Natural Language Processing helper functions"""

# import spacy

NLP = 0  # spacy.load('en')


def open_file(filepath):
    """ Utility function to open and read files """

    f = open(filepath)

    file_contents = f.read()

    f.close()

    return file_contents


def create_parsed_file(filepath):
    """ Function to get file ready for linguistic analysis """

    f = open_file(filepath)

    parsed_file = NLP(f)

    return parsed_file


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
