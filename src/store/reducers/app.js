const defaultState = {
  step: 0,
  selectedSymptomId: null,
  acceptedDiagnosisId: null,
};

export default function app(state = defaultState, action) {
  switch (action.type) {
    case 'START_OVER':
      return defaultState;
    case 'SELECT_SYMPTOM':
      return {
        ...state,
        selectedSymptomId: action.meta.symptomId,
      };
    case 'ACCEPT_DIAGNOSIS':
      return {
        ...state,
        acceptedDiagnosisId: action.meta.diagnosisId,
      };
    case 'CONTINUE':
      return {
        ...state,
        step: action.meta.step,
      };
    default:
      return state;
  }
}
