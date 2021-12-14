/**
 * This file allows to run a separate node to detect the wake word "Sia"
 * You can consider to run this file on a different hardware
 */

/* eslint-disable import/no-unresolved */

const request = require('superagent')
const record = require('node-record-lpcm16')
const { Detector, Models } = require('snowboy')
const { io } = require('socket.io-client')

process.env.SIA_HOST = process.env.SIA_HOST || 'http://localhost'
process.env.SIA_PORT = process.env.SIA_PORT || 1337
const url = `${process.env.SIA_HOST}:${process.env.SIA_PORT}`
const socket = io(url)

socket.on('connect', () => {
  socket.emit('init', 'hotword-node')
  console.log('Connected to the server')
  console.log('Waiting for hotword...')
})

request.get(`${url}/v1/info`)
  .end((err, res) => {
    if (err || !res.ok) {
      if (!err.response) {
        console.error(`Failed to reach the server: ${err}`)
      } else {
        console.error(err.response.error.message)
      }
    } else {
      const models = new Models()

      models.add({
        file: `${__dirname}/models/sia-${res.body.lang.short}.pmdl`,
        sensitivity: '0.5',
        hotwords: `sia-${res.body.lang.short}`
      })

      const detector = new Detector({
        resource: `${__dirname}/node_modules/snowboy/resources/common.res`,
        models,
        audioGain: 2.0,
        applyFrontend: true
      })

      detector.on('silence', () => {
      })

      detector.on('sound', (/* buffer */) => {
        /**
         * <buffer> contains the last chunk of the audio that triggers the "sound" event.
         * It could be written to a wav stream
         */
      })

      detector.on('error', () => {
        console.error('error')
      })

      detector.on('hotword', (index, hotword, buffer) => {
        /**
         * <buffer> contains the last chunk of the audio that triggers the "hotword" event.
         * It could be written to a wav stream. You will have to use it
         * together with the <buffer> in the "sound" event if you want to get audio
         * data after the hotword
         */
        const obj = { hotword, buffer }

        console.log('Hotword detected', obj)
        socket.emit('hotword-detected', obj)
      })

      const mic = record.start({
        threshold: 0,
        verbose: false
      })

      mic.pipe(detector)
    }
  })
