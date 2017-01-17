import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectsActions from '../actions/ProjectsActions';


class Page extends React.Component {
  render() {
    console.log('PageProps', this.props);
    const { translations } = this.props.locale;

    return (
      <div>
        <div className="projects">{translations.description}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { projects, locale } = state;

  return {
    locale,
    projects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProjectsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
