# -*- coding: utf-8 -*-
import sys

sys.path.append("..")

from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *

from database import DB_user



parser = reqparse.RequestParser()
parser.add_argument('wnumber')
parser.add_argument('password')
parser.add_argument('lwnumber')
parser.add_argument('name')
parser.add_argument('userid')

class Signup(Resource):

    def post(self):
        args = parser.parse_args()
        name = args['name']
        password = args['password']
        lwnumber = int(args['lwnumber'])
        print(DB_user.Search(lwnumber))
        if(DB_user.Search(lwnumber) == None):
            return False,202
        elif(DB_user.insert(lwnumber,password,name) == True):
            return True, 201
        else:
            return False,200



class Login(Resource):
    def post(self):
        args = parser.parse_args()
        wnumber = int(args['wnumber'])
        password = args['password']
        print(password)
        # 查询数据库
        db_userinfo = DB_user.Search(wnumber)
        if(db_userinfo != None):
            db_passwd = db_userinfo[0]
            db_lwnum = int(db_userinfo[3])
            db_name = db_userinfo[1]
            db_photo = db_userinfo[4]
            if(db_lwnum != 0):
                db_leader = DB_user.Search(db_userinfo[3])[1]
            else:
                db_leader = '无'

            if(db_passwd == password):#(users[userid] == password):(db_passwd == password):
                userInfo = {}
                userInfo['Wnumber'] = wnumber
                if(db_lwnum == 0):
                    userInfo['type'] = 'leader'
                else:
                    userInfo['type'] = 'worker'
                userInfo['name'] = db_name
                userInfo['photo'] = db_photo
                userInfo['pleader'] = db_leader
                userInfo['lwnumber'] = db_lwnum
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
                userinfo['lwnumber'] = user[0]
                userinfo['password'] = user[1]
                userinfo['name'] = user[2]
                userinfo['userid'] = user[6]
                if(user[3] == -1):
                    userinfo['status'] = '待审核'
                else:
                    userinfo['status'] = '已通过'
                userlist.append(userinfo)
                print(userlist)
            return userlist, 200
        except:
            return userlist, 500

class AgreeSignUp(Resource):
    def post(self):
        try:
            args = parser.parse_args()
            wnumber = int(args['wnumber'])
            lwnumber = int(args['lwnumber'])
            userid = int(args['userid'])
            if(DB_user.SignUpAgree(userid, wnumber, lwnumber)):
                return True,201
            else:
                return False,500
        except:
            return False,500

class DenySignUp(Resource):
    def post(self):
        try:
            args = parser.parse_args()
            userid = int(args['userid'])
            if(DB_user.SignUpDeny(userid)):
                return True,201
            else:
                return False,500
        except:
            return False,500

class GetSubWorker(Resource):
    def post(self):
        try:
            args = parser.parse_args()
            lwnumber = int(args['lwnumber'])
            result = DB_user.SubSearch(lwnumber)
            if(result != None):
                users = []
                for db_user in result:
                    user = {}
                    user['name'] = db_user[0]
                    user['Wnumber'] = db_user[1]
                    users.append(user)
                return users, 200
            else:
                return False, 500
        except:
            return 500,False