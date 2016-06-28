class CreatePollSelections < ActiveRecord::Migration[5.0]
  def change
    create_table :poll_selections do |t|
      t.integer :poll_id
      t.integer :user_id
      t.string  :name
      t.boolean :selected
      t.timestamps
    end
  end
end
