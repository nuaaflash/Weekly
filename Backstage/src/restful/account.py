# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *

from database import DB_user



parser = reqparse.RequestParser()
parser.add_argument('wnumber')
parser.add_argument('password')
parser.add_argument('email')
parser.add_argument('name')

class Signup(Resource):

    def post(self):
        args = parser.parse_args()
        name = args['name']
        password = args['password']
        email = args['email']
        # db_passwd = DB_user.Search(wnumber)
        # if (db_passwd != None):
        #     db_passwd = db_passwd[0]
        #     print(db_passwd)
        #     return False, 200
        # else:
        if(DB_user.insert(email,password,name)):
            return True, 201
        else:
            return False,200



class Login(Resource):
    def post(self):
        args = parser.parse_args()
        wnumber = args['wnumber']
        password = args['password']
        print(password)
        # 查询数据库
        db_userinfo = DB_user.Search(wnumber)
        if(db_userinfo != None):
            db_passwd = db_userinfo[0]
            db_lwnum = db_userinfo[1]
            db_name = db_userinfo[2]
            db_photo = db_userinfo[3]

            if(db_passwd == password):#(users[userid] == password):(db_passwd == password):
                userInfo = {}
                userInfo['Wnumber'] = wnumber
                if(db_lwnum == 0):
                    userInfo['type'] = 'leader'
                else:
                    userInfo['type'] = 'worker'
                userInfo['name'] = db_name
                userInfo['photo'] = db_photo
                return userInfo, 200
            else:
                return None, 200
        else:
            return "User Not Found", 200

class GetSignUps(Resource):
    # def get(self):
    #     return users

    def post(self):
        userlist = []
        try:
            db_userlist = DB_user.SignUpSearch()
            for user in db_userlist:
                userinfo = {}
                userinfo['email'] = user[0]
                userinfo['password'] = user[1]
                userinfo['name'] = user[2]
                if(user[3] == -1):
                    userinfo['status'] = '待审核'
                else:
                    userinfo['status'] = '已通过'
                userlist.append(userinfo)
                print(userlist)
            return userlist, 200
        except:
            return userlist, 500