const defaultState = {
  mostLikely: null,
  byId: null,
  allIds: null,
};

export default function diagnosis(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_DIAGNOSES':
      return {
        mostLikely: action.meta.most_likely,
        byId: action.meta.diagnoses,
        allIds: action.meta.diagnosis_ids,
      };
    default:
      return state;
  }
}
