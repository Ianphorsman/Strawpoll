class Poll < ApplicationRecord

  has_many :poll_selections

  def vote_count
    self.poll_selections.map(&:vote_count).inject(&:+)
  end

  def poll_data
    data = self.poll_selections.map do |selection|
      {
          :label => selection.name,
          :yValue => selection.vote_count,
          :color => selection.color
      }
    end
    data[:voteCount] = self.vote_count
    data
  end

end
