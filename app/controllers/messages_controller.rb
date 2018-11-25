class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messagetitle = @group.name
    @members = @group.users
    @messages = @group.messages.includes(:user)
    respond_to do |format|
       format.html
       format.json{ @new_messages = @messages.where('id > ?', params[:id])}
    end
  end

  def create
    @message = @group.messages.create(message_params)
    @messages = @group.messages.includes(:user)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(params[:group_id]) }
        format.json
        end
    else
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
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
