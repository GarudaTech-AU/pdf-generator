import { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import { ApiError } from 'exceptions'

export const initPdfProcessing = async (url: string, selector?: '#pageContent') => {
  const browser = await puppeteer.launch({
    headless: true,
  })

  const page = await browser.newPage()

  await page.goto(url, {
    waitUntil: 'networkidle0',
  })

  let dimensions = {
    width: 1920,
    height: 1080,
  }

  if (!selector) {
    throw ApiError.NotFound('Selector not found')
  }

  try {
    await page.waitForSelector(selector)

    const elementHandle = await page.$(selector)

    if (elementHandle) {
      const boundingBox = await elementHandle.boundingBox()

      if (boundingBox) {
        dimensions = await page.evaluate((el: any) => {
          const cloned = el.cloneNode(true)

          document.body.innerHTML = `<div>${cloned.outerHTML}</div>`
          document.body.style.backgroundColor = 'white'
          document.body.style.overflowY = 'auto'

          return {
            height: document.body.scrollHeight,
            width: document.body.scrollWidth,
          }
        }, elementHandle)

        await page.setViewport({
          ...dimensions,
          deviceScaleFactor: 1,
        })
      }
    }
  } catch (e: any) {
    throw ApiError.SystemError(e.message)
  }

  const pdf = await page.pdf({
    // format: 'A4',
    ...dimensions,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
    printBackground: true,
  })

  await browser.close()

  return pdf
}

export const getVerifyExternalPDF = async ({
  uuid,
  tab,
  stage,
}: {
  uuid: string
  tab: string
  stage: 'uat' | 'prod'
}) => {
  const stageURL = stage === 'uat' ? '-uat' : ''

  const url = `https://admin${stageURL}.verifyassist.com/verify-external/${uuid}?tab=${tab}`

  return initPdfProcessing(url, '#pageContent')
}

export const generatePdf = async (req: Request, res: Response) => {
  const data = req.body
  const pdf = await initPdfProcessing(data.url, data.selector)
  res.send(pdf)
}
