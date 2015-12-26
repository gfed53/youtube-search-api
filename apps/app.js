$(function(){
	$('#search-term').on('submit', function(e){
		e.preventDefault();
		var searchTerm = $('#query').val()
		channelId = $('#channel-id').val()
		dateAfter = $('#date-after').val()
		dateBefore = $('#date-before').val();
		console.log(searchTerm+ ' ' + channelId + ' ' + dateAfter + ' ' + dateBefore);
		getRequest(searchTerm);	
	});
	$('#clear').on('click', function(){
		$('#search-results img').remove();
	});
});

var getRequest = function(searchTerm){
	var params = {
		part: "snippet",
		key: "AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA",
		q: searchTerm,
		maxResults: 50,
		publishedAfter: dateAfter,
		publishedBefore: dateBefore,
		order: "date",
		channelId: channelId
	};
	url= "https://www.googleapis.com/youtube/v3/search";
	youtubeURL = "https://www.youtube.com/watch?v=";
	console.log(params);
	console.log(url);
	$.getJSON(url, params, function(data){
			console.log(data);
			console.log(data.items[0].snippet.title);
			console.log(data.items[0].id.videoId);
			listResults(data.items);
		});
	};

var listResults = function(results){
	$.each(results, function(index, value){
		// console.log(value.items.snippet.title);
		$('#search-results').append("<div><h3>"+value.snippet.title+"</h3><a href= "+youtubeURL+value.id.videoId+"><img src= "+value.snippet.thumbnails.medium.url+"></a></div>");
	});
};

//	Require channelId, publishedAt(Date)
// Example channelId:
// channelId: "UC-2Y8dQb0S6DtpxNgAKoJKA"
//Lord Karnage: "UCh4syoTtvmYlDMeMnwS5dmA"
// Example publishedAt:
//publishedAt: "2015-12-05T19:48:03.000Z"

