class Poll < ApplicationRecord

  has_many :poll_selections

  validates_presence_of :user_id

  def vote_count
    self.poll_selections.map(&:vote_count).inject(&:+)
  end

  def poll_data
    data = {}
    data[:options] = self.poll_selections.map do |selection|
      {
          :label => selection.name,
          :yValue => selection.vote_count,
          :color => selection.color
      }
    end
    data[:voteCount] = self.vote_count
    data[:pollId] = self.id
    data
  end

end
