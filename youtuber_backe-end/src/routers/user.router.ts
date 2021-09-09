import { NextFunction, Response, Router, Request } from "express";
import mailgun from "mailgun-js";
import multer from "multer";
import {
  User,
  validateUser,
  Iusers,
  validateUserEmail,
  validateUserPassword,
  validateUserUpdate,
  vaildavatar,
  validateUserPlaylist,
} from "../models/user.model";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { AuthenticationMiddleware } from "../middleware/auth";
import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
import { ReantalBouqutes } from "../models/reantelBouqute.model";
import { AuthuthrationMiddleware } from "../middleware/admin";
const apiKey = "ec6cd001556695eff89219bf6db28ae1-f7d0b107-b163b7c0";
const DOMAIN = "sandboxc1bd8898b47e42da8ba2d87e6b66805b.mailgun.org";
const mg = mailgun({ apiKey: apiKey, domain: DOMAIN });
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + ".png");
  },
});
const fileFilter = function fileFilter(
  req: any,
  file: { mimetype: string },
  cb: (arg0: null, arg1: boolean) => void
) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
const type = upload.single("avatar");
const router: Router = Router();
router.post(
  "/singup",
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      code,
      codeFrinde,
      email,
      password,
      phone,
      name,
      address,
      date,
      age,
      gender,
      playlist,
      workdays,
      endDaysWork,
      startDaysWork,
      daysOff,
      isAdmin,
      _id,
      yourChannel,
      avatar,
      weekFinished,
      blocked,
      finished,
    }: Iusers = await req.body;
    const { error }: any = validateUser(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    let user = await User.findOne({ email: email });
    if (user)
      return res.status(400).send({
        error_en: "that user already  registered",
        error_ar: "هذا المستخدم مسجل بالفعل",
      });
    let nameUser = await User.findOne({ name: name });
    if (nameUser)
      return res.status(400).send({
        error_en: "that name already exist",
        error_ar: "هذا الاسم موجود بالفعل",
      });
    let chackPlaylist = await User.findOne({ playlist: playlist });
    if (chackPlaylist)
      return res.status(400).send({
        error_en: "that playlist already exist",
        error_ar: "قائمة التشغيل موجوده بالفعل",
      });
    let chackChanle = await User.findOne({ yourChannel: yourChannel });
    if (chackChanle)
      return res.status(400).send({
        error_en: "that channale already exist",
        error_ar: " القناة موجوده بالفعل",
      });
    let codeV = await User.findOne({ code: code });
    if (codeV)
      return res.status(400).send({
        error_en: "that code already exist",
        error_ar: "الكود موجود بالفعل",
      });
    const users = new User({
      email: email,
      password: password,
      phone: phone,
      name: name,
      address: address,
      date: date,
      age: age,
      gender: gender,
      playlist: playlist,
      workdays: workdays,
      endDaysWork: endDaysWork,
      startDaysWork: startDaysWork,
      daysOff: daysOff,
      isAdmin: isAdmin,
      _id: _id,
      yourChannel: yourChannel,
      weekFinished: weekFinished,
      finished: finished,
      blocked: blocked,
      code: code,
      codeFrinde: codeFrinde,
    });
    const token = jwt.sign(
      {
        _id: _id,
        name: name,
        playlist: playlist,
        isAdmin: isAdmin,
        email: email,
      },
      "privateTo"
    );
    return users.save((err) => {
      if (err) {
        res.status(400).send({
          error_en: "please enter vaild data",
          error_ar: "الرجاء إدخال بيانات صحيحة",
          error: err,
        });
      } else {
        const data: any = {
          from: "you",
          to: email,
          subject: "Accont Actvition Link",
          html: `
                              <h2>please click on given link to activate you account</h2>
                              <a >http://youtuberbot.com/my-profile/activeEmail/${token}</a>

                      `,
        };
        mg.messages().send(data);
        res.status(200).send({
          message_ar:
            "تم إرسال البريد الإلكتروني ، يرجى تفعيل حسابك ، والتحقق من صندوق بريدك الإلكتروني",
          message_en:
            "Email has been sent , kindly activate your account , chack your email inbox",
        });
      }
    });
  }
);
router.get(
  "/me",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(res.locals.user._id).select("-password");
    return res.status(200).send(user);
  }
);
router.get(
  "/admin/:id",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.find({ _id: req.params.id }).populate({
      path: "idBouqute",
      model: "bouquet",
    });
    const bouquetAct = await ReantalBouquteActivated.find({
      userId: user[0]._id,
    });
    const bouquet = await ReantalBouqutes.find({ idUser: user[0]._id });
    res.send({ user: user, bouquet: bouquetAct, bouquteData: bouquet });
  }
);
router.put(
  "/admin/changeInf/:id",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const { error }: any = validateUserUpdate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const { phone, name, address, blocked } = req.body;
    let validName = await User.findOne({ name: name });
    if (validName)
      return res.status(400).send({
        error_en: "alredy name is exited",
        error_ar: "الاسم موجد بي الفعل",
      });
    const user = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          name: name,
          phone: phone,
          address: address,
          blocked: blocked,
        },
      }
    );
    res.status(200).send(user);
    return;
  }
);
router.put(
  "/me/update",
  [AuthenticationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const { error }: any = validateUserUpdate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const { phone, name, address, password } = req.body;
    let validPassword = await User.findOne({ password: password });
    if (!validPassword)
      return res.status(400).send({
        error_en: "invalid password",
        error_ar: "كلمة السر خاطئة",
      });
    let validName = await User.findOne({ name: name });
    if (validName)
      return res.status(400).send({
        error_en: "alredy name is exited",
        error_ar: "الاسم موجد بي الفعل",
      });
    const user = await User.updateOne(
      {
        _id: res.locals.user._id,
      },
      {
        $set: {
          name: name,
          phone: phone,
          address: address,
        },
      }
    );
    if (!user)
      return res.status(400).send({
        error_en: "the user is not exited",
        error_ar: " المستخدم غير موجد  ",
      });
    res.status(200).send(user);
    return;
  }
);
router.put(
  "/me/avatar",
  [AuthenticationMiddleware, type],
  async (req: Request, res: Response, next: NextFunction) => {
    const avatar: any = await User.findById({ _id: res.locals.user._id });
    if (!avatar)
      return res
        .status(404)
        .send("The User Can't Found with the img Can You trying again");
    avatar.set({
      avatar: req.file.path,
    });
    res.status(200).send({ avatar: avatar });
    return avatar.save();
  }
);
router.put(
  "/me/changEmail/",
  [AuthenticationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const { error }: any = validateUserEmail(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const { password, email } = req.body;
    let validPassword = await User.findOne({ password: password });
    if (!validPassword)
      return res.status(400).send({
        error_en: "invalid password",
        error_ar: "كلمة السر خاطئة",
      });
    let validEmail = await User.findOne({ email: email });
    if (validEmail)
      return res.status(400).send({
        error_en: "alredy the email is existed",
        error_ar: "الاميل موجد بي  الفعل",
      });
    const user = await User.updateOne(
      {
        _id: res.locals.user._id,
      },
      {
        $set: {
          email: email,
          verify: false,
          resetLink: "",
        },
      }
    );

    return res.status(200).send({
      message_en: " Your email has been changed ",
      message_ar: "تم تغيير الاميل الخاص بك ",
    });
  }
);
router.put(
  "/me/changplayList/",
  [AuthenticationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const { error }: any = validateUserPlaylist(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const { password, playlist } = req.body;
    let validPassword = await User.findOne({ password: password });
    if (!validPassword)
      return res.status(400).send({
        error_en: "invalid password",
        error_ar: "كلمة السر خاطئة",
      });
    let validEmail = await User.findOne({ playlist: playlist });
    if (validEmail)
      return res.status(400).send({
        error_en: "alredy the playlist is existed",
        error_ar: "قائمة التشغيل موجده بي  الفعل",
      });
    const user = await User.updateOne(
      {
        _id: res.locals.user._id,
      },
      {
        $set: {
          playlist: playlist,
        },
      }
    );
    const IdPliylist = playlist.slice(playlist.indexOf("list="));
    const bouqouteUser: any = await ReantalBouquteActivated.find({
      userId: res.locals.user._id,
    });
    if (bouqouteUser[0] != undefined) {
      await ReantalBouquteActivated.updateOne(
        { userId: res.locals.user._id },
        {
          $set: {
            playlistId: IdPliylist,
          },
        }
      );
      await ReantalBouqutes.updateOne(
        { idUser: res.locals.user._id },
        {
          $set: {
            idChnnale: IdPliylist,
          },
        }
      );
      return res.status(200).send({
        message_en:
          " Your playlist has been changed in your profile and your boqoute  ",
        message_ar:
          " تم تغيير قائمة التشغيل الخاصه بك في ملفك الشخصي وفي باقتك",
      });
    } else {
      return res.status(200).send({
        message_en: " Your playlist has been changed ",
        message_ar: "تم تغيير قائمة التشغل الخاصه بك ",
      });
    }
    return;
  }
);
router.get(
  "/users",
  [AuthenticationMiddleware, AuthuthrationMiddleware],
  async (req: Request, res: Response) => {
    const users: any = await User.find({ isAdmin: false }).populate({
      path: "idBouqute",
      model: "bouquet",
    });
    res.send(users);
  }
);
router.put("/forget-password/", async (req: Request, res: Response) => {
  let token: any;
  const { email } = req.body;
  const validEmail: any = await User.find({ email: email });
  if (validEmail[0] === ([] && undefined)) {
    return res.status(400).send({
      error_en: "User with this email does not exists.",
      error_ar: "المستخدم بهذا البريد الإلكتروني غير موجود.",
    });
  }
  if (validEmail[0] != ([] && undefined)) {
    token = jwt.sign({ _id: validEmail[0]._id }, "abdoSamy", {
      expiresIn: "30m",
    });
    const data = {
      from: "lenamarwan575@gmail.com",
      to: email,
      subject: "Accont Forget Password Link",
      html: `
              <h2>please click on given link to reset your password</h2>
              <a>http://youtuberbot.com/my-profile/reset-password/${token}</a>
  
      `,
    };
    mg.messages().send(data, async (err, body) => {
      if (err) {
        console.log(err);

        res.send({ error: err.message });
      }
    });
  }

  return res.status(200).send({
    message_en:
      "Email has been sent , kindly  follow the instruction , chack your inbox  ",
    message_ar:
      "تم إرسال البريد الإلكتروني ، يرجى اتباع التعليمات ، والتحقق من صندوق الوارد الخاص بك ",
  });
});
router.put("/reset-password/:resetLink", async (req, res) => {
  const { resetLink } = req.params;
  const { newPass } = req.body;
  if (!resetLink)
    return res.status(401).send({
      error_en: "incorrect token or it is expierd.",
      error_ar: "رابط غير صحيح أو انتهت صلاحيته.",
    });
  const resetLinkV: any = await User.find({ resetLink: resetLink });
  if (!resetLinkV)
    res.status(400).send({
      error_en: "This Link Is Invalid",
      error_ar: "هذا الرابط غير صالح",
    });
  if (resetLinkV[0].password === newPass)
    return res.status(400).send({
      error_en:
        "please change your password do not change your password like your old password.",
      error_ar:
        "الرجاء تغيير كلمة المرور الخاصة بك لا تغير كلمة المرور الخاصة بك مثل كلمة المرور القديمة.",
    });
  await User.updateOne(
    { resetLink: resetLink },
    {
      $set: {
        password: newPass,
        resetLink: "",
      },
    }
  );
  const data = {
    from: "lenamarwan575@gmail.com",
    to: resetLinkV[0].email,
    subject: "Accont change password",
    html: `
   <h2>Your password has been changed , You know it ?</h2> `,
  };
  mg.messages().send(data, async (err, body) => {
    if (err) {
      res.send({ error: err.message });
    }
  });
  return res.status(200).send({
    message_en: " Your password has been changed ",
    message_ar: " تم تغيير كلمة السر الخاصة بك ",
  });
});
router.put(
  "/change-password",
  AuthenticationMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { password, newPass } = req.body;
      const { error }: any = validateUserPassword(req.body);
      if (error) return res.status(404).send(error.details[0].message);
      const oldPass = await User.find({ password: password });
      if (!oldPass)
        return res.status(400).send({
          error_en: `The old password is wrong. Try again and verify that the old password is correct`,
          error_ar: `كلمة المرور القديمة خاطئة. حاول مرة أخرى وتحقق من صحة كلمة المرور القديمة`,
        });
      if (password === newPass)
        return res.status(400).send({
          error_en:
            "please change your password do not change your password like your old password.",
          error_ar:
            "الرجاء تغيير كلمة المرور الخاصة بك لا تغير كلمة المرور الخاصة بك مثل كلمة المرور القديمة.",
        });
      await User.updateOne(
        { _id: res.locals.user._id },
        {
          $set: {
            password: newPass,
          },
        }
      );
      return res.status(200).send({
        message_en: " Your password has been changed ",
        message_ar: "تم تغيير كلمة السر الخاصة بك ",
      });
    } catch (err) {
      throw err;
    }
  }
);
router.post(
  "/resendMessage",
  AuthenticationMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const { error }: any = validateUserEmail(req.body);
      if (error) return res.status(404).send(error.details[0].message);
      const user = await User.findOne({ email: email });
      if (!user)
        return res.status(400).send({
          erorr_en: `That email INVALID`,
          error_ar: `هذا البريد الإلكتروني غير صالح`,
        });
      const token = jwt.sign({ email }, "privateTo", {
        expiresIn: "20m",
      });
      if (token) {
        const data = {
          from: "lenamarwan575@gmail.com",
          to: email,
          subject: "Accont Actvition Link",
          html: `
                      <h2>please click on given link to activate you account</h2>
                      <a>http://youtuberbot.com/my-profile/activeEmail/${token}</a>
      
              `,
        };
        mg.messages().send(data, (err, body) => {
          if (err) {
            res.send({ error: err.message });
          } else {
            res.send({
              message_en:
                "The link was resubmitted, the link will be invalid 20 minutes from now",
              message_ar:
                "تم إعادة إرسال الرابط ، سيكون الرابط غير صالح بعد 20 دقيقة من الآن",
            });
          }
        });
      } else {
        res.status(400).send({
          error_en: "something is rwong!!!",
          error_ar: "هناك شئ غير صحيح !!!",
        });
      }
      return;
    } catch (err) {
      return res
        .status(400)
        .send({ message_en: "invlid TOKEN", message_ar: "رمز غير صالح" });
    }
  }
);
router.put("/activate/:token", async (req: Request, res: Response) => {
  const { token } = req.params;
  if (token) {
    jwt.verify(token, "privateTo", function (err, decoded: any) {
      if (err) {
        res.status(404).send({ error: err.message });
      }
      return User.findOne({ email: decoded.email }, (err, user) => {
        if (err || !user) {
          return res.status(400).send({
            error_en: "User with this email does not exists.",
            error_ar: "المستخدم بهذا البريد الإلكتروني غير موجود.",
          });
        }
        const obj = {
          verify: true,
        };
        user = _.extend(user, obj);
        return user.save((err, resullt) => {
          if (err) {
            return res.status(400).send({
              error_en: "Link activate the email by mistake ",
              error_ar: "لينك تفعيل الايميل خطا",
            });
          } else {
            return res.status(200).send({
              message_en: " Your Email has been Activated ",
              message_ar: " تم تفعيل بريدك الإلكتروني",
            });
          }
        });
      });
    });
  } else {
    return res.send({ error: "something went wrong!!!" });
  }
  return;
});
router.post("/feedback", async (req: Request, res: Response) => {
  const { email, subject, des, name } = req.body;
  const data = {
    from: "lenamarwan575@gmail.com",
    to: email,
    subject: subject,
    html: `        
     <h1>subject:${subject}</h1>
     <h2>name:${name}</h2>
   <h3>Description:${des}</h3>`,
  };
  mg.messages().send(data, async (err, body) => {
    if (err) {
      res.send({ error: err.message });
    }
  });
  return res.send({
    message_en: "Your message has been sent thanks",
    message_ar: "تم إرسال رسالتك شكرا",
  });
});
// router.post("/google", async (req: Request, res: Response) => {
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/plus.login",
//       "https://www.googleapis.com/auth/plus.profile.email.read",
//     ],
//   });
// });
// router.post("/google/callback", async (req: Request, res: Response) => {});
export default router;
