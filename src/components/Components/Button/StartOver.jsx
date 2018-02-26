import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from './BaseButton';

import { Actions } from '../../../store';

function StartOver(props) {
  const { actions } = props;
  return (
    <Button
      label="Start Over"
      onClick={actions.startOver}
    />
  );
}


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});
export default connect(null, mapDispatchToProps)(StartOver);
