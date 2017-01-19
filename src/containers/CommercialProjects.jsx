import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectsActions from '../actions/ProjectsActions';
import Projects from '../components/Projects';


class CommercialProjects extends React.Component {

  componentWillMount() {
    this.getProjects.bind(this)(this.props.locale.language);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.locale.language !== this.props.locale.language) {
    //   this.getProjects.bind(this)(nextProps.locale.language);
    // }
  }

  getProjects(lang) {
    // this.props.actions.getProjects(lang);
  }

  render() {
    const { translations } = this.props.locale;
    const { projects } = this.props;

    return (
      <Projects
        translations={translations}
        projects={projects}
      />
    );
  }
}

function mapStateToProps(state) {
  const { projects, locale } = state;

  return {
    locale,
    projects: projects.items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProjectsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommercialProjects);
