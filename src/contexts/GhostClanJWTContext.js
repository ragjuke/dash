import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isEmailTwoFA: false,
  user: null,
  ref: null,
  siteSettings: null,
  txn: null,
  txnData: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, isEmailTwoFA, user, ref, siteSettings, txn, txnData } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      isEmailTwoFA,
      user,
      ref,
      siteSettings,
      txn,
      txnData,
    };
  },
  LOGIN: (state, action) => {
    const { isEmailTwoFA, user, ref, siteSettings, txn, txnData } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      isEmailTwoFA,
      // isQRTwoFA,
      user,
      ref,
      siteSettings,
      txn,
      txnData,
    };
  },
  LOGINQR: (state, action) => {
    // const { user, ref, siteSettings, txn, txnData } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      // isEmailTwoFA: false,
      isQRTwoFA: true,
    };
  },
  LOGINEMAIL: (state, action) => {
    // const { user, ref, siteSettings, txn, txnData } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      isEmailTwoFA: true,
      // isQRTwoFA: true,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    // isEmailTwoFA: false,
    isQRTwoFA: false,
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
      isQRTwoFA: false,
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
  loginQR: () => Promise.resolve(),
  loginEmailCode: () => Promise.resolve(),
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

        // Get the Logged In Session
        const userSess = await axios.get('/api/user/session/check');
        // console.log(userSess.data);

        const refData = await axios.get('/api/user/ref/mine');
        const {data : ref} = refData;

        const siteSettingsData = await axios.get('/api/settings');
        const {data : siteSettings} = siteSettingsData;

        const txnD = await axios.get('api/transaction/mine/all');
        const {data : txn} = txnD;

        const txnDataD = await axios.get('/api/user/transaction/data');
        const {data : txnData} = txnDataD;

        if (user) {

          // Check if Email TWO FA is enabled
          if(user.twofa_type === 2 && userSess.data == 'Logged Out Session'){
            console.log('We are here and Logged Out');

            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                isEmailTwoFA: false,
                user,
                ref,
                siteSettings,
                txn,
                txnData,
              },
            });
            return;
          }

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              isEmailTwoFA: false,
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
              isEmailTwoFA: false,
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


            // Check for First 2FA (Auth Code and Verification Code)
            if(response.data.hasOwnProperty('two_factor') && response.data.two_factor == true){
              // console.log(response.data.two_factor);
              return 'LoginQR';
            }

            const userData = await axios.get('/api/user');
            const {data : user} = userData;

            // Get the Logged In Session
            const userSess = await axios.get('/api/user/session/check');
            // console.log(userSess.data);

            const refData = await axios.get('/api/user/ref/mine');
            const {data : ref} = refData;

            const siteSettingsData = await axios.get('/api/settings');
            const {data : siteSettings} = siteSettingsData;

            const txnD = await axios.get('api/transaction/mine/all');
            const {data : txn} = txnD;

            const txnDataD = await axios.get('/api/user/transaction/data');
            const {data : txnData} = txnDataD;



             // Check if Email TWO FA is enabled
          if(user.twofa_type === 2 && userSess.data == 'Logged Out Session'){
            console.log('We are here and Logged Out');

            dispatch({
              type: 'LOGIN',
              payload: {
                isEmailTwoFA: true,
                user,
                ref,
                siteSettings,
                txn,
                txnData,
              },
            });
            return;

          }else{

            dispatch({
              type: 'LOGIN',
              payload: {
                // isEmailTwoFA: false,
                user,
                ref,
                siteSettings,
                txn,
                txnData,
              },
            });

          }
            
            


  };

  const loginQR = async (data) => {
          const csrf = await axios.get('/sanctum/csrf-cookie');
          const response = await axios.post('/two-factor-challenge', data);
          // return response;

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

 };


 const loginEmailCode = async (data) => {


  const csrf = await axios.get('/sanctum/csrf-cookie');

         const response = await axios.post('/api/user/session/set', data);

         if(response.data == 'Login Successful'){

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
             isEmailTwoFA: false,
             ref,
             siteSettings,
             txn,
             txnData,
           },
         });

         return 'Login Successful';

         }else{
          //  console.log('You entered a wrong code');
           return 'You entered a wrong code';
         }

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


  };

  const logout = async () => {
    const csrf = await axios.get('/sanctum/csrf-cookie');

    // Call API Logout Route
    await axios.get('/api/logout', { withCredentials: true }).then((response) => {
    });

    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'sanctumSPA',
        login,
        loginQR,
        loginEmailCode,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
