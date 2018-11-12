$(function(){
  function appendData(message){
      var html = `<div class="chat-content__nickname">
                    <div class="nickname">
                      ${message.nickname}
                      <span class="date">
                        ${Date(message.created_at).match(/.{24}/)}
                      </span>
                    </div>
                    <div class="chat-text">
                      <div class="lower-message">
                          <p class="lower-message__content">${message.body}</p>
                      </div>
                    </div>
                  </div>`
    $(".chat-content").append(html)
  }

  $(".form_data").on("submit", function(e){
    e.preventDefault();
    var href = window.location.href
    var formData = new FormData(this);
    $.ajax({
      type: "POST",
      url: href,
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      appendData(data);
      $('.textbox').val('')
    })
    .fail(function(){
      alert("error")
    })
  })


});
