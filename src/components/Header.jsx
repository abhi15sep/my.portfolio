import React from 'react';
import { Link } from 'react-router';
import config from '../config';

import './Header.less';

const { links } = config;

const Header = props => (
  <header className="developer">
    <span className="developer__name">Sergey Illarionov</span>
    <h1 className="developer__position">Front-end Developer</h1>
    <button
      className="developer__lang-switcher"
      onClick={props.handlerSwitchLanguage}
    >
      {`to ${props.switchToLanguage} version`}
    </button>
    <nav className="navigation">
      <li className="navigation__item"><Link to="projects">projects</Link></li>
      <li className="navigation__item"><Link to="own-projects">own-projects</Link></li>
      <li className="navigation__item"><Link to="my-stack">my-stack</Link></li>
    </nav>
    <menu className="developer__menu">
      <li className="developer__menu-contacts">
        <ul className="socials">
          <li><a className="socials__linkedin" href={links.social.linkedin} title="linkedin">LinkedIn</a></li>
          <li><a className="socials__github" href={links.social.github} title="github">Github</a></li>
          <li><a className="socials__mail" href={`mailto:${links.mail}`} title="email">Mail</a></li>
        </ul>
      </li>
    </menu>
  </header>
);

Header.propTypes = {
  // ToDo: Fix it
  // switchToLanguage: React.propTypes.string.isRequired,
  // handlerSwitchLanguage: React.propTypes.func.isRequired
};

export default Header;
