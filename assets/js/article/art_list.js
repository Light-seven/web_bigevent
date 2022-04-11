$(function(){
    var q= {
        pagenum:1,//页码值，默认第一页
        pagesize:4,//每页显示几条数据，默认每页两条
        cate_id:'',//文章分类的ID
        state:''//文章发布的状态
    }
    var layer =layui.layer;
    var form = layui.form;
    var laypage =layui.laypage;
    initTable();
    initCate();


    function initTable(){
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
         
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg("获取文章列表失败！")
                }
             
                var htmlStr =template("tpl-table",res)
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        });
    }
    template.defaults.imports.dateFormat=function(date){
        const dt =new Date(date);
        var y =dt.getFullYear();
        var m =padZero(dt.getMonth()+1)
        var d = padZero(dt.getDate());
        var hh =padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    function initCate(){
        $.ajax({
            type: "get",
            url: "/my/article/cates",
           
            success: function (res) {
                if(res.status!==0){
                    return layer.msg("获取分类数据失败！")
                }
                var htmlStr = template("tpl-cate",res)
              
                $("[name=cate_id]").html(htmlStr);
                form.render();
           
                
            }
        });
    }
    $("#form-search").on("submit",function(e){
        e.preventDefault();
        var cate_id=$("[name=cate_id]").val();
        var state = $("[name=state]").val();
        q.cate_id=cate_id;
        q.state= state;
        console.log("筛选成功");
        initTable();
    })

    function renderPage(total){
    laypage.render({
        elem: 'pageBox' ,//注意，这里的 test1 是 ID，不用加 # 号
        count: total,
        limit:q.pagesize,
        curr:q.pagenum,
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],
        jump:function(obj,first){

            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            if(!first){
                initTable();
            }
        }
    })
    }

    $('tbody').on('click',"btn-delete",function(){
        var id = $(this).attr("data-id");
        var len =$('.btn-delete').length;
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type: "get",
                url: "/my/article/delete/" +id,
              
                success: function (res) {
                    if(res.status!==0){
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg("删除文章成功！")
                    if(len ===1){
                      q.pagenum=q.pagenum ===1?1:q.pagenum-1;  
                    }
                    initTable();
                }
            });
            
            layer.close(index);
          });
    })
})