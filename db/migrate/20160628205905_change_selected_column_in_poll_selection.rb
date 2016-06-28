class ChangeSelectedColumnInPollSelection < ActiveRecord::Migration[5.0]
  def change
    remove_column :poll_selections, :selected
    add_column :poll_selections, :vote_count, :integer
  end
end
