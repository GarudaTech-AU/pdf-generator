import { Request, Response } from 'express'

export const systemCheck = (req: Request, res: Response) => {
  res.send('PDF Services are Up and Running..')
}
