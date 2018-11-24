# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import *

app = Flask(__name__)
# 允许跨域访问
CORS(app, supports_credentials=True)
api = Api(app)

users = {
    'admin': '123',
    'user': '123',
    '123': '123',
}


def abort_if_todo_doesnt_exist(user_id):
    if todo_id not in TODOS:
        abort(404, message="Uesr {} doesn't exist".format(user_id))


parser = reqparse.RequestParser()
parser.add_argument('userid')
parser.add_argument('password')



# # 操作（put / get / delete）单一资源Todo
# shows a single todo item and lets you delete a todo item
class Todo(Resource):
    def get(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201


# # 操作（post / get）资源列表TodoList
# shows a list of all todos, and lets you POST to add new tasks
class Login(Resource):
    def get(self):
        return TODOS

    def post(self):
        args = parser.parse_args()
        userid = args['userid']
        password = args['password']
        if(userid in users.keys()):
            if(users[userid] == password):
                return True, 200
            else:
                return False, 200
        else:
            return "User Not Found", 200





# 设置路由
api.add_resource(Login, '/login')
api.add_resource(Todo, '/todos/<todo_id>')

if __name__ == '__main__':
    app.run(debug=True)