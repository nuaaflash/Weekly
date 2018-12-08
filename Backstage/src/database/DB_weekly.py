import pymysql
import datetime
from database import DBConnection

def insert(Wnumber,Pname,content,completion,review):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    #获取当前时间
    dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    #SQL插入语句
    sql = "insert into weekly (Wnumber,date,Pname,content,completion,review) \
          values('%d','%s','%s','%s','%d','%s')" % \
          (Wnumber,dt,Pname,content,completion,review)

    try:
        #执行sql语句
        cursor.execute(sql)
        #提交到数据库执行
        db.commit()
        print("增添成功！")
    except:
        #如果发生错误则回滚
        db.rollback()
        print("增添失败！")

    #关闭数据库连接
    db.close()

def delete(Wnumber):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL删除语句
    sql = "delete from weekly where Wnumber ='%d'" % (Wnumber)

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
    sql = "select * from weekly order by Wnumber"

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 获取所有记录列表
        result = cursor.fetchall()
        for row in result:
            list.append(row)
        print("查询成功！")
    except:
        # 如果发生错误则回滚
        db.rollback()
        print("查询失败！")

    # 关闭数据库连接
    db.close()
    return list

def update(Wnumber,Pname,content,completion):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # 获取当前时间
    dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # SQL更新语句
    sql = "update weekly set date='%s',Pname='%s',content='%s',completion='%d' where Wnumber='%d' " % \
          (dt,Pname,content,completion,Wnumber)

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