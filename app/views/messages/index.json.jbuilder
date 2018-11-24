json.array! @new_messages.each do |message|
  json.nickname     message.user.name
  json.created_at     message.created_at
  json.body     message.body
  json.image    message.image.url
  json.id       message.id
end
