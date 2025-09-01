import { LOGIN, LOGOUT } from "./authActions";

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; password: string } | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true", // Check if authenticated state is saved in localStorage
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null, // Retrieve user info from localStorage
};

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case LOGIN:
      // Save to localStorage when logging in
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, isAuthenticated: true, user: action.payload };
    case LOGOUT:
      // Remove from localStorage when logging out
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;

export const login = (user: { username: string; password: string }) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
