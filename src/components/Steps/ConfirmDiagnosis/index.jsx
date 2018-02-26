import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Actions } from '../../../store';
import { Button } from '../../Components';


class ConfirmDiagnosis extends Component {
  componentDidMount() {
    const { app, actions } = this.props;
    const { selectedSymptomId: id } = app;
    actions.getDiagnoses(id);
  }

  render() {
    const {
      actions,
      app,
      symptom,
      diagnosis,
      sickness,
    } = this.props;

    if (!diagnosis.allIds) {
      return null;
    }
    const { selectedSymptomId } = app;
    const currentSymptom = symptom.byId[selectedSymptomId];
    const mostLikelyDiagnosis = diagnosis.byId[diagnosis.mostLikely];

    return (
      <div>
        <p>
          {`If you have a ${
            currentSymptom.name
          }, then you probably have ${
            sickness[mostLikelyDiagnosis.sickness_id].name
          }. Does that seem right?`}
        </p>
        <Button
          label="That seems right"
          onClick={() => {
            actions.acceptDiagnosis(
              selectedSymptomId,
              diagnosis.mostLikely,
            );
            return actions.continueTo(3);
          }}
        />
        <Button
          label="I'm not sure..."
          onClick={() => (actions.continueTo(2))}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDiagnosis);
