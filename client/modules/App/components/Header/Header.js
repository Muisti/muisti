import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import { LoginBox } from './LoginBox'
import ReactDOM from 'react-dom';

// Import Style
import styles from './Header.css';

// Import actions
import { fetchPosts } from '../../../Post/PostActions';
import { fetchModules } from '../../../Module/ModuleActions';


const Heade = Navbar.Header;
const Brand = Navbar.Brand;
const Toggle = Navbar.Toggle;
const Collapse = Navbar.Collapse;

export function Header(props) {

  const languageNodes = props.intl.enabledLanguages.map(
      lang => <MenuItem key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</MenuItem>
  );

    return (
      <Navbar>
        <Heade>
          <Brand>
            <a href="/"><FormattedMessage id={'siteTitle'} /></a>
          </Brand>
          <Toggle />
        </Heade>
        <Collapse>
            <Nav pullRight>
              <LoginBox fetchPosts={() => props.dispatch(fetchPosts())} fetchModules={() => props.dispatch(fetchModules())} intl={props.intl} />
            <NavDropdown eventKey={2} title={<FormattedMessage id={'switchLanguage'} />} id="basic-nav-dropdown">
                {languageNodes}
            </NavDropdown>
        </Nav>
        </Collapse>
      </Navbar>

    );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Header;
