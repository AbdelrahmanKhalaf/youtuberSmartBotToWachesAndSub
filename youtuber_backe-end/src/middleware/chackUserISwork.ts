import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
import { User } from "../models/user.model";
export const chackUserIsWork = async function () {
  const users: any = await User.find({weekFinished:true,activated:true}, { workingHours: true, daysOff: true });
  for (let i = 0; users.length > i; i++) {
    if (users[i].workingHours !== 0 && users[i].daysOff) {
      await User.updateOne(
        { _id: users[i]._id },
        {
          $set: {
            daysOff: users[i].daysOff - 1,
          },
        }
      );
    }
    if (users[i].daysOff == 0) {
      await User.updateOne(
        { _id: users[i]._id },
        {
          $set: {
            blocked: true,
          },
        }
      );
      await ReantalBouquteActivated.updateOne(
        { userId: users[i]._id },
        {
          $set: {
            blocked: true,
          },
        }
      );
    }
  }
};
