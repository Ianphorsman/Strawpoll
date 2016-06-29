class Poll < ApplicationRecord

  has_many :poll_selections

  validates_presence_of :user_id

  def vote_count
    self.poll_selections.map(&:vote_count).inject(&:+)
  end

  def poll_data user_participated=false
    data = {}
    if user_participated
      data[:options] = self.poll_selections.map do |selection|
        {
            :label => selection.name,
            :yValue => selection.vote_count,
            :color => selection.color,
            :id => selection.id
        }
      end
      data[:voteCount] = self.vote_count
    else
      data[:options] = self.poll_selections.map do |selection|
        {
            :label => selection.name,
            :yValue => 0,
            :color => selection.color,
            :id => selection.id
        }
      end
      data[:voteCount] = 0
    end
    data[:pollId] = self.id
    data
  end

end
