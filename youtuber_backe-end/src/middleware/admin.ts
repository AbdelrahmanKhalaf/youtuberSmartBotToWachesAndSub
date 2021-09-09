import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
const config = require("config");
export const AuthuthrationMiddleware = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!res.locals.user.isAdmin) return res.status(403).send("Accsess denied");
    next();
  } catch (ex) {
    next("Invalid admin");
    next();
  }
  return;
};
