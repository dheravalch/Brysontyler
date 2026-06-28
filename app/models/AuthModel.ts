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
  _id: string;
  email: string;
  name: string;
  kycStatus:string;
  role: "fan" | "admin" | "creator";
  profileImage: string;
  coverImage: string;
  isVerifiedCreator: boolean;
  isKYCVerified: boolean;
  profileCompleted: boolean;
  coinBalance: number;
  bio: string;
  city: string;
  country: string;
  dateOfBirth: string;
  phoneNumber: string;
  state: string;
  kyc: {
    status: "not_started" | "pending" | "verified" | "rejected";
  };
  creatorVerification: {
    verified: boolean;
    socialLinks: string[];
  };
  createdAt: string;
}

export interface CompleteProfilePayload {
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  bio: string;
}
export interface SuccessResponse {
  success: boolean;
  message: string;
  data?: { token: string; user: User };
}
export interface KYCResponse {
  verificationUrl: string;
  sessionId: string;
}
export interface CreatorVerificationPayload {
  stageName: string;
  category: 'Music' | 'Model' | 'Content Creator' | 'Other';
  socialLinks: string[];
}

export interface CreatorVerificationDocument extends CreatorVerificationPayload {
  _id: string;
  creatorId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  updatedAt: Date;
}