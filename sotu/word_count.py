"""Create word count items for d3 usage later"""

from collections import Counter

from spacy.tokens import Doc

# from sotu.model import Year
from sotu.nlp import NLP


BORING_WORDS = set(['the', 'in', 'and', 'if', 'then', 'but', 'than',
                    'of', 'to', 'have', 'a', 'this', 'for', 'from',
                    'there', "'s", "'ve", "n't", 'that', 'be'])


def word_count_all(speeches):
    """ Get the word count for all speech objects passed in """

    # initialize the counter for use in the for loop
    word_count_text = Counter()

    for speech in speeches:
        # retrieve the spaCy doc object from the file path
        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        # create word count dict
        word_list = []

        for token in doc:

            if token.is_punct or '\n' in token.text:
                continue

            word_list.append(token.text.lower())

        word_count_text += Counter(word_list)

    return word_count_text


def get_decade_speeches(decade):
    """Get a list of all the speech objects from the given decade"""

    speech_list = []

    years = Year.query.all()

    for year in years:
        if year.get_decade() == decade:
            speeches = year.speeches
            speech_list.extend(speeches)

    return speech_list


def lemma_word_count_filtered(speeches):
    """ Get the lemma word count for all speech objects passed in """

    # initialize the counter for use in the for loop
    word_count_lemmas = Counter()

    for speech in speeches:

        # retrieve the spaCy doc object from the file path
        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        # create lemmas word count dict
        lemma_list = []

        for token in doc:

            if (token.is_punct
                    or token.like_num
                    or '\n' in token.text
                    or token.text == "$"
                    or token.is_space):
                continue

            if token.is_stop:
                continue

            if token.lemma_ in BORING_WORDS:
                continue

            if token.lemma_ == '-PRON-':
                continue

            lemma_list.append(token.lemma_)

        word_count_lemmas += Counter(lemma_list)

    return word_count_lemmas


def lemma_word_count_all(speeches):
    """ Get the lemma word count for all speech objects passed in """

    # initialize the counter for use in the for loop
    word_count_lemmas = Counter()

    for speech in speeches:

        # retrieve the spaCy doc object from the file path
        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        # create lemmas word count dict
        lemma_list = []

        for token in doc:

            if (token.is_punct
                    or '\n' in token.text
                    or token.is_space):
                continue

            lemma_list.append(token.lemma_)

        word_count_lemmas += Counter(lemma_list)

    return word_count_lemmas


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


def get_word_freq_dict(word_count):
    """ Takes in a counter object and returns a dictionary
        with the word and the freq number
     """

    word_total = sum(word_count.values())

    word_frequency = {}

    for word in word_count:

        count = word_count[word]

        normalized_wc = (count * 10000) / word_total

        word_frequency[word] = [normalized_wc, count]

    return word_frequency


###################
# Below functions were used for checking that the above functions
# were working properly.


def get_the_thes(speeches):
    """Function to check that lemma count is working"""

    thes = []
    for speech in speeches:

        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        for token in doc:
            if token.text.lower() == 'the':
                thes.append(token)

    return thes


def is_punctuation(speeches):
    """Create a set of all the punctuation in spaCy"""

    punctuation = set()

    for speech in speeches:

        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        for token in doc:

            if token.is_punct:
                punctuation.add(token.text)

    return punctuation


def is_stop_word(speeches):
    """Create a set of all the stops in spaCy"""

    stop_words = set()

    for speech in speeches:

        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        for token in doc:

            if token.is_stop:
                stop_words.add(token.text)

    return stop_words


def get_pronouns(speeches):
    """Create a set of all the pronouns in spaCy"""
    pronouns = set()

    for speech in speeches:

        vocab = NLP.vocab
        doc = Doc(vocab).from_disk(speech.doc_path)

        for token in doc:

            if token.lemma_ == '-PRON-':
                pronouns.add(token.text.lower())

    return pronouns
