import {Post} from './methods';

const Attempt = (data) => Post('login/attempt', data);

const Login = {
  Attempt
}

export default Login;