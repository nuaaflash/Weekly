# -*- coding: utf-8 -*-
import sys
sys.path.append("..")

from restful import weekly,account,task

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
api.add_resource(weekly.GetWeekly2, '/getWeekly2')
api.add_resource(weekly.EditWeekly,'/editWeekly')
api.add_resource(weekly.CommentWeekly,'/commentWeekly')
api.add_resource(weekly.DeleteWeekly,'/deleteWeekly')
api.add_resource(account.Login, '/login')
api.add_resource(account.Signup, '/signup')
api.add_resource(account.GetSignUps, '/getSignups')
api.add_resource(account.AgreeSignUp, '/agreeSignup')
api.add_resource(account.DenySignUp, '/denySignup')
api.add_resource(account.GetSubWorker, '/getSubWorkers')
api.add_resource(task.AddTask, '/addTask')
api.add_resource(task.GetTask, '/getTask')
api.add_resource(task.GetTask2, '/getTaskByP&R')

if __name__ == '__main__':
    app.run(debug=True,host='127.0.0.1', port='5000')