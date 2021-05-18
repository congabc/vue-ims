module.exports= {
    devServer:{
        port: 8081,//端口
        host:'localhost',//主机名
        https:false,//协议
        proxy:{//开发环境代理
            'dev-api':{
                target:'https://www.fastmock.site/mock/46bca416bdb6efa19d9b4244a8cc3d4a/dev-api',
                changOrigin:true,
                pathRewrite:{
                    '^/dev-api': '', 
                }
            }
        }
    },
    lintOnSave: false,
}