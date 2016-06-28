class User < ApplicationRecord

  has_many :polls
  has_many :poll_selections

  validates_presence_of :hashed_identity

end
