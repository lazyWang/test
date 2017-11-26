/**
 * Created by why on 2017/11/25.
 */
$(function () {

    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function() {
                    getProduct(function () {
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        var gallery = mui('.mui-slider');
                        gallery.slider({
                            interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
                        });
                        mui(".mui-numbox").numbox();
                    })
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    function getProduct(callback) {
        $.ajax({
            url:'/product/queryProductDetail?id='+getURLParams('productId'),
            success:function (res) {
                // console.log(res);
                var sizeStr = res.size.split("-");
                var start = sizeStr[0];
                var end = sizeStr[1];
                var sizeArr = [];
                for (let i = start; i <= end; i++) {
                    sizeArr.push(i);
                }
                res.sizeArr = sizeArr;
                // console.log(sizeArr);
                var html = template('protemp', res);
                $(".mui-table-view-chevron").html(html);
                callback && callback(res)
            }
        })
    }

    var size = 0;
    $("body").on("tap",".pro-cm span",function () {
        size = $(this).html();
        $(this).css('backgroundColor','orange').siblings().css('backgroundColor','#fff');
        // console.log(size);
    })
    $("footer").on("tap",".btn-add-gwc",function () {
        var num = $(".mui-numbox-input").val();
        // console.log(num);
        if(size==0 || num == 0){
            mui.toast("请选择商品类型和数量");
        }
        option = {
            url:'/cart/addCart',
            type:'post',
            data:{
            productId:getURLParams('productId'),
            size:size,
            num:num
        }
        }
        notLogin(option);
    })

})