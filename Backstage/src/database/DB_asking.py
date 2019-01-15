import sys
sys.path.append("..")

from database import DBConnection


def insert(reason,wnumber,date,partofday):
    # Wnumber = int(Wnumber)
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    #获取当前时间

    #SQL插入语句
    sql = "insert into askingforleave (reason,wnumber,date,agree,partOfDay) \
          values('%s','%d','%s','%d','%d')" % \
          (reason,wnumber,date,0,partofday)
    sql_update = "update askingforleave set partOfDay='3' where date  = '%s' and wnumber = %d" % \
                 (date,wnumber)
    # SQL查找语句
    sql_check = "select partOfDay from askingforleave where date  = '%s' and wnumber = %d" % (date,wnumber)

    try:
        # 执行sql语句
        cursor.execute(sql_check)
        # 获取所有记录列表
        result = cursor.fetchone()
        
        # 当已请假半天 请假另外半天时或直接请假一整天时，直接修改状态为请假一天
        if( result != None and ((result[0] == 1 and partofday == 2) or (result[0] == 2 and partofday == 1))):
            cursor.execute(sql_update)
        # 否则直接插入
        else:
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

def checkDate(date,part_of_day,wnumber):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select partOfDay from askingforleave where date  = '%s' and wnumber = %d" % (date,wnumber)

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
    if(result != None and (result[0] == part_of_day or result[0] == 3)):
        return False
    else:
        return True

# 检查date有无修改
def checkEditDate(date,askingid):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select date from askingforleave where askingId  = '%d'" % (askingid)

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
    if(result[0] == date):
        return True
    else:
        return False

def askingSearch(wnumber):
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select * from askingforleave where wnumber  = '%d'" % (wnumber)
    print(sql)

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

def subAskingSearch(lwnumber):
    list = []
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL查找语句
    sql = "select a.* from askingforleave a where wnumber in (select Wnumber from user where LWnumber  = '%d')" % (lwnumber)
    print(sql)

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


def delete(askingid):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    # SQL删除语句
    sql = "delete from askingforleave where askingId ='%d'" % (askingid)

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

def update(reason,wnumber,date,partofday,askingid):
    # Wnumber = int(Wnumber)
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    #获取当前时间

    #SQL更新语句
    sql_edit = "update askingforleave set reason='%s' , wnumber='%d' , date='%s' , agree='%d' , partOfDay='%d' where askingId  = '%d' " % \
            (reason,wnumber,date,0,partofday,askingid)

    try:
        #执行sql语句
        print(sql_edit)
        cursor.execute(sql_edit)
        #提交到数据库执行
        db.commit()
        return "成功"
    except:
        #如果发生错误则回滚
        db.rollback()
        return "失败"

    #关闭数据库连接
    db.close()

def askingChange(askingid,newstatus):
    # 打开数据库连接
    db = DBConnection.connection()

    # 使用cursor()方法创建一个游标对象cursor
    cursor = db.cursor()

    #获取当前时间

    #SQL更新语句
    sql = "update askingforleave set agree='%d' where askingId  = '%d' " % \
            (newstatus,askingid)

    try:
        #执行sql语句
        print(sql)
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