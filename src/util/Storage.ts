const TKN = "tkn";

const Storage = {
  getToken(): string {
    return window.localStorage.getItem(TKN) || '';
  },
};

export default Storage;
