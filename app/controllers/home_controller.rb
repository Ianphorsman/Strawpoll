class HomeController < ApplicationController

  def index
    @latest = Poll.last.id
    user = authenticate_or_create_user
    @user_polls = user.polls.map { |poll| { :id => poll.id, :question => poll.name, :vote_count => poll.vote_count }}.sort_by { |poll| -poll[:vote_count] }.first(10)
  end


end
