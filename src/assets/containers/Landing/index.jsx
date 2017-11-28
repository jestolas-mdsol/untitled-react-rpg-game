import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import Game from '../Game';
import landingApi from '../../apis/Landing';
import { updateTestAsync } from '../../actions/main';
import styles from './style.scss';

const muiStyles = {
  textfield: {
    color: '#FFFFFF',
  },
  floatingLabel: { color: '#FFFFFF' },
  floatingHint: { color: '#FFFFFF' },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      credentialsError: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
    this.updateTestState = this.updateTestState.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit() {
    console.log(`submitting ${this.state.username} and ${this.state.password} to redux state!`);
    landingApi.createTestUser({
      name: this.state.username,
      countersign: this.state.password,
    }).then((res) => {
      console.log('create user response: ', res.data);
    })
  }

  handlePressEnter(e) {
    if (e.which === 13) {
      this.handleSubmit();
    }
  }

  updateTestState() {
    this.props.updateTestAsync();
  }

  render() {
    return (
      <div className={styles.landingContainer}>
        <div className={styles.headingWrapper}>
          <h1 >Phresh Page</h1>
          <h2>Foo Bar Baz!</h2>
        </div>
        <Game />
      </div>
    );
  }
}

App.propTypes = {
  test: PropTypes.string,
  fun: PropTypes.string,
  updateTestAsync: PropTypes.func,
}

const state = (state) => ({
  test: state.main.test,
  fun: state.main.fun,
});

const dispatch = dispatch => ({
  updateTestAsync: () => dispatch(updateTestAsync()),
})

export default connect(state, dispatch)(App);
