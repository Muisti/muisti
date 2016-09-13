/**
 * Created by susisusi on 12/09/16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';


class Muisti extends Component {

  render() {
    return (
      <div>
        <p>Muistiprojekti ....</p>
        <form>
           <input placeholder={"place"} ref="name" />
        </form>
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
