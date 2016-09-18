'use strict';

const mic = require('mic');
const fs = require('fs');

const micInstance = mic();
const micInputStream = micInstance.getAudioStream();

micInstance.start();

function decibelsToGain(value) {
  if (value <= -40) {
    return 0
  }
  return Math.round(Math.exp(value / 8.6858) * 10000) / 10000
}

const VUMeter = require('vu-meter');
const meter = new VUMeter()
micInputStream.pipe(meter)

meter.on('data', (data) => {
  const dB = data[0];
  const gain = decibelsToGain(dB);
  if (gain > 0.5) {
    playSilence();
  }
});

const player = require('play-sound')();


let playing = false;
function playSilence() {
  if (playing) return;

  player.play('silence.mp3', function(err){})
  playing = true;
  setTimeout(() => {
    playing = false;
  }, 3200);
}
