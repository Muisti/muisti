import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';


// Import Components
import Helmet from 'react-helmet';
import PassStorage from './components/Header/PassStorage';

import Header from './components/Header/Header';

import { switchLanguage } from '../../modules/Intl/IntlActions';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>

        <PassStorage />
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
            dispatch={this.props.dispatch}
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
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
