export interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface AuthState {
  user: SerializableUser | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}
