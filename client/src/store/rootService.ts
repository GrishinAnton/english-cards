import * as signInServices from '../components/SignIn/services';
import * as profileServices from '../components/Profile/services';

const services = {
  api: {
    signIn: signInServices,
    profile: profileServices,
  },
};

export default services;
