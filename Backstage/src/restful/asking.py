# -*- coding: utf-8 -*-
import sys

from database import DB_asking

sys.path.append("..")

from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *


parser = reqparse.RequestParser()
parser.add_argument('Wnumber')
parser.add_argument('Date')
parser.add_argument('PartOfDay')
parser.add_argument('Reason')

class SearchAsking(Resource):
    def post(self):
        args = parser.parse_args()
        Wnumber = int(args['Wnumber'])
        asking_list = []
        part_dict = {1:'上午',2:'下午',3:'全天'}
        # 搜索请假情况
        try:
            results = DB_asking.askingSearch(Wnumber)
            for result in results:
                print(result)
                asking = {}
                asking['id'] = result[0]
                asking['reason'] = result[1]
                asking['date'] = result[2]
                asking['agree'] = result[3]
                asking['wnumber'] = result[4]
                asking['partOfDay'] = part_dict[result[5]]
                asking_list.append(asking)
            return asking_list,200
        except:
            return False,500
        #return Pname

class AddAsking(Resource):
    # def get(self):
    #     return users

    def post(self):
        args = parser.parse_args()
        Wnumber = int(args['Wnumber'])
        PartOfDay = int(args['PartOfDay'])
        Date = args['Date']
        reason = args['Reason']



        try:
            DB_asking.insert(reason,Wnumber,Date,PartOfDay)
            return True, 200
        except:

            return False, 500

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