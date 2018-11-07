class MessagesController < ApplicationController
  def index
  end

  def create
    @message = Message.new(message_params)
  end

  private

  def message_params
    params.require(:message).permit(:body, :image)
  end
end
