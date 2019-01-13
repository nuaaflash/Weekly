# -*- coding: utf-8 -*-
import sys

sys.path.append("..")

from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *

from Backstage.src.database import DB_task



parser = reqparse.RequestParser()
parser.add_argument('P')
parser.add_argument('R')
parser.add_argument('N')
parser.add_argument('L')
parser.add_argument('content')
parser.add_argument('Wnumber')

class AddTask(Resource):

    def post(self):
        args = parser.parse_args()
        name = args['N']
        content = args['content']
        PWnumber = int(args['P'])
        RWnumber = int(args['R'])
        print(name)
        print(content)
        print(PWnumber)
        print(RWnumber)
        # db_passwd = DB_user.Search(wnumber)
        # if (db_passwd != None):
        #     db_passwd = db_passwd[0]
        #     print(db_passwd)
        #     return False, 200
        # else:
        DB_task.insert(name,content,PWnumber,RWnumber)

        return RWnumber, 200

class GetTask(Resource):

    def post(self):
        args = parser.parse_args()
        Wnumber = int(args['Wnumber'])
        taskInfo = {}
        try:
            taskInfo['weeklys'] = DB_task.taskSearch(Wnumber)
            return taskInfo, 200
        except:
            return taskInfo, 500

class GetTask2(Resource):

    def post(self):
        args = parser.parse_args()
        Wnumber = int(args['Wnumber'])
        lwnumber = int(args['L'])
        taskInfo = {}
        try:
            taskInfo['weeklys'] = DB_task.taskSearch2(Wnumber,lwnumber)
            print(taskInfo)
            return taskInfo, 200
        except:
            return taskInfo, 500
