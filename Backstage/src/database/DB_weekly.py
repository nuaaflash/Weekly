# -*- coding: utf-8 -*-
import pymysql
import datetime
from database import DBConnection

def insert(Wnumber,Pname,content,completion,review,audit=0):
    # Wnumber = int(Wnumber)
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    #获取当前时间
    dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    #SQL插入语句
    sql = "insert into weekly (Wnumber,Fdate,Ndate,Pname,content,completion,review,audit) \
          values('%d','%s','%s','%s','%s','%d','%s','%d')" % \
          (Wnumber,dt,dt,Pname,content,completion,review,audit)

    try:
        #执行sql语句
        cursor.execute(sql)
        #提交到数据库执行
        db.commit()
        return True
    except:
        #如果发生错误则回滚
        db.rollback()
        return False

    #关闭数据库连接
    db.close()

def delete(WeekID):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL删除语句
    sql = "delete from weekly where WeekID ='%d'" % (WeekID)

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

def SequentialSearch():
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select * from weekly order by Fdate"

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

def WeeklySearch(Wnumber):
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select * from weekly where Wnumber  = '%d' order by Fdate" % (Wnumber)

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

def update(Pname,content,completion,review,WeekID):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # 获取当前时间
    dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # SQL更新语句
    sql = "update weekly set Ndate='%s',Pname='%s',content='%s',completion='%d',review='%s' where WeekID='%d' " % \
          (dt,Pname,content,completion,review,WeekID)

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

def AusitUpdate(WeekID):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # 获取当前时间
    dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # SQL更新语句
    sql = "update weekly set Ndate='%s',audit='%d' where WeekID='%d' " % \
          (dt,1,WeekID)

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

def ReviewUpdate(WeekID,review):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # 获取当前时间
    dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # SQL更新语句
    sql = "update weekly set Ndate='%s',review='%s' where WeekID='%d' " % \
          (dt,review,WeekID)

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

def delete(WeekID):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # 获取当前时间
    dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # SQL更新语句
    sql = "DELETE FROM weekly WHERE WeekID = '%d' " % \
          (WeekID)

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
#DELETE FROM `Weekly`.`weekly` WHERE `WeekID` = 3
def commentWeekly(comment,WeekID):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # 获取当前时间
    dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # SQL更新语句
    sql = "update weekly set Ndate='%s',comment='%s' where WeekID='%d' " % \
          (dt,comment,WeekID)

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