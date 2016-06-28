class User < ApplicationRecord

  has_many :polls
  has_many :votes

  validates_presence_of :hashed_identity

end
