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
    end
    respond_to do |format|
      format.json { render :json => { :head => "Success", :pollData => poll.poll_data }}
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
    poll_selection = poll.poll_selections.find_by_id(params[:poll_selection_id])
    poll_selection.vote_count += 1
    poll_selection.save
    vote = Vote.create({
        :user_id => user.id,
        :poll_id => poll.id,
        :poll_selection_id => poll_selection.id,
        :poll_selection => poll_selection.name
                    })
    respond_to do |format|
      format.json { render :json => { :head => "Success", :vote => vote, :voteCount => poll.vote_count}}
    end
  end

  private

  def get_color count
    color_wheel = [
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
        "#9e9e9e", #grey
        "#607d8b", #blue grey
    ]
    color_wheel[count % color_wheel.length]
  end


end
