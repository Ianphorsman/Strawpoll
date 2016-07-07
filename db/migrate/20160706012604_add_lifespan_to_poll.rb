class AddLifespanToPoll < ActiveRecord::Migration[5.0]
  def change
    add_column :polls, :lifespan, :integer
  end
end
