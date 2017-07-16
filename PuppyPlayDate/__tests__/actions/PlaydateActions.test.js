import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';

import { REQUEST_URL, FETCH_PLAYDATES, FETCH_PLAYDATE, NEW_PLAYDATE_STATE_UPDATE, EDIT_PLAYDATE_STATE_UPDATE, CREATE_PLAYDATE, UPDATE_PLAYDATE, EDIT_PLAYDATE_SUCCESS } from '../../src/actions/types';
import { fetchPlaydates, fetchPlaydate, updateNewPlaydateForm, updateEditPlaydateForm, createPlaydate, updatePlaydate } from '../../src/actions';

// Need this for axios to work during testing
axios.defaults.host = REQUEST_URL;
axios.defaults.adapter = httpAdapter;

describe('Playdate Actions', () => {
  describe('fetchPlaydates', () => {
    test('should dispatch a FETCH_PLAYDATES action if request is successful', () => {
      const response = [
        {
          id: 3421
        },
        {
          id: 3422
        }
      ];
      nock(REQUEST_URL)
        .get('/playdates')
        .reply(200, response);

      const thunk = fetchPlaydates();
      const dispatch = jest.fn();

      return thunk(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_PLAYDATES,
            payload: response
          });
        });
    });
  });

  describe('fetchPlaydate', () => {
    test('should dispatch a FETCH_PLAYDATE action if request is successful', () => {
      const response = {
        id: 3421
      };
      nock(REQUEST_URL)
        .get('/playdates/3421')
        .reply(200, response);

      const thunk = fetchPlaydate(3421);
      const dispatch = jest.fn();

      return thunk(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_PLAYDATE,
            payload: response
          });
        });
    });
  });

  describe('updateNewPlaydateForm', () => {
    test('should return a NEW_PLAYDATE_STATE_UPDATE action', () => {
      const playdate = {};
      const action = updateNewPlaydateForm(playdate);

      expect(action.type).toBe(NEW_PLAYDATE_STATE_UPDATE);
      expect(action.payload).toBe(playdate);
    });
  });

  describe('updateEditPlaydateForm', () => {
    test('should return a EDIT_PLAYDATE_STATE_UPDATE action', () => {
      const playdate = {};
      const action = updateEditPlaydateForm(playdate);

      expect(action.type).toBe(EDIT_PLAYDATE_STATE_UPDATE);
      expect(action.payload).toBe(playdate);
    });
  });

  describe('createPlaydate', () => {
    test('should dispatch a CREATE_PLAYDATE action if the request is successful', () => {
      const playdate = {};
      const response = playdate;
      nock(REQUEST_URL)
        .post(`/playdates`, playdate)
        .reply(200, response);

      const thunk = createPlaydate(playdate);
      const dispatch = jest.fn();

      return thunk(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: CREATE_PLAYDATE,
            payload: response
          });
        });
    });
  });

  describe('updatePlaydate', () => {
    test('should dispatch a UPDATE_PLAYDATE action if the request is successful', () => {
      const playdate = { id: 2345 };
      const response = playdate;
      nock(REQUEST_URL)
        .patch(`/playdates/${playdate.id}`, playdate)
        .reply(200, response);

      const thunk = updatePlaydate(playdate);
      const dispatch = jest.fn();

      return thunk(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_PLAYDATE,
            payload: response
          });
        });
    });

    test('should dispatch a EDIT_PLAYDATE_SUCCESS action if the request is successful', () => {
      const playdate = { id: 2345 };
      const response = playdate;
      nock(REQUEST_URL)
        .patch(`/playdates/${playdate.id}`, playdate)
        .reply(200, response);

      const thunk = updatePlaydate(playdate);
      const dispatch = jest.fn();

      return thunk(dispatch)
        .then(() => {
          const action = dispatch.mock.calls[0][0];
          expect(action.type).toBe(EDIT_PLAYDATE_SUCCESS);
          expect(action.payload).toBeUndefined();
        });
    });
  });
});
