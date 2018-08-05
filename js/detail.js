$(document).ready(function() {
    var getQueryString = function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
  
    var renderImg = function(url) {
       return "<div class='inner-image-wrapper-block'><img src=" + url + " class='inner-image-block'></div>";
    };
    
    var id = getQueryString("id");
    var loadImages = function() {
      $("#detail").empty();
      base("gallery").find(id,function(error,record){
        var images = record.get("images");
        var html = "";
        $.each(images,function(index,value){
            var url = value.url;
            html += renderImg(url);
        })
        $("#detail").html(html);
      });  
    };
    loadImages();
  });
  