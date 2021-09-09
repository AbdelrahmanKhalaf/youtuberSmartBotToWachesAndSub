import { User } from "../models/user.model";
import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
export const DeleteFinishedBouqute = async function () {
  const reantalBouqutesActivate = await User.find({
    finished: true,
  });
  reantalBouqutesActivate.forEach(async (doc: any) => {
    if (doc && doc.finished) {
      await User.updateOne({ _id: doc._id }, { blocked: true });
    }
  });
};
