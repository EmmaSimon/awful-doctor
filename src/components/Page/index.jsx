import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

import {
  SelectSymptom,
  ConfirmDiagnosis,
  DiagnosisReport,
} from '../Steps';
import { StartOver } from '../Components/Button';


class App extends Component {
  render() {
    const { app } = this.props;
    const { step: currentStep } = app;
    let step = null;
    switch (currentStep) {
      default:
      case 0:
        step = <SelectSymptom />;
        break;
      case 1:
        step = <ConfirmDiagnosis />;
        break;
      case 3:
        step = <DiagnosisReport />;
        break;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">awful doctor</h1>
        </header>
        {step}
        {currentStep !== 0 ? <StartOver /> : null}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  app: state.app,
});
export default connect(mapStateToProps)(App);
