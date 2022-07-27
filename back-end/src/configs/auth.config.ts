const config = Object.freeze({
  tokenLife: 60,
  refreshTokenLife: 7*24*60*60,
  REGEX_USENAME_PASSWORD: '^[a-zA-Z0-9_]*$',
  REGEX_FULLNAME: '^[a-zA-Z0-9_ ]*$',
});

export default config;
