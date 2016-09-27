import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem> <UserCreateModal /> </NavItem>
            <NavDropdown eventKey={2} title="Vaihda kieli" id="basic-nav-dropdown">
                {languageNodes}
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
            
    );
//  return (
//    <div className={styles.header}>
//      <div className={styles['navigation-bar']}>
//        <ul>
//          <li><Link to="/muisti" >Muisti</Link></li>
//          <li><Link to="/" >Aloitussivu</Link></li>
//          <li><Link to="/signup" >Rekisteröidy</Link></li>
//          {languageNodes}
//        </ul>
//      </div>
//      <div className={styles.content}>
//        <h1 className={styles['site-title']}>
//          <Link to="/" >Muistiprojekti</Link>
//        </h1>
//        <div className={props.showAddPostButton ? '' : 'hidden'}>
//          <a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}><FormattedMessage id="addPost" /></a>
//        </div>
//      </div>
//    </div>
//  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  showAddPostButton: PropTypes.bool.isRequired,
};

export default Header;
