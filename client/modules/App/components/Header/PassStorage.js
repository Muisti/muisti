import React, { Component, PropTypes } from 'react';
import { setStorage } from '../../../../util/authStorage';
import * as bcrypt from 'react-native-bcrypt';

export class PassStorage extends Component {
    
    componentDidMount(){
      setStorage(sessionStorage);
    }
    
    render() {
        return <span/>;
    }

};

PassStorage.propTypes = {
  
};

export default PassStorage;
