import React from 'react';
import { connect } from 'react-redux';

import Projects from '../components/Projects/Projects';


class CommercialProjects extends React.Component {
  static defaultProps = {
    hiddenProjectsIDs: [13]
  }

  getCommercialProjects(projects) {
    const commercialProjects = projects.filter(project => project.customer !== 'own');

    return this.deleteHiddenProjects.bind(this)(commercialProjects);
  }

  deleteHiddenProjects(commercialProjects) {
    return commercialProjects.filter(project =>
      (!(this.props.hiddenProjectsIDs.indexOf(project.id) + 1)));
  }

  render() {
    const { translations, projects } = this.props;

    return (
      <Projects
        translations={translations}
        projects={this.getCommercialProjects.bind(this)(projects)}
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

export default connect(mapStateToProps)(CommercialProjects);
