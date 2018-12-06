# -*- coding: utf-8 -*-
import  pymysql

# 打开数据库连接
def connection():
    db = pymysql.connect(
        host="106.15.200.206",
        port=3306,
        user="root",
        password="St110010",
        db="Weekly")
    return db
