import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-redux-spinner';

import CommonActions from '../actions/CommonActions';
import Header from '../components/Header';

class App extends React.Component {

  componentWillMount(nextProps) {
    this.getTranslations.bind(this)(this.props.locale.language);
  }
  componentWillReceiveProps(nextProps) {
    if (!Object.values(nextProps.locale.translations).length) {
      return browserHistory.push('/unavailable');
    }

    if (nextProps.locale.language !== this.props.locale.language) {
      this.getTranslations.bind(this)(nextProps.locale.language);
    }
  }

  getTranslations(lang) {
    this.props.actions.getTranslations(lang);
  }

  getToSwitchLanguage() {
    return (this.props.locale.language === 'ru') ? 'english' : 'russian';
  }

  handlerSwitchLanguage() {
    const { locale, actions } = this.props;
    const switchLanguage = (locale.language === 'ru') ? 'en' : 'ru';

    actions.setLocale(switchLanguage);
  }

  render() {
    console.log('AppProps', this.props);

    return (
      <div className="container">
        <Spinner />
        <Header
          switchToLanguage={this.getToSwitchLanguage.bind(this)()}
          handlerSwitchLanguage={this.handlerSwitchLanguage.bind(this)}
        />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { locale, translations } = state;

  return {
    locale
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CommonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
