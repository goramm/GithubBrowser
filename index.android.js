import React, { Component } from 'react';
import { AppRegistry, View, ActivityIndicator } from 'react-native';
import AuthService from './AuthService';
import Login from './Login';
import AppView from './AppView';
import styles from './styles';
import { PURPLE } from './constants';

class GithubBrowser extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true,
    };
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null,
      });
    });
  }

  onLogin() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    if (this.state.checkingAuth) {
      return (
        <View>
          <ActivityIndicator style={styles.indicator} color={PURPLE} />
        </View>
      );
    }

    if (this.state.isLoggedIn) {
      return (
        <AppView />
      );
    }
    return (
      <Login onLogin={this.onLogin} />
    );
  }
}

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
