import { Company, Policy } from "../types";

// Action Types
export const SET_SELECTED_COMPANY = "SET_SELECTED_COMPANY";
export const SET_INSURANCES = "SET_INSURANCES";
export const SET_POLICIES = "SET_POLICIES";
export const SET_COMPANIES = "SET_COMPANIES";  // Action type for companies
export const SET_SELECTED_HEALTH_POLICY = "SET_SELECTED_HEALTH_POLICY";


// Action Creators
export const setSelectedHealthPolicy = (policy: Policy) => ({
  type: SET_SELECTED_HEALTH_POLICY,
  payload: policy,
});


export const setCompanies = (companies: any[]) => ({
  type: SET_COMPANIES,
  payload: companies,
});


// Action Creators
export const setSelectedCompany = (company: Company) => ({
  type: SET_SELECTED_COMPANY,
  payload: company,
});

export const setInsurances = (insurances: any[]) => ({
  type: SET_INSURANCES,
  payload: insurances,
});

export const setPolicies = (policies: any[]) => ({
  type: SET_POLICIES,
  payload: policies,
});
