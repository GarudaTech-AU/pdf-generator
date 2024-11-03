import { Router, Request, Response } from 'express'
import { pdfController, appController } from 'controllers'
import { param, query, validationResult } from 'express-validator'

const router = Router()

router.get('/test', appController.systemCheck)

router.get(
  '/verify-external/:uuid',
  param('uuid').notEmpty().withMessage('uuid is required'),
  query('tab').notEmpty().withMessage('tab is required'),
  query('stage')
    .notEmpty()
    .isIn(['uat', 'prod'])
    .withMessage('stage must be either "uat" or "prod" if provided'),
  (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.send({ errors: result.array() })

      return
    }

    next()
  },
  pdfController.getVerifyExternalPDF,
)

// Fallback route to handle all other requests to /api/*
router.get('*', (req: Request, res: Response) => {
  res.send('Route not found')
})

export default router
