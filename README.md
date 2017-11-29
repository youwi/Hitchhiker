
## What is
Hitchhiker Api is a Restful Api integrated testing tool that support Schedule, Response comparsion, Stress Test, support upload js file to hook request, easy to deploy it in your local server. It make easier to manage Api with your team.

## Feature
* Api collaboration development with team
* Api history
* Multiple environments and Runtime variables support, easy to handle api dependence
* powerful script, support requiring any js lib which upload to project, read excel, cryptographic, no can't do
* Request parameterization, include ManytoMany and OnetoOne, now you can use a request to handle multple situation like various query string, body
* Schedule and run batch
* Make a comparison for Api response between two different environments (eg: stage vs product)
* Support Handling response before comparing
* Easy to deploy (support docker, windows, linux), keep data in your control, never lose data
* All changed will be auto saved in local cache even if refresh page
* Support importing Postman v1 collections
* Distributed stress test
* sync collection data of team automatically
* Api Document (in future)


## How to build

    cd ./client
    npm install
    npm run build
    npm run http-server &
    cd ..
    cd ./server
    npm install
    npm run build
    npm run start
    cd ..
    
## build base on 
    es6
    typescript
    react
    redux
    redux-saga
    typeorm
    
## tips
    typeorm will create datebase tables,so there is no SQL file .
    