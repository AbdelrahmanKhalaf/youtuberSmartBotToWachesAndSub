import { Server, Socket } from "socket.io";
import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
import { User } from "../models/user.model";
import { ChatGoroub } from "../models/chatGroub";
export async function PostMessage(io: Server) {
  io.on("connection", (socket: Socket) => {
    //this is name unq of room
    socket.on("join", (room: any) => {
      socket.join(room.room);
      console.log("user is join");
    });
    const start = Date.now();
    socket.on("createMasg", (msg: any) => {
      //save chats in date base
      const cahts = new ChatGoroub({
        userName: msg.sender,
        massage: msg.mas,
        room: msg.room,
        idChat: socket.id,
      });
      cahts.save();
      // this is send masg only users exited in the room
      io.to(msg.room).emit("newMasagee", {
        text: msg.mas,
        from: msg.sender,
      });
      // count user is concted or disconcted
    });
    let roomId: any = "";
    let date: any;
    let userId: any;
    socket.on("roomWorak", (room: any) => {
      roomId = room.id;
      date = room.date;
      userId = room.userId;
      socket.join(room.id);
      socket.emit("server", "you have connected to a public room");
      io.to(room.id).emit("server", socket.id + " has connected to this room");
    });
    socket.on("disconnect", async function () {
      const user: any = await User.find({ _id: userId });
      if (
        user != (undefined && []) &&
        user[0].workingHours != ("" && 0 && undefined)
      ) {
        const date2 = user[0].workingHours - (Date.now() - date);
        const bouqute: any = await ReantalBouquteActivated.find({
          userId: userId,
        });
        console.log(user[0].workingHours - (Date.now() - date));
        const updateBouq: any = await ReantalBouquteActivated.updateOne(
          {
            userId: userId,
          },
          {
            $set: {
              workingHours: date2,
            },
          }
        );

        const updateUser: any = await User.updateOne(
          {
            _id: userId,
          },
          {
            $set: {
              workingHours: date2,
            },
          }
        );
        socket.leave(roomId);
      }
    });
    socket.on("countUser", async (data: any) => {
      const user: any = await User.find({ _id: data.userId });
      if (
        user != (undefined && []) &&
        user[0].workingHours != ("" && 0 && undefined)
      ) {
        const bouqute: any = await ReantalBouquteActivated.find({
          userId: data.userId,
        });
        const date = user[0].workingHours - data.date;
        const updateBouq: any = await ReantalBouquteActivated.updateOne(
          {
            userId: data.userId,
          },
          {
            $set: {
              workingHours: date,
            },
          }
        );
        const updateUser: any = await User.updateOne(
          {
            _id: data.userId,
          },
          {
            $set: {
              workingHours: date,
            },
          }
        );
      }
    });
  });
}
// socket.on("disconnect", () => {
//     const end = Date.now();
//     console.log("user is discon...");

//     console.log(end - start);
//   });
