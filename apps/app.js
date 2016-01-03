$(function(){
	var channelIdUrl;

	$('.input-group-btn').on('click', 'a', function(e){
		e.preventDefault();
		console.log(this);
		console.log($(this).parent().parent().parent());
		var thisGroup = $(this).parent().parent().parent();
		yourChoice = $(this).html();
		thisGroup.find("button").html(yourChoice);
		// console.log($('.dropdown-toggle').html());
	});

	$('#ui-search-term2').on('submit', function(e){
		e.preventDefault();
		var beforeMonth = $('#before-month2').val(),
		beforeDay = $('#before-day2').val(),
		beforeYear = $('#before-year2').val(),
		afterMonth = $('#after-month2').val(),
		afterDay = $('#after-day2').val(),
		afterYear = $('#after-year2').val(),
		uiSearchTerm = $('#ui-query2').val(),
		allDayMonthItems = [beforeMonth, beforeDay, afterMonth, afterDay];

		for(var i=0; i<allDayMonthItems.length; i++){
			var dateItem = allDayMonthItems[i];
			console.log(i);
			console.log(dateItem);
			if(dateItem === ""){
				console.log("this should work");
				allDayMonthItems[i] = "01";
			}
			else if(dateItem.length === 1){
				dateItem = "0"+dateItem;
				console.log("this too");
			}
		}

		if(beforeYear === "" || beforeYear.length<4){
			beforeYear = "2016";
		}
		if(afterYear === ""){
			afterYear = "2004";
		}
		console.log(beforeMonth);
		console.log(allDayMonthItems[0]);
		var dateBefore = beforeYear+"-"+allDayMonthItems[0]+"-"+allDayMonthItems[1]+"T00:00:00.000Z",
		dateAfter = afterYear+"-"+allDayMonthItems[2]+"-"+allDayMonthItems[3]+"T00:00:00.000Z";

		console.log(dateBefore+", "+dateAfter+", "+uiSearchTerm+", "+channelIdUrl);
		getRequest(uiSearchTerm, channelIdUrl, dateAfter, dateBefore);
	});

	$('#ui-search-term').on('submit', function(e){
		e.preventDefault();
		var beforeMonth = $('#before-month').html(),
		beforeDay = $('#before-day').html(),
		beforeYear = $('#before-year').html(),
		dateBefore = beforeYear+"-"+beforeMonth+"-"+beforeDay+"T00:00:00.000Z",
		afterMonth = $('#after-month').html(),
		afterDay = $('#after-day').html(),
		afterYear = $('#after-year').html(),
		dateAfter = afterYear+"-"+afterMonth+"-"+afterDay+"T00:00:00.000Z",
		uiSearchTerm = $('#ui-query').val();
		console.log(dateBefore+", "+dateAfter+", "+uiSearchTerm+", "+channelIdUrl);
		getRequest(uiSearchTerm, channelIdUrl, dateAfter, dateBefore);
	});

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

	$('#channel-search-results').on('click', '.channel-selector', function(){
		console.log($(this).val());
		$('.channel-selector').val("Select");
		$(this).val("Selected");
		var parent = $(this).parent();
		console.log("hi");
		console.log(parent);
		console.log(parent.find('.channel-id-url').text());
		channelIdUrl = parent.find('.channel-id-url').text();
		console.log(channelIdUrl);
		// $('#channel-id').val(channelIdUrl);
		// channelId = channelIdUrl; 
	});

	$('#search-results, #channel-search-results').on('click', 'img', function(){
		console.log(this);
		var parent = $(this).parent();
		console.log(parent);
		console.log(parent.find('.url').text());
		myUrl = parent.find('.url').text();
		window.open(myUrl, '_blank');
	})
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
		channelId: channelId,
		type: "video"
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
		$('#search-results').append("<div><h3>"+value.snippet.title+"</h3><h4>"+value.snippet.publishedAt+"</h4><img src= "+value.snippet.thumbnails.medium.url+"><span class='url'>"+youtubeURL+value.id.videoId+"</span></div><br>");
	});
};

var channelListResults = function(results){
	$.each(results, function(index, value){
		// console.log(value.items.snippet.title);
		$('#channel-search-results').append("<div><h3>"+value.snippet.title+"</h3><h4>"+value.snippet.publishedAt+"</h4><img src= "+value.snippet.thumbnails.medium.url+"><span class='channel-id-url'>"+value.id.channelId+"</span><span class='url'>"+youtubeURL+value.id.channelId+"</span><input class='channel-selector' type='button' value='Select'></div><br>");
	});
};

//	Require channelId, publishedAt(Date)
// Example channelId:
// channelId: "UC-2Y8dQb0S6DtpxNgAKoJKA"
//Lord Karnage: "UCh4syoTtvmYlDMeMnwS5dmA"
// Example publishedAt:
//publishedAt: "2015-12-05T19:48:03.000Z"

