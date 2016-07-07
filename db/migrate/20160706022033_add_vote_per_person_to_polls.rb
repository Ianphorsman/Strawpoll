class AddVotePerPersonToPolls < ActiveRecord::Migration[5.0]
  def change
    add_column :polls, :votes_per_person, :integer
  end
end
