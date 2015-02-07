define(['./masonry/masonry.pkgd.min','./imagesloaded/imagesloaded','jquery'], function(Masonry,imagesloaded,$) {
    var container = document.getElementById("container");
    var more = document.getElementById("more");
    var msnry = new Masonry(container);
    // layout Masonry again after all images have loaded
    imagesloaded(container, function() {
        msnry.layout();
    });
    var len=$('.item').length;
    $(more).on("click", addItem);

    function addItem() {

        console.log(len);
        var request=$.ajax({
            url: "json/data.json",
            type: "get",
            data:'5',
            dataType: "json",
            cache: false

        });
        request.done(function(data) {
            var arrPhone = [];
            //        console.log(arr.toString()==data[0].point);
            $(data).each(function(index, value) {
                if(index>len){
                    if(index<(len+4)){
                        var oIndex = data[index];
//                    console.log(index);
                        var html = $('<div class="item"><img src='+oIndex.imgSrc+' alt=""/></div>');
                        //添加到dom
                        $(container).append(html);
                        //通知masonry已添加的dom元素
                        msnry.appended(html);

                    }

                }




            });
            len+=3;

        });


    }
})
