import axios from 'axios';

// Import all action types
import {
  FETCH_DOGS,
  FETCH_DOG,
  FETCH_PLAYDATES,
  FETCH_PLAYDATE,
  FETCH_USER,
  UPDATE_USER,
  FETCH_USER_PLAYDATES,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CHANGE_USERNAME,
  CHANGE_PASSWORD
} from './types';

const REQUEST_URL = 'http://localhost:3000';

// Action creators
export function fetchDogs(userId) {
  const request = fetch(`${REQUEST_URL}/users/${userId}/dogs`);

  return dispatch => {
    request.then(response => {
      dispatch({
        type: FETCH_DOGS,
        payload: response
      });
    });
  }
}

export function fetchDog(id) {
  const request = axios.get(`${REQUEST_URL}/dogs/${id}`);

  // return the action
  return dispatch => {
    return request.then(response => {
      return dispatch({
        type: FETCH_DOG,
        payload: response // redux-promise will take this and replace with the resolved promise
      });
    });
  };
}

export function createDog(dog) {
  const request = axios.post(`${REQUEST_URL}/dogs`, dog);

  return dispatch => {
    request.then(response => {
      dispatch({
        type: CREATE_DOG,
        payload: response
      });
    });
  };
}

export function updateDog(dogId, dog) {
  console.log(dogId, dog);
  const request = axios.patch(`${REQUEST_URL}/dogs/${dogId}`, dog);

  return dispatch => {
    return request.then(response => {
      console.log(response);
      return dispatch({
        type: UPDATE_DOG,
        payload: dog
      });
    });
  };
}

export function fetchUser(id) {
  const request = axios.get(`${REQUEST_URL}/users/${id}`);

  return dispatch => {
    return request.then(response => {
      return dispatch({
        type: FETCH_USER,
        payload: response
      });
    });
  };
}

export function fetchPlaydates() {
  const request = axios.get(`${REQUEST_URL}/playdates`);

  return dispatch => {
    request.then(response => {
      // Update the playdates after successful request
      dispatch({
        type: FETCH_PLAYDATES,
        payload: response
      });
    });
  };
}

export function fetchUserPlaydates(userId) {
  const request = axios.get(`${REQUEST_URL}/users/${userId}/playdates`);

  return dispatch => {
    request.then(response => {
      dispatch({
        type: FETCH_USER_PLAYDATES,
        payload: response
      });
    });
  };
}

export function fetchPlaydate(id) {
  const request = axios.get(`${REQUEST_URL}/playdates/${id}`);

  return dispatch => {
    return request.then(response => {
      return dispatch({
        type: FETCH_PLAYDATE,
        payload: response
      });
    });
  };
}

export function createPlaydate(playdate) {
  const request = axios.post(`${REQUEST_URL}/playdates`, playdate);

  return dispatch => {
    request.then(response => {
      dispatch({
        type: CREATE_PLAYDATE,
        payload: response
      });
    });
  };
}

export function updatePlaydate(playdate) {
  const request = axios.patch(`${REQUEST_URL}/playdates/${playdate.id}`, playdate);

  return dispatch => {
    request.then(response => {
      dispatch({
        type: UPDATE_PLAYDATE,
        payload: response
      });
    });
  }
}

export function loginUser({ username, password }) {
  console.log('loginUser action creator!');

  return dispatch => {
    return axios.post(`${REQUEST_URL}/session/login`, { username, password })
    .then(response => {
      console.log("Login successful", response);

      // Login successfully, so store user id locally
      //AsyncStorage.setItem("userID", String(response.data));

      return dispatch({
        type: AUTH_USER,
        payload: response
      });

      // return Promise.resolve();
    })
    .catch(error => {
      //console.log(error.response.data.error);

      dispatch({
        type: AUTH_ERROR,
      });

      return Promise.reject();
    })
    ;
  }
}

export function registerUser({ username, name, email, password }) {
  console.log("registerUser!", username, name, email, password);
  return {
    type: AUTH_USER
  };
}

export function updateUser(userId, user) {
  return dispatch => {
    return axios.patch(`${REQUEST_URL}/users/${userId}`, user)
      then((response) => {
        console.log(response);
        return dispatch({
          type: UPDATE_USER,
          payload: user
        })
      });
  };
}

export function usernameChanged(username) {
  return {
    type: CHANGE_USERNAME,
    payload: username
  };
}

export function passwordChanged(password) {
  return {
    type: CHANGE_PASSWORD,
    payload: password
  };
}
