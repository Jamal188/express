import User, {SanitizedUser} from '../models/User.ts';
import bcrypt from 'bcrypt';


export class AuthService {
	
	static async validateUser(email: string, password: string):Promise<SanitizedUser | null> {
		const user = await User.findOne({email}).select('+password');
		if (!user) return null;
		
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) return null;
		return user;
	}

	static async logoutUser(session: any) {
		return new Promise((resolve, reject) => {		
			session.destroy((err: Error) => {
				if (err) reject(err);
				else resolve(true);
			});
		});	
	}

}
