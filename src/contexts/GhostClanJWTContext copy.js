import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  // isEmailTwoFA: false,
  user: null,
  ref: null,
  siteSettings: null,
  txn: null,
  txnData: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, ref, siteSettings, txn, txnData } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      // isEmailTwoFA,
      user,
      ref,
      siteSettings,
      txn,
      txnData,
    };
  },
  LOGIN: (state, action) => {
    const { user, ref, siteSettings, txn, txnData } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      // isEmailTwoFA: false,
      user,
      ref,
      siteSettings,
      txn,
      txnData,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    // isEmailTwoFA: false,
    user: null,
    ref: null,
    txn: null,
    txnData: null,
  }),
  REGISTER: (state, action) => {
    const { user, ref, siteSettings, txn, txnData } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      ref,
      siteSettings,
      txn,
      txnData,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'sanctumSPA',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        // const accessToken = window.localStorage.getItem('accessToken');
        const csrf = await axios.get('/sanctum/csrf-cookie');

        const userData = await axios.get('/api/user');
        const {data : user} = userData;

        const refData = await axios.get('/api/user/ref/mine');
        const {data : ref} = refData;

        const siteSettingsData = await axios.get('/api/settings');
        const {data : siteSettings} = siteSettingsData;

        const txnD = await axios.get('api/transaction/mine/all');
        const {data : txn} = txnD;

        const txnDataD = await axios.get('/api/user/transaction/data');
        const {data : txnData} = txnDataD;

        // console.log(user.twofa_type);


        if (user) {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              // isEmailTwoFA: false,
              user,
              ref,
              siteSettings,
              txn,
              txnData,
            },
          });
        } 
        else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              // isEmailTwoFA: false,
              user: null,
              ref: null,
              siteSettings: null,
              txn: null,
              txnData: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            ref: null,
            siteSettings: null,
            txn: null,
            txnData: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {


     const csrf = await axios.get('/sanctum/csrf-cookie');

            const response = await axios.post('/login', {
              email,
              password,
            });

            const userData = await axios.get('/api/user');
            const {data : user} = userData;

            const refData = await axios.get('/api/user/ref/mine');
            const {data : ref} = refData;

            const siteSettingsData = await axios.get('/api/settings');
            const {data : siteSettings} = siteSettingsData;

            const txnD = await axios.get('api/transaction/mine/all');
            const {data : txn} = txnD;

            const txnDataD = await axios.get('/api/user/transaction/data');
            const {data : txnData} = txnDataD;
            
            // setSession('logged In');
            dispatch({
              type: 'LOGIN',
              payload: {
                user,
                ref,
                siteSettings,
                txn,
                txnData,
              },
            });

     // });



  };

  const register = async (email, password, firstName, lastName, username, reff) => {

    const csrf = await axios.get('/sanctum/csrf-cookie');

    const response = await axios.post('/register', {
              fname: firstName,
              lname: lastName,
              email: email,
              username: username.toLowerCase(),
              password: password,
              password_confirmation: password,
              referrer: reff,
    });

            const userData = await axios.get('/api/user');
            const {data : user} = userData;

            const refData = await axios.get('/api/user/ref/mine');
            const {data : ref} = refData;

            const siteSettingsData = await axios.get('/api/settings');
            const {data : siteSettings} = siteSettingsData;

            const txnD = await axios.get('api/transaction/mine/all');
            const {data : txn} = txnD;

            const txnDataD = await axios.get('/api/user/transaction/data');
            const {data : txnData} = txnDataD;
            
            // setSession('logged In');
            dispatch({
              type: 'REGISTER',
              payload: {
                user,
                ref,
                siteSettings,
                txn,
                txnData,
              },
            });




    // dispatch({
    //   type: 'REGISTER',
    //   payload: {
    //     user,
    //   },
    // });


  };

  const logout = async () => {
    // setSession(null);
    const csrf = await axios.get('/sanctum/csrf-cookie');

    // Call API Logout Route
    await axios.get('/api/logout', { withCredentials: true }).then((response) => {
      console.log('Logged Out');
    });

    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'sanctumSPA',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
