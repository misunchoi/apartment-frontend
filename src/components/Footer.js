import React, { Component } from 'react';
import '../App.css';

const copyright = {
  height: '70px',
  backgroundColor: '#2C3E50',
  color: 'white',
  fontSize: '0.9375rem',
  paddingTop: '20px'
}

class Footer extends Component {
  render() {
    return (
      <div>
        <div style={copyright}>
          Copyright
        </div>
      </div>
    );
  }
}

export default Footer;
