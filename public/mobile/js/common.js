$("body").on("tap", "a", function () {
    location.href = $(this).attr("href");
})


// 获取URL参数
function getURLParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 判断是否登录
function notLogin(option){
        $.ajax({
            url:option.url,
            type:option.type || 'get',
            data:option.data || '',
            success:function (res) {
                if(res.success) {
                    option.success && option.success(res);
                }else if(res.error==400){
                    location.href="user/login.html?returnUrl="+location.href;
                }
            }
        })
}