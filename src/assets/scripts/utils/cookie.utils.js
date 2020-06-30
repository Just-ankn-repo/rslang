const cookie = {
  getCookie: (name) => {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },

  setCookie: (name, value) => {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  }
}

export default cookie;