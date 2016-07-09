class Poll < ApplicationRecord

  has_many :poll_selections

  validates_presence_of :user_id, :votes_per_person, :total_votes, :lifespan

  def vote_count
    self.poll_selections.map(&:vote_count).inject(&:+)
  end

  def poll_data(user_participated=true)
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
            :yValue => selection.vote_count,
            :color => selection.color,
            :id => selection.id
        }
      end
      data[:voteCount] = 0
    end
    if ((Time.now.utc - self.created_at) > self.lifespan) || self.total_votes < self.vote_count
      data[:pollOpen] = false
    else
      data[:pollOpen] = true
    end
    data[:pollId] = self.id
    data[:question] = self.name
    data[:duplicate_votes_allowed] = self.duplicate_votes_allowed
    data[:options] = data[:options].sort_by { |obj| obj[:label] }
    data
  end

  def poll_data_by_user user
    data = {}
    data[:options] = self.poll_selections.map do |selection|
      {
          :label => selection.name,
          :yValue => user.votes.where(poll_selection_id: selection.id).count,
          :color => selection.color,
          :id => selection.id
      }
    end
    data[:voteCount] = user.votes.where(poll_id: self.id).count
    if ((Time.now.utc - self.created_at) > self.lifespan) || self.total_votes < self.vote_count
      data[:pollOpen] = false
    else
      data[:pollOpen] = true
    end
    data[:pollId] = self.id
    data[:question] = self.name
    data[:duplicate_votes_allowed] = self.duplicate_votes_allowed
    data[:options] = data[:options].sort_by { |obj| obj[:label] }
    data
  end

  def vote_count_of_user user
    user.votes.where(poll_id: self.id).count
  end

end
