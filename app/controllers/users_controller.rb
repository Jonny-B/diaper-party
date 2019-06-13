class UsersController < ApplicationController

  def show
    render json: User.select('name').map{|x| x.name}
  end

  def create
    user = User.new(name: request.parameters["user"])
    user.save
  end
end
