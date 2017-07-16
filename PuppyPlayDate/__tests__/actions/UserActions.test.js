import axios from 'axios'
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http'

import { REQUEST_URL, FETCH_USER, FETCH_USER_PLAYDATES, EDIT_USER_STATE_UPDATE, EDIT_USER_SUCCESS, UPDATE_USER } from '../../src/actions/types';
import { fetchUser, fetchUserPlaydates, updateEditUserForm, updateUser } from '../../src/actions';

// Need this for axios to work during testing
axios.defaults.host = REQUEST_URL;
axios.defaults.adapter = httpAdapter;

describe('User Actions', () => {
  describe('fetchUser', () => {
    test('should dispatch a FETCH_USER action if request is successful', () => {
      const response = {
        id: 1234
      };
      nock(REQUEST_URL)
        .get('/users/1234')
        .reply(200, response);

      const thunk = fetchUser(1234);
      const dispatch = jest.fn();

      return thunk(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_USER,
            payload: response
          });
        });
    });
  });

  describe('fetchUserPlaydates', () => {
    test('should dispatch a FETCH_USER_PLAYDATES action if request is successful', () => {
      const response = [
        {
          id: 9432
        },
        {
          id: 9433
        }
      ];
      nock(REQUEST_URL)
        .get('/users/1234/playdates')
        .reply(200, response);

      const thunk = fetchUserPlaydates(1234);
      const dispatch = jest.fn();

      return thunk(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_USER_PLAYDATES,
            payload: response
          });
        });
    });
  });

  describe('updateEditUserForm', () => {
    test('should return a EDIT_USER_STATE_UPDATE action', () => {
      const user = {};
      const action = updateEditUserForm(user);

      expect(action.type).toBe(EDIT_USER_STATE_UPDATE);
      expect(action.payload).toBe(user);
    });
  });

  describe('updateUser', () => {
    test('should dispatch a EDIT_USER_SUCCESS action if the request is successful', () => {
      const user = { id: 123123 };
      const response = user;
      nock(REQUEST_URL)
        .patch(`/users/${user.id}`, user)
        .reply(200, response);

      const thunk = updateUser(user.id, user);
      const dispatch = jest.fn();

      return thunk(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: EDIT_USER_SUCCESS
          });
        });
    });

    test('should dispatch a UPDATE_USER action if the request is successful', () => {
      const user = { id: 123123 };
      const response = user;
      nock(REQUEST_URL)
        .patch(`/users/${user.id}`, user)
        .reply(200, response);

      const thunk = updateUser(user.id, user);
      const dispatch = jest.fn();

      return thunk(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_USER,
            payload: response
          });
        });
    });
  });
});
