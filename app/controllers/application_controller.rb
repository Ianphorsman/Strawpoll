class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  ActionCable.server.config.allowed_request_origins = [/192.168.1.*/, '127.0.0.1', 'http://localhost:3000']

  def user_participated?
    user = authenticate_or_create_user
    poll = Poll.find_by_id(params[:poll_id]) || Poll.last
    if user.votes.where(poll_id: poll.id).length >= poll.votes_per_person
      true
    else
      false
    end
  end
  helper_method :user_participated?

  def user_has_voted?
    user = authenticate_or_create_user
    poll = Poll.find_by_id(params[:poll_id]) || Poll.last
    if user.votes.where(poll_id: poll.id).length >= poll.votes_required_per_person
      true
    else
      false
    end
  end
  helper_method :user_has_voted?

  def share_link poll_id
    return "159.203.4.89:3000/home/show/#{poll_id}"
    #return "strawpoll.xyz/home/show/#{poll_id}"
  end
  helper_method :share_link

  private

  def authenticate_or_create_user
    ip_addr = request.remote_ip
    device = request.user_agent

    hashable_user_string = "#{ip_addr}_#{device}"

    hashed_user = Digest::SHA256.new.hexdigest(hashable_user_string)

    user = User.find_by_hashed_identity(hashed_user)
    if user.nil?
      user = User.create({hashed_identity: hashed_user })
    end
    user
  end



end
