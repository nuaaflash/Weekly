# -*- coding: utf-8 -*-
import pymysql
from database import DBConnection

def insert(email,password,userName,Wnumber=-1,LWnumber=-1):

    flag = False
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    #SQL插入语句
    sql = "insert into user(email,password,userName,Wnumber,LWnumber)\
          values('%s','%s','%s','%d','%d')" % \
          (email,password,userName,Wnumber,LWnumber)

    try:
        #执行sql语句
        cursor.execute(sql)
        #提交到数据库执行
        db.commit()
        flag = True
    except:
        #如果发生错误则回滚
        db.rollback()

    #关闭数据库连接
    db.close()
    return flag

def Search(Wnumber):
    result = 0
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select * from user where Wnumber = '%s'" % (Wnumber)

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 获取所有记录列表
        result = cursor.fetchone()
    except:
        # 如果发生错误则回滚
        db.rollback()

    # 关闭数据库连接
    db.close()
    return result

def SubSearch(LWnumber):
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select userName, Wnumber from user where LWnumber  = '%d'" % (LWnumber)

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 获取所有记录列表
        result = cursor.fetchall()
        for row in result:
            list.append(row)
    except:
        # 如果发生错误则回滚
        db.rollback()
        return None

    # 关闭数据库连接
    db.close()
    return list

def SignUpSearch():
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select * from user where Wnumber  = -1"

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 获取所有记录列表
        result = cursor.fetchall()
        for row in result:
            list.append(row)
    except:
        # 如果发生错误则回滚
        db.rollback()

    # 关闭数据库连接
    db.close()
    return list

def SignUpAgree(userid, Wnumber, LWnumber):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL更新语句
    sql = "update user set Wnumber='%d',LWnumber='%d' where userid='%d' " % \
          (Wnumber,LWnumber,userid)

    try:
        # 执行sql语句
        cursor.execute(sql)
        #提交到数据库执行
        db.commit()
        return True
    except:
        # 如果发生错误则回滚
        db.rollback()
        return False

    # 关闭数据库连接
    db.close()

def SignUpDeny(userid):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL更新语句
    sql = "DELETE FROM user where userid='%d'" % \
          (userid)

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
        return True
    except:
        # 如果发生错误则回滚
        db.rollback()
        return False

    # 关闭数据库连接
    db.close()