$(function(){
    var layer = layui.layer;
    var indexAdd = null;
    var form = layui.form;
    initArtCateList();
    function initArtCateList(){
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                var htmlStr=template('tpl-table',res);
                $("tbody").html(htmlStr);
            }
        });
    }
    $("#btnAddCate").on("click",function(){
     indexAdd= layer.open({
        type: 1,
        title: '添加文章分类',
        area: ['500px', '250px'],
        content: $("#dialog-add").html()
      })


    })
    
          $("body").on("submit","#form-add",function(e){
              e.preventDefault();
              console.log("开始发起");
            
              $.ajax({
                  type: "post",
                  url: "/my/article/addcates/",
                  data: $(this).serialize(),
                  success: function (res) {
                      if (res.status !==0) {
                          return "新增分类失败！"
                      }
                     console.log(res);
                      console.log("新增分类成功！");
                    
                  }
              });
              initArtCateList();
              layer.close(indexAdd);
          })
 

          /* $('body').on('submit', '#form-add', function(e) {
            e.preventDefault()
    
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.msg)
                    }
                    layui.layer.close(indexAdd)
                    initArtCateList()
                }
            })
        }) */

var indexEdit  =null;

$('tbody').on("click",".btn-edit",function(){
    indexEdit = layer.open({
        type: 1,
        title: '修改文章分类',
        area: ['500px', '250px'],
        content: $("#dialog-edit").html()
      })
      var id = $(this).attr("data-id")
      console.log(id);
      $.ajax({
          type: "get",
          url: "/my/article/cates/"+id,
          
          success: function (res) {
            console.log(res);
          
              form.val("form-edit",res.data)
          }
      });
})
$("body").on("submit","#form-edit",function(e){
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "/my/article/updatecate",
        data: $(this).serialize(),
    
        success: function (res) {
            if(res.status !==0){
                return layer.msg("更新分类数据失败！")
            }
            layer.msg("更新分类数据成功！")
            layer.close(indexEdit)
            initArtCateList();
        }
    });
})

$("body").on("click",".btn-delete",function(){
    var id =$(this).attr("data-id")
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            type: "get",
            url: "/my/article/deletecate/"+id,
           
            success: function (res) {
                if(res.status!==0){
                    return layer.msg("删除分类失败！")
                }
                layer.msg("删除分类成功！")
                layer.close(index)
                initArtCateList();
                
            }
        });
        layer.close(index);
      });
})


})