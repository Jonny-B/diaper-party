class UsersController < ApplicationController
  def show
    user = User.where(authentication_token: params['authtoken']).first

    if user.nil?
      render json: 'unauthorized'
    else
      render json: User.select('name').map{|x| x.name}
    end
  end

  def create
    user = User.new(name: params[:user], email: params[:email], password: params[:password])
    user.save
  end
end
