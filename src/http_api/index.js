import login from './login.js';
import user from './user.js';
import myServer from '../http_server/sendRequest.js';
myServer.parseRouter('login',login);
myServer.parseRouter('user',user);
export default myServer;