import express from 'express'
import multer from 'multer'
import * as tf from '@tensorflow/tfjs-node'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const port = 5001

app.use(cors({
  origin: process.env.FRONT_URL,
  optionsSuccessStatus: 200
}))

// Set up multer for image upload
const upload = multer({ dest: 'uploads/' })

app.post('/api/eval', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file' })
  }

  try {
    const labels = fs.readFileSync("./model/labels.txt", "utf8").split("\n")

    // Load the model
    const modelPath = path.resolve('./model/model.json')
    const model = await tf.loadLayersModel(`file://${modelPath}`)

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
    const predictions = Array.from(result)
    const index = predictions.indexOf(Math.max(...predictions)) // 103
    const label = labels[index]                                 // Pikachu
    const accuracy = predictions[index].toFixed(4)              // 0.5142

    // Clean up uploaded file
    fs.unlinkSync(req.file.path)

    res.json({ 
      // predictions,
      prediction: { label, accuracy } 
    })
  } catch (err) {
    console.error('Inference error:', err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`✅ TF Server running at http://localhost:${port}`)
})
