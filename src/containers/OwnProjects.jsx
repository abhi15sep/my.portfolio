import React from 'react';
import { connect } from 'react-redux';

import Projects from '../components/Projects/Projects';


class OwnProjects extends React.Component {
  getOwnProjects(projects) {
    return projects.filter(project => project.customer === 'own');
  }

  render() {
    const { translations, projects } = this.props;

    return (
      <Projects
        translations={translations}
        projects={this.getOwnProjects.bind(this)(projects)}
      />
    );
  }
}

function mapStateToProps(state) {
  const { projects, locale } = state;

  return {
    translations: locale.translations,
    projects: projects.items
  };
}

export default connect(mapStateToProps)(OwnProjects);
