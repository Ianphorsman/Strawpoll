class PollsController < ApplicationController

  def edit
  end

  def create
    user = authenticate_or_create_user
    poll = Poll.new({
        :user_id => user.id,
        :name => params[:question]
                    })
    if poll.save
      params[:options].each do |selection|
        PollSelection.create({
            :user_id => user.id,
            :poll_id => poll.id,
            :name => selection,
            :vote_count => 0
                             })
      end
    end
  end

  def show
    poll = Poll.find_by_id(params[:poll_id])
    respond_to do |format|
      format.json { render :json => { :head => "Success", :pollData => poll.poll_data }}
    end
  end

  def vote
    user = authenticate_or_create_user
    poll = Poll.find_by_id(params[:poll_id])
    poll_selection = poll.poll_selections.find_by_name(params[:selection])
    poll_selection.vote_count += 1
    poll_selection.save
    vote = Vote.create({
        :user_id => user.id,
        :poll_id => poll.id,
        :poll_selection_id => poll_selection.id,
        :poll_selection => poll_selection.name
                    })
  end


end
