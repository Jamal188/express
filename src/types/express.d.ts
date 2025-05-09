import {SafeUser} from '../models/User.ts';

declare global {
	namespace Express {
		interface Request {
			user?: SafeUser;
		}
	}
}
