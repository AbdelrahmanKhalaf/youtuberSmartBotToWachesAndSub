import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
import { User } from "../models/user.model";
import { Bouquet } from "../models/bouquets.model";
export const chackUserIsFinishedOrNot = async function () {
  const user: any = await ReantalBouquteActivated.find();
  for (let i = 0; user.length > i; i++) {
    if (user[i].workingHours <= 0) {
      for (let m of user[i].mission) {
        const bouqute: any = await Bouquet.find({ _id: user[i].bouquteId });
        await ReantalBouquteActivated.updateOne(
          { _id: user[i]._id },
          {
            $push: {
              wached: {
                userId: m.userId,
                playlistId: m.playlistId,
              },
            },
            $pull: {
              mission: {
                userId: m.userId,
              },
            },
            $set: {
              workingHours: bouqute[0].dailyWorkingHours,
            },
          }
        );
        await User.updateOne(
          { _id: user[i].userId },
          {
            $set: {
              workingHours: bouqute[0].dailyWorkingHours,
            },
          }
        );
        // const userDays =   await User.find({ _id: user[i].userId },{daysOff:true});
        //  userDays - 1
        //   console.log("done");
        // }
      }
    }
  }
};
