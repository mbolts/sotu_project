import spacy
from spacy.tokens import Doc
from spacy.vocab import Vocab

NLP = spacy.load('en')


NLP.Defaults.stop_words = {
    'hence', 'a', 'anything', 'sometimes', 'though', 'off', 'others', 
    'sixty', 'whereafter', 'everywhere', 'forty', 'get', 'has', 'his', 
    'herein', 'whoever', 'between', 'only', 'anywhere', 'mine', 'they', 
    'beforehand', 'how', 'latterly', 'twenty', 'since', 'beyond', 
    'amount', 'as', 'again', 'call', 'may', 'about', 'name', 'fifteen', 
    'becomes', 'for', 'see', 'can', 'yourself', 'few', 'cannot', 
    'nevertheless', 'if', 'some', 'much', 'anyhow', 'she', 'yet', 
    'whatever', 'against', 'own', 'themselves', 'over', 'everything', 
    'bottom', 'ca', 'into', 'my', 'have', 'please', 'alone', 'empty', 
    'itself', 'otherwise', 'then', 'top', 'both', 'during', 'therefore', 
    'her', 'does', 'should', 'one', 'anyway', 'former', 'first', 
    'hereafter', 'last', 'per', 'just', 'whether', 'whenever', 'every', 
    'almost', 'two', 'whereas', 'are', 'above', 'seemed', 'other', 
    'amongst', 'any', 'elsewhere', 'used', 'but', 'further', 'until', 
    'either', 'none', 'eight', 'hereupon', 'namely', 'toward', 'among', 
    'our', 'put', 'thence', 'upon', 'already', 'do', 'must', 'well', 
    'onto', 'which', 'fifty', 'who', 'yours', 'always', 'us', 'these', 
    'perhaps', 'something', 'make', 'someone', 'than', 'below', 'myself', 
    'on', 'three', 'thereafter', 'third', 'behind', 'due', 'nowhere', 
    'back', 'those', 'by', 'is', 'six', 'from', 'next', 'thereupon', 
    'another', 'in', 'regarding', 'while', 'unless', 'had', 'nor', 
    'here', 'less', 'out', 'ten', 'together', 'down', 'what', 'everyone', 
    'and', 'several', 'without', 're', 'take', 'nothing', 'front', 
    'full', 'whole', 'whom', 'same', 'because', 'doing', 'herself', 
    'be', 'most', 'up', 'somehow', 'became', 'whence', 'me', 'give', 
    'an', 'around', 'or', 'why', 'all', 'also', 'very', 'made', 'with', 
    'really', 'will', 'show', 'was', 'no', 'becoming', 'whereby', 
    'eleven', 'himself', 'hers', 'least', 'the', 'when', 'part', 'done', 
    'however', 'many', 'latter', 'not', 'yourselves', 'quite', 'where', 
    'of', 'twelve', 'before', 'after', 'we', 'it', 'become', 'hereby', 
    'once', 'five', 'nine', 'nobody', 'else', 'neither', 'afterwards', 
    'across', 'ever', 'its', 'move', 'him', 'ours', 'enough', 'meanwhile', 
    'therein', 'he', 'within', 'besides', 'side', 'whose', 'moreover', 
    'somewhere', 'am', 'seems', 'each', 'keep', 'too', 'still', 'along', 
    'go', 'sometime', 'might', 'formerly', 'them', 'towards', 'at', 
    'their', 'although', 'thru', 'were', 'even', 'could', 'never', 
    'using', 'say', 'this', 'to', 'often', 'being', 'under', 'seem', 
    'rather', 'noone', 'wherever', 'various', 'now', 'been', 'via', 
    'whither', 'would', 'hundred', 'that', 'there', 'more', 'ourselves', 
    'thereby', 'whereupon', 'four', 'i', 'except', 'serious', 'thus', 
    'throughout', 'anyone', 'indeed', 'so', 'wherein', 'through', 'you', 
    'such', 'your', 'mostly', 'beside', 'seeming', 'did',
}

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









