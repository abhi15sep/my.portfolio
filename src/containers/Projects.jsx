import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectsActions from '../actions/ProjectsActions';
import Project from '../components/Project';


class ProjectsContainer extends React.Component {

  componentWillMount() {
    this.getProjects.bind(this)(this.props.locale.language);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale.language !== this.props.locale.language) {
      this.getProjects.bind(this)(nextProps.locale.language);
    }
  }

  getProjects(lang) {
    this.props.actions.getProjects(lang);
  }

  render() {
    console.log('PageProps', this.props);
    const { translations } = this.props.locale;
    const { projects } = this.props;

    return (
      <div>
        <Project
          translations={translations}
          projects={projects}
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
