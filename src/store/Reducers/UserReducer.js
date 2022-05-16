import {
  UPDATE_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
} from '../Actions/actionType';

const INITIAL_STATE = {
  isUserLogin: false,
  userData:null,
  accessToken: '',
};

export function UserReducer(state = INITIAL_STATE, action) {
  console.log(action.payload);
  switch (action.type) {
    case USER_SIGNUP:
      return {
        // ...state,
        userData: {
          displayName: action.payload.userData.displayName,
        },
        accessToken: action.payload.accessToken,
        isUserLogin: true,
      };
    case USER_LOGIN:
      return {
        ...state,
        userData: {
          displayName: action.payload.userData.displayName,
        },
        accessToken: action.payload.accessToken,
        isUserLogin: true,
      };
    case USER_LOGOUT:
      return {
        ...action.payload,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
