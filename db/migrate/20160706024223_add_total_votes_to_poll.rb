class AddTotalVotesToPoll < ActiveRecord::Migration[5.0]
  def change
    add_column :polls, :total_votes, :integer
  end
end
