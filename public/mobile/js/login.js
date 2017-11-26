/**
 * Created by why on 2017/11/24.
 */
$(function () {
    // var flag = true;
    $("form>.fa-eye").on('tap',function () {
        // if(flag){
        //     $('.login-pwd').prop('type','text')
        // }else{
        //     $('.login-pwd').prop('type','password')
        // }
        // flag=!flag;
        if($('.password').prop('type')=='text'){
               $('.password').prop('type','password');
        }else{
            $('.password').prop('type','text');
        }
    })

    $('.login-btn').on('tap',function () {
        var reg=/^[A-Za-z~_0-9]*$/g;
        var password = $('.password').val() || '';
        var username = $(".username").val() || '';
        if(username.length<1){
            mui.toast("账号不能为空");
            return false;
        }
        if(password.length<3 || password.length>16){
            mui.toast("密码长度在3到16位");
            return false;
        }
        if(!reg.test(password)){
            mui.toast("账号或密码包含非法字符");
            return false;
        }//2738875765
        $.ajax({
            url:'/user/login',
            type:'post',
            data:{username:username,password:password},
            success:function (res) {
                if(res.success){
                    location.href = getURLParams('returnUrl');
                }else if(res.error){
                    mui.toast("账号或密码错误");
                }
            }
        })
    })

})
// var reg=/^[A-Za-z0-9]*$/g;
// console.log(reg.test('asd12q#eqwe12'));
// console.log('02qwe'.length);