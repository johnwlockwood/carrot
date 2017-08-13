import random
import json

from flask import Flask
from flask import request
from flask import make_response


app = Flask(__name__)


@app.route("/")
def hello():
    """
    Basic hello world :)
    """
    username = request.cookies.get("username")
    if username:
        return "Hello {}".format(username)
    return "Hello PyBay!"


@app.route("/rn")
def random_number():
    """Return a random string"""
    wat = random.random()
    return "random: {}".format(wat)


@app.route("/login")
def set_user():
    """
    Set a username cookie to a fake user. This is mostly an
    example of setting a cookie.
    """
    resp = make_response(json.dumps({"loggedIn": True, "username": "John"}))
    resp.headers["Content-Type"] = 'application/json'
    resp.set_cookie("username", "John")
    return resp
