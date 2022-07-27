import { Rooms } from '../models/rooms.model';
import { Increment } from 'mongoose-auto-increment-ts';

export class RoomsService {
  static addNewRoom = async (data: any) => {
    const id = await Increment('room');
    try {
      const room = {
        room_id: id,
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

  static insertChatMessageIntoRoom = async (room_id: number, sender: string, content: string) => {
    try {
      const resultRoomStatus = await Rooms.findOneAndUpdate(
        {
          room_id: room_id,
          count: { $lt: 10 },
        },
        {
          $push: {
            message_list: {
              sender: sender,
              content: content,
            },
          },
        }
      );
    } catch (err) {
      throw err;
    }
  };
}
