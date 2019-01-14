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
    sql = "select * from askingforleave where wnumber in (select Wnumber from user where LWnumber  = '%d')" % (lwnumber)
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