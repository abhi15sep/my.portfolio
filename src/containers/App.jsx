import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-redux-spinner';

import InitialActions from '../actions/InitialActions';

class App extends React.Component {
  componentWillMount() {
    const lang = this.props.location.pathname.replace('/', '');

    this.props.actions.setLocale(lang);
  }

  render() {
    return (
      <div className="App">
        <Spinner />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { locale } = state;

  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(InitialActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
