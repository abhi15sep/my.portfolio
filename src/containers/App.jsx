import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-redux-spinner';

import CommonActions from '../actions/CommonActions';
import Header from '../components/Header';

class App extends React.Component {

  componentWillMount() {
    this.getAllData.bind(this)(this.props.language);
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
    this.props.actions.getTranslations(lang);
    this.props.actions.getProjects(lang);
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
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { locale, projects, errors } = state;
  console.log('state', state);

  return {
    language: locale.language,
    translations: locale.translations,
    projects: projects.items,
    errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CommonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
