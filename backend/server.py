from waitress import serve

from backend.wsgi import application


def start_server():
    print("START")
    serve(application, port='8000')


if __name__ == '__main__':
    start_server()
