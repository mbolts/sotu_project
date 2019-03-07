"""Used to make json files for d3 usage"""

import json

from flask_sqlalchemy import SQLAlchemy
from spacy.tokens import Doc

from sotu import word_count
from sotu.model import President, Year, Speech, Word
from sotu.model import connect_to_db, db
from sotu.nlp import NLP

from server import app

connect_to_db(app)


def make_json_freq(exclude=None):
    """
    Create a list of dictionaries of word frequencies
    Takes an optional exclude argument of any president that
    you want to exclude from the word freq count

    """

    word_freq = []

    # get list of president objects
    words = Word.query.all()

    for word in words:
        # initiate an empty dictionary, and populate it
        if exclude:
            if word.get_first_use_president().name == exclude:
                continue

        word_freq.append({'word': word.text,
                          'first_user': word.get_first_use_president().name,
                          'first_date': word.get_first_use_date().strftime('%B %d, %Y'),
                          'freq': word.freq_corpus,
                          'count': word.count,
                          })

    with open('static/word_freq.json', 'w') as f:
        f.write(json.dumps(word_freq))


def make_json_speech_text():
    """

    """

    parties = {'Unaffiliated': 0,
               'Federalist': 1,
               'Democratic-Republican': 2,
               'Democratic': 3,
               'Whig': 4,
               'Republican': 5}

    speech_text = []

    for party in parties:
        speech_text.append({'party': party, 'speeches': []})

    # get list of president objects
    speeches = Speech.query.all()

    for speech in speeches:
        text = open(speech.text)
        party = President.query.get(speech.pres_id).party_affiliation

        party_speeches = speech_text[parties[party]]['speeches']
        party_speeches.append({'president': President.query.get(speech.pres_id).name,
                               'date': speech.date.strftime('%B %d, %Y'),
                               'text': text.read(),
                               })

        text.close()

    with open('static/speech_text.json', 'w') as f:
        f.write(json.dumps(speech_text))

    return speech_text


def make_json_wc():
    """
    Create a list of dictionaries of word counts

    """

    word_counts = []

    # get list of president objects
    presidents = President.query.all()

    for president in presidents:
        # initiate an empty dictionary, and populate it
        if president.years:

            word_counts.append({'name': president.name,
                                'words_per': president.get_word_count_per_speech(),
                                'total': president.get_total_word_count(),
                                'first_year': president.years[0].year,
                                'party': president.party_affiliation})

        elif president.name == 'William Henry Harrison':
            word_counts.append({'name': president.name,
                                'words_per': president.get_word_count_per_speech(),
                                'total': president.get_total_word_count(),
                                'first_year': 1841,
                                'party': president.party_affiliation})

        elif president.name == 'James A. Garfield':
            word_counts.append({'name': president.name,
                                'words_per': president.get_word_count_per_speech(),
                                'total': president.get_total_word_count(),
                                'first_year': 1881,
                                'party': president.party_affiliation})

    with open('static/word_counts.json', 'w') as f:
        f.write(json.dumps(word_counts))


def get_first_use_context():
    """ Get the context for the first usage of each word """

    word_context = []
    vocab = NLP.vocab

    # get list of speech objects
    speeches = Speech.query.all()

    # get a list of the text of each word
    words = [word.text for word in Word.query.all()]

    # loop through each speech object
    for speech in speeches:

        # create a tokenized file of the doc from the speech
        tokens = Doc(vocab).from_disk(speech.doc_path)

        # loop through each token in the speech
        for token in tokens:
            # check to see if the text of the token is in the words list
            if token.text in words:
                print('in if')
                # Get the context of the token, and the word object
                sent = token.sent
                word = Word.query.filter_by(text=token.text).first()

                # append the context and information to the word_context list
                word_context.append({'word': word.text,
                                     'first_user': word.get_first_use_president().name,
                                     'first_date': word.get_first_use_date().strftime('%B %d, %Y'),
                                     'sentence': sent.text,
                                     })

                words.remove(word.text)
                print(f'word ({word}) context: {sent}')

    with open('static/word_context.json', 'w') as f:
        f.write(json.dumps(word_context))


def make_similarity_json():
    """Get a detailed listing of the similarities between presidents"""

    presidents = President.query.all()

    pres_sim = []

    for pres_1 in presidents:
        pres_sim.append({'name': pres_1.name,
                         'similarity': [{pres_2.name: pres_1.get_similarity(pres_2)
                                         for pres_2 in presidents}][0],
                         'party': pres_1.party_affiliation,
                         'birth_decade': pres_1.decade_of_birth(),
                         'pres_id': pres_1.pres_id})
        print(pres_1)

    with open('static/pres_sim_2.json', 'w') as f:
        f.write(json.dumps(pres_sim))

    return pres_sim


def make_similarity_matrix_csv():
    """Create a csv file of the similarity matrix between all presidents"""

    presidents = President.query.all()

    with open('static/pres_sim.json') as f:

        pres_sim = json.load(f)

        sim_matrix = ''

        for pres_1 in presidents:
            for pres_2 in presidents:
                row = (f'{pres_1.pres_id},{pres_2.pres_id},{pres_sim[pres_1.name][pres_2.name]}\n')

                sim_matrix += row

    with open('sim_matrix.csv', 'w') as f:
        f.write(sim_matrix)

    return sim_matrix


def update_similarity_matrix():

    with open('./static/data/sim_matrix.csv', 'r') as input:
        with open('./static/data/sim_matrix_updated.csv', 'w') as output:
            for i, row in enumerate(input):
                if i == 0:
                    continue
                pres_1_id, pres_2_id, sim = row.strip().split(',')
                pres_1 = President.query.get(pres_1_id)
                pres_2 = President.query.get(pres_2_id)

                pres_1_party = pres_1.party_affiliation
                pres_2_party = pres_2.party_affiliation

                output.write(','.join([pres_1_id, pres_2_id,
                                       sim, pres_1_party,
                                       pres_2_party]))
                output.write('\n')


def make_wc_by_decade_json():
    """Create a json file of the word counts by decade"""

    decades = [1790, 1800, 1810, 1820, 1830, 1840, 1850, 1860,
               1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940,
               1950, 1960, 1970, 1980, 1990, 2000, 2010]

    decade_word_freq = {'name': 'decades', 'children': []}

    for decade in decades:
        print(decade)
        speeches = word_count.get_decade_speeches(decade)
        lemma_counter = word_count.lemma_word_count_filtered(speeches)
        lemma_counts = word_count.lemma_word_count_all(speeches)
        word_objects = []
        word_freq = word_count.get_word_freq_dict(lemma_counts)

        for word in lemma_counter.most_common(40):
            print(word)
            word_objects.append({'name': word[0],
                                 'count': word[1],
                                 'freq': word_freq[word[0]][0]})

        decade_word_freq['children'].append({'name': decade,
                                             'children': word_objects,
                                             })

    with open('./static/data/wf_by_decade.json', 'w') as f:
        f.write(json.dumps(decade_word_freq))

    return decade_word_freq


def make_wc_by_decade_csv():
    """Create a json file of the word counts by decade"""

    decades = [1790, 1800, 1810, 1820, 1830, 1840, 1850, 1860,
               1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940,
               1950, 1960, 1970, 1980, 1990, 2000, 2010]

    # decades = [1790, 1890, 1990]

    rows = {}

    count = 0

    with open('./static/data/wf_by_decade.csv', 'w') as f:
        f.write('word,')
        f.write(','.join([str(decade) for decade in decades]))
        f.write('\n')

        for decade in decades:
            print(decade)

            speeches = word_count.get_decade_speeches(decade)
            lemma_counter = word_count.lemma_word_count_filtered(speeches)
            lemma_counts = word_count.lemma_word_count_all(speeches)
            word_freq = word_count.get_word_freq_dict(lemma_counts)

            for word in lemma_counter.most_common(10):
                # print(word)
                if not rows.get(word[0]):
                    zeroes = [0] * count
                    rows[word[0]] = zeroes

                elif len(rows.get(word[0])) < count:
                    zeroes = count - len(rows.get(word[0]))
                    rows[word[0]].extend([0] * zeroes)

                rows[word[0]].append(str(word_freq[word[0]][0]))

            count += 1

        for row in rows:
            if len(rows[row]) < count:
                zeroes = count - len(rows[row])
                rows[row].extend([0] * zeroes)

        decade_count = 1

        for decade in decades:
            print(decade)

            speeches = word_count.get_decade_speeches(decade)
            lemma_counts = word_count.lemma_word_count_all(speeches)
            word_freq = word_count.get_word_freq_dict(lemma_counts)

            for word in rows:
                word_list = rows[word]
                for idx, cell in enumerate(word_list):
                    if idx != decade_count:
                        continue
                    elif word_freq.get(word, 0) == 0:
                        continue
                    elif cell == 0:
                        word_list[idx] = word_freq[word][0]

            decade_count += 1

        for row in rows:
            row = row + ',' + ','.join([str(r) for r in rows[row]])
            f.write(row)
            f.write('\n')

    return rows


def make_hierarchy_json():
    """Create a json file of the word counts by decade by century by pres"""

    centuries = {'1700s': [1790], '1800s': [1800, 1810, 1820, 1830, 1840, 1850,
                 1860, 1870, 1880, 1890], '1900s': [1900, 1910, 1920, 1930,
                 1940, 1950, 1960, 1970, 1980, 1990], '2000s': [2000, 2010]}

    century_root = {'name': 'century', 'children': []}

    for century in centuries:
        century_root['children'].append({'name': century,
                                         'children': centuries[century]})

    for idx, century in enumerate(century_root['children']):
        print(century)

        for i, decade in enumerate(century['children']):
            decade_pres = set()
            speeches = []
            years = range(decade, decade + 10)
            century['children'][i] = {'name': decade, 'children': []}

            for year in years:
                year_obj = Year.query.get(year)
                if year_obj.speeches:
                    speeches.extend(year_obj.speeches)
                if year_obj.presidents:
                    decade_pres.add(year_obj.presidents)

            pres_nodes = []

            for pres in decade_pres:
                pres_speeches = []
                for speech in speeches:
                    if speech.pres_id == pres.pres_id:
                        pres_speeches.append(speech)

                pres_wc = word_count.lemma_word_count_filtered(pres_speeches).most_common(15)

                wc_dict = [{'name': word[0], 'count': word[1]}
                           for word in pres_wc]

                pres_nodes.append({'name': pres.name, 'children': wc_dict})

            century_root['children'][idx]['children'][i]['children'].extend(pres_nodes)

    with open('./static/data/hierarchy.json', 'w') as f:
        f.write(json.dumps(century_root))
