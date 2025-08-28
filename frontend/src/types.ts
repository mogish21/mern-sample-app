// src/types.ts

export interface User {
    username: string;
    token?: string; // optional JWT token if your backend sends one
  }
  
  export interface Insurance {
    insuranceId: number;
    name: string;
  }
  
export interface InsuranceResponse {
  insurance: Insurance[];
}

export interface Product {
  id: number;
  name: string;
  logoUrl: string;
  type: "public" | "private";
}

export interface Company {
  _id?: string; // MongoDB ObjectId
  CompanyGUID: number;
  CompanyName: string;
  Address1?: string;
  Address2?: string;
  Area?: string;
  City?: string;
  Pincode?: string;
  MobileNo?: string;
  OfficePhoneNo?: string;
  DisplayName?: string;
  IsHealthAvailable?: number;
  IsMotorAvailable?: number;
  IsFireAvailable?: number;
  isPersonalAccidentAvailable?: number;
  CompanyIconName?: string;
  isActive?: number;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
}
