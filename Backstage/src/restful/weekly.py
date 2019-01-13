# -*- coding: utf-8 -*-
import sys

sys.path.append("..")

from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *

from database import DB_weekly

parser = reqparse.RequestParser()
parser.add_argument('Wnumber')
parser.add_argument('Pname')
parser.add_argument('content')
parser.add_argument('completion')
parser.add_argument('review')
parser.add_argument('weeklyid')
parser.add_argument('comment')
parser.add_argument('TID')

class AddWeekly(Resource):
    # def get(self):
    #     return users

    def post(self):
        args = parser.parse_args()
        Wnumber = int(args['Wnumber'])
        Pname = args['Pname']
        content = args['content']
        completionBool = args['completion']
        review = args['review']
        TaskID = int(args['TID'])
        print(TaskID)
        if completionBool == 'True':
            completion = 1
        else:
            completion = 0


        print(completion)
        # 插入数据库
        DB_weekly.insert(Wnumber, Pname, content, completion, review,TaskID)
        #return Pname

class GetWeekly(Resource):
    # def get(self):
    #     return users

    def post(self):
        args = parser.parse_args()
        Wnumber = int(args['Wnumber'])
        TID = int(args['TID'])
        print(TID)
        weeklyInfo = {}
        try:
            weeklyInfo['weeklys'] = DB_weekly.WeeklySearch(Wnumber,TID)
            print(weeklyInfo)
            return weeklyInfo, 200
        except:

            return weeklyInfo, 500

class GetWeekly2(Resource):
    # def get(self):
    #     return users

    def post(self):
        args = parser.parse_args()
        Wnumber = int(args['Wnumber'])
        print(Wnumber)
        weeklyInfo = {}
        try:
            weeklyInfo['weeklys'] = DB_weekly.WeeklySearch2(Wnumber)
            print(weeklyInfo)
            return weeklyInfo, 200
        except:

            return weeklyInfo, 500

class EditWeekly(Resource):
    # def get(self):
    #     return users

    def post(self):
        args = parser.parse_args()
        Pname = args['Pname']
        content = args['content']
        completionBool = args['completion']
        review = args['review']
        weeklyid = int(args['weeklyid'])


        if completionBool == 'True':
            completion = 1
        else:
            completion = 0


        print(completion)
        # 更新到数据库
        if(DB_weekly.update(Pname, content, completion, review,weeklyid)):
            return True,201
        else:
            return False,500

class DeleteWeekly(Resource):
    # def get(self):
    #     return users

    def post(self):
        args = parser.parse_args()

        weeklyid = int(args['weeklyid'])
        # 删除对应周报
        if(DB_weekly.delete(weeklyid)):
            return True,201
        else:
            return False,500

class CommentWeekly(Resource):

    def post(self):
        args = parser.parse_args()
        comment = args['comment']
        weeklyid = int(args['weeklyid'])

        # 更新到数据库
        if(DB_weekly.commentWeekly(comment, weeklyid)):
            if (DB_weekly.AusitUpdate(weeklyid)):
                return True, 201
            else:
                return False, 500
        else:
            return False,500