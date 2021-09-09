import { User } from "../models/user.model";
import { Bouquet } from "../models/bouquets.model";
import {
  ReantalBouqutes,
  validateReantalBouqute,
  IReantalBouqutes,
  validateAccseptUser,
} from "../models/reantelBouqute.model";
import { NextFunction, Response, Router, Request } from "express";
import { AuthenticationMiddleware } from "../middleware/auth";
import _ from "lodash";
import { addDays } from "../helpers/add.days";
import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
import { AuthuthrationMiddleware } from "../middleware/admin";
const router: Router = Router();
router.post(
  "/",
  AuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const { error }: any = validateReantalBouqute(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const {
      dataOut,
      dateAccsept,
      idBouqute,
      buy,
      startWeak,
      endWeak,
      end,
      start,
      weakFinshed,
    }: IReantalBouqutes = req.body;
    let user: any = await User.findOne({ _id: res.locals.user._id });
    if (!user)
      return res.status(400).send({
        error_en: "that user is not registered",
        error_ar: "هذا المستخدم غير مسجل",
      });
    let bouquet = await Bouquet.findOne({ _id: idBouqute });
    if (!bouquet)
      return res.status(400).send({
        error_en: "This bouquet does not exist",
        error_ar: "هذه الباقة غير موجودة",
      });
    let reantalBouqte: any = await ReantalBouqutes.findOne({
      idUser: user._id,
    });

    if (reantalBouqte) {
      if (reantalBouqte.idBouqute != idBouqute) {
        return res.status(400).send({
          error_en: "You have already bought the package",
          error_ar:
            " لقد اشتريت باقه اخري بالفعل , ولا يمكنك شراء باقه اخري   ",
        });
      }
      if (!reantalBouqte.buy && reantalBouqte.weakFinshed === true)
        return res.status(400).send({
          error_en: "You have already bought the package",
          error_ar:
            " لقد اشتريت الباقة بالفعل , وانتهت فترة التجربه  , انتظر حتي يتم الموفقه علي بقاقتك ",
        });

      if (reantalBouqte.buy && reantalBouqte.weakFinshed === true)
        return res.status(400).send({
          error_en: "You have already bought the package",
          error_ar:
            " لقد اشتريت الباقة بالفعل , وانتهت فترة التجربه  ,   وتم الموفقه علي باقتك ",
        });
      if (!reantalBouqte.buy && !reantalBouqte.weakFinshed)
        return res.status(400).send({
          error_en:
            "You have already submitted an order to purchase the pouqute",
          error_ar:
            " انت الان في فترة التجربه وبي الفعل  قدمت عليها وعند انتهاء الفتره المجانيه سوف تدخل المرجعه",
        });
      if (reantalBouqte.idUser)
        return res.status(400).send({
          error_en:
            "You have already submitted an order to purchase the pouqute",
          error_ar: "لقد قدمت علي الباقه",
        });
    }
    const IdPliylist = user.playlist.slice(user.playlist.indexOf("list="));
    const IdChannal = user.yourChannel.slice(
      user.yourChannel.indexOf("channel/") + 8
    );
    let newReantalBouqute = new ReantalBouqutes({
      idUser: res.locals.user._id,
      idChnnale: IdPliylist,
      idBouqute: bouquet._id,
      buy: buy,
      dateAccsept: dateAccsept,
      dataOut: dataOut,
      startWeak: startWeak,
      endWeak: endWeak,
      weakFinshed: weakFinshed,
      start: start,
      end: end,
    });
    let reantalActivate: any = await ReantalBouquteActivated.findOne({
      _id: user._id,
    });
    if (reantalActivate) {
      if (reantalActivate.weekFinished && !reantalActivate.Activated)
        return res.status(400).send({
          error_en: "You have already bought the package",
          error_ar:
            " لقد اشتريت الباقة بالفعل , وانتهت فترة التجربه  , انتظر حتي يتم الموفقه علي بقاقتك ",
        });
      if (!reantalActivate.weekFinished && !reantalActivate.Activated)
        return res.status(400).send({
          error_en:
            "You have already submitted an order to purchase the pouqute",
          error_ar:
            " انت الان في فترة التجربه وبي الفعل  قدمت عليها وعند انتهاء الفتره المجانيه سوف تدخل المرجعه",
        });
      if (reantalActivate.userId)
        return res.status(400).send({
          error_en:
            "You have already submitted an order to purchase the pouqute",
          error_ar: "لقد قدمت علي الباقه",
        });
    }
    const dailyWorking: any = await Bouquet.find(
      { _id: bouquet._id },
      { numberOfDays: true, daysOff: true, dailyWorkingHours: true, _id: true }
    );
    let newReantalActivate = new ReantalBouquteActivated({
      userId: res.locals.user._id,
      bouquteId: bouquet,
      playlistId: IdPliylist,
      weekFinished: weakFinshed,
      workingHours: 0,
      channalId: IdChannal,
    });

    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        idBouqute: bouquet,
        weakFinshed: false,
        workingHours: 0,
      }
    );

    await newReantalActivate.save();
    await newReantalBouqute.save();
    return res.send({
      order: newReantalBouqute,
      newReantalActivated: newReantalActivate,
      message_ar:
        "لقد حصلت علي الاسبوع المجاني من الان ويمكنك تفعيل الباقه بعد انتهاء الاسبوع ",
    });
  }
);
router.get(
  "/allAccsept",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    let allUserAccsept = await ReantalBouqutes.find({ buy: true }).populate({
      path: "idUser",
      model: "user",
      select: "name phone email idBouqute",
      populate: {
        path: "idBouqute",
        model: "bouquet",
        select: "title",
      },
    });
    res.send(allUserAccsept);
  }
);
router.get(
  "/allTryIt",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    let allUserAccsept = await ReantalBouqutes.find({
      weakFinshed: false,
    }).populate({
      path: "idUser",
      model: "user",
      select: "name phone  email idBouqute code codeFrinde",
      populate: {
        path: "idBouqute",
        model: "bouquet",
        select: "title",
      },
    });
    res.send(allUserAccsept);
  }
);

router.get(
  "/allNotAccsept",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    let allUserAccsept = await ReantalBouqutes.find({
      weakFinshed: true,
      buy: false,
    }).populate({
      path: "idUser",
      model: "user",
      select: "name phone email idBouqute",
      populate: {
        path: "idBouqute",
        model: "bouquet",
        select: "title",
      },
    });
    res.send(allUserAccsept);
  }
);
router.get(
  "/free",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const Boqute = await Bouquet.find({ title: "مجانيه" });

    let allUserAccsept = await ReantalBouqutes.find(
      { idBouqute: Boqute[0]._id },
      {
        weakFinshed: false,
      }
    ).populate({
      path: "idUser",
      model: "user",
      select: "name phone  email idBouqute  ",
      populate: {
        path: "idBouqute",
        model: "bouquet",
        select: "title",
      },
    });
    res.send(allUserAccsept);
  }
);
router.get(
  "/piad",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const Boqute = await Bouquet.find({ title: "ثلاث شهور" });

    let allUserAccsept = await ReantalBouqutes.find(
      { idBouqute: Boqute[0]._id },
      {
        weakFinshed: false,
      }
    ).populate({
      path: "idUser",
      model: "user",
      select: "name phone  email idBouqute code codeFrinde",
      populate: {
        path: "idBouqute",
        model: "bouquet",
        select: "title",
      },
    });
    res.send(allUserAccsept);
  }
);
router.get(
  "/DetilsBouqute/:id",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    let allUserAccsept = await ReantalBouqutes.find({
      _id: req.params.id,
    }).populate({
      path: "idUser",
      model: "user",
      populate: {
        path: "idBouqute",
        model: "bouquet",
      },
    });
    res.send({ allUserAccsept: allUserAccsept });
  }
);
router.get(
  "/myBouqute",
  AuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    let myBouqute = await ReantalBouqutes.find({ idUser: res.locals.user._id });
    res.send({ myBouqute: myBouqute });
  }
);
router.put(
  "/update/:id",

  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const { error }: any = validateAccseptUser(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const dateAc: any = Date.now();
    const ID: any = req.params.id;
    const NewDate = new Date(dateAc);
    const IdBouqute: any = await ReantalBouqutes.find(
      { idUser: ID },
      {
        idBouqute: true,
        idUser: true,
        buy: true,
        endWeak: true,
        weakFinshed: true,
      }
    );

    const IdBouquteAc: any = await ReantalBouquteActivated.find({ userId: ID });
    const emails: any = await ReantalBouquteActivated.find({
      userId: ID,
    });
    const dailyWorking: any = await Bouquet.find(
      { _id: IdBouqute[0].idBouqute },
      { numberOfDays: true, daysOff: true, dailyWorkingHours: true }
    );
    const date = addDays(NewDate, dailyWorking[0].numberOfDays - 7);
    if (IdBouqute[0].weakFinshed === false && IdBouqute[0].buy === false)
      return res.status(400).send({
        Error: " المستخدم ما ذال في  التجربه الاسبوعيه لا يمكن تحديث باقتو",
      });

    if (new Date(NewDate) < IdBouqute[0].endWeak)
      return res.status(404).send("  لم ينتهي الوقت");

    if (emails[0].emails.length !== 10)
      return res.status(400).send({
        Error: "  المستخدم لم يكمل الاميلات ",
      });
    const rantaleBouquteUpdate = await ReantalBouqutes.updateOne(
      { idUser: ID },
      {
        buy: req.body.buy,
        dateAccsept: dateAc,
        start: dateAc,
        end: date,
      }
    );
    if (!rantaleBouquteUpdate)
      return res.status(404).send("هذا الاوردر غير موجد");
    const user: any = await User.findByIdAndUpdate(IdBouqute[0].idUser, {
      daysOff: dailyWorking[0].daysOff,
      startDaysWork: dateAc,
      endDaysWork: date,
      workingHours: 0,
      workdays: dailyWorking[0].numberOfDays,
      idBouqute: IdBouquteAc[0]._id,
      activated: true,
    });
    await ReantalBouquteActivated.updateOne(
      { userId: ID },
      {
        Activated: true,
      }
    );
    // const DetailsBouqute = await Bouquet.find({
    //   _id: user.idBouqute,
    // }).populate({
    //   path: "users",
    //   model: "bouquets",
    // });
    // if (!DetailsBouqute)
    //   return res.status(404).send(" هذه الباقه غير موجده");
    return res.send({ user: user });
  }
);
router.put(
  "/unblocked/:id",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response) => {
    const resullt = req.body.unblocked;
    const user = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          blocked: resullt,
        },
      }
    );
    if (!user) return res.status(400).send("مستخدم غير موجد");
    const bouqute = await ReantalBouquteActivated.updateOne(
      { userId: req.params.id },
      {
        $set: {
          blocked: resullt,
        },
      }
    );
    if (!bouqute) return res.status(400).send("باقه غير موجده");
    return;
  }
);

export default router;
