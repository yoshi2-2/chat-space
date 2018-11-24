$(function(){
  var user_result = $("#user-search-result")
  function addUser(name,user_id){
    var chatmember = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                          <p class='chat-group-user__name'>${name}</p>
                          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                      </div>`
    $("#chat-group-users").append(chatmember);
    }
  function buildHTML(user){
    var html       = `<div class="chat-group-user clearfix hidden-group">
                          <p class="chat-group-user__name add_name">${user.name}</p>
                          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                      </div>`
    user_result.append(html);
    }
  // チャットメンバーインクリメンタルサーチ
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type:     'GET',
      url:      "/users",
      data:     { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $(".hidden-group").remove();
        users.forEach(function(user){
          buildHTML(user);
        })
    })
    .fail(function(){
      alert("ユーザ検索に失敗しました。");
    })
  });
  // チャットメンバーへの追加機能
  $("#user-search-result").on("click", ".user-search-add", function(){
    var add_name = $(this).attr("data-user-name");
    var add_user_id = $(this).attr("data-user-id");
    addUser(add_name, add_user_id);
  });
  // チャットメンバーから削除
  $("#chat-group-users").on("click", ".user-search-remove",function(){
    var addedMember = $(this).parent();
    addedMember.remove();
  });
});
