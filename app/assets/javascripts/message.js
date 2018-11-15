$(function(){
  function appendData(message){
    var insertImage = message.image_url ? `<img src="${message.image_url}" class='lower-message__image'>` : "";

      var html = `<div class="chat-content__message">
                    <div class="nickname">
                      ${message.nickname}
                      <span class="date">
                        ${Date(message.created_at).match(/.{24}/)}
                      </span>
                    </div>
                    <div class="chat-text">
                      <div class="lower-message">
                          <p class="lower-message__content">${message.body}</p>
                          <img class='lower-message'>
                            ${insertImage}
                          </img>
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
      url:         href,
      data:        formData,
      dataType:    "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      appendData(data);
      $('.form__message').val('')
      $(".chat-content").scrollTop($(".chat-content")[0].scrollHeight );
      $(".form__submit").prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージを入力してください");
      $(".form__submit").prop('disabled', false);
    })
  })


});
