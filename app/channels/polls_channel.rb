# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class PollsChannel < ApplicationCable::Channel
  def subscribed
    #stream_from "polls_" + data[:pollId]
  end

  def follow(data) # { pollData => {}, pollId => int }
    puts data["pollId"]
    stream_from "polls_#{data["pollId"]}"
  end

  def unfollow
    stop_all_streams
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
