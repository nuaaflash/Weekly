# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *

from database import DB_user

app = Flask(__name__)
# 允许跨域访问
CORS(app, supports_credentials=True)
api = Api(app)

# users = {
#     'admin': '123',
#     'user': '123',
#     '123': '123',
# }


# def abort_if_todo_doesnt_exist(user_id):
#     if user_id not in users:
#         abort(404, message="Uesr {} doesn't exist".format(user_id))


parser = reqparse.RequestParser()
parser.add_argument('userid')
parser.add_argument('password')
parser.add_argument('email')

class Signup(Resource):

    def post(self):
        args = parser.parse_args()
        userid = args['userid']
        password = args['password']
        email = args['email']
        db_passwd = DB_user.Search(userid)
        if (db_passwd != None):
            db_passwd = db_passwd[0]
            print(db_passwd)
            return False, 200
        else:
            DB_user.insert(userid,email,password)
            return True, 201



class Login(Resource):
    # def get(self):
    #     return users

    def post(self):
        args = parser.parse_args()
        userid = args['userid']
        password = args['password']
        # 查询数据库
        db_passwd = DB_user.Search(userid)
        if(db_passwd != None):
            db_passwd = db_passwd[0]
            # if(userid in users.keys()):
            if(db_passwd == password):#(users[userid] == password):(db_passwd == password):
                return True, 200
            else:
                return False, 200
        else:
            return "User Not Found", 200





# 设置路由
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')

if __name__ == '__main__':
    app.run(debug=True)