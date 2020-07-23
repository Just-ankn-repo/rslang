const cookie = {
  getCookie: (name) => {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },

  setCookie: (name, value) => {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=14400`;
  },

  deleteCookie: (name) => {
    document.cookie = `${encodeURIComponent(name)}=; max-age=0`;
  },
}

export default cookie;