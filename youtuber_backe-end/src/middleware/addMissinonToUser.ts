import { User } from "../models/user.model";
import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
import { userExists } from "../helpers/search";
import { Bouquet } from "../models/bouquets.model";
import { pull } from "lodash";
export const AddMisionToUSerTryAndFree = async () => {
  const bouquteId = await Bouquet.find({ title: "مجانيه" });

  const users: any = await User.find({
    weekFinished: false,
    activated: false,
    blocked: false,
    idBouqute: bouquteId[0]._id,
  });
  for (let i = 0; users.length > i; i++) {
    const reantalBouquteActivated: any = await ReantalBouquteActivated.find({
      bouquteId: bouquteId[0]._id,
      weekFinished: false,
      Activated: false,
      blocked: false,
      userId: { $ne: users[i]._id },
    });
    const reantalCuryntUser: any = await ReantalBouquteActivated.find({
      userId: users[i]._id,
      bouquteId: bouquteId[0]._id,
      weekFinished: false,
      Activated: false,
      blocked: false,
    });
    for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
      if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
        var resulltChackMission: any = userExists(
          String(reantalBouquteActivated[BA].userId),
          reantalCuryntUser[0].mission
        );
      }

      if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
        var resulltChackWached: any = userExists(
          String(reantalBouquteActivated[BA].userId),
          reantalCuryntUser[0].wached
        );
      }

      if (
        reantalCuryntUser[0].mission.length <= 8 &&
        !resulltChackMission &&
        !resulltChackWached &&
        String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
        (reantalCuryntUser[0].mission.length += 1) <= 8
      ) {
        await ReantalBouquteActivated.updateOne(
          { userId: users[i]._id },
          {
            $push: {
              mission: {
                userId: reantalBouquteActivated[BA].userId,
                playlistId: reantalBouquteActivated[BA].playlistId,
              },
              slice: 1,
            },
          }
        );
      }
    }
    if (reantalCuryntUser[0].mission.length < 8) {
      for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
        if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
          var resulltChackMission: any = userExists(
            String(reantalBouquteActivated[BA].userId),
            reantalCuryntUser[0].mission
          );
        }

        if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
          var resulltChackWached: any = userExists(
            String(reantalBouquteActivated[BA].userId),
            reantalCuryntUser[0].wached
          );
        }

        if (
          reantalCuryntUser[0].mission.length <= 8 &&
          !resulltChackMission &&
          resulltChackWached &&
          String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
          (reantalCuryntUser[0].mission.length += 1) <= 8
        ) {
          await ReantalBouquteActivated.updateOne(
            { userId: users[i]._id },
            {
              $push: {
                mission: {
                  userId: reantalBouquteActivated[BA].userId,
                  playlistId: reantalBouquteActivated[BA].playlistId,
                },
                slice: 1,
              },
              $pull: {
                wached: { userId: reantalBouquteActivated[BA].userId },
              },
            }
          );
        }
      }
    }
  }
  return true;
};
export const AddMisionToUSerAndFree = async () => {
  const bouquteId = await Bouquet.find({ title: "مجانيه" });
  const users: any = await User.find({
    weekFinished: true,
    activated: true,
    blocked: false,
    idBouqute: bouquteId[0]._id,
  });

  if (users == [])
    return console.log("لا يوجد مستخدمين تم تفعيل باقتهم في الباقه المجانيه");
  for (let i = 0; users.length > i; i++) {
    const reantalBouquteActivated: any = await ReantalBouquteActivated.find({
      bouquteId: bouquteId[0]._id,
      weekFinished: true,
      Activated: true,
      blocked: false,
      userId: { $ne: users[i]._id },
    });
    const reantalCuryntUser: any = await ReantalBouquteActivated.find({
      userId: users[i]._id,
      bouquteId: bouquteId[0]._id,
      weekFinished: true,
      Activated: true,
      blocked: false,
    });
    for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
      if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
        var resulltChackMission: any = userExists(
          String(reantalBouquteActivated[BA].userId),
          reantalCuryntUser[0].mission
        );
      }

      if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
        var resulltChackWached: any = userExists(
          String(reantalBouquteActivated[BA].userId),
          reantalCuryntUser[0].wached
        );
      }

      if (
        reantalCuryntUser[0].mission.length <= 8 &&
        !resulltChackMission &&
        !resulltChackWached &&
        String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
        (reantalCuryntUser[0].mission.length += 1) <= 8
      ) {
        await ReantalBouquteActivated.updateOne(
          { userId: users[i]._id },
          {
            $push: {
              mission: {
                userId: reantalBouquteActivated[BA].userId,
                playlistId: reantalBouquteActivated[BA].playlistId,
              },
              slice: 1,
            },
          }
        );
      }
    }
    if (reantalCuryntUser[0].mission.length < 8) {
      for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
        if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
          var resulltChackMission: any = userExists(
            String(reantalBouquteActivated[BA].userId),
            reantalCuryntUser[0].mission
          );
        }

        if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
          var resulltChackWached: any = userExists(
            String(reantalBouquteActivated[BA].userId),
            reantalCuryntUser[0].wached
          );
        }

        if (
          reantalCuryntUser[0].mission.length <= 8 &&
          !resulltChackMission &&
          resulltChackWached &&
          String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
          (reantalCuryntUser[0].mission.length += 1) <= 8
        ) {
          await ReantalBouquteActivated.updateOne(
            { userId: users[i]._id },
            {
              $push: {
                mission: {
                  userId: reantalBouquteActivated[BA].userId,
                  playlistId: reantalBouquteActivated[BA].playlistId,
                },
                slice: 1,
              },
              $pull: {
                wached: { userId: reantalBouquteActivated[BA].userId },
              },
            }
          );
        }
      }
    }
  }
  return true;
};
export const AddMisionToUSerAndPaidAndTry = async () => {
  const bouquteId = await Bouquet.find({ title: "ثلاث شهور" });
  const users: any = await User.find({
    idBouqute: bouquteId[0]._id,
    weekFinished: false,
    activated: false,
    blocked: false,
  });

  for (let i = 0; users.length > i; i++) {
    const reantalBouquteActivated: any = await ReantalBouquteActivated.find({
      bouquteId: bouquteId[0]._id,
      weekFinished: false,
      Activated: false,
      blocked: false,
      userId: { $ne: users[i]._id },
    });

    const reantalCuryntUser: any = await ReantalBouquteActivated.find({
      userId: users[i]._id,
      bouquteId: bouquteId[0]._id,
      weekFinished: false,
      Activated: false,
      blocked: false,
    });

    for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
      if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
        var resulltChackMission: any = userExists(
          String(reantalBouquteActivated[BA].userId),
          reantalCuryntUser[0].mission
        );
      }

      if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
        var resulltChackWached: any = userExists(
          String(reantalBouquteActivated[BA].userId),
          reantalCuryntUser[0].wached
        );
      }

      if (
        reantalCuryntUser[0].mission.length <= 9 &&
        !resulltChackMission &&
        !resulltChackWached &&
        String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
        (reantalCuryntUser[0].mission.length += 1) <= 9
      ) {
        await ReantalBouquteActivated.updateOne(
          { userId: users[i]._id },
          {
            $push: {
              mission: {
                userId: reantalBouquteActivated[BA].userId,
                playlistId: reantalBouquteActivated[BA].playlistId,
              },
              slice: 1,
            },
          }
        );
      }
    }
    if (reantalCuryntUser[0].mission.length < 9) {
      for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
        if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
          var resulltChackMission: any = userExists(
            String(reantalBouquteActivated[BA].userId),
            reantalCuryntUser[0].mission
          );
        }

        if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
          var resulltChackWached: any = userExists(
            String(reantalBouquteActivated[BA].userId),
            reantalCuryntUser[0].wached
          );
        }

        if (
          reantalCuryntUser[0].mission.length <= 9 &&
          !resulltChackMission &&
          resulltChackWached &&
          String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
          (reantalCuryntUser[0].mission.length += 1) <= 9
        ) {
          await ReantalBouquteActivated.updateOne(
            { userId: users[i]._id },
            {
              $push: {
                mission: {
                  userId: reantalBouquteActivated[BA].userId,
                  playlistId: reantalBouquteActivated[BA].playlistId,
                },
                slice: 1,
              },
              $pull: {
                wached: { userId: reantalBouquteActivated[BA].userId },
              },
            }
          );
        }
      }
    }
  }
};
export const AddMisionToUSerAndPaid = async () => {
  const bouquteId = await Bouquet.find({ title: "ثلاث شهور" });
  const users: any = await User.find({
    weekFinished: true,
    activated: true,
    blocked: false,
    idBouqute: bouquteId[0]._id,
  });

  if (users == [])
    return console.log("لا يوجد مستخدمين تم افعيل باقتهم في باقه ثلاث شهور");
  for (let i = 0; users.length > i; i++) {
    const reantalBouquteActivated: any = await ReantalBouquteActivated.find({
      bouquteId: bouquteId[0]._id,
      weekFinished: true,
      Activated: true,
      blocked: false,
      userId: { $ne: users[i]._id },
    });
    const reantalCuryntUser: any = await ReantalBouquteActivated.find({
      userId: users[i]._id,
      bouquteId: bouquteId[0]._id,
      weekFinished: true,
      Activated: true,
      blocked: false,
    });
    for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
      if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
        var resulltChackMission: any = userExists(
          String(reantalBouquteActivated[BA].userId),
          reantalCuryntUser[0].mission
        );
      }

      if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
        var resulltChackWached: any = userExists(
          String(reantalBouquteActivated[BA].userId),
          reantalCuryntUser[0].wached
        );
      }

      if (
        reantalCuryntUser[0].mission.length <= 9 &&
        !resulltChackMission &&
        !resulltChackWached &&
        String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
        (reantalCuryntUser[0].mission.length += 1) <= 9
      ) {
        await ReantalBouquteActivated.updateOne(
          { userId: users[i]._id },
          {
            $push: {
              mission: {
                userId: reantalBouquteActivated[BA].userId,
                playlistId: reantalBouquteActivated[BA].playlistId,
              },
              slice: 1,
            },
          }
        );
      }
    }
    if (reantalCuryntUser[0].mission.length < 9) {
      for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
        if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
          var resulltChackMission: any = userExists(
            String(reantalBouquteActivated[BA].userId),
            reantalCuryntUser[0].mission
          );
        }

        if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
          var resulltChackWached: any = userExists(
            String(reantalBouquteActivated[BA].userId),
            reantalCuryntUser[0].wached
          );
        }

        if (
          reantalCuryntUser[0].mission.length <= 9 &&
          !resulltChackMission &&
          resulltChackWached &&
          String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
          (reantalCuryntUser[0].mission.length += 1) <= 9
        ) {
          await ReantalBouquteActivated.updateOne(
            { userId: users[i]._id },
            {
              $push: {
                mission: {
                  userId: reantalBouquteActivated[BA].userId,
                  playlistId: reantalBouquteActivated[BA].playlistId,
                },
                slice: 1,
              },
              $pull: {
                wached: { userId: reantalBouquteActivated[BA].userId },
              },
            }
          );
        }
      }
    }
  }
  return true;
};
