import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.footerContainer}>
        <div>
          <h2 className="footer-heading">This game is a work in progress! </h2>
        </div>
      </div>
    );
  }
}
