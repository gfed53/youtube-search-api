$('#channel-search').on('submit', function(e){
		e.preventDefault();
		var channelSearchTerm = $('#search-channel-id').val()
		console.log(channelSearchTerm);
		getRequestChan(channelSearchTerm);	
	});
$('#channel-clear').on('click', function(){
	$('#channel-search-results div').remove();
});

$('#channel-search-results div').on('click', 'input' function(){
	console.log($(this).id.channelId);
});

var getRequestChan = function(searchTerm){
	var params = {
		part: "snippet",
		key: "AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA",
		q: searchTerm,
		maxResults: 50,
		order: "date",
		type: "channel"
	};
	url= "https://www.googleapis.com/youtube/v3/search";
	youtubeURL = "https://www.youtube.com/watch?v=";
	console.log(params);
	console.log(url);
	$.getJSON(url, params, function(data){
			console.log(data);
			console.log(data.items[0].snippet.title);
			console.log(data.items[0].id.channelId);
			channelListResults(data.items);
		});
	};

	var channelListResults = function(results){
	$.each(results, function(index, value){
		// console.log(value.items.snippet.title);
		$('#channel-search-results').append("<div><h3>"+value.snippet.title+"</h3><h4>"+value.snippet.publishedAt+"</h4><a href= "+youtubeURL+value.id.channelId+"><img src= "+value.snippet.thumbnails.medium.url+"></a><input type='button' value='Select'></div><br>");
	});
};