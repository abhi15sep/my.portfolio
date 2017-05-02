import React from 'react';
import { Link } from 'react-router';
import delaySlashes from '../utils/delaySlashes';
import getUniqueID from '../utils/getUniqueID';
import config from '../config';

import './Header.less';

const { links: linksConfig, routes: routesConfig } = config;

class Header extends React.Component {

  renderNavigation(currentPathName) {
    const links = Object.values(routesConfig.path);

    return (
      <nav className="navigation">
        {
          links.map((link) => {
            link = delaySlashes(link);
            currentPathName = delaySlashes(currentPathName);

            return (
              <li
                key={getUniqueID()}
                className={`navigation__item ${
                  (currentPathName === link) ? 'navigation__item--active' : ''}`}
              >
                <Link to={link}>{link}</Link>
              </li>
            );
          }
          )
        }
      </nav>
    );
  }

  render() {
    const { currentPathName, handlerSwitchLanguage, switchToLanguage } = this.props;

    return (
      <header className="developer">
        <span className="developer__name">Sergey Illarionov</span>
        <h1 className="developer__position">Front-end Developer</h1>
        <button
          className="developer__lang-switcher"
          onClick={handlerSwitchLanguage}
        >
          {`to ${switchToLanguage} version`}
        </button>

        { this.renderNavigation.bind(this)(currentPathName) }

        <menu className="developer__menu">
          <li className="developer__menu-contacts">
            <ul className="socials">
              <li><a className="socials__linkedin" href={linksConfig.social.linkedin} title="linkedin">LinkedIn</a></li>
              <li><a className="socials__github" href={linksConfig.social.github} title="github">Github</a></li>
              <li><a className="socials__mail" href={`mailto:${linksConfig.mail}`} title="email">Mail</a></li>
            </ul>
          </li>
        </menu>
      </header>
    );
  }
}

Header.propTypes = {
  currentPathName: React.PropTypes.string.isRequired,
  switchToLanguage: React.PropTypes.string.isRequired,
  handlerSwitchLanguage: React.PropTypes.func.isRequired
};

export default Header;
