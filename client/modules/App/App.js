import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';


// Import Components
import Helmet from 'react-helmet';

import Header from './components/Header/Header';

// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

// Import selectors
import { getShowAddPost } from './AppReducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
      console.log("SHOW: " + this.props.showAddPost);
      
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>

        <div>
          <Helmet
            title="Muistiprojekti"
            titleTemplate="%s - Muisti"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddPost={this.toggleAddPostSection}
            showAddPostButton={!this.props.showAddPost}
          />
          <div className={styles.container}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  dispatch: PropTypes.func,
  intl: PropTypes.object,
  showAddPost: PropTypes.bool,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    showAddPost: getShowAddPost(store), 
  };
}

export default connect(mapStateToProps)(App);
