import { Rooms } from '../models/rooms.model';
import { Increment } from 'mongoose-auto-increment-ts';
import { Users } from '../models/users.model';
import _CONF from '../configs/chat.config';

export class RoomsService {
  static addNewRoom = async (data: any) => {
    const id = await Increment('room');
    try {
      const room = {
        room_id: `${id}_${new Date().getTime()}`,
        name: data.name,
        user_list: data.user_list,
        type: data.type,
        admin: data.admin,
      };

      const response = await new Rooms(room).save();

      // Also have to add room info into room_list of each user
      data.user_list.map((user: string) => {
        Users.findOneAndUpdate(
          { username: user },
          {
            $push: {
              room_list: {
                room_id: id,
                name: data.name,
                type: data.type,
                unread: true,
                last_message: _CONF.CREATE_ROOM_NOTIFICATION,
                last_time: new Date().getTime(),
              } as any,
            },
          }
        ).exec();
      });

      return response;
    } catch (err) {
      throw err;
    }
  };

  static insertChatMessageIntoRoom = async (message: any) => {
    const newRoomId = new RegExp(`^${message.room_id}_`);
    try {
      const resultRoomStatus = await Rooms.findOneAndUpdate(
        {
          room_id: newRoomId,
          count: { $lt: _CONF.BUCKET_SIZE },
        },
        {
          $push: {
            message_list: {
              sender: message.sender,
              content: message.content,
              time: new Date().getTime(),
            } as any,
          },
          $inc: { count: 1 },
          $setOnInsert: {
            room_id: `${message.room_id}_${new Date().getTime()}`,
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
      return resultRoomStatus;
    } catch (err) {
      throw err;
    }
  };

  static getMessageInRoomByPage = async (data: any) => {
    const { room_id, page, page_size = _CONF.PAGESIZE_DEFAULT } = data;
    const roomId = new RegExp(`^${room_id}_`);
    return await Rooms.find({
      room_id: roomId,
    })
      .sort({ _id: 1 })
      .skip((page - 1) * page_size)
      .limit(page_size)
      .select(['message_list', 'count', '-_id']);
  };

  static getNewestMessageBucket = async (room_id: string) => {
    const roomId = new RegExp(`^${room_id}_`);
    try {
      return await Rooms.countDocuments({ room_id: roomId });
    } catch (err) {
      throw err;
    }
  };

  static getRoomInfo = async (room_id: string | number) => {
    const roomId = new RegExp(`^${room_id}_`);
    return await Rooms.findOne({
      room_id: roomId,
    })
      .sort({ _id: 1 })
      .skip(0)
      .limit(1)
      .select(['name', 'user_list', 'admin', 'type', '_id']);
  };

  static editRoom = async (
    name: string,
    user_list: Array<string>,
    room_id: number,
    admin: string
  ) => {
    const roomId = new RegExp(`^${room_id}_`);
    const type =
      user_list.length > _CONF.NUMBER_OF_USER_DIRECT_MESSAGE
        ? _CONF.CHANNEL_MESSAGE
        : _CONF.DIRECT_MESSAGE;
    const roomInUserCollection = {
      room_id: roomId,
      name: name,
      type: type,
      unread: true,
      last_message: _CONF.EDIT_ROOM_NOTIFICATION,
      last_time: new Date().getTime(),
    };
    const oldRoom = await this.getRoomInfo(room_id);
    if (oldRoom) {
      oldRoom.user_list.forEach(async (item) => {
        await Users.updateOne(
          { username: item },
          { $pull: { room_list: {room_id : room_id} } as any }
        ).exec();
      });
      user_list.forEach(async (item) => {
        await Users.updateOne(
          { username: item },
          {
            $push: {
              room_list: roomInUserCollection as any,
            },
          }
        ).exec();
      });
    }
    return await Rooms.updateMany({room_id: roomId}, {$set: {
      name: name,
      user_list: user_list,
      admin: admin,
      type: type
    }})
  };
}
