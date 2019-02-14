"""Utility file to seed ratings database from data in seed_data"""

from sqlalchemy import func
from model import President, Year, Speech

from model import connect_to_db, db
from server import app
import datetime


def load_speeches():
    """Load presidents into database."""

    print("Speeches")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate users
    Speech.query.delete()

    # Data came from these sources:
    # https://www.presidency.ucsb.edu/documents/presidential-documents-archive-guidebook/annual-messages-congress-the-state-the-union
    # https://www.kaggle.com/rtatman/state-of-the-union-corpus-1989-2017

    file = open("seed_data/speeches.csv")

    i = 0

    # Read u.user file and insert data
    for row in file:
        row = row.rstrip()

        year, date, president, delivery, text = row.split(",")
        # print('year is', year)
        # print('type is', type(year))
        year = year[-4:]
        year = int(year)
        # print('text is', text)
        # print('type of text', type(text))
        # print(text[:5])

        # print('President', president)

        pres = President.query.filter_by(name=president).first()

        if pres is None:
            continue

        pres_id = pres.pres_id

        path_ending = text.split('/')[2][:-4]

        doc_path = './speech_doc/' + path_ending + '_' + str(i)

        if year < 1900:
            date_time = datetime.datetime.strptime(date, "%b %d %Y")
            # import pdb; pdb.set_trace()
            speech = Speech(
                        date=date_time,
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
            speech = Speech(
                        date=date_time,
                        pres_id=pres_id,
                        delivery=delivery,
                        text=text,
                        doc_path=doc_path,
                        year=year,
                        )

        i += 1

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
        # print('row is', row)

        year, x, president = row.split(",")[:3]
        year = year[-4:]
        year = int(year)

        pres = President.query.filter_by(name=president).first()

        if pres is None or year in years:
            # print('pres is none and', year, 'in', years)
            continue

        elif pres is None and year not in years:
            # print('pres is none')
            year = Year(year=year,
                        )

            years.append(year)
            # db.session.add(year)

        else:

            pres_id = pres.pres_id

            # print('year is', year)
            # print('years are', years)

            years.append(year)

            year = Year(year=year,
                        pres_id=pres_id,
                        )
        
        # print('after years are', years)

        # print('year is', year)
        # print()

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

    for row in file:
        row = row.rstrip()

        name, party_affiliation, dob, state = row.split(',')[:4]

        datetime_dob = datetime.datetime.strptime(dob, "%B %d %Y")

        if name.endswith('Washington'):
            name = name[-17:]

        president = President(name=name,
                              party_affiliation=party_affiliation,
                              date_of_birth=datetime_dob,
                              state_of_birth=state,
                              )

        db.session.add(president)

    file.close()

    db.session.commit()


if __name__ == "__main__":
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()

    # Import different types of data
    load_presidents()
    load_years()
    load_speeches()    




