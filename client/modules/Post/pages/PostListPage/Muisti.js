/**
 * Created by susisusi on 12/09/16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class Muisti extends Component {

  render() {
    return (
      <div>
        <Button bsStyle="danger"> Testinappi </Button>
        <p>Muistiprojekti ....</p>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Muisti);
