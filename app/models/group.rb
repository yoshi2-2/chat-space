class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages

  validates :name, presence: true

  def show_last_message
    if messages.last.present?
      if messages.last.body?
        messages.last.body
      else
        "画像が投稿されています。"
      end
    else
      "まだメッセージはありません。"
    end
  end
end
