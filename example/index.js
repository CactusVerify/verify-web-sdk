const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const request = require('request')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(express.static('public'))

const Authorization = '<SECRET_KEY>'

// Close identification data stored on CactusVerify server
const requestClose = (sessionId) => {
  const closeOptions = {
    url: `https://api.cactusverify.com/verification/close/${sessionId}`,
    method: "POST",
    headers: { Authorization }
  };

  request(closeOptions, (err, response, body) => {
    if(err) {
      // handle error
    } else {
      // handle success
    }
  })
}


// Checks identification data by sessionId on CactusVerify server
app.get('/check-session/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId

  // in options we need to pass sessionId as parameter
  // and our secret token as authorization header
  const options = {
    url: `https://api.cactusverify.com/verification/session-data/${sessionId}`,
    headers: { Authorization }
  };

  // here we create request to kyc backend
  request(options, (err, response, body) => {
    if (err) {
      // handle error
      res.status(400).json(err)
    } else {
       // NOTE : Here you can close /session-data endpoint for further execution
      // requestClose(sessionId)
      res.status(200).json(body)
    }
  })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`))
