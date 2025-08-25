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