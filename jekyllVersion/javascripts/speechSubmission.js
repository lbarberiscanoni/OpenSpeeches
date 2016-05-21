function get_query(){
	// Source: http://fellowtuts.com/jquery/getting-query-string-values-in-javascript/
    var url = document.location.href;
    if (url.indexOf('?') == -1) return false ;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1].replace(/\+/g, '%20'));
    }
    return result;
}

function getSelectionText() {
	
	return text;
}

function post_file(title) {
	var d = new Date()
	var dd = d.getDate()
	if ( dd < 10 ) dd = '0' + dd ;
	var mm = d.getMonth()+1 ;
	if ( mm < 10 ) mm = '0' + mm ;
	var yyyy = d.getFullYear() ;
	filename = yyyy+'-'+mm+'-'+dd ;
	if (!title) {
		filename = filename + '-' + +d.getTime() ;
	} else {
		var slugified = title.toLowerCase().replace(/\W+/g, '-') ;
		if (slugified!='-') {
			filename = filename + '-' + slugified ;
		} else {
			filename = filename + '-' + d.getTime();
		}
	}
	return filename
}
function post_date() {
	var d = new Date()
	return d.toISOString()
}

var API_NEW_POST = 'https://api.github.com/repos/{{ site.github.repo }}/contents/_posts/' ;

$("#go").click(function() {
	//var user = $('#username').val() ;
    var user = "lbarberiscanoni";
	//var password = $('#password').val() ;
    var password = "l0ll02013";
    var author = $("select#author").val();
	var title = $('#p_title').val() ;

	var p_body = '---\n' ;
	p_body = p_body + 'layout: post \n' ;
    p_body = p_body + "author: " + author + " \n"
	p_body = p_body + 'title:  "' + title +'" \n';
	p_body = p_body + 'date:   '+ post_date() +' \n' ;
	/* Setting the category here is not the most elegant way...
	p_body = p_body + 'categories: tests \n'; 
	*/
	p_body = p_body + '---\n';
	p_body = p_body + '\n' + $('#p_body').val();

	var posted_ok = false ;
    $.ajax({
        dataType: "json",
        contentType: 'application/json; charset=UTF-8',
        url: API_NEW_POST+post_file(title)+'.markdown',
        type: "PUT",
        data: JSON.stringify({
        	content: btoa(unescape(encodeURIComponent(p_body))),
        	message: 'posted via web',
        	branch: '{{ site.github.branch }}'
        }),
        beforeSend: function(xhr) { 
        	xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+password)); 
    	},
        success: function(data) {
        	posted_ok = true ;
        	$('#container1').html('<h2>Successfully posted to {{ site.title }}</h2') ;
        },
        error: function(request, status, error) {
        	responseText = jQuery.parseJSON( request.responseText );
    		$('#messages').append($('<div class="alert alert-danger alert-dismissible" role="alert">')
    		.append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>')
    		.append('<strong>' + request.status + '</strong>: ' + responseText.message )
    		.append('<br>If you are using two-factor-auth, you will ahve to create ')
    		.append('<a href="https://github.com/settings/tokens">a personal access token</a> with "repo" permissions and use this instead of your password.')
    		.append('</div>'));
        	
        },
      })
       ;
});

query_params = get_query();

if (query_params) {
	src_body = '';
	if (query_params['title']) {
		src_title = query_params['title'] ;
		$('#p_title').val(src_title) ;
	}
	if (query_params['selection']) {
		src_body = '> ' + query_params['selection'] ;
	}
	if (query_params['body']) {
		src_body = query_params['body'] ;
	}
	if (query_params['url']) {
		src_body = src_body + ' &mdash;['+src_title+'](' + query_params['url'] + ')\n' ;
	}
	$('#p_body').val(src_body) ;
}
