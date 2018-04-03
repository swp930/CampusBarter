const BACKEND_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://campusbartertwo.herokuapp.com'
  : 'http://localhost:3001';

export default BACKEND_SERVER_URL;
