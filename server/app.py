from flask import Flask, jsonify, send_file, request
from flask_cors import CORS, cross_origin
from glob import glob
import speech_recognition as speech_recog
import torch
import socket
import urllib
import array
import wave


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


@app.route('/')
def index():
  return 'Server Works!'

@app.route('/tts/<string:text>')
@cross_origin()

def tts(text):
  Text = urllib.parse.unquote(text)
  audio_paths = model.save_wav(text=Text,
                             sample_rate=sample_rate,speaker=speaker)
  print(audio_paths)
  return send_file(audio_paths)


@app.route('/stt/upload', methods = ['POST'])
def upload_file():    
  file = request.files['file']
  sample = speech_recog.AudioFile(file)
  r = speech_recog.Recognizer()
  with sample as audio:
    audio_content = r.record(audio)
  res = r.recognize_google(audio_content, language="ru-RU")
  print(res)
  return jsonify(res)

