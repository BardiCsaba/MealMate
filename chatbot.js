$('#chat-input').keypress(function(event) {
  if (event.which == 13) { // Enter key pressed
    var message = $(this).val();
    $(this).val('');
    $('#chat-messages').append('<div class="message">' + message + '</div>');
    $.ajax({
      type: 'POST',
      url: '/chatbot',
      data: { message: message },
      success: function(response) {
        $('#chat-messages').append('<div class="message">' + response + '</div>');
      },
      error: function() {
        $('#chat-messages').append('<div class="message">An error occurred.</div>');
      }
    });
  }
});
