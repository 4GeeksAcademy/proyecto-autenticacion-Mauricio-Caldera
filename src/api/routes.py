"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    email = body.get("email", None)
    password = body.get("password", None)

    if email is None or password is None:
        return jsonify({"msg": "Falta el email o la contraseña"}), 400

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "El usuario ya existe"}), 400

    # Hashear la contraseña por seguridad
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, is_active=True)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado exitosamente"}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email", None)
    password = body.get("password", None)

    user = User.query.filter_by(email=email).first()

    # Verificamos si el usuario existe y si la contraseña coincide con el hash
    if user is None or not check_password_hash(user.password, password):
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401

    # Crear el token
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    # Acceder a la identidad del usuario actual con get_jwt_identity
    current_user_email = get_jwt_identity()
    return jsonify({"msg": f"Bienvenido a la ruta privada, {current_user_email}"}), 200