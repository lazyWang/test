/**
 * Created by why on 2017/11/25.
 */
$(function () {

    $("form>.eye").on('tap',function () {
        if($('.password').prop('type')=='text'){
            $('.password').prop('type','password');
        }else{
            $('.password').prop('type','text');
        }
    })
    $("form>.seteye").on('tap',function () {
        if($('.setpassword').prop('type')=='text'){
            $('.setpassword').prop('type','password');
        }else{
            $('.setpassword').prop('type','text');
        }
    })

})