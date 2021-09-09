import { User } from "../models/user.model";
import { ReantalBouqutes } from "../models/reantelBouqute.model";
import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
export const Reast = async function () {
  const reantalBouqutes = await ReantalBouqutes.find({ weakFinshed: false });
  reantalBouqutes.forEach(async (doc: any) => {
    const DateOFday = new Date(Date.now());
    if (doc)
      return console.log("لا يوجد مستخدمين في فترة تجربيه");
    //users was finshed his free one week
    if (doc.endWeak <= DateOFday) {
      const reantal: any = await ReantalBouqutes.findByIdAndUpdate(
        { _id: doc._id },
        {
          weakFinshed: true,
        }
      );
      await User.findByIdAndUpdate(
        { _id: doc.idUser },
        {
          weekFinished: true,
        }
      );
      await ReantalBouquteActivated.findByIdAndUpdate(
        { userId: doc.idUser },
        {
          weekFinished: true,
        }
      );
      if (!ReantalBouquteActivated) return console.log("not found the user");
    }
    //users was finshed his bouqutes
    if (doc.end <= DateOFday) {
      await ReantalBouquteActivated.findByIdAndUpdate({ userId: doc.idUser },{
        $set:{
          blocked: true,
        }
      });
      await User.findByIdAndUpdate(
        { _id: doc.idUser },{
        $set:{
          finished: true,
          blocked:true
        }
      }
      );
    }
  });
  return;
};
