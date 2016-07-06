class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def user_participated?
    user = authenticate_or_create_user
    poll = Poll.find_by_id(params[:poll_id]) || Poll.last
    if user.votes.where(poll_id: params[:poll_id]).length >= poll.votes_per_person
      true
    else
      false
    end
  end
  helper_method :user_participated?

  private

  def authenticate_or_create_user
    ip_addr = request.remote_ip
    device = request.user_agent

    hashable_user_string = "#{ip_addr}_#{device}"

    hashed_user = Digest::SHA256.new.hexdigest(hashable_user_string)

    user = User.find_by_hashed_identity(hashed_user)
    if user.nil?
      User.create({hashed_identity: hashed_user })
    end
    user
  end



end
