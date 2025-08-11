export interface User {
  id: number;
  username: string;
  email?: string | null;
  image?: string;
  bio?: string | null;
  roles?: string[];      // varsa rol yapınız
  token?: string;        // bazı yerlerde tutuluyor olabilir
}

export type Profile = Pick<User, 'id' | 'username' | 'email' | 'image' | 'bio'>;

