class AddFieldsToPoll < ActiveRecord::Migration[5.0]
  def change
    add_column :polls, :votes_required_per_person, :integer
    add_column :polls, :duplicate_votes_allowed, :boolean
  end
end
