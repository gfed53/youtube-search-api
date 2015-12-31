$(function(){
	$('#search-term').on('submit', function(e){
		e.preventDefault();
		var searchTerm = $('#query').val(),
		channelId = $('#channel-id').val(),
		dateAfter = $('#date-after').val(),
		dateBefore = $('#date-before').val();
		console.log(searchTerm+ ' ' + channelId + ' ' + dateAfter + ' ' + dateBefore);
		getRequest(searchTerm, channelId, dateAfter, dateBefore);	
	});
	$('#clear').on('click', function(){
		$('#search-results div').remove();
		$('#search-results br').remove();
	});
	$('#channel-search').on('submit', function(e){
		e.preventDefault();
		var channelSearchTerm = $('#search-channel-id').val();
		console.log(channelSearchTerm);
		getRequestChan(channelSearchTerm);	
	});
	$('#channel-clear').on('click', function(){
		$('#channel-search-results div, #channel-search-results br').remove();
	});

	$('#channel-search-results').on('click', 'input', function(){
		var parent = $(this).parent();
		console.log("hi");
		console.log(parent);
		console.log(parent.find('span').text());
		var channelIdUrl = parent.find('span').text();
		$('#channel-id').val(channelIdUrl);
		// channelId = channelIdUrl; 
	});
});

var getRequest = function(searchTerm, channelId, dateAfter, dateBefore){
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

var getRequestChan = function(channelSearchTerm){
	var params = {
		part: "snippet",
		key: "AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA",
		q: channelSearchTerm,
		maxResults: 50,
		type: "channel"
	};
	url= "https://www.googleapis.com/youtube/v3/search";
	youtubeURL = "https://www.youtube.com/channel/";
	console.log(params);
	console.log(url);
	$.getJSON(url, params, function(data){
			console.log(data);
			console.log(data.items[0].snippet.title);
			console.log(data.items[0].id.channelId);
			channelListResults(data.items);
		});
	};

var listResults = function(results){
	$.each(results, function(index, value){
		// console.log(value.items.snippet.title);
		$('#search-results').append("<div><h3>"+value.snippet.title+"</h3><h4>"+value.snippet.publishedAt+"</h4><a href= "+youtubeURL+value.id.videoId+"><img src= "+value.snippet.thumbnails.medium.url+"></a></div><br>");
	});
};

var channelListResults = function(results){
	$.each(results, function(index, value){
		// console.log(value.items.snippet.title);
		$('#channel-search-results').append("<div><h3>"+value.snippet.title+"</h3><h4>"+value.snippet.publishedAt+"</h4><a href= "+youtubeURL+value.id.channelId+"><img src= "+value.snippet.thumbnails.medium.url+"></a><span>"+value.id.channelId+"</span><input type='button' value='Select'></div><br>");
	});
};

//	Require channelId, publishedAt(Date)
// Example channelId:
// channelId: "UC-2Y8dQb0S6DtpxNgAKoJKA"
//Lord Karnage: "UCh4syoTtvmYlDMeMnwS5dmA"
// Example publishedAt:
//publishedAt: "2015-12-05T19:48:03.000Z"

