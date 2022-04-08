$(function(){
    getUserInfo();
    //点击退出，调用layui询问模板
    var layer = layui.layer;
    $("#btnLogout").on("click",function(){
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, 
        function(index){
            //do something
            //清空token值
            localStorage.removeItem("token")
            location.href="/login.html"
            layer.close(index);
          });
    })
})



function getUserInfo(){
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        //拿到需要权限才能访问的token
       /*  headers:{
            Authorization:localStorage.getItem('token') || ''
        }, */
        success: function(res) {
           if(res.status !== 0){
               return layui.layer.msg("获取用户信息失败！")
           }
           renderAvatar(res.data);
        },
        //无论是否成功都会调用complete，
        
    });
}
function renderAvatar(user){
     var name =user.nicknane || user.username;
     $("#welcome").html("欢迎&nbsp;&nbsp;"+name)
     if(user.user_pic !== null){
         $(".layui-nav-img").attr("src",user.user_pic).show()
         $(".text-avatar").hide()
     }else{
         $('.layui-nav-img').hide()
         //toUpperCase()  转成大写
         var first =name[0].toUpperCase()
         $('.text-avatar').html(first).show()
     }
}