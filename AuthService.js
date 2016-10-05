import { Buffer } from 'buffer';
import { AsyncStorage } from 'react-native';
import { API_ENDPOINT } from './constants';

const AUTH_KEY = 'auth';
const USER_KEY = 'user';

class AuthService {
  static getAuthInfo(fn) {
    AsyncStorage.multiGet([AUTH_KEY, USER_KEY], (err, val) => {
      if (err) {
        return fn(err);
      }
      if (!val) {
        return fn();
      }

      const auth = val[0][1];
      const user = val[1][1];

      const authInfo = {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        user: JSON.parse(user),
      };
      return fn(null, authInfo);
    });
  }

  static login(attributes, fn) {
    const buffer = new Buffer(`${attributes.username}:${attributes.password}`);
    const encodedAuth = buffer.toString('base64');
    fetch(API_ENDPOINT, {
      headers: {
        Authorization: `Basic ${encodedAuth}`,
      },
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      throw {
        badCredentials: response.status === 401,
        unknownError: response.status !== 401,
      };
    }).then((response) => {
      return response.json();
    }).then((results) => {
      AsyncStorage.multiSet([
        [AUTH_KEY, encodedAuth],
        [USER_KEY, JSON.stringify(results)],
      ], (err) => {
        if (err) {
          throw err;
        }
        return fn({ ...results });
      });
    })
    .catch((error) => { return fn(error); })
    .finally(() => {
      return fn({ showProgress: false });
    });
  }
}

export default AuthService;

