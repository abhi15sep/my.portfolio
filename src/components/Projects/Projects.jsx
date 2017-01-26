import React from 'react';

import getUniqueID from '../../utils/getUniqueID';
import './Projects.less';

class Projects extends React.Component {
  formatInvolvementDate(date) {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear() - 2000;
    let month = parsedDate.getMonth() + 1;
    month = (month < 10) ? `0${month}` : month;

    return `${month}/${year}`;
  }

  handlerMoreDetails(projectID) {
    const $project = document.querySelector(`.project-${projectID}`);
    const $moreDetails = $project.querySelector('.project__details');

    $moreDetails.classList.toggle('project__details--show');
  }

  renderActionsButtons(project, getTranslation) {
    return (
      <ul className="project__actions-buttons">
        <li>
          <button
            className="btn"
            onClick={this.handlerMoreDetails.bind(this, project.id)}
          >
            { getTranslation('more') }
          </button>
        </li>
        {
          project.imgs.length
          ? <li><button className="btn" onClick={this.props.handlerCLickShowGallery.bind(this, project.id)}>
            { getTranslation('see') }</button></li>
          : null
        }
        {
          project.link
          ? <li><a href={project.link} className="btn link" rel="noopener noreferrer" target="_blank">{ getTranslation('link') }</a></li>
          : null
        }
      </ul>
    );
  }

  renderProjectDetails(project, getTranslation) {
    return (
      <dl className="project__details">
        <dt className="">{ getTranslation('description') }:</dt>
        <dd className="project__label-text">{ project.description }</dd>
        <dt className="">{ getTranslation('customer') }:</dt>
        <dd className="project__label-text">{ project.customer }</dd>
        <dt className="">{ getTranslation('tools') }:</dt>
        <dd className="project__label-text">
          {
            project.tools.map((tool, index) => {
              tool = (index + 1 !== project.tools.length) ? `${tool} / ` : tool;

              return <span key={getUniqueID()}>{tool}</span>;
            })
          }
        </dd>
      </dl>
    );
  }

  render() {
    console.log('Projects', this.props);
    const { projects, getTranslation } = this.props;

    return (
      <ul className="projects">
        {
          projects.map(project =>
            <li className={`project project-${project.id}`} key={project.id}>
              <time className="project__time">{ this.formatInvolvementDate(project.involvement_duration.start) }</time>
              <div className="project__label">
                <h2>{ project.title }</h2>
                <p>{ project.responsibilities }</p>
                <dl>
                  <dt>{ getTranslation('role') }:</dt>
                  <dd className="project__roles">
                    {
                      project.roles.map(role =>
                        <span key={getUniqueID()}>{role}</span>
                      )
                    }
                  </dd>
                  <dt>{ getTranslation('realization') }:</dt>
                  <dd>
                    <div className="faw">
                      {
                        project.realizations.map((realization, index) =>
                          <i key={getUniqueID()} title={realization} className={`fa fa-${realization}`} />
                        )
                      }
                    </div>
                  </dd>
                  <dt>{ getTranslation('technologies') }:</dt>
                  <dd className="project__technologies">
                    {
                      project.technologies.map((technology, index) => {
                        technology = (index !== project.technologies.length - 1)
                        ? `${technology} / ` : technology;

                        return <span key={getUniqueID()}>{technology}</span>;
                      })
                    }
                  </dd>
                  <dt>{ getTranslation('team_size') }:</dt>
                  <dd className="project__label-text">{ project.team_size }</dd>
                </dl>

                { this.renderActionsButtons.bind(this)(project, getTranslation) }

                { this.renderProjectDetails.bind(this)(project, getTranslation) }
              </div>
            </li>
        ).reverse()
        }
      </ul>
    );
  }
}

// Projects.propTypes = {
//   getTranslation: React.propTypes.func.isRequired,
//   projects: React.propTypes.array.isRequired
// };

export default Projects;
