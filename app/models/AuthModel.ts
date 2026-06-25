export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}
export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  role?: "fan" | "creator";
}
export interface ResetPasswordPayload {
  token: string;
  password: string;
}
export interface User {
  _id:string;
  email: string;
  name: string;
  role: "fan" | "admin" | "creator";
  profilePic?: string;
  isVerifiedCreator: boolean;
  isKYCVerified: boolean;
  profileCompleted: boolean;
  coinBalance: number;
  kyc: {
    status: 'not_started' | 'pending' | 'verified' | 'rejected';
  };
  creatorVerification: {
    verified: boolean;
    socialLinks: string[];
  };

  // Timestamps
  createdAt: string;
}
export interface SuccessResponse {
  success: boolean;
  message: string;
  data?: { token: string; user: User };
}
