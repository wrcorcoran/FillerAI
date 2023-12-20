# app.py
from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route("/to-backend", methods=["POST"])
def receive_data():
    data = request.get_json()
    board = data[0]["board"]
    human = data[1]["human"]
    bot = data[2]["bot"]
    # Process the received data as needed
    print(human)
    print(bot)

    # human_data = data.get("human", {})

    return jsonify({"message": "data properly received"})


@app.route("/from-backend", methods=["GET"])
def send_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)


if __name__ == "__main__":
    app.run(port=5328)
