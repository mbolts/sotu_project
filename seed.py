"""Utility file to seed ratings database from data in seed_data"""

import datetime

from spacy.tokens import Doc

from sotu import nlp

from sotu.model import President, Year, Speech, Word, Token
from sotu.model import connect_to_db, db

from server import app


def load_speeches():
    """Load speeches into database."""

    print("Speeches")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate speeches
    Speech.query.delete()

    # Data came from these sources:
    # https://www.presidency.ucsb.edu/documents/presidential-documents-archive-guidebook/annual-messages-congress-the-state-the-union
    # https://www.kaggle.com/rtatman/state-of-the-union-corpus-1989-2017

    file = open("seed_data/speeches.csv")

    # Read speech file and insert data
    for row in file:
        row = row.rstrip()

        year, date, president, delivery, text = row.split(",")
        year = year[-4:]
        year = int(year)

        pres = President.query.filter_by(name=president).first()

        if pres is None:
            continue

        pres_id = pres.pres_id

        path_ending = text.split('/')[2][:-4]

        doc_path = './speech_doc/' + path_ending

        if year < 1900:
            date_time = datetime.datetime.strptime(date, "%b %d %Y")
            speech = Speech(date=date_time,
                            pres_id=pres_id,
                            delivery=delivery,
                            text=text,
                            doc_path=doc_path,
                            year=year,
                            )

        elif date == '':
            continue

        else:
            date_time = datetime.datetime.strptime(date, "%d-%b-%Y")
            speech = Speech(date=date_time,
                            pres_id=pres_id,
                            delivery=delivery,
                            text=text,
                            doc_path=doc_path,
                            year=year,
                            )

        # We need to add to the session or it won't ever be stored
        db.session.add(speech)

    file.close()

    # Once we're done, we should commit our work
    db.session.commit()


def load_years():
    """Load years into database."""

    print('Years')

    Year.query.delete()

    years = []

    file = open("seed_data/speeches.csv")

    for row in file:
        row = row.rstrip()

        year, x, president = row.split(",")[:3]
        year = year[-4:]
        year = int(year)

        pres = President.query.filter_by(name=president).first()

        if pres is None and year not in years:
            year = Year(year=year,
                        )

            years.append(year)

        elif pres is None or year in years:
            continue

        else:

            pres_id = pres.pres_id

            years.append(year)

            year = Year(year=year,
                        pres_id=pres_id,
                        )

        # We need to add to the session or it won't ever be stored
        db.session.add(year)

    file.close()

    # Once we're done, we should commit our work
    db.session.commit()


def load_presidents():
    """Load presidents into database."""

    print('Presidents')

    President.query.delete()

    file = open("seed_data/presidents.csv")

    i = 1

    for row in file:
        row = row.rstrip()

        name, party_affiliation, dob, state, img_path = row.split(',')

        datetime_dob = datetime.datetime.strptime(dob, "%B %d %Y")

        if name.endswith('Washington'):
            name = name[-17:]

        doc_path = './president_doc/' + str(i) + '_' + name.split()[-1]

        president = President(name=name,
                              party_affiliation=party_affiliation,
                              date_of_birth=datetime_dob,
                              state_of_birth=state,
                              pres_corpus=doc_path,
                              img=img_path,
                              )

        db.session.add(president)

        i += 1

    file.close()

    db.session.commit()


def update_presidents():
    """Load presidents into database."""

    print('Update Presidents')

    presidents = President.query.all()

    for pres in presidents:

        total = pres.get_total_word_count()
        words_per = pres.get_word_count_per_speech()
        top_words = pres.get_top_words()

        pres.total_words = total
        pres.words_per_speech = words_per
        pres.top_words = top_words

    db.session.commit()


def load_words():
    """Load words into database."""

    print('Words')

    Word.query.delete()

    file = open("seed_data/words")

    for row in file:
        row = row.rstrip()

        text, freq_corpus, count, date = row.split(',')

        first_use = datetime.datetime.strptime(date[:-9], '%Y-%m-%d')

        speech = Speech.query.filter_by(date=first_use).one()

        word = Word(text=text,
                    first_use=speech.speech_id,
                    freq_corpus=float(freq_corpus),
                    count=int(count),
                    )

        db.session.add(word)

    file.close()

    db.session.commit()


def load_tokens():
    """Load tokens into database."""

    print('Tokens')

    Token.query.delete()

    speeches = Speech.query.all()

    for speech in speeches:

        speech_doc = Doc(nlp.NLP.vocab).from_disk(speech.doc_path)
        print(speech)

        for token in speech_doc:

            token = Token(token=token.text,
                          doc_id=token.i,
                          lemma=token.lemma_,
                          sentence=token.sent.text,
                          pos=token.pos_,
                          tag=token.tag_,
                          dep=token.dep_,
                          sentiment=token.sentiment,
                          pres=speech.pres_id,
                          speech=speech.speech_id,
                          )

            db.session.add(token)

    db.session.commit()


####################################################
if __name__ == "__main__":
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()

    # Import different types of data
    load_presidents()
    load_years()
    load_speeches()
    # load_words()
    # load_tokens()
    update_presidents()
