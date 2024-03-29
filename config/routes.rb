Rails.application.routes.draw do
  #? For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #? Root put 1st to match 1st + frequently visited (defaults to 'Rails Welcome' page when not set)
  root 'application#fallback_redirect' #? Will not work if an index.html file exists in '/public'
  #? Work around in production is to rename index.html to main.html then serve it in fallback_redirect action

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  get '/health-check', to: 'application#health_check'
  get '*path', to: 'application#fallback_redirect', constraints: ->(request) { !request.xhr? && request.format.html? }

  scope '/api' do
    resources :posts
    post '/contact-email', to: 'emails#contact_email'
    get '/routes', to: 'routes#index', as: 'routes' # 'as' helps form route name (i.e. 'routes_url' or 'routes_path')
  end
end
