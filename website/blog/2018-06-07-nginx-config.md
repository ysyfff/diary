---
title: 一个nginx配置
author: Shiyong Yin
---

## 通过80端口分发

```nginx
一个nginx配置

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

#upstream baidu_server{
 #   server 111.13.101.208:443;
#}

events {
    worker_connections  1024;
}


http {

upstream baidu_server{
    server 111.13.101.208:80;
}

upstream smart_hotel_api {

    #server 10.86.42.215:3210;
        server 10.86.42.215:3000;
  }

upstream smart_hotel_os_web {

    #server 10.90.165.81:3212;
    server 10.86.42.215:3001;
  }

    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  l-tcdev2.wap.dev.cn0.qunar.com;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        more_set_headers "Access-Control-Allow-Origin: *";

       location ~* \.html$ {
           proxy_set_header Host $host;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_pass http://smart_hotel_os_web;
       }


       location = / {
           proxy_pass http://smart_hotel_os_web;
       }

       location / {
           proxy_set_header Host $host;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_pass http://smart_hotel_api;
       }


        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

    server {
        listen 3002;
        server_name l-tcdev2.wap.dev.cn0.qunar.com;

        location /bind/login-validate-token {
            proxy_pass http://baidu_server;
		proxy_set_header Host $host;
	        proxy_set_header X-Real-IP $remote_addr;
	        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 }
    }
}
```