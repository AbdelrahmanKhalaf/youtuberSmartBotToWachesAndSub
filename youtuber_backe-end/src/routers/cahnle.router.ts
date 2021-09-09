import { NextFunction, Response, Router, Request } from "express";
const jwt = require("jsonwebtoken");
import config from "../config";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { AuthenticationMiddleware } from "../middleware/auth";
import { ReantalBouquteActivated } from "../models/activatedBouqute.model";
import { emailExists, SubExists } from "../helpers/search";
import _ from "lodash";
const OAuth2 = google.auth.OAuth2;
const router: Router = Router();
router.get(
  "/",

  async (req: Request, res: Response, next: NextFunction) => {
    const outh2clinte = new OAuth2(
      config.oauth2Credentials.clinteId,
      config.oauth2Credentials.client_secret,
      config.oauth2Credentials.redirect_uris[0]
    );
    const loginLink = outh2clinte.generateAuthUrl({
      access_type: "offline",
      scope: config.oauth2Credentials.scopes,
    });

    // res.redirect(`/${loginLink}`);
    res.status(200).send({ loginLink: loginLink });
  }
);
var resposne: any;
var sub: any;
var tocken: any;
router.get(
  "/authTocken",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const outh2clinte = new OAuth2(
        config.oauth2Credentials.clinteId,
        config.oauth2Credentials.client_secret,
        config.oauth2Credentials.redirect_uris[0]
      );
      if (req.query.error) {
        console.log(req.query.error);
      } else {
        const code: any = req.query.code;
        outh2clinte.getToken(code, (err, token: any) => {
          if (err) {
            res.status(400).send(req.query.err);
          } else {
            if (!token) {
              res.status(200).send("somthin wrong");
            }
            tocken = token;

            outh2clinte.credentials = token;
            const service: any = google.youtube("v3");
            const partChannels: any =
              "contentDetails,contentOwnerDetails,snippet";
            const partsU: any = "contentDetails,snippet";
            const partVideo: any = "statistics,snippet";
            service.channels
              .list({
                auth: outh2clinte,
                mine: true,
                part: partChannels,
              })
              .then((response: any) => {
                resposne = response.data.items[0];
                service.subscriptions
                  .list({
                    auth: outh2clinte,
                    part: partsU,
                    maxResults: 100,
                    channelId: response.data.items[0].id,
                  })
                  .then((resulltOfSub: any) => {
                    sub = resulltOfSub;
                    res.redirect("http://youtuberbot.com/my-profile");
                  });
                // service.playlistItems
                //   .list({
                //     auth: outh2clinte,
                //     playlistId:
                //       response.data.items[0].contentDetails.relatedPlaylists
                //         .uploads,
                //     part: partVideos,
                //   })
                //   .then((whachHistory: any) => {
                //     const Views: Array<any> = [];
                //     for (let i = 0; whachHistory.data.items.length > i; i++) {
                //       service.videos
                //         .list({
                //           auth: outh2clinte,
                //           id: whachHistory.data.items[i].contentDetails.videoId,
                //           part: partVideo,
                //         })
                //         .then((views: any) => {
                //           Views.push(views.data.items[0]);
                //         });
                //     }
                //     setTimeout(() => {}, 500);
                //   });
              });
          }
        });
        // res.redirect("/youtuber/api/chanle/dataChanle");
      }
    } catch (err) {
      console.log(err);
    }
  }
);
router.get(
  "/dataChanle",
  AuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(async () => {
      if (resposne !== undefined) {
        let Rea: any = await ReantalBouquteActivated.find({
          userId: res.locals.user._id,
        });

        var resulltChackEmails: any = emailExists(resposne.id, Rea[0].emails);

        if (resulltChackEmails)
          return res.status(400).send({
            error_en: "this email is alread exited",
            error_ar: " الاميل موجد بي الفعل ",
          });
        if (Rea[0].emails.length >= 10)
          return res.status(400).send({
            error_en: "maxLength is 10",
            error_ar: " لا يمكن اضافة اكثر من عشرة اميلات    ",
          });
        console.log(tocken);

        await ReantalBouquteActivated.updateOne(
          { _id: Rea[0]._id },
          {
            $push: {
              emails: {
                IdEmail: resposne.id,
                name: resposne.snippet.title,
                avatar: resposne.snippet.thumbnails.medium.url,
                tokenChannale: tocken.refresh_token,
                expiry_date: tocken.expiry_date,
              },
            },
          }
        );
        // Rea[0].emails.forEach((IdEmails: any) => {
        //
        // });
        tocken = "";
        return res.redirect("/youtuber/api/chanle/AddSub");
      }
      return;
    }, 1000);
  }
);
router.get(
  "/AddSub",
  AuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(async () => {
      if (resposne !== undefined) {
        let Rea: any = await ReantalBouquteActivated.find({
          userId: res.locals.user._id,
        });
        var searchTerm = resposne.id,
          index = -1;
        for (var i = 0, len = Rea[0].emails.length; i < len; i++) {
          if (Rea[0].emails[i].IdEmail === searchTerm) {
            index = i;
            break;
          }
        }
        sub.data.items.forEach(async (sub: any) => {
          if (Rea[0].emails[index].Sub !== []) {
            var resulltChackSub: any = SubExists(
              sub.snippet.resourceId.channelId,
              Rea[0].emails[index].Sub
            );
          }
          if (!resulltChackSub) {
            const boda = await ReantalBouquteActivated.updateOne(
              {
                _id: Rea[0]._id,
                "emails.IdEmail": resposne.id,
              },
              {
                $push: {
                  "emails.$.Sub": {
                    IdChannal: sub.snippet.resourceId.channelId,
                    name: sub.snippet.title,
                    avatar: sub.snippet.thumbnails.medium.url,
                  },
                },
              }
            );
          }
        });
        resposne = "";
        return res.send({ ma: "تم اضفافتهم بنجاح " });
      }
      return;
    }, 2000);
  }
);
router.get(
  "/sub/:id",
  AuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const boda: any = await ReantalBouquteActivated.find(
      { userId: res.locals.user._id },
      { emails: { $elemMatch: { _id: req.params.id } } }
    ).sort({ dataOut: 1 });
    const outh2clinte = new OAuth2(
      config.oauth2Credentials.clinteId,
      config.oauth2Credentials.client_secret,
      config.oauth2Credentials.redirect_uris[0]
    );
    // if (new Date(Date.now()) >= boda[0].emails[0].expiry_date)
    //   return res.send("لقد انتهي الوقت");
    const token = { refresh_token: boda[0].emails[0].tokenChannale };

    outh2clinte.credentials = token;
    const service: any = google.youtube("v3");
    const partChannels: any = "contentDetails,snippet";
    const partChannelsAdd: any = "contentDetails,snippet";
    const partsU: any = "contentDetails,snippet";
    return service.channels
      .list({
        auth: outh2clinte,
        mine: true,
        part: partChannels,
      })
      .then((response: any) => {
        // res.send(response.data.items);
        service.subscriptions
          .list({
            auth: outh2clinte,
            part: partsU,
            maxResults: 100,
            channelId: boda[0].emails[0].IdEmail,
          })
          .then(async (resulltOfSub: any) => {
            for (let i = 0; i < 10; i++) {
              if (resulltOfSub.data.items[i].id !== undefined) {
                var resulltChackSub: any = SubExists(
                  resulltOfSub.data.items[i].snippet.resourceId.channelId,
                  boda[0].emails[0].Sub
                );
                if (!resulltChackSub) {
                  await ReantalBouquteActivated.updateOne(
                    {
                      _id: boda[0]._id,
                      "emails._id": req.params.id,
                    },
                    {
                      $push: {
                        "emails.$.Sub": {
                          IdChannal:
                            resulltOfSub.data.items[i].snippet.resourceId
                              .channelId,
                          name: resulltOfSub.data.items[i].snippet.title,
                          avatar:
                            resulltOfSub.data.items[i].snippet.thumbnails.medium
                              .url,
                        },
                      },
                    }
                  );
                  await ReantalBouquteActivated.updateOne(
                    {
                      _id: boda[0]._id,
                      "emails._id": req.params.id,
                    },
                    {
                      $push: {
                        "emails.$.RequestSub": {
                          IdChannal:
                            resulltOfSub.data.items[i].snippet.resourceId
                              .channelId,
                          name: resulltOfSub.data.items[i].snippet.title,
                          avatar:
                            resulltOfSub.data.items[i].snippet.thumbnails.medium
                              .url,
                        },
                      },
                    }
                  );
                }
              }
            }
            const bouquts: any = await ReantalBouquteActivated.find();
            for (let i = 0; bouquts.length > i; i++) {
              var resulltChackSub: any = SubExists(
                bouquts[i].channalId,
                boda[0].emails[0].RequestSub
              );

              if (
                String(bouquts[i].channalId) !=
                  String(boda[0].emails[0].IdEmail) &&
                !resulltChackSub
              ) {
                service.subscriptions.insert({
                  auth: outh2clinte,
                  part: partChannelsAdd,
                  resource: {
                    snippet: {
                      resourceId: {
                        channelId: bouquts[i].channalId,
                      },
                    },
                  },
                });
              }
            }
            res.send(boda);
          });
      });
  }
);
export default router;
