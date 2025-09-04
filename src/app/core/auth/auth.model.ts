// export interface User {
//   id: number;
//   username: string;
//   email?: string | null;
//   image?: string;
//   bio?: string | null;
//   roles?: string[];      // varsa rol yapınız
//   token?: string;        // bazı yerlerde tutuluyor olabilir
// }

// export type Profile = Pick<User, 'id' | 'username' | 'email' | 'image' | 'bio'>;



export interface AppUser {
  id: number;
  username: string;
  displayName?: string;
  email?: string;
  roles?: string[];
}

export interface LoginInput { username: string; password: string; }
export interface LoginResponse { token: string; user: AppUser; }