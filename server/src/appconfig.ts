export const config={
    "app": {
        "env": "PROD",
        "host": "http://localhost:8080/",
        "api": "http://localhost:8080/api/",
        "language": "en",
        "encryptKey": "hitchhikerapi",
        "defaultPassword": "123456",
        "tempUser": "test@test.test",
        "tempDelKey": "test",
        "syncInterval": 30,
        "defaultHeaders": [
            "Accept:*/*",
            "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
            "Cache-Control:no-cache"
        ],
        "scriptTimeout": 60000,
        "safeVM": false
    },
    "corsOption":{
        origin:(req)=>{
            /*
            //use white list
            if(req.header.host.indexOf( "127.0.0.1:8081")>-1)
                return  "http://127.0.0.1:8081"
            if(req.header.host.indexOf( "127.0.0.1:8080")>-1)
                return  "http://127.0.0.1:8080"
            if(req.header.host.indexOf( "localhost:8080")>-1)
                return  "http://localhost:8080"
            */
            return req.header.origin
        },
        credentials: true,
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    },
    "db": {
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "123456",
        "database": "test"
    },
    "schedule": {
        "duration": 1800,
        "storeMaxCount": 10
    },
    "stress": {
        "storeMaxCount": 5,
        "stressPort": 11010,
        "stressUpdateInterval": 1000
    },
    "user": {
        "registerMailConfirm": false
    },
    "mail": {
        "host": "http://email.hitchhiker-api.com/api/mail/"
    }
}