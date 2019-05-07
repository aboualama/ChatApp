 

require('./bootstrap'); 
   

import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});
       
  
var onlinelength = 0;  
var count = 0;  
let path = $('meta[name=path]').attr('content'); 

window.Echo.join(`chat`)
    .here((users) => {
 
    	let user_id = $('meta[name=user_id]').attr('content'); 
    	onlinelength = users.length; 
    	count = users.length -1; 
 
		if(users.length > 1) {
			$('#onlin_user').css('display' , 'none');  
		} 
		users.forEach(function(user){  
			if(user.id == user_id) {
				return;
			} 
			$('#onlin').append(`<li id="user_${user.id}"  class="contact">
				                    <div class="wrap"> 
				                        <img src="${path}${user.avatar}" alt="${user.name}" />
				                        <div class="meta">
				                            <p class="name">${user.name}</p>
				                            <p class="preview"><span>You:</span> That's bullshit. This deal is solid.</p>
				                        </div>
				                    </div>
				                </li>`);

		})    
		// $('#count').append('( ' + count +' )');  
    }) 
    .joining((user) => { 

    		onlinelength++;
    		// count++;
 			$('#onlin_user').css('display' , 'none');  
			$('#onlin').append(`<li id="user_${user.id}"  class="contact">
				                    <div class="wrap"> 
				                        <img src="${path}${user.avatar}" alt="${user.name}" />
				                        <div class="meta">
				                            <p class="name">${user.name}</p>
				                            <p class="preview"><span>You:</span> That's bullshit. This deal is solid.</p>
				                        </div>
				                    </div>
				                </li>`);
			$('#count').text('( ' + count +' )');  
    }) 
    .leaving((user) => { 

    		onlinelength--; 
    		// count--; 
			if(onlinelength == 1) {
				$('#onlin_user').css('display' , 'block');  
			} 
        	$('#user_' + user.id).remove();
			$('#count').text('( ' + count +' )');  
    });


window.Echo.channel('chat-groub')
	.listen('MessageSent', (e) => {  
		$('.messages ul').append(
			`<li class="replies">
				<img src="${path}${e.message.user.avatar}"  alt="" /> 
				<div>  
					<p> <span> ${e.message.user.name}: </span> ${e.message.body} </p>
				</div>
			</li> `
		); 
		// $(".messages").animate({ scrollTop:  20000000 }, "fast");
});