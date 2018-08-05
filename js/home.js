$(document).ready(function() {
  var renderRecord = function(id, title, cover, name, avatar, date, type) {
    return (
        "<div class='blog-card-post w-col w-col-6'>" +
            "<a href='detail.html?id="+ id + "' class='blog-post-image-link-block w-inline-block' style='background-image: url(" +
            cover +
            ");'>" +
                "<div class='blog-post-image-overlay'>" +
                    "<div class='blog-card-title-wrapper'>" +
                        "<div class='blog-card-title'>" + title + "</div>" + 
                    "</div>" +
                    "<div class='blog-post-author-wrapper w-clearfix'>" +
                        "<img src='" + avatar + "' class='blog-post-author-image'>" +
                        "<div class='blog-post-author-title'>" + name + "</div>" +
                        "<div class='blog-post-date'>" + date + "</div>" + 
                    "</div>" +
                "</div>" +
            "</a>" +
            renderType(type) + 
        "</div>"
    );
  };

  var renderType = function(type) {
      switch (type) {
          case "job":
            return  "<span class='blog-tag-button bg-green'>" + "工作" + "</span>";
          case "tour":
            return  "<span class='blog-tag-button bg-yellow'>" + "旅行" + "</span>";
          case "practice":
            return  "<span class='blog-tag-button bg-purple'>" + "修行" + "</span>";
          default:
            return "";
      }
  };

  var loadLists = function() {
    $("#list").empty();

    base("list")
      .select({
        sort: [{ field: "date", direction: "asc" }]
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            console.log("Retrieved ", record.get("gallery")[0]);
            var id = record.get("gallery")[0];
            var title = record.get("title");
            var cover = record.get("cover")[0]["url"];
            var name = record.get("name");
            var avatar = record.get("avatar")[0]["url"];
            var date = record.get("date");
            var type = record.get("type");
            var html = renderRecord(id, title, cover, name, avatar, date, type);

            $("#list").append($(html));
          });

          fetchNextPage();
        },
        function done(error) {
          console.log(error);
        }
      );
  };
  loadLists();
});
