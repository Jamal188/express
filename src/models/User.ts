import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


interface IUser extends mongoose.Document {
	username : string;
	email : string;
	password : string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}


const UserSchema = new mongoose.Schema(
  {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true }
  }, 
  {
	  toJSON: {
		transform: function(doc, ret) {
      		delete ret.password;
      		delete ret.__v; // Often remove version key too
      		return ret;
    		}
	  },
	  toObject: {
		  transform: function(doc, ret) {
      			delete ret.password;
      			delete ret.__v;
      			return ret;
    			}
	  }
});


UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



UserSchema.methods.comparePassword = async function(
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model<IUser>('User', UserSchema);
export type SanitizedUser = Omit<IUser, 'password'>;
export type SafeUser = Pick<IUser, '_id' | 'email' | 'username'>;
export default User;



