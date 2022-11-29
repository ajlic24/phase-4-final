Rails.application.routes.draw do
  resources :albums
  resources :artists
  resources :songs
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  get '/me', to: 'users#show'
  get '/allusers', to: 'users#index'

  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  

  delete '/logout', to: 'sessions#destroy'
end
