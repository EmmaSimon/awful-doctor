const defaultState = {
  byId: null,
  allIds: null,
};

export default function symptoms(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_SYMPTOMS':
      return {
        ...state,
        byId: action.meta.symptoms,
        allIds: action.meta.symptom_ids,
      };
    default:
      return state;
  }
}
