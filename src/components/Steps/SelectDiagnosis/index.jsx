import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Actions } from '../../../store';


class DiagnosisReport extends Component {
  render() {
    const {
      actions,
      app,
      symptom,
      diagnosis,
      sickness,
    } = this.props;

    const { selectedSymptomId } = app;
    if (!selectedSymptomId) {
      return null;
    }
    const currentSymptom = symptom.byId[selectedSymptomId];

    return (
      <div>
        <p>
          {`Select the cause of your ${currentSymptom.name}`}
        </p>
        {diagnosis.allIds.map((id) => {
          const diag = diagnosis.byId[id];
          return (
            <div
              key={id}
              onClick={() => {
                actions.acceptDiagnosis(selectedSymptomId, id);
                return actions.continueTo(3);
              }}
            >
              {`${sickness[diag.sickness_id].name}`}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  symptom: state.symptom,
  diagnosis: state.diagnosis,
  sickness: state.sickness,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(DiagnosisReport);
