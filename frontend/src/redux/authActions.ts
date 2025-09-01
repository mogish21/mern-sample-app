export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (user: { username: string; password: string }) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
