import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  View,
  Text,
} from 'react-native';
import styles from './styles';

class AppView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'feed',
    };
  }

  render() {
    return (
      <DrawerLayoutAndroid
        style={styles.container}
        renderNavigationView={() => <Text>{'Feed'}</Text>}
      >
        <Text>{'Feed View'}</Text>
      </DrawerLayoutAndroid>
    );
  }
}

export default AppView;
