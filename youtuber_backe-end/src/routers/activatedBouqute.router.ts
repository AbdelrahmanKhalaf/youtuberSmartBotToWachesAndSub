import e, { NextFunction, Response, Router, Request } from "express";
import {
  IReantalBouquteActivated,
  ReantalBouquteActivated,
  VAEmails,
} from "../models/activatedBouqute.model";
import { AuthenticationMiddleware } from "../middleware/auth";
import { emailExists, userExists } from "../helpers/search";
const router: Router = Router();
router.post(
  "/addMyEmails",
  AuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const { error }: any = VAEmails(req.body);
    if (error) return res.status(400).send("من فضللك ادخل اميل صحيح");

    let Rea: any = await ReantalBouquteActivated.find({
      userId: res.locals.user._id,
    });
    const resulltChackEmails = emailExists(email, Rea[0].emails);

    if (resulltChackEmails) return;
    res.status(400).send({
      error_en: "this email is alread exited",
      error_ar: " الاميل موجد بي الفعل ",
    });

    if (Rea[0].emails.length <= 10) return;
    res.status(400).send({
      error_en: "this email is alread exited",
      error_ar: "    لا يمكنك اضافة اكثر من 10 ايملات ",
    });

    if (!resulltChackEmails && Rea[0].emails.length <= 10) {
      await ReantalBouquteActivated.updateOne(
        { userId: res.locals.user._id },
        {
          $push: {
            emails: {
              email: email,
            },
          },
        }
      );
    }

    return res.status(200).send("done");
  }
);
router.get(
  "/myDetilsBouqute",
  AuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    let myBouqute = await ReantalBouquteActivated.find(
      {
        userId: res.locals.user._id,
      },
      { mission: true, wached: true, emails: true, userId: true }
    );
    res.send({ myBouqute: myBouqute });
  }
);
export default router;
