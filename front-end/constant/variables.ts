export const _VAR = {
  TWO_NEWSET_BUCKET: 2,
  ONE_NEWEST_BUCKET: 1,
  FIRST_NEWEST_BUCKET: 1,
  AVATAR_SIZE: 42,
  TIME_SHOW_SWAL: 1500,
  SUCCESS: 'success',
  UPDATE_ROOM_SUCCESS: 'Update room successfully',
  DIRECT_ROOM_TYPE: 'Direct message',
  CHANNEL_ROOM_TYPE: 'Channel message'
}

export interface IRoomInfo {
  name: string;
  user_list: Array<string>;
  admin: string;
}