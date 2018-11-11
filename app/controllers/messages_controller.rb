class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messagetitle = @group.name
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    respond_to do |format|
      format.html {
        if @message.save
          redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
        else
          @messages = @group.messages.includes(:user)
          flash.now[:alert] = 'メッセージを入力してください。'
          render :index
        end
      }
      format.json
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
