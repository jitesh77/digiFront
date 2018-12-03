export interface Signup {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AddDetails {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  description: string;
  tagline: string;
  profilePicture: string;
}

export interface UpdateProfile {
  id: string;
  firstname: string;
  lastname: string;
  tagline: string;
  description: string;
  dob: string;
  gender: string;
  skills: Array<string>;
  country: string;
  hourlyRate: number;
}
