$(function(){
    var baseAPI = 'http://api-breakingnews-web.itheima.net'
    $.ajaxPrefilter(function(options){
        options.url = baseAPI + options.url
    
        // 身份认证
        if(options.url.indexOf("/my/") !== -1){
            options.headers={
                Authorization:localStorage.getItem("token") || ""
            }
        }
    })
})