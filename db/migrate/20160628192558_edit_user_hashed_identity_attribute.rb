class EditUserHashedIdentityAttribute < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :hashed_identity
    add_column    :users, :hashed_identity, :text
  end
end
