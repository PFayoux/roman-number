import {Response, Request, NextFunction } from 'express'
import { arabToRoman } from "../converter/romanNumeral"
import returnJson from '../utils/returnJson'
import CustomLog from '../utils/CustomLog'

export function arabToRomanController (req: Request, res: Response): void {
  try {
    const nb = parseInt(req.body.nb)

    const data = {
      romanNb: arabToRoman(nb)
    }
    returnJson(res, data)
  } catch (e) {
    CustomLog.error(e.message, e)
    returnJson(res, undefined, e.message, 401)
  }
}
