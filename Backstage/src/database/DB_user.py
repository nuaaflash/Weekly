# -*- coding: utf-8 -*-
import pymysql
from database import DBConnection

def insert(LWnumber,password,userName,Wnumber=-1):

    flag = False
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # userName = userName.encode('utf-8')

    #SQL插入语句
    sql = "insert into user(password,userName,Wnumber,LWnumber)\
          values('%s',\"%s\",'%d','%d')" % \
          (password,userName,Wnumber,LWnumber)

    print(sql)

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
    result = False
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select * from user where Wnumber = '%d'" % (Wnumber)

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

def Search_Like(keyword):
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()
    cursor_name = db.cursor()

    # SQL查找语句
    sql = "select * from user where Wnumber like '%"+ keyword +"%' and Wnumber != '-1'"
    print(keyword)
    sql_name = "select * from user where userName like '%"+ keyword +"%' and Wnumber != '-1'"

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 获取所有记录列表
        result = cursor.fetchall()
        for row in result:
            list.append(row)

        # 执行sql语句
        cursor_name.execute(sql_name)
        result = cursor_name.fetchall()
        for row in result:
            print(row)
            list.append(row)
    except:
        # 如果发生错误则回滚
        db.rollback()

    # 关闭数据库连接
    db.close()
    return list

def CheckSub(LWnumber):
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

def SubSearch(LWnumber):
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select userName, Wnumber from user where LWnumber  = '%d' and Wnumber != '-1'" % (LWnumber)

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

def SignUpSearch(lwnumber):
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句'
    sql = "select * from user where Wnumber  = '-1' and LWnumber = '%d'" % (lwnumber)

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

def SignUpAgree(userid, Wnumber, lwnumber):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL更新语句
    sql = "update user set Wnumber='%d' , LWnumber = '%d' where userid='%d' " % \
          (Wnumber,lwnumber,userid)

    print(sql)
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