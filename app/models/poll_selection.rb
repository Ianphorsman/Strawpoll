class PollSelection < ApplicationRecord

  belongs_to :poll

  validates_presence_of :user_id, :poll_id, :name, :selected

end
