import User from '../models/User.ts';

export const createUser = async ( userData: {
	username: string;
	password: string;
	email: string;
}) => {
	return await User.create(userData);
};

export const getUserById = async ( id: string ) => {
	return await User.findById(id).select('-password');
};


export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const updateUser = async (id: string , updateData: {
	name? : string;
	email?: string;
}) => { return await User.findByIdAndUpdate(id, updateData, { new: true });
};


export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};


