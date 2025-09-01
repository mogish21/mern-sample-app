import { SET_SELECTED_COMPANY, SET_INSURANCES, SET_POLICIES, SET_COMPANIES, SET_SELECTED_HEALTH_POLICY } from "./actions";

interface CompanyState {
  selectedCompany: any;
  selectedHealthPolicy: any;
  insurances: any[];
  policies: any[];
  companies: any[];
}

const initialState: CompanyState = {
  companies:[],  
  selectedCompany: null,
  selectedHealthPolicy: null,
  insurances: [],
  policies: [],
};

const companyReducer = (state = initialState, action: any): CompanyState => {
  switch (action.type) {
    case SET_SELECTED_COMPANY:
      return { ...state, selectedCompany: action.payload };
    case SET_COMPANIES:
      return { ...state, companies: action.payload }; 
    case SET_SELECTED_HEALTH_POLICY:
      return { ...state, selectedHealthPolicy: action.payload };   
    case SET_INSURANCES:
      return { ...state, insurances: action.payload };
    case SET_POLICIES:
      return { ...state, policies: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
