import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-redux-spinner';

import getTranslationsFromState from '../utils/getTranslationsFromState';
import isLocalStorageHasValidateData from '../utils/isLocalStorageHasValidateData';
import CommonActions from '../actions/CommonActions';
import Header from '../components/Header';

class App extends React.Component {

  componentWillMount() {
    if (!isLocalStorageHasValidateData()) {
      this.getAllData.bind(this)(this.props.language);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length) {
      return browserHistory.push('/unavailable');
    }
    if (nextProps.language !== this.props.language) {
      this.getAllData.bind(this)(nextProps.language);
    }
  }

  getAllData(lang) {
    const { actions } = this.props;

    actions.getTranslations(lang);
    actions.getProjects(lang);
    actions.setDataVersion();
  }

  getToSwitchLanguage() {
    return (this.props.language === 'ru') ? 'english' : 'russian';
  }

  handlerSwitchLanguage() {
    const { language, actions } = this.props;
    const nextLanguage = (language === 'ru') ? 'en' : 'ru';

    actions.setLocale(nextLanguage);
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
          { React.cloneElement(this.props.children,
            { getTranslation: this.props.getTranslationsFromState }) }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { locale, projects, errors } = state;

  return {
    language: locale.language,
    translations: locale.translations,
    projects: projects.items,
    errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CommonActions, dispatch),
    getTranslationsFromState: params => dispatch(getTranslationsFromState(params))
    // isLocalStorageHasData: () => dispatch(isLocalStorageHasData())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
