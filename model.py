import os
import tempfile
from ultralytics import YOLO
from flask import request, Response, Flask, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from PIL import Image
from roboflow import Roboflow
import json

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

model = None


def load_model():
    global model
    if model is None:
        rf = Roboflow(api_key="kz0n2HLy9jKWqjItWQEQ")
        project = rf.workspace().project("underwater_debris")
        model = project.version(1).model
    return model


@app.route("/")
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/detect", methods=["POST"])
@cross_origin()
def detect():
    buf = request.files["image_file"]
    model = load_model()
    boxes = detect_objects_on_image(Image.open(buf.stream), model)
    return Response(
        json.dumps(boxes),
        mimetype='application/json'
    )


@app.route("/test")
@cross_origin()
def index():
    return jsonify({'msg': "Hello World"})


def detect_objects_on_image(buf, model):
    # Save the image to a temporary file
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as temp_file:
        temp_file_path = temp_file.name
        buf.save(temp_file_path)

    try:
        # Perform prediction using the temporary file path
        results = model.predict(temp_file_path)
        print(results)
        output = []
        for result in results:
            x1 = result['x'] - result['width'] / 2
            y1 = result['y'] - result['height'] / 2
            x2 = result['x'] + result['width'] / 2
            y2 = result['y'] + result['height'] / 2
            output.append(
                [x1, y1, x2, y2, result['class'], result['confidence']])

    finally:
        # Delete the temporary file
        os.remove(temp_file_path)

    return output


if __name__ == '__main__':
    app.run()
