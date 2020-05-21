const ID_TOKEN_KEY = "username";

export const getUser = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveUser = username => {
  window.localStorage.setItem(ID_TOKEN_KEY, username);
};

export const destroyUser = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default {
  getUser,
  saveUser,
  destroyUser
};
