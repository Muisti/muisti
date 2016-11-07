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

export function Header(props) {
    
  const languageNodes = props.intl.enabledLanguages.map(
      lang => <MenuItem key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</MenuItem>
  );
  
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Muistiprojekti</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/muisti">Muisti</NavItem>
          </Nav>
            <Nav pullRight>
              <LoginBox fetchPosts={() => props.dispatch(fetchPosts())} intl={props.intl} />
            <NavDropdown eventKey={2} title="Vaihda kieli" id="basic-nav-dropdown">
                {languageNodes}
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
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
