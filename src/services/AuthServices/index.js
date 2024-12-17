import { post, get, patch,deleted } from '../services';
import routes from './routes';

const AuthServices = {
    login: async (obj) => {
    const data = await post(routes.login, obj);
    return data;
  },
  register: async (obj) => {
    const data = await post(routes.register, obj);
    return data;
  },
 
}

export default AuthServices