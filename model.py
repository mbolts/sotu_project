from flask_sqlalchemy import SQLAlchemy

# import sotu_dictionary

# This is the connection to the PostgreSQL database; we're getting this through
# the Flask-SQLAlchemy helper library. On this, we can find the `session`
# object, where we do most of our interactions (like committing, etc.)

db = SQLAlchemy()

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PstgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///SOTU'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)

class President(db.Model):
    """President."""

    __tablename__ = "presidents"

    pres_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    # year = db.Column(db.Integer, db.ForeignKey('years.year'))
    name = db.Column(db.String(100))
    party_affiliation = db.Column(db.String(100))
    date_of_birth = db.Column(db.DateTime)
    state_of_birth = db.Column(db.String(30))
    # word_counts = db.Column(db.JSON)

    years = db.relationship('Year',
                            )
    speeches = db.relationship('Speech',
                                backref=db.backref("president"))

    def decade_of_birth(self):
         
        return int(self.date_of_birth.year / 10) * 10

    def speech_text(self):

        pres_speeches = ''

        for speech in self.speeches:

            path = speech.text
            text = open(path)

            pres_speeches += '\n' + text.read()

            text.close()

        return pres_speeches

    def __repr__(self):
        return f"<President name={self.name} pres_id={self.pres_id}>"    


class Year(db.Model):
    """ Year. """

    __tablename__ = "years"

    year = db.Column(db.Integer, primary_key=True, autoincrement=False)
    # speech_id = db.Column(db.Integer, 
    #                       db.ForeignKey('speeches.speech_id'), 
    #                       )
    pres_id = db.Column(db.Integer,
                        db.ForeignKey('presidents.pres_id'),
                        )

    speeches = db.relationship('Speech')
    presidents = db.relationship('President')

    def get_century(self):

        return int(self.year / 100) * 100

    def get_decade(self):

        return int(self.year / 10) * 10

    

class Speech(db.Model):
    """Speech."""

    __tablename__ = "speeches"

    speech_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    year = db.Column(db.Integer,
                     db.ForeignKey('years.year'),
                     )
    date = db.Column(db.DateTime)
    pres_id = db.Column(db.Integer,
                          db.ForeignKey('presidents.pres_id'))
    delivery = db.Column(db.String(20))
    text = db.Column(db.Text)
    doc_path = db.Column(db.Text)

    # year = db.relationship('Year',)

    def __repr__(self):
        return f"<Speech date={self.date} president={self.president}>"


###############################################################################
if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app
    connect_to_db(app)
    print("Connected to DB.")