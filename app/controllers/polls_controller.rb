class PollsController < ApplicationController

  def edit
  end

  def create
    user = authenticate_or_create_user
    if user.nil?
      user_votes = []
    else
      user_votes = user.votes.where(poll_id: params[:poll_id].to_i)
    end
    poll = Poll.new({
        :user_id => user.id,
        :lifespan => get_expiry_date(params[:poll_expires_in], params[:poll_expiry_unit]),
        :votes_per_person => params[:votes_per_person].to_i,
        :votes_required_per_person => params[:votes_required_per_person].to_i,
        :duplicate_votes_allowed => params[:duplicate_votes_allowed],
        :total_votes => params[:total_votes].to_i,
        :name => params[:question]
                    })
    if poll.save
      count = 1
      params[:options].each do |selection|
        PollSelection.create({
            :user_id => user.id,
            :poll_id => poll.id,
            :name => selection,
            :vote_count => 0,
            :color => get_color(count)
                             })
        count += 1
      end
      user_polls = user.polls.map { |poll| { :id => poll.id, :question => poll.name, :vote_count => poll.vote_count }}.sort_by { |poll| -poll[:vote_count] }.first(10)
      popular_polls = Poll.all.sort_by { |poll| poll.vote_count }.last(10).map { |poll| { :id => poll.id, :question => poll.name, :vote_count => poll.vote_count }}
    end
    respond_to do |format|
      format.json { render :json => { :head => "Success", :pollData => poll.poll_data(user_participated=false), :userPollVotes => user_votes, :popularPolls => popular_polls, :userPolls => user_polls, :shareLink => share_link(poll.id) }}
    end
  end

  def show
    user = authenticate_or_create_user
    if user.nil?
      user_votes = []
    else
      user_votes = user.votes.where(poll_id: params[:poll_id].to_i)
    end
    poll = Poll.find_by_id(params[:poll_id].to_i)
    if user_has_voted?
      poll_data = poll.poll_data
      vote_count = poll.vote_count
    else
      poll_data = poll.poll_data_by_user(user)
      vote_count = poll.vote_count_of_user(user)
    end
    puts poll_data
    respond_to do |format|
      format.json do
        render :json => {
            :head => "Success",
            :pollData => poll_data,
            :voteCount => vote_count,
            :userPollVotes => user_votes,
            :userHasVoted => user_has_voted?,
            :shareLink => share_link(poll.id),
            :userParticipated => user_participated?
        }
      end
    end
  end

  def vote
    user = authenticate_or_create_user
    if user.nil?
      user_votes = []
    else
      user_votes = user.votes.where(poll_id: params[:poll_id].to_i)
    end
    if user_participated?
      respond_to do |format|
        format.json { render :json => { :head => "Already voted", :userParticipated => user_participated? } }
      end
    else
      poll = Poll.find_by_id(params[:poll_id])
      poll_selection = poll.poll_selections.find_by_id(params[:poll_selection_id])
      poll_selection.vote_count += 1
      poll_selection.save
      vote = Vote.create({
                             :user_id => user.id,
                             :poll_id => poll.id,
                             :poll_selection_id => poll_selection.id,
                             :poll_selection => poll_selection.name
                         })

      ActionCable.server.broadcast "polls_#{poll.id}_user_#{user.id}",
                                     userId: user.id,
                                     pollId: poll.id,
                                     enableAccess: user_has_voted?,
                                     pollData: poll.poll_data_by_user(user),
                                     voteCount: poll.vote_count_of_user(user)

      ActionCable.server.broadcast "polls_#{poll.id}",
                                   userId: user.id,
                                   pollId: poll.id,
                                   pollData: poll.poll_data,
                                   voteCount: poll.vote_count

      respond_to do |format|
        format.json { render :json => { :head => "Success", :vote => vote, :userHasVoted => user_has_voted?, :userParticipated => user_participated?, :userPollVotes => user_votes }}
      end
    end
  end

  def show_latest
    user = authenticate_or_create_user
    puts user.hashed_identity
    puts request.user_agent
    puts request.remote_ip
    poll = Poll.last
    puts "Latest poll #{poll}"
    if user.nil?
      user_votes = []
    else
      user_votes = user.votes.where(poll_id: poll.id)
    end
    if user_has_voted?
      poll_data = poll.poll_data
      vote_count = poll.vote_count
    else
      poll_data = poll.poll_data_by_user(user)
      vote_count = poll.vote_count_of_user(user)
    end
    puts poll_data
    respond_to do |format|
      format.json do
        render :json => {
            :head => "Success",
            :pollData => poll_data,
            :voteCount => vote_count,
            :userPollVotes => user_votes,
            :userHasVoted => user_has_voted?,
            :shareLink => share_link(poll.id),
            :userParticipated => user_participated?
        }
      end
    end
  end

  private

  def get_color count
    color_wheel = [
        "#9e9e9e", #grey
        "#8bc34a", #light green
        "#03a9f4", #light blue
        "#f44336", #red
        "#ff9800", #orange
        "#673ab7", #deep purple
        "#795548", #brown
        "#e91e63", #pink
        "#9c27b0", #purple
        "#4caf50", #green
        "#ffeb3b", #yellow
        "#ffc107", #amber
        "#3f51b5", #indigo
        "#2196f3", #blue
        "#00bcd4", #cyan
        "#009688", #teal
        "#cddc39", #lime
        "#ff5722", #deep orange
        "#607d8b", #blue grey
    ]
    color_wheel[count % color_wheel.length]
  end

  def get_expiry_date expire_amount, expire_unit
    expire_amount.to_i.send(expire_unit)
  end


end
