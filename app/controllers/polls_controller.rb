class PollsController < ApplicationController

  def edit
  end

  def create
    user = authenticate_or_create_user
    poll = Poll.new({
        :user_id => user.id,
        :name => params[:name]
                    })
    if poll.save
      params[:pollSelections].each do |selection|
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

  end

  def vote
    user = authenticate_or_create_user
    poll = Poll.find_by_id(params[:poll_id])
    poll_selection = poll.poll_selections.find_by_name(params[:selection])
    poll_selection.vote_count += 1
    poll_selection.save
    vote = Vote.new({
        :user_id => user.id,
        :poll_id => poll.id,
        :poll_selection_id => poll_selection.id,
        :poll_selection => poll_selection.name
                    })
  end


end
