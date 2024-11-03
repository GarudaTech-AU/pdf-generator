import { Request, Response } from 'express'
import { pdfService } from 'services'

export const getVerifyExternalPDF = async (
  req: Request<{ uuid: string }, any, any, { tab: string; stage: 'uat' | 'prod' }>,
  res: Response,
) => {
  const {
    params: { uuid },
    query: { tab, stage },
  } = req

  const pdf = await pdfService.getVerifyExternalPDF({
    uuid,
    tab,
    stage,
  })

  const filename = 'verify_external'

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`)

  res.end(pdf)
}
