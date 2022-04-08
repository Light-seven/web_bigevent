$.ajaxPrefilter(function(options){
    options.url = "http://api-breakingnews-web.itheima.net"+ options.url
//统一设置请求头
//indexOf('/my/') 判断字符串是否有('/my/') 

    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    options.complete=function(res){
        //在complete中，可以使用res.responseJSON拿到服务器响应的数据
        if(res.responseJSON.status === 1){
            localStorage.removeItem('token');
            location.href = "/login.html"
        }
    }
})