class HomeController < ApplicationController

  def index
    @latest = Poll.last.id
    user = authenticate_or_create_user
    if user.nil?
      @user_polls = []
      @user_votes = []
    else
      @user_votes = user.votes
      @user_polls = user.polls.map { |poll| { :id => poll.id, :question => poll.name, :vote_count => poll.vote_count }}.sort_by { |poll| -poll[:vote_count] }.first(10)
    end
    @popular_polls = Poll.all.sort_by { |poll| poll.vote_count }.last(10).map { |poll| { :id => poll.id, :question => poll.name, :vote_count => poll.vote_count }}
  end


end
