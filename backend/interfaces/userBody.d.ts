interface IUserRegistrationBody {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
  role?: string;
}

export default IUserRegistrationBody;
