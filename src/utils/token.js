import Cookies from "js-cookie";

const TokenKey = "Admin-Token";
const ExpiresInKey = "Admin-Expires-In";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, expires) {
  Cookies.set(ExpiresInKey, expires);
  return Cookies.set(TokenKey, token, { expires });
}

export function removeToken() {
  Cookies.remove(ExpiresInKey);
  return Cookies.remove(TokenKey);
}
