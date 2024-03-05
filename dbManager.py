#TODO: Acknowledge why i need to use a DB

""""from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('/example.db')

Base = declarative_base()

class Song(Base):
    __tablename__ = 'songs'
    id = Column(Integer, primary_key=True)
    songName = Column(String)
    path = Column(String)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()


new_user = User(name='Alice', age=30)
session.add(new_user)
session.commit()

users = session.query(User).all()
for user in users:
    print(user.name, user.age)
session.close()"""