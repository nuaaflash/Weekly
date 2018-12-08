# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *

from database import DB_user

userInfo = {
    'Wnumber': '161530319',
}

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
    def post(self):
        args = parser.parse_args()
        userid = args['userid']
        password = args['password']
        # 查询数据库
        db_passwd = DB_user.Search(userid)
        if(db_passwd != None):
            db_passwd = db_passwd[0]
            if(db_passwd == password):#(users[userid] == password):(db_passwd == password):
                userInfo['userId'] = userid
                userInfo['type'] = "user"
                return userInfo, 200
            else:
                return None, 200
        else:
            return "User Not Found", 200