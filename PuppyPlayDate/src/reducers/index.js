import { combineReducers } from 'redux';

// Custom Reducers
import DogsReducer from './DogsReducer';
import PlaydatesReducer from './PlaydatesReducer';
import UsersReducer from './UsersReducer';
import AuthReducer from './AuthReducer';
import SignupReducer from './SignupReducer';
import DogNewFormReducer from './DogNewFormReducer';
import DogEditFormReducer from './DogEditFormReducer';
import UserEditFormReducer from './UserEditFormReducer';
import PlaydateNewFormReducer from './PlaydateNewFormReducer';
import PlaydateEditFormReducer from './PlaydateEditFormReducer';

// Combine all reducers here
// (don't forget to assign key-value pairs)
const rootReducer = combineReducers({
  dogs: DogsReducer,
  playdates: PlaydatesReducer,
  users: UsersReducer,
  auth: AuthReducer,
  signup: SignupReducer,
  dogNewForm: DogNewFormReducer,
  dogEditForm: DogEditFormReducer,
  userEditForm: UserEditFormReducer,
  playdateNewForm: PlaydateNewFormReducer,
  playdateEditForm: PlaydateEditFormReducer
});

export default rootReducer;
