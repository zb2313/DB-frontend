module.exports = {
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
          warnings: true,
          errors: true
        },
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false, //配置后自动启动浏览器
        hotOnly: true, // 热更新
        // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
        proxy: { //配置多个跨域
          // 'tacc':{
          //   target:'https://kyfw.12306.cn/otn/leftTicket',
          //   changeOrigin:true, //允许跨域
          //   pathRewrite:{
          //     '^/aacc': ''
          // },
          
          // },
         
          '/traininfo': {       //此处并非和url一致
            target:'https://kyfw.12306.cn/otn/leftTicket',
            changeOrigin:true, //允许跨域
            pathRewrite:{
                '^/traininfo': ''
            },
            secure: false,
            onProxyReq(proxyReq, req, res) {
              const temp = req.headers['train_cookie'];
              if(temp){
                proxyReq.setHeader('cookie', temp)
                
              }
             
            }
        },
          '/qrcode': {       //此处并非和url一致
            target:'http://110.40.186.162:7001/api/order',
            changeOrigin:true, //允许跨域
            pathRewrite:{
                '^/qrcode': ''
            },
          },
          

          '/transaction': {       //此处并非和url一致
            target:'https://flights.ctrip.com',
            changeOrigin:true, //允许跨域
            pathRewrite:{
                '^/transaction': ''
            },
            cookieDomainRewrite: {
              "unchanged.domain": "unchanged.domain",
              "old.domain": "new.domain",
              "*": ""
            },
            onProxyReq(proxyReq, req, res) {
              const temp = req.headers['plane_cookie'];
              //if(temp)proxyReq.setHeader('cookie', temp);
              
              if(req.headers['sign'])proxyReq.setHeader('sign', req.headers['sign']);
              if(req.headers['transactionid'])proxyReq.setHeader('transactionid', req.headers['transactionid']);

              //console.log(proxyReq);
     
             
            },
            onProxyRes: function(proxyRes, req, res) {
              var cookies = proxyRes.headers['set-cookie'];
          
              var cookieRegex = /Domain=\.?xxx.com/i; // 返回的cookie中提取domain
           
              //修改cookie Path
              if (cookies) {
                var newCookie = cookies.map(function(cookie) {
                  if (cookieRegex.test(cookie)) {
                    // 将domain设置为localhost
                    return cookie.replace(cookieRegex, 'Domain=localhost');
                  }
          
                  return cookie;
                });
                delete proxyRes.headers['set-cookie'];
                proxyRes.headers['set-cookie'] = newCookie;
              }
              //console.log(proxyRes.headers);
            }
 
            //secure: false,
          },
          
     
    }}
}

