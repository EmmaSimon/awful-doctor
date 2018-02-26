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


## APIs

Most of the data is keyed by ID for easier access on the frontend, and to prevent the storing of duplicate data in redux, since any one symptoms or sicknesses can appear in any number of diagnoses.

### `api/symptoms`

#### `GET`

```
{
    "symptom_ids": [
        1,
        2,
        3
    ],
    "symptoms": {
        "1": {
            "name": "sore throat",
            "id": 1
        },
        "2": {
            "name": "itchy rash",
            "id": 2
        },
        "3": {
            "name": "runny nose",
            "id": 3
        }
    }
}
```

### `api/diagnosis`

#### `GET`
Params:

* `symptom`: symptom ID

```
{
    "diagnoses": {
        "1": {
            "sickness_id": 1,
            "id": 1,
            "frequency": 5,
            "symptom_id": 1
        },
        ...
    },
    "sickness": {
        "1": {
            "name": "common cold",
            "id": 1
        },
        ...
    },
    // ID of the most likely diagnosis
    "most_likely": 1,
    // Sorted by frequency, then alphabetically
    "diagnosis_ids": [
        1,
        ...
    ]
}
```

#### `POST`

Body (JSON):
```
{
    "symptom": 2, // Symptom ID
    "diagnosis": 3, // Diagnosis ID
}
```
Returns the same data as the `GET` request
