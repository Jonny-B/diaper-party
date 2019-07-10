class SessionsController < ApplicationController
  # TODO Create LOGOUT

  def create
    user = User.where(email: params[:email]).first
    if !user.nil? && user.valid_password?(params[:password])
      render json: user.as_json(only: [:email, :name, :authentication_token], status: :created)
    else
      render json: 'unauthorized'
    end
  end

  def destroy
    user = User.where(authentication_token: params['authtoken']).first
    #this will simply change the token causing the old one to be invalid
    user.save
  end
end
