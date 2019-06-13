class UsersController < ApplicationController

  def show
    User.all.to_ary
  end

  def create
    user = User.new(name: request.parameters["user"])
    user.save
  end
end
