import { axios } from '.';

const errorAction = error => ({ type: 'ERROR', error });
export const continueTo = step => ({ type: 'CONTINUE', meta: { step } });
export const startOver = () => ({ type: 'START_OVER' });

// Symptoms

export const selectSymptom = symptomId => ({
  type: 'SELECT_SYMPTOM',
  meta: { symptomId },
});
const loadSymptoms = meta => ({ type: 'LOAD_SYMPTOMS', meta });
export const getSymptoms = () => (
  dispatch => (
    axios.get('api/symptoms')
      .then((response) => {
        dispatch(loadSymptoms(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(errorAction(error));
      })
  )
);

// Diagnosis

const loadDiagnoses = meta => ({ type: 'LOAD_DIAGNOSES', meta });
export const getDiagnoses = symptomId => (
  dispatch => (
    axios.get('/api/diagnosis', {
      params: { symptom: symptomId },
    })
      .then((response) => {
        dispatch(loadDiagnoses(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(errorAction(error));
      })
  )
);

const acceptDiagnosisAction = diagnosisId => ({
  type: 'ACCEPT_DIAGNOSIS',
  meta: { diagnosisId },
});
export const acceptDiagnosis = (symptomId, diagnosisId) => (
  (dispatch) => {
    dispatch(acceptDiagnosisAction(diagnosisId));
    return axios.post('/api/diagnosis', {
      symptom: symptomId,
      diagnosis: diagnosisId,
    })
      .then((response) => {
        dispatch(loadDiagnoses(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(errorAction(error));
      });
  }
);
