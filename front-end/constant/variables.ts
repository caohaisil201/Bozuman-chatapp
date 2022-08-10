export const _VAR = {
  TWO_NEWSET_BUCKET: 2,
  ONE_NEWEST_BUCKET: 1,
  FIRST_NEWEST_BUCKET: 1,
  AVATAR_SIZE: 42,
  PROFILE_AVATAR_SIZE: 50,
  TIME_SHOW_SWAL: 1500,
  SUCCESS: 'success',
  UPDATE_ROOM_SUCCESS: 'Update room successfully',
  DIRECT_ROOM_TYPE: 'Direct message',
  CHANNEL_ROOM_TYPE: 'Channel message',
  REGEX_USENAME_PASSWORD: /^[a-zA-Z0-9_]*$/,
  REGEX_FULLNAME: /^[a-zA-Z0-9_ ]*$/,
  MAX_ROOM_NAME_LENGTH: 32,
  MIN_ROOM_NAME_LENGTH: 4
}

export interface IRoomInfo {
  name: string;
  user_list: Array<string>;
  admin: string;
}