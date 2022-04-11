$(function(){
    var layer= layui.layer;
    var form = layui.form;
    var $image= $('#image');
    var options ={
        aspectRatio:400/280,
        preview:'.img-preview'
    }
    $image.cropper(options);
    initEditor();
    initCate();
    $("#btnChooseImage").on("click",function(){
        $('#coverFile').click();
    })
    $('#coverFile').on('change',function(e){
        var files = e.target.files
        if(files.length === 0){
            return
        }
        var newImgURL = URL.createObjectURL(files[0])
        $image
        .cropper('destroy')
        .attr('src',newImgURL)
        .cropper(options)
    })
    var art_state='已发布';
    $('#btnSave2').on('click',function(){
        art_state='草稿';
    })

    $('#form-pub').on('submit',function(e){
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append("state",art_state);
        $image.cropper('getCroppedCanvas', {
            // 创建一个画布
            width: 400,
            height: 200
        }).toBlob(function(blob) { // 将裁剪图片变为文件blob后的回调函数
            fd.append('cover_img', blob);
            publishArticle(fd);
        })
    })
    function publishArticle(fd){
        $.ajax({
            type: "post",
            url: "/my/article/add",
            data: fd,
            /* 注意：如果向服务器发生FormDate数据格式的ajax请求，必须要带
                contentType和processData属性，且属性值一定设置为false
            */
                contentType: false,
                processData: false,
            success: function (res) {
                if(res.status!==0){
                    return layer.msg('发布文章失败！');
                }
                layer.msg('发布文章成功！');
                
                
            }
        });
    }

    function initCate(){
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            
            success: function (res) {
                if(res.status!==0){
                    return layer.msg('初始文章分类失败！')
                }
                var htmlStr = template('tpl-cate',res);
                $('[name=cate_id]').html(htmlStr);
                console.log(htmlStr);
                form.render();
                
            }
        });
    }
})