import React from 'react';

import getUniqueID from '../utils/getUniqueID';

class Projects extends React.Component {
  formatInvolvementDate(date) {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear() - 2000;
    let month = parsedDate.getMonth() + 1;
    month = (month < 10) ? `0${month}` : month;

    return `${month}/${year}`;
  }

  render() {
    const { projects, translations } = this.props;

    return (
      <ul className="cbp_tmtimeline">
        {
          projects.map((project) => {
            if (project.customer !== 'own') {
              return (
                <li key={project.id}>
                  <time className="cbp_tmtime">
                    <span>{ this.formatInvolvementDate(project.involvement_duration.start) }</span>
                  </time>
                  <div className="cbp_tmlabel">
                    <h2>{ project.title }</h2>
                    <p>{ project.responsibilities }</p>
                    <dl>
                      <dt>{ translations.role }:</dt>
                      <dd className="role">
                        {
                          project.role.map(role =>
                            <span key={getUniqueID()}>{role}</span>
                          )
                        }
                      </dd>
                      <dt>{ translations.realization }:</dt>
                      <dd>
                        <div className="faw">
                          {
                            project.realization.map((realization, index) =>
                              <i key={getUniqueID()} title={realization} className={`fa fa-${realization}`} />
                            )
                          }
                        </div>
                      </dd>
                      <dt>{ translations.technologies }:</dt>
                      <dd className="web-tech">
                        {
                          project.technologies.map((technology, index) => {
                            technology = (index !== project.technologies.length - 1)
                            ? `${technology} / ` : technology;

                            return <span key={getUniqueID()}>{technology}</span>;
                          })
                        }
                      </dd>
                      <dt>{ translations.team_size }:</dt>
                      <dd className="text">{ project.team_size }</dd>
                    </dl>
                    <ul className="buttons clearfix">
                      <li><button className="btn detail">{ translations.more }</button></li>
                      {
                        project.link
                        ? <li><a href={project.link} className="btn link" rel="noopener noreferrer" target="_blank">{ translations.link }</a></li>
                        : null
                      }
                    </ul>

                    <dl className="details hidden">
                      <dt className="">{ translations.description }:</dt>
                      <dd className="text">{ project.description }</dd>
                      <dt className="">{ translations.customer }:</dt>
                      <dd className="text">{ project.customer }</dd>
                      <dt className="">{ translations.tools }:</dt>
                      <dd className="text">
                        {
                          project.tools.map((tool, index) => {
                            tool = (index !== project.tools.length) ? `${tool} /` : tool;

                            return <span key={getUniqueID()}>{tool}</span>;
                          })
                        }
                      </dd>
                    </dl>
                  </div>
                </li>
              );
            }
          }
        ).reverse()
        }
      </ul>
    );
  }
}

// Projects.propTypes = {
//   translations: React.propTypes.object.isRequired,
//   projects: React.propTypes.array.isRequired
// };

export default Projects;
