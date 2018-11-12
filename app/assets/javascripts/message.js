$(function(){
  function appendData(message){
      var html = `<div class="chat-content__nickname">
                    <div class="nickname">
                      ${message.nickname}
                      <span class="date">
                        ${message.created_at}
                      </span>
                    </div>
                    <div class="chat-text">
                      <div class="lower-message">
                        <% if message.body.present? %>
                          <p class="lower-message__content">${message.body}</p>
                        <% else %>
                          <%= image_tag ${message.image.url} %>
                        <% end %>
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
      alert("成功")
    })
    .fail(function(){
      alert("error")
    })
  })


});
