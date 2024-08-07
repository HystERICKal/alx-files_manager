import { Request, Response, NextFunction } from "express";
import { getUserFromXToken, getUserFromAuthorization } from "../utils/auth";

/**
 * helper.
 * @param {Request} req req.
 * @param {Response} res res.
 * @param {NextFunction} next jump next.
 */
export const basicAuthenticate = async (req, res, next) => {
  const user = await getUserFromAuthorization(req);

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  req.user = user;
  next();
};

/**
 * helper.
 * @param {Request} req request.
 * @param {Response} res response.
 * @param {NextFunction} next jump next.
 */
export const xTokenAuthenticate = async (req, res, next) => {
  const user = await getUserFromXToken(req);

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  req.user = user;
  next();
};
