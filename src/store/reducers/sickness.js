const defaultState = null;

export default function sickness(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_DIAGNOSES':
      return action.meta.sickness;
    default:
      return state;
  }
}
