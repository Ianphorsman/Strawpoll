class HomeController < ApplicationController

  def index
    @latest = Poll.last.id
  end


end
