const ADMIN_CREDENTIALS = { email: "admin@ehsaas.com", password: "admin123" };
const AUTH_KEY = "ehsaas_admin_auth";

export const login = (email: string, password: string): boolean => {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, loggedIn: true, timestamp: Date.now() }));
    return true;
  }
  return false;
};

export const logout = () => localStorage.removeItem(AUTH_KEY);

export const isAuthenticated = (): boolean => {
  const auth = localStorage.getItem(AUTH_KEY);
  if (!auth) return false;
  try {
    return JSON.parse(auth).loggedIn === true;
  } catch { return false; }
};
