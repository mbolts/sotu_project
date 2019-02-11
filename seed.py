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



        if year < 1900:
            date_time = datetime.datetime.strptime(date, "%b %d %Y")
            # import pdb; pdb.set_trace()
            speech = Speech(
                        date=date_time,
                        pres_id=pres_id,
                        delivery=delivery,
                        text=text,
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

    for row in open("seed_data/speeches.csv"):
        row = row.rstrip()
        # print('row is', row)

        year = row.split(",")[0]
        year = year[-4:]
        year = int(year)
        # print('year is', year)
        # print('years are', years)

        if year in years:
            continue

        years.append(year)

        year = Year(year=year,
                    )
        
        # print('after years are', years)

        # print('year is', year)
        # print()

        # We need to add to the session or it won't ever be stored
        db.session.add(year)
    db.session.commit()

    # Once we're done, we should commit our work
    # db.session.commit()

def load_presidents():
    """Load presidents into database."""

    print('Presidents')

    President.query.delete()

    for row in open("seed_data/presidents.csv"):
        row = row.rstrip()

        name, party_affiliation = row.split(',')[:2]

        if name.endswith('Washington'):
            name = name[-17:]

        president = President(name=name,
                              party_affiliation=party_affiliation,
                              )

        db.session.add(president)

    db.session.commit()


# def set_val_user_id():
#     """Set value for the next user_id after seeding database"""

#     # Get the Max user_id in the database
#     result = db.session.query(func.max(User.user_id)).one()
#     max_id = int(result[0])

#     # Set the value for the next user_id to be max_id + 1
#     query = "SELECT setval('users_user_id_seq', :new_id)"
#     db.session.execute(query, {'new_id': max_id + 1})
#     db.session.commit()


if __name__ == "__main__":
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()

    # Import different types of data
    load_years()    
    load_presidents()
    load_speeches()    




