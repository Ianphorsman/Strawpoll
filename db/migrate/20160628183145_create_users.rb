class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :hashed_identity
      t.timestamps
    end
  end
end
