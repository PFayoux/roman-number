import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  // check if client sent cookie
  const cookie = req.cookies.client_id;

  if (cookie === undefined) {
    // set a new cookie
    const randomId = Math.random().toString().slice(2);
    res.cookie('client_id', randomId, { maxAge: 900000, httpOnly: true });
  }
  next();
};
