Rails.application.routes.draw do
  devise_for :users
  root to: 'users#show'

  get 'users', to: 'users#show'
  post 'createUser', to: 'users#create'

  get 'sessions/currentUser', to: 'sessions#currentUser'

  get 'count', to: 'hotdog#count'
  post 'add/hotdog', to: 'hotdog#add'
  post 'subtract/hotdog', to: 'hotdog#subtract'
  post 'add/burger', to: 'burger#add'
  post 'subtract/burger', to: 'burger#subtract'

end
