Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'home#index'

  mount ActionCable.server => '/cable'

  get '/poll/:poll_id' => 'polls#show'
  get '/poll/latest' => 'polls#show_latest'

  get '/home/show/:poll_id' => 'home#show'

  post '/poll/create' => 'polls#create'
  post '/poll/:poll_id/vote/:poll_selection_id' => 'polls#vote'


end
