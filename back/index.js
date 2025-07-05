import express from 'express'
import multer from 'multer'
import * as tf from '@tensorflow/tfjs-node'
import path from 'path'
import fs from 'fs'
import cors from 'cors'

const app = express()
const port = 5001

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}))

// Set up multer for image upload
const upload = multer({ dest: 'uploads/' })

// Load the model once on startup
const modelPath = path.resolve('./model/model.json')
let model
(async () => {
  console.log('Loading model...')
  model = await tf.loadLayersModel(`file://${modelPath}`)
  console.log('Model loaded')
})()

app.post('/api/eval', upload.single('file'), async (req, res) => {
  if (!req.file || !model) {
    return res.status(400).json({ error: 'No file or model not loaded' })
  }

  try {
    // Read uploaded image
    const imageBuffer = fs.readFileSync(req.file.path)
    const tensor = tf.node
      .decodeImage(imageBuffer, 3)
      .resizeNearestNeighbor([100, 100]) // Adjust to model input size
      .expandDims(0)
      .toFloat()
      .div(255.0) // Normalize if needed

    const prediction = model.predict(tensor)
    const result = await prediction.data()

    // Clean up uploaded file
    fs.unlinkSync(req.file.path)

    res.json({ prediction: Array.from(result) })
  } catch (err) {
    console.error('Inference error:', err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`✅ TF Server running at http://localhost:${port}`)
})
