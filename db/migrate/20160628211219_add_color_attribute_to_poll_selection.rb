class AddColorAttributeToPollSelection < ActiveRecord::Migration[5.0]
  def change
    add_column :poll_selections, :color, :string
  end
end
