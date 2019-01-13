import pymysql
import datetime
from database import DBConnection

def insert(Tname,Tcontent,PWnumber,RWnumber):
    # Wnumber = int(Wnumber)
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    #获取当前时间

    #SQL插入语句
    sql = "insert into task (name,content,PWnumber,RWnumber) \
          values('%s','%s','%d','%d')" % \
          (Tname,Tcontent,PWnumber,RWnumber)

    try:
        #执行sql语句
        cursor.execute(sql)
        #提交到数据库执行
        db.commit()
        return "成功"
    except:
        #如果发生错误则回滚
        db.rollback()
        return "失败"

    #关闭数据库连接
    db.close()

def taskSearch(RWnumber):
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select * from task where RWnumber  = '%d' " % (RWnumber)

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

def taskSearch2(RWnumber,LWnumber):
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select * from task where RWnumber  = '%d' and PWnumber = '%d'" % (RWnumber,LWnumber)

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