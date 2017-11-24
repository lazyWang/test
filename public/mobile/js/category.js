/**
 * Created by why on 2017/11/24.
 */
$(function () {
    getFirst();
    function getFirst() {
        $.ajax({
            url:'/category/queryTopCategory',
            type:'get',
            success:function (res) {
                // console.log(res);
                var rows=res.rows;
                var firsrLiArr = [];
                for(let i = 0;i<rows.length;i++){
                    firsrLiArr.push('<li><a href="javascript:;">'+rows[i].categoryName+'</a></li>')
                }
                $('.cate-left>ul').html(firsrLiArr.join(''));
                $('.cate-left li').eq(0).addClass('active');
                getSecond(1);
            }
        })
    }

    function getSecond(id){
        $.ajax({
            url:'/category/querySecondCategory?id='+id,
            type:'get',
            success:function (res) {
                console.log(res);
                var rows = res.rows;
                if(rows.length!=0){
                    var secondLiArr = [];
                    for (let i = 0; i < rows.length; i++) {
                        secondLiArr.push(' <li><a href="javascript:;"><img src="' + rows[i].brandLogo + '"><p>' + rows[i].brandName + '</p></a></li>')
                    }
                    $('.cate-right>ul').html(secondLiArr.join(''));
                }else{
                    $('.cate-right>ul').html('暂无分类');
                }
            }
        })
    }

    $('.cate-left').on("tap",'li',function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index()+1;
        getSecond(index);
    })
})