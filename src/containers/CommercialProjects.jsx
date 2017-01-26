import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectsActions from '../actions/ProjectsActions';
import Projects from '../components/Projects/Projects';
import Gallery from '../components/Projects/Gallery';
import Mask from '../components/Mask';


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

  handlerCLickShowGallery(currentProjectID) {
    this.props.actions.showGallery(currentProjectID);
  }

  handlerMaskClose() {
    this.props.actions.hideGallery();
  }

  renderGallery() {
    const { projects, currentProjectID } = this.props;
    const currentProject = projects.filter(project => (project.id === currentProjectID))[0];

    return (
      <Gallery
        images={currentProject.imgs}
      />
    );
  }

  render() {
    console.log('CommProjectsProps', this.props);
    const { getTranslation, projects, isGalleryShow, currentProjectID } = this.props;

    return (
      <div>
        <Projects
          getTranslation={getTranslation}
          projects={this.getCommercialProjects.bind(this)(projects)}
          handlerCLickShowGallery={this.handlerCLickShowGallery.bind(this)}
        />
        <Mask
          isMaskVisible={isGalleryShow}
          handlerMaskClose={this.handlerMaskClose.bind(this)}
        >
          {
            currentProjectID
            ? this.renderGallery.bind(this)()
            : null
          }
        </Mask>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { projects, locale } = state;

  return {
    projects: projects.items,
    isGalleryShow: projects.isGalleryShow,
    currentProjectID: projects.currentProjectID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProjectsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommercialProjects);
