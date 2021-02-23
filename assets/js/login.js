
$(function(){

    var layer = layui.layer
    var form = layui.form

    // 背景
    $(document).ready(function(){
        var stars=800;  /*星星的密集程度，数字越大越多*/
        var $stars=$(".stars");
        var r=800;   /*星星的看起来的距离,值越大越远,可自行调制到自己满意的样子*/
        for(var i=0;i<stars;i++){
            var $star=$("<div/>").addClass("star");
            $stars.append($star);
        }
        $(".star").each(function(){
            var cur=$(this);
            var s=0.2+(Math.random()*1);
            var curR=r+(Math.random()*300);
            cur.css({ 
            transformOrigin:"0 0 "+curR+"px",
            transform:" translate3d(0,0,-"+curR+"px) rotateY("+(Math.random()*360)+"deg) rotateX("+(Math.random()*-50)+"deg) scale("+s+","+s+")"
            
            })
        })
    })

    // 去注册
    $("#login_reg").on("click",function(){
        $(".login").hide()
        $(".reg").show()
    })
    // 去登录
    $("#reg_login").on("click",function(){
        $(".login").show()
        $(".reg").hide()
    })

    // 监听注册表单的提交事件
    $("#form_reg").on("submit",function(e){
        e.preventDefault()
        // 注册的ajax
        var data = {
            username:$("#form_reg [name=username]").val(),
            password:$("#form_reg [name=password]").val(),
        }
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: data,
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                // 清空表单
                $("#form_reg")[0].reset()
                // 跳到登录
                $("#reg_login").click()
            }
        });
    })

    // 验证规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须 6 ~ 12 位，且不能有空格'],
        repwd:function(value){
            var pwd = $(".reg [name=password]").val()
            if(pwd !== value){
                return "两次输入的密码不一致"
            }
        }
    })
    
    // 登录
    $("#form_login").submit(function(e){
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data:$(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！！')
                // 保存token的字符串
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        });
    })

})

