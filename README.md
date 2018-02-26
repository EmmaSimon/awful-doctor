# awful-doctor

It's very bad at it.

## Setup

This project uses Django with SQLite and React.

### Django

I used virtualenv to install Django, but you can use a system wide installation if you have one.

You'll need to run `python ./manage.py migrate` to run Django's database migration stuff.

An `importcsv` command is included to grab the data from `symptoms.csv` and put them into the DB. It can be run from `backend/` with `python ./manage.py importcsv`.

`SECRET_KEY` is kept the default since this isn't a production environment, but usually it wouldn't be committed.

I also included `django-cors-headers` instead of setting up nginx or something, so that the webpack dev server and django runserver could just talk directly to each other.


### React

I used `create-react-app` to set up the environment because I didn't want to mess around with configuration for too long. Remember to `yarn install` (or `npm i`).

## Running

For the backend, first activate virtualenv if you're using it.
Then, `cd backend; python ./manage.py runserver`
That will start the Django dev server on port `8000`, leave it running.

For the frontend, you can do `yarn run start` (or `npm run start`) to start the webpack dev server on port `3000`. If you want it built instead, it's `yarn run build`, which goes into the `build` directory. For a quick server, you can just do `python -m http.server 8080` in `build`.
