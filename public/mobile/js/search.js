/**
 * Created by why on 2017/11/22.
 */

$(function () {
    getHistory();
    function getHistory(){
        var ls = localStorage;
        var arr = (ls.getItem("search_history")&&JSON.parse(ls.getItem("search_history")))||[];
        console.log(arr);
        if(arr.length<1){
            $(".history_content").html("没有历史记录");
            return;
        }

        var str = [];
        for(var i = 0 ;i<arr.length;i++){
            str.push(' <div class="history_list mui-clearfix"> ' +
                '<span class="mui-pull-left">'+arr[i]+'</span> ' +
                '<span class="icon_delete fa fa-close mui-pull-right clear_history"></span>' +
                ' </div>'
        )
        }
        $(".history_content").html(str.join(''))
    }

    $(".search_btn").on("tap",function () {
        var val = $.trim($(".search_text").val());
        if(!val){
            return false;
        }
        var ls = localStorage;
        var arr = (ls.getItem("search_history")&&JSON.parse(ls.getItem("search_history")))||[];

        for(var i = 0; i<arr.length;i++){
            if(val==arr[i]){
                arr.splice(i,1);
                break;
            }
        }

        arr.unshift(val);
        ls.setItem("search_history",JSON.stringify(arr));
        alert(1);
        window.location.href="searchList.html?key="+val;
    })

    $(".clear_historys").on("tap",function () {
        localStorage.setItem("search_history",JSON.stringify([]));
        getHistory();
    })
    
    $(".search_history").on("tap",".clear_history",function () {
        var index = $(this).parent().index();
        console.log(index);
        var ls = localStorage;
        var arr = ls.getItem("search_history")&&JSON.parse(ls.getItem("search_history")) || [];
        arr.splice(index,1);
        ls.setItem("search_history",JSON.stringify(arr));
        getHistory();
    })
})