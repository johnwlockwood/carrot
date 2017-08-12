from flask import Flask
app = Flask(__name__)

import random

@app.route("/")
def hello():
    """Basic hello world :)"""
    return "Hello PyBay!"

@app.route("/rn")
def random_number():
    """Return a random string"""
    wat = random.random()
    return "random: {}".format(wat)
