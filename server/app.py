from flask import Flask, jsonify, send_file
import torch
import socket
import urllib
import array
import wave
import json
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


sample_rate = 48000
speaker = 'xenia'
device = torch.device("cpu")
torch.set_num_threads(2)
file = "ru_v3.pt"

model = torch.package.PackageImporter(file).load_pickle("tts_models", "model")
model.to(device)

def tensor_to_int16array(tensor):
	return array.array("h", tensor.to(dtype=torch.int16))
  	# return array.array("h", tensor.to(dtype=torch.list))


@app.route('/')
def index():
  return 'Server Works!'

@app.route('/tts/<string:text>')
@cross_origin()
def tts(text):
  Text = urllib.parse.unquote(text)
  # audio = audio = model.apply_tts(text=Text, sample_rate=sample_rate, speaker=speaker)
  audio_paths = model.save_wav(text=Text,
                             sample_rate=sample_rate,speaker=speaker)
  print(audio_paths)
  # print(type(audio.tolist()))
  # return tensor_to_int16array(audio*32767)
  return send_file(audio_paths)
  # return 'audio_paths'
  # return audio
  # try:
    # example = urllib.parse.unquote(text)
    # print("Synthesize [" + example + "]")
    # audio = model.apply_tts(text=example, sample_rate=sample_rate, speaker=speaker)
    # print('audio')
    # print(audio)
    # return tensor_to_int16array(audio*32767)
    
    #     except(ValueError, Exception):
    # return 'ERROR'
  
@app.route('/greet')
def say_hello():
  return 'Hello from Server'
