import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  siteSettings: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { siteSettings } = action.payload;
    return {
      ...state,
      isInitialized: true,
      siteSettings,
    };
  },
  SITESETTINGS: (state, action) => {
    const { siteSettings } = action.payload;

    return {
      ...state,
      siteSettings,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const SiteSettingsContext = createContext({
  ...initialState,
  method: 'siteSettings',
  getSiteSettings: () => Promise.resolve(),
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
        const csrf = await axios.get('/sanctum/csrf-cookie');

        const siteSettingsData = await axios.get('/settings');
        const {data : siteSettings} = siteSettingsData;


        if (siteSettings) {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              siteSettings,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              siteSettings: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            siteSettings: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const getSiteSettings = async (email, password) => {


     const csrf = await axios.get('/sanctum/csrf-cookie');
     
            const siteSettingsData = await axios.get('/settings');
            const {data : siteSettings} = siteSettingsData;
            
            // setSession('logged In');
            dispatch({
              type: 'SITESETTINGS',
              payload: {
                siteSettings,
              },
            });

     // });



  };

  return (
    <SiteSettingsContext.Provider
      value={{
        ...state,
        method: 'SITE SETTINGS',
        getSiteSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export { SiteSettingsContext, AuthProvider };
