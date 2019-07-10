Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'users#show'

  get 'users', to: 'users#show'
  post 'createUser', to: 'users#create'

  get 'sessions/currentUser', to: 'sessions#currentUser'
  post 'sessions/login', to: 'sessions#create'
  delete 'sessions/logout', to: 'sessions#destroy'

end
