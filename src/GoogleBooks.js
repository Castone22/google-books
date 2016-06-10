var GoogleBooks = {
	init: function () {
        $("#searchButton").click(GoogleBooks.search);
        $("#searchButton").focus();
        $("#searchText").keypress(function (e) {
            var key = e.which;
            if(key == 13)  // the enter key code
            {
                $("#searchButton").focus().click();
                return false;  
            }
        });   
    },
	search: function(){	
        $.ajax({
            "url": "https://www.googleapis.com/books/v1/volumes",
            "data": {
                "q": $("#searchText").val()
            },
            "success": function(responseData){
                $("#searchResults").empty();
                $.each(responseData.items, function(index,item){
                    var row = '<div class="row" id = "result'+index+'">';
                    var title = item.volumeInfo.title;
                    var image = '<img class = "img-responsive img-thumbnail col-md-5" src='+item.volumeInfo.imageLinks.smallThumbnail+'/>';
                    var authors = "";
                    var publisher = item.volumeInfo.publisher;
                    var pubDate = item.volumeInfo.publishedDate;
                    var rating = item.volumeInfo.averageRating;
                    var description = item.volumeInfo.description;
                    var type = item.volumeInfo.printType;
                    var pgCount = item.volumeInfo.pageCount;
                    var additionalInfoVisible = false;
                    var previewLink = item.volumeInfo.previewLink;
                    
                    $.each(item.volumeInfo.authors, function(index2,author){
                        authors+="<div class = \"author\">"+author+"</div>";    
                    
                    });
                    row += '<div class = "row container">';
                    row += '<div id = "clickableResult'+index+'" class = "row">';
                    row += '<div class = "h3 title col-md-8">'+title+'</div>';
                    row += '<div class = "col-md-4">';
                    row += '<div class = "authors ">'+authors+'</div>';
                    row += '<div class = "publisherAndDate">'+publisher+' ('+pubDate+')'+'</div>';
                    row += '</div>'
                    row += '</div>'
                    row += '<div class="row">'
                    row += '<hr>'
                    row += '</div>'
                    

                    var additionalInfoBox = "";
                    
                    additionalInfoBox += '<div class = "row">';
                    additionalInfoBox += '<div class = "container col-md-3">'
                    additionalInfoBox += '<div class = "previewPicture">'+image+'</div>'
                    additionalInfoBox += '<div class = "type"><b>Type: </b>'+type+'</div>'
                    additionalInfoBox += '<div class = "pgCount"><b>Page Count: </b>'+pgCount+'</div>'
                    additionalInfoBox += '<div class = "rating"> <b>Rating: </b>'+rating+'</div>'
                    additionalInfoBox += '<a class = "btn btn-default previewLink" href="'+previewLink+'"><span class="glyphicon glyphicon-book"> Preview</span></a>'
                    additionalInfoBox += '</div>'
                    additionalInfoBox += '<div class = "container col-md-9">'
                    additionalInfoBox += '<div class = "description"><b>Description: </b>'+description+'</div>'
                    additionalInfoBox += '</div></div>'

                    
                    
                    
                    row += '<div class="row well" id = "additionalInfo'+index+'">'+additionalInfoBox+'</div>';
                    row += '</div>';
                    row += '</div>';
                    row += '</div>';
                    $("#searchResults").append(row);
                    $("#additionalInfo"+index).hide();
                    $("#clickableResult"+index).click(function(){
                        $("#additionalInfo"+index).toggle();
                    });
                })
            
            }   
            })

    }
}