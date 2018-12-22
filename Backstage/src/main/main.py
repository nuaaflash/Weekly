# -*- coding: utf-8 -*-
from restful import addWeekly,account

from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *

from database import DB_user

app = Flask(__name__)
# 允许跨域访问
CORS(app, supports_credentials=True)
api = Api(app)

# 设置路由
api.add_resource(addWeekly.AddWeekly, '/addWeekly')
api.add_resource(addWeekly.GetWeekly, '/getWeekly')
api.add_resource(account.Login, '/login')
api.add_resource(account.Signup, '/signup')
api.add_resource(account.GetSignUps, '/getSignups')

if __name__ == '__main__':
    app.run(debug=True)