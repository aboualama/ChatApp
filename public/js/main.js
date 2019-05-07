$(".messages").animate({ scrollTop: 20000000 }, "fast");
function newMessage() {
    message   = $(".message-input input").val();
    username  = $('meta[name=username]').attr('content');
    user_id   = $('meta[name=user_id]').attr('content');
    avatar    = $('meta[name=avatar]').attr('content');
    url       = '/room'; 
    data      = { body: message, user_id, }
    
    $.ajax({
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        type: 'Post',
        url: url,
        data: data 
    });

    if($.trim(message) == '') {
      return false;
    } 
    $('<li class="sent"><img src="' + avatar + '" alt="ff" /><p> <span>' + username + ':</span>' + message + '</p></li>').appendTo($('.messages ul'));
    $('.message-input input').val(null);
    $('.contact .preview').html('<span>You:  </span>' + message);
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    // $(".messages").animate({ scrollTop: 20000000 }, "fast");
};


$('#submit').click(function() {
    newMessage();
});


$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
}); 