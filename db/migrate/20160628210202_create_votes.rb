class CreateVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :votes do |t|
      t.integer :user_id
      t.integer :poll_id
      t.integer :poll_selection_id
      t.string :poll_selection
      t.timestamps
    end
  end
end
