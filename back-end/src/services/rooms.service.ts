const BUCKET_SIZE = 20;
const PAGESIZE_DEFAULT = 1;
import { Rooms } from '../models/rooms.model';
import { Increment } from 'mongoose-auto-increment-ts';

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
          count: { $lt: BUCKET_SIZE },
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
    const { room_id, page, pageSize = PAGESIZE_DEFAULT } = data;
    const roomId = new RegExp(`^${room_id}_`);
    return await Rooms.find({
      room_id: roomId,
    })
      .sort({ _id: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  };

  static getNewestMessageBucket = async (room_id: string) => {
    const roomId = new RegExp(`^${room_id}_`);
    try {
      return await Rooms.countDocuments({room_id: roomId});
    } catch (err) {
      throw err;
    }
  }
}