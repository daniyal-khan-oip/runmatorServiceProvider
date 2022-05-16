import * as types from './actionType';

// Auth Actions
export const user_sign_up = data => async dispatch => {
  try {
    dispatch({
      type: types.USER_SIGNUP,
      payload: data,
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const user_login = data => async dispatch => {
  try {
    dispatch({
      type: types.USER_LOGIN,
      payload: data,
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const user_logout = () => async dispatch => {
  console.log('logout');
  try {
    dispatch({
      type: types.USER_LOGOUT,
      payload: {isUserLogin: false},
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const updateUserData = userData => async dispatch => {
  console.log(userData.displayName,"----ACtions")
  try {
    dispatch({
      type: types.UPDATE_USER_DATA,
      payload: {
        userData: userData,
      },
    });
  } catch (error) {
    console.log('Failed to update data.');
  }
};
// export const userLoggedIn = (email, password) => async dispatch => {
//   dispatch({
//     type: types.USER_LOGIN,
//     payload: {isApiCall: true},
//   });
//   try {
//     const response = await axios.post(`${baseUrl}/login`, {
//       email,
//       password,
//     });
//     if (response.data.status) {
//       dispatch({
//         type: types.USER_LOGIN,
//         payload: {isUserLogin: response.data.status, ...response.data.data},
//       });
//     } else {
//       toast.error(response.data.msg);
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error('Network Error');
//   }
//   dispatch({
//     type: types.USER_LOGIN,
//     payload: {isApiCall: false},
//   });
// };

// export const userLogOut = () => async dispatch => {
//   dispatch({
//     type: types.USER_LOGOUT,
//     payload: {isUserLogin: false, isApiCall: false},
//   });
//   dispatch({
//     type: types.GET_METRICS,
//     payload: [],
//   });
// };
