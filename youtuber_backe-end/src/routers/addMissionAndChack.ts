import { User } from "../models/user.model";
import express, {
  NextFunction,
  Response,
  Router,
  Request,
  Application,
} from "express";
import { AddMisionToUSerAndPaidAndTry } from "../middleware/addMissinonToUser";
import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
import { AuthenticationMiddleware } from "../middleware/auth";
import { userExists } from "../helpers/search";
import { Bouquet } from "../models/bouquets.model";
const app: Application = express();
const router: Router = Router();
router.post(
  "/start",
  async (req: Request, res: Response, next: NextFunction) => {
    const start: boolean = req.body.start;
    if (start) {
      AddMisionToUSerAndPaidAndTry();
      res.status(200).send("لقد تم اضافة المهام للمستخدمين بنجاح");
    } else {
      res.status(400).send(" الربوت في حالة استرخاء الان");
    }
  }
);
router.post(
  "/addChnnaleTry",
  AuthenticationMiddleware,
  async (req: Request, res: Response) => {
    const bouquteId = await Bouquet.find({ title: "مجانيه" });
    const { playlistId } = req.body;
    bouquteId.forEach(async (bouqute: any) => {
      const reantalBouquteActivated: any = await ReantalBouquteActivated.find({
        bouquteId: bouqute._id,
      });
      const playListId = playlistId.slice(playlistId.indexOf("list="));
      reantalBouquteActivated.forEach(async (doc: any) => {
        if (!doc.Activated && !doc.weekFinished) {
          await ReantalBouquteActivated.updateOne(
            { userId: doc.userId },
            {
              $push: {
                mission: [
                  { userId: res.locals.user._id, playlistId: playListId },
                ],
              },
            },
            { silce: 1 }
          );
        }
      });
    });
    res.status(200).send("done");
  }
);
router.post(
  "/addChnnaleFree",
  AuthenticationMiddleware,
  async (req: Request, res: Response) => {
    const bouquteId = await Bouquet.find({ title: "مجانيه" });
    const { userId, playlistId } = req.body;
    bouquteId.forEach(async (bouqute: any) => {
      const reantalBouquteActivated: any = await ReantalBouquteActivated.find({
        bouquteId: bouqute._id,
      });
      const playListId = playlistId.slice(playlistId.indexOf("list="));
      reantalBouquteActivated.forEach(async (doc: any) => {
        if (doc.Activated && doc.weekFinished) {
          await ReantalBouquteActivated.updateOne(
            { userId: doc.userId },
            {
              $push: {
                mission: [
                  { userId: res.locals.user._id, playlistId: playListId },
                ],
              },
            },
            { silce: 1 }
          );
        }
      });
    });

    res.send("done");
  }
);
export default router;
