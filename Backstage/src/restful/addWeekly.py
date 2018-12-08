# -*- coding: utf-8 -*-
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
        if completionBool:
            completion = 1
        else:
            completion = 0



        # 插入数据库
        DB_weekly.insert(Wnumber, Pname, content, completion, review)
        #return Pname
