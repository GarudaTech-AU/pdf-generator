import 'dotenv/config'

import express from 'express'
import { queryParser } from 'express-query-parser'
import cors from 'cors'
import router from 'router'
import { ROUTER_PREFIX } from 'consts'
import { checkEnvVars } from 'utils'
import { errorMiddleware } from 'middlewares'

const app = express()

const envVars = checkEnvVars()

if (!envVars) {
  process.exit(1)
}

const { PORT, CORS_URLS } = envVars

app.use(express.json())

app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  }),
)

app.use(
  cors({
    credentials: true,
    // origin: FRONT_END_URL
    origin(origin, callback) {
      if (origin && !CORS_URLS.includes(origin)) {
        callback(new Error('Not allowed'), false)
        return
      }

      callback(null, true)
    },
  }),
)

app.use(ROUTER_PREFIX, router)

app.use(errorMiddleware)

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('server started on PORT=', PORT)
})
