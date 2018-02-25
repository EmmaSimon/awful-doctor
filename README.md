# awful-doctor

It's very bad at it.

## Setup

This project uses Django with SQLite and React.

### Django

I used virtualenv to install Django, but you can use a system wide installation if you have one.

You'll need to run `python ./manage.py migrate` to run Django's database migration stuff.

An `importcsv` command is included to grab the data from `symptoms.csv` and put them into the DB. It can be run from `backend/` with `python ./manage.py importcsv`.

`SECRET_KEY` is kept the default since this isn't a production environment, but usually it wouldn't be committed.


### React

I used `create-react-app` to set up the environment because I didn't want to mess around with configuration for too long.
