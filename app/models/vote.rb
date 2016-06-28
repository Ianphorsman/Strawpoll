class Vote < ApplicationRecord

  belongs_to :user

  validates_presence_of :user_id, :poll_id, :poll_selection_id, :poll_selection

end
