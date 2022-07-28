const config = Object.freeze({
  TOKEN_LIFE: 1*24*60*60,
  REFRESH_TOKEN_LIFE: 7*24*60*60,
  REGEX_USENAME_PASSWORD: '^[a-zA-Z0-9_]*$',
  REGEX_FULLNAME: '^[a-zA-Z0-9_ ]*$',
});

export default config;
