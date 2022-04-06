const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {


    // My New Settings and Configs
    REACT_APP_USE_PHOTO: '/public',
    // "/public" when on server and "EMPTY" when on local

    REACT_APP_WEB_APP_NAME: 'TestSite',
    
    HOST_API_KEY: 'https://lapi.illbytes.com',
    REACT_APP_WEB_APP_URL: 'https://r4.illbytes.com', 
    REACT_APP_API_URL: 'https://lapi.illbytes.com', 
    REACT_APP_HOMEBASE_URL: 'https://r3.illbytes.com',

    HOST_API_KEY: 'http://localhost:8000',
    REACT_APP_WEB_APP_URL: 'http://localhost:5002',
    REACT_APP_API_URL: 'http://localhost:8000',
    REACT_APP_HOMEBASE_URL: 'http://localhost:5001',


    // FIREBASE AUTH
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APPID: '',
    FIREBASE_MEASUREMENT_ID: '',
    // AWS COGNITO AUTH
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0 AUTH
    AUTH0_CLIENT_ID: '',
    AUTH0_DOMAIN: '',
    //
    MAPBOX: '',
  },
});
