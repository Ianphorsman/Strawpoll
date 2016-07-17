class HomeController < ApplicationController

  def index
    @latest = Poll.last.id
    @poll_context = 'newPoll'
    @poll_id = 1
    @full_access_to_stream = false
    @poll_data = { :pollId => 0 }
    @vote_count = 0
    @share_link ='/home/show/0'
    @user_poll_votes = {}
    user = authenticate_or_create_user
    if user.nil?
      @user_polls = []
      @user_votes = []
      @user_id = user.id
    else
      @user_votes = user.votes
      @user_id = user.id
      if user.polls.count > 0
        @user_polls = user.polls.map { |poll| { :id => poll.id, :question => poll.name, :vote_count => poll.vote_count }}.sort_by { |poll| -poll[:vote_count] }.first(10)
      else
        @user_polls = []
      end
    end
    @popular_polls = Poll.all.sort_by { |poll| poll.vote_count }.last(10).map { |poll| { :id => poll.id, :question => poll.name, :vote_count => poll.vote_count }}
  end

  def show
    user = authenticate_or_create_user
    poll = Poll.find_by_id(params[:poll_id])
    if user.nil?
      @user_polls = []
      @user_votes = []
    else
      @user_votes = user.votes
      @user_polls = user.polls.map { |poll| { :id => poll.id, :question => poll.name, :vote_count => poll.vote_count }}.sort_by { |poll| -poll[:vote_count] }.first(10)
    end
    @popular_polls = Poll.all.sort_by { |poll| poll.vote_count }.last(10).map { |poll| { :id => poll.id, :question => poll.name, :vote_count => poll.vote_count }}
    @user_id = user.id
    @poll_id = poll.id
    @poll_context = 'templatePoll'
    @share_link = share_link(poll.id)
    @user_poll_votes = user.votes.where(poll_id: poll.id)
    @latest = Poll.last.id
    if user_has_voted?
      @poll_data = poll.poll_data
      @vote_count = poll.vote_count
    else
      @poll_data = poll.poll_data_by_user user
      @vote_count = poll.vote_count_of_user user
    end
    respond_to do |format|
      format.html
    end
  end


end
