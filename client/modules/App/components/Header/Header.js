import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props) {
  const languageNodes = props.intl.enabledLanguages.map(
      lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );

  return (
    <div className={styles.header}>
      <div className={styles['navigation-bar']}>
        <ul>
          <li><Link to="/muisti" >Muisti</Link></li>
          <li><Link to="/" >Aloitussivu</Link></li>
          <li><Link to="/signup" >Rekisteröidy</Link></li>
          {languageNodes}
        </ul>
      </div>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/" >Muistiprojekti</Link>
        </h1>
        <div className={props.showAddPostButton ? '' : 'hidden'}>
          <a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}><FormattedMessage id="addPost" /></a>
        </div>
      </div>
    </div>
  );
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
