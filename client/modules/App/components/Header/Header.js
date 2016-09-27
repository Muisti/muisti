import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import { UserCreateModal } from '../../../User/components/UserCreateModal';

// Import Style
import styles from './Header.css';

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
            <NavItem eventKey={2} href="/signup">Signup</NavItem>
          </Nav>
            <Nav pullRight>
              <Navbar.Form pullLeft> 
                <FormGroup controlId="emailForm" validationState="">
                  <FormControl type="email" placeholder="Sähköposti" />
                  <FormControl.Feedback />
                </FormGroup>
                {' '}
                <FormGroup controlId="passwordForm" validationState="">
                  <FormControl type="password" placeholder="Salasana" />
                  <FormControl.Feedback />
                </FormGroup>
                {' '}
                <Button type="submit">Kirjaudu</Button>
              </Navbar.Form>
                        <NavItem> <UserCreateModal /> </NavItem>
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
};

export default Header;
