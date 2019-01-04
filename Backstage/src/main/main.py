# -*- coding: utf-8 -*-
# import sys
# import os
# sys.path.append()

from restful import weekly,account

from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *

app = Flask(__name__)

# 允许跨域访问
CORS(app, supports_credentials=True)
api = Api(app)

# 设置路由
api.add_resource(weekly.AddWeekly, '/addWeekly')
api.add_resource(weekly.GetWeekly, '/getWeekly')
api.add_resource(weekly.EditWeekly,'/editWeekly')
api.add_resource(weekly.CommentWeekly,'/commentWeekly')
api.add_resource(weekly.DeleteWeekly,'/deleteWeekly')
api.add_resource(account.Login, '/login')
api.add_resource(account.Signup, '/signup')
api.add_resource(account.GetSignUps, '/getSignups')
api.add_resource(account.AgreeSignUp, '/agreeSignup')
api.add_resource(account.DenySignUp, '/denySignup')
api.add_resource(account.GetSubWorker, '/getSubWorkers')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port='4396')