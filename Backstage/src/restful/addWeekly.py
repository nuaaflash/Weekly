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
parser.add_argument('Wnumber')
parser.add_argument('Pname')
parser.add_argument('content')
parser.add_argument('completion')
parser.add_argument('review')


class AddWeekly(Resource):
    # def get(self):
    #     return users

    def post(self):
        args = parser.parse_args()
        Wnumber = args['Wnumber']
        Pname = args['Pname']
        content = args['content']
        completion = args['completion']
        review = args['review']

        # 插入数据库
        DB_user.insert(Wnumber, Pname, content)
        print(Wnumber)
        print("########################################")
        # if(db_passwd != None):
        #     db_passwd = db_passwd[0]
        #     # if(userid in users.keys()):
        #     if(db_passwd == password):#(users[userid] == password):(db_passwd == password):
        #         return True, 200
        #     else:
        #         return False, 200
        # else:
        #     return "User Not Found", 200
        return Wnumber, 200


# 设置路由
api.add_resource(AddWeekly, '/addWeekly')

if __name__ == '__main__':
    app.run(debug=True)