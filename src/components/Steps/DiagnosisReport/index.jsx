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

    const { selectedSymptomId, acceptedDiagnosisId } = app;
    if (!acceptedDiagnosisId) {
      return null;
    }
    const currentSymptom = symptom.byId[selectedSymptomId];
    const selectedDiagnosis = diagnosis.byId[acceptedDiagnosisId];
    const selectedSickness = sickness[selectedDiagnosis.sickness_id];

    return (
      <div>
        <p>
          {`Your ${
            selectedSickness.name
          } is causing a  ${
            currentSymptom.name
          }. You should probably go see a doctor.`}
        </p>
        <p>
          {`Here's what other people had when they reported their ${currentSymptom.name}:`}
        </p>

        {diagnosis.allIds.map((id) => {
          const diag = diagnosis.byId[id];
          return (
            <div key={id}>
              {`${sickness[diag.sickness_id].name} - ${diag.frequency} people`}
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
