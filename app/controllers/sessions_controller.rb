class SessionsController < ApplicationController
  # TODO Create LOGOUT
  # def currentUser
  #
  # end

  def create
    user = User.where(email: params[:email]).first
    if !user.nil? && user.valid_password?(params[:password])
      render json: user.as_json(only: [:email, :name, :authentication_token], status: :created)
    else
      render json: 'unauthorized'
    end
  end

  def destroy

  end
end
