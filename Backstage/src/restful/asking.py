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
parser.add_argument('askingid')


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
                asking['askingid'] = result[0]
                asking['reason'] = result[1]
                asking['date'] = result[2]
                asking['agree'] = result[3]
                asking['wnumber'] = result[4]
                asking['partOfDayNum'] = result[5]
                asking['partOfDay'] = part_dict[result[5]]
                asking_list.append(asking)
            return asking_list,200
        except:
            return False,500

class AddAsking(Resource):
    def post(self):
        args = parser.parse_args()
        Wnumber = int(args['Wnumber'])
        PartOfDay = int(args['PartOfDay'])
        Date = args['Date']
        reason = args['Reason']

        try:
            if(DB_asking.checkDate(Date,PartOfDay,Wnumber)):
                DB_asking.insert(reason,Wnumber,Date,PartOfDay)
                results = DB_asking.askingSearch(Wnumber)
                asking_list = []
                part_dict = {1:'上午',2:'下午',3:'全天'}
                for result in results:
                    print(result)
                    asking = {}
                    asking['askingid'] = result[0]
                    asking['reason'] = result[1]
                    asking['date'] = result[2]
                    asking['agree'] = result[3]
                    asking['wnumber'] = result[4]
                    asking['partOfDayNum'] = result[5]
                    asking['partOfDay'] = part_dict[result[5]]
                    asking_list.append(asking)
                return asking_list,201
            else:
                return False, 200
        except:

            return False, 500

class EditAsking(Resource):

    def post(self):
        args = parser.parse_args()
        Wnumber = int(args['Wnumber'])
        PartOfDay = int(args['PartOfDay'])
        Date = args['Date']
        reason = args['Reason']
        askingid = int(args['askingid'])

        try:
            editable = False
            # 先检查date有无修改
            if(DB_asking.checkEditDate(Date,askingid)):
                editable = True
            elif(DB_asking.checkDate(Date,1,Wnumber) and DB_asking.checkDate(Date,2,Wnumber)):
                editable = True
            if(editable):
                DB_asking.update(reason,Wnumber,Date,PartOfDay,askingid)
                results = DB_asking.askingSearch(Wnumber)
                asking_list = []
                part_dict = {1:'上午',2:'下午',3:'全天'}
                for result in results:
                    print(result)
                    asking = {}
                    asking['askingid'] = result[0]
                    asking['reason'] = result[1]
                    asking['date'] = result[2]
                    asking['agree'] = result[3]
                    asking['wnumber'] = result[4]
                    asking['partOfDayNum'] = result[5]
                    asking['partOfDay'] = part_dict[result[5]]
                    asking_list.append(asking)
                return asking_list,200
            else:
                return False,200
        except:

            return False, 500

class DeleteAsking(Resource):
    # def get(self):
    #     return users

    def post(self):
        args = parser.parse_args()

        askingid = int(args['askingid'])
        Wnumber = int(args['Wnumber'])
        # 删除对应周报
        if(DB_asking.delete(askingid)):
            results = DB_asking.askingSearch(Wnumber)
            asking_list = []
            part_dict = {1:'上午',2:'下午',3:'全天'}
            for result in results:
                print(result)
                asking = {}
                asking['askingid'] = result[0]
                asking['reason'] = result[1]
                asking['date'] = result[2]
                asking['agree'] = result[3]
                asking['wnumber'] = result[4]
                asking['partOfDayNum'] = result[5]
                asking['partOfDay'] = part_dict[result[5]]
                asking_list.append(asking)
            return asking_list,200
        else:
            return False,500