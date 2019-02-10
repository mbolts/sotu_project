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

    # Read u.user file and insert data
    for row in open("seed_data/speeches.csv"):
        row = row.rstrip()

        year, date, president, delivery, text = row.split(",")
        # print('year is', year)
        # print('type is', type(year))
        year = year[-4:]
        # print('text is', text)
        # print('type of text', type(text))
        # print(text[:5])

        if int(year) < 1900:
            date_time = datetime.datetime.strptime(date, "%b %d %Y")
            # import pdb; pdb.set_trace()
            speech = Speech(
                        date=date_time,
                        president=president,
                        delivery=delivery,
                        text=text)

        elif date == '':
            speech = Speech()

        else:
            date_time = datetime.datetime.strptime(date, "%d-%b-%Y")
            speech = Speech(
                        date=date_time,
                        president=president,
                        delivery=delivery,
                        text=text)

        # We need to add to the session or it won't ever be stored
        db.session.add(speech)

    # Once we're done, we should commit our work
    db.session.commit()


def load_years():
    """Load years into database."""

    print('Years')

    Year.query.delete()

    years = []

    for row in open("seed_data/speeches.csv"):
        row = row.rstrip()

        year = row.split(",")[0]
        year = year[-4:]

        years.append(year)

        if year in years:
            continue

        year = Year(year=year,
                    )

        # We need to add to the session or it won't ever be stored
        db.session.add(year)

    # Once we're done, we should commit our work
    db.session.commit()

def load_ratings():
    """Load ratings from u.data into database."""


def set_val_user_id():
    """Set value for the next user_id after seeding database"""

    # Get the Max user_id in the database
    result = db.session.query(func.max(User.user_id)).one()
    max_id = int(result[0])

    # Set the value for the next user_id to be max_id + 1
    query = "SELECT setval('users_user_id_seq', :new_id)"
    db.session.execute(query, {'new_id': max_id + 1})
    db.session.commit()


if __name__ == "__main__":
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()

    # Import different types of data

    load_years()
    load_speeches()


