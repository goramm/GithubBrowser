import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import AuthService from './AuthService';
import { PURPLE } from './constants';
import styles from './styles';

/* eslint import/no-unresolved: [0] */
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handlePressLogin = this.handlePressLogin.bind(this);
    this.state = {
      showProgress: false,
    };
  }

  handleChangeUsername(text) {
    this.setState({
      username: text,
    });
  }

  handleChangePassword(text) {
    this.setState({
      password: text,
    });
  }

  handlePressLogin() {
    this.setState({ showProgress: true, badCredentials: false, unknownError: false });
    AuthService.login({
      username: this.state.username,
      password: this.state.password,
    }, (results) => {
      this.setState({ ...results });
      if (!this.state.showProgress) {
        this.props.onLogin();
      }
    });
  }

  render() {
    let errorCtrl = <View />;
    if (this.state.badCredentials) {
      errorCtrl = (<Text style={styles.error}>
        {'That username and password did not work'}
      </Text>);
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('image!github_logo')}
        />
        <Text style={styles.header}>{'Github Browser'}</Text>
        <TextInput
          onChangeText={this.handleChangeUsername}
          style={styles.input}
          placeholder="Github username"
        />
        <TextInput
          onChangeText={this.handleChangePassword}
          style={styles.input}
          placeholder="Github password"
          secureTextEntry
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.handlePressLogin}
        >
          <Text style={styles.buttonText}>{'Login'}</Text>
        </TouchableHighlight>

        {errorCtrl}

        {this.state.showProgress && <ActivityIndicator style={styles.indicator} color={PURPLE} />}
      </View>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
