class BurgerController < ApplicationController
  def add
    burger = Burger.first
    if burger.nil?
      new = Burger.new(count: 1)
      new.save
      render json: 1
    else
      count = burger.count + 1
      burger.count = count
      burger.save
      render json: count
    end
  end

  def subtract
    burger = Burger.first
    if burger.nil?
      render json: 0
    else
      count = burger.count - 1
      burger.count = count
      burger.save
      render json: count
    end
  end
end
