import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Actions } from '../../../store';
import { Select, Button } from '../../Components';


class SelectSymptom extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getSymptoms();
  }

  render() {
    const {
      actions,
      app,
      symptom,
    } = this.props;

    if (!symptom.allIds) {
      return null;
    }

    return (
      <div>
        <Select
          label="Select the symptom you're experiencing"
          onChange={event => (actions.selectSymptom(event.target.value))}
          options={symptom.allIds.map(value => ({
            value,
            label: symptom.byId[value].name,
          }))}
          selected={app.selectedSymptomId}
        />
        <Button
          label="Sounds good"
          disabled={!app.selectedSymptomId}
          onClick={() => (actions.continueTo(1))}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  symptom: state.symptom,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectSymptom);
