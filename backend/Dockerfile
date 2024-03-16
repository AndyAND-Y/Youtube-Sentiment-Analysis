FROM public.ecr.aws/lambda/python:3.11.2024.03.04.10

COPY req.txt .
RUN pip install -r req.txt --target "${LAMBDA_TASK_ROOT}"

COPY . ${LAMBDA_TASK_ROOT}

RUN python server.py

CMD [ "server.start_server" ]