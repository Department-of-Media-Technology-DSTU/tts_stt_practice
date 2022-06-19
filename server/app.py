from flask import Flask, jsonify, send_file, request
from flask_cors import CORS, cross_origin
from glob import glob
import speech_recognition
import torch
import socket
import urllib
import array
import wave
import soundfile as sf
import os


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT)
file_tts = "ru_v3.pt"
file_te = "v2_4lang_q.pt"


def ogg_to_wav(file):
        os.system('ffmpeg -i '  + APP_ROOT + file  + APP_ROOT + '/sample.wav')

@app.route('/')
def index():
  return 'Server Works!'

@app.route('/tts/<string:text>')
@cross_origin()

def tts(text):
  sample_rate = 48000
  speaker = 'xenia'
  device = torch.device("cpu")
  torch.set_num_threads(2)
  model = torch.package.PackageImporter(file_tts).load_pickle("tts_models", "model")
  model.to(device)

  def tensor_to_int16array(tensor):
    return array.array("h", tensor.to(dtype=torch.int16))

  Text = urllib.parse.unquote(text)
  audio_paths = model.save_wav(text=Text,
                             sample_rate=sample_rate,speaker=speaker)
  return send_file(audio_paths)


@app.route('/stt/upload', methods = ['POST'])
def upload_file():    
  file = request.files['file']
  with open('audio.ogg', 'wb') as audio:
    file.save(audio)
  ogg_to_wav('/audio.ogg ')
  sample = speech_recognition.AudioFile('sample.wav')
  r = speech_recognition.Recognizer()

  with sample as audio:
    audio_content = r.record(audio)

  res = r.recognize_google(audio_content, language="ru-RU")
  os.remove('sample.wav')

  # model = torch.package.PackageImporter(file_te).load_pickle("te_model", "model")
  # res = model.enhance_text(res, 'ru')
  print(res)
  return jsonify(res)

