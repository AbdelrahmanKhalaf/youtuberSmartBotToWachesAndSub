import { NextFunction, Response, Router, Request } from "express";
import { User, Iusers } from "../models/user.model";
import joi, { boolean, date, number, string } from "joi";
const router: Router = Router();
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password }: Iusers = await req.body;
    const { error }: any = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user: any = await User.findOne({ email: email });
    if (!user)
      res.status(400).send({
        error_en: "invalid email / or password",
        error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
      });
    let validPassword = await User.findOne({ password: password });
    if (!validPassword)
      res.status(400).send({
        error_en: "invalid email / or password",
        error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
      });
    const token = user.generaToken();
    return res.header("Authentication", token).status(200).send({
      user: user,
      bearer: token,
    });
  } catch (ex) {
    throw new Error(ex);
  }
});
router.post("/admin", async (req: Request, res: Response) => {
  try {
    const { email, password }: Iusers = await req.body;
    const { error }: any = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user: any = await User.findOne({ email: email });
    if (!user)
      res.status(400).send({
        error_en: "invalid email / or password",
        error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
      });
    let validPassword = await User.findOne({ password: password });
    if (!validPassword)
      return res.status(400).send({
        error_en: "invalid email / or password",
        error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
      });
    if (!user.isAdmin)
      return res.status(400).send({
        error_en: "you are not admin",
        error_ar: "  لست صاحب الموقع    ",
      });
    await user.save();
    const token = user.generaToken();
    return res.header("Authentication", token).status(200).send({
      user: user,
      bearer: token,
    });
  } catch (ex) {
    throw new Error(ex);
  }
});
async function validateUser(auth: any) {
  const schema = await {
    email: joi.string().email().min(8).max(315).email().required(),
    password: joi.string().min(8).max(315).required(),
  };
  return joi.validate(auth, schema);
}
export default router;
