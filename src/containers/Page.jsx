import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectActions from '../actions/ProjectsActions';


class Page extends React.Component {
  componentWillMount() {
    const lang = this.props.location.pathname.replace('/', '');

    const { actions } = this.props;
    actions.getProjects(lang);
  }

  render() {
    console.log(this.props);
    return (
      <div className="projects">2323</div>
    );
  }
}

function mapStateToProps(state) {
  const { projects } = state;

  return projects;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProjectActions, dispatch)
  };
}

// Page.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(Page);
