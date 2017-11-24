/**
 * Created by why on 2017/11/23.
 */
$(function(){

    var Count = 0;

    var queryObj = {
        proName: "",
        brandId: "",
        price: "",
        num: "",
        page: 1,
        pageSize: 4
    };
    queryObj.proName=getURLParams("key");
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                    queryObj.pageSize *= queryObj.page;
                    queryObj.page=1;
                    resajax(function(res){
                        Count = res.count;
                        // console.log(res);
                        var html = template("adidas", res);
                        $(".lt_product_list").html(html);
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh(false);
                        mui('#refreshContainer').pullRefresh().refresh(true);
                    })
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up : {
         height:50,//可选.默认50.触发上拉加载拖动距离
             auto:true,//可选,默认false.自动上拉加载一次
             contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
             contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
             callback :function(){
              var maxPage = Math.ceil(Count / queryObj.pageSize);
              if(queryObj.page<maxPage) {
                  queryObj.page++;
                  resajax(function (res) {
                      console.log(res);
                      var html = template("adidas", res);
                      $(".lt_product_list").append(html);
                      // mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                         mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                  })
              }else{
                  queryObj.page=maxPage;
                  console.log(queryObj.page);
                  mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
              }
             } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
     }
        }
    });



    function resajax(callback){
        $.ajax({
            url:'/product/queryProduct',
            data:queryObj,
            success:function (res) {
                callback && callback(res);
            }
        })
    }

    // 获取URL参数
    function getURLParams(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }


    $(".search_btn").on("tap",function () {
        var val = $.trim($(".search_text").val());
        if (val) {
            // console.log(1);
            queryObj.pageSize = 4;
            queryObj.page = 1;
            queryObj.proName = val;
            // console.log(queryObj.pageSize);
            // console.log(queryObj.page);
            mui("#refreshContainer").pullRefresh().pulldownLoading();
        } else{
            mui.toast("请输入关键字");
            console.log(1);
        }
    })

    $(".list_paixu>a").on("tap",function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).find(".mui-icon").toggleClass("mui-icon-arrowdown mui-icon-arrowup");
        var sort = -1;
        if($(this).find(".mui-icon").hasClass('mui-icon-arrowdown')){
            sort=2;
        }else{
            sort=1;
        }
        if ($(this).data("sortname") == "price") {
            queryObj.price = sort;
            queryObj.num = "";
        }
        if ($(this).data("sortname") == "num") {
            queryObj.num = sort;
            queryObj.price = "";
        }
        mui("#refreshContainer").pullRefresh().pulldownLoading();
    })
})