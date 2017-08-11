from flask import Flask
app = Flask(__name__)

import random

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/rn")
def random_number():
    wat = random.random()
    return "random: {}".format(wat)
