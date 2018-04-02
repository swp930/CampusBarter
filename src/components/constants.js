const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://campusbarter.herokuapp.com'
  : 'https://campusbarter.herokuapp.com';

export default PAYMENT_SERVER_URL;
