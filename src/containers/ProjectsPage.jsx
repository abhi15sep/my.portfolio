import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectsPageActions from '../actions/ProjectsPageActions';


class Page extends React.Component {
  componentWillMount() {
    this.props.actions.getLocaleData(this.props.locale.language);
  }

  render() {
    return (
      <div>
        <div className="projects">2323</div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { projects, locale } = state;

  return {
    locale,
    projects,
    ownProps
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProjectsPageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
