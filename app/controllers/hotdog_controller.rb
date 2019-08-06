class HotdogController < ApplicationController
  def add
    hotdog = Hotdog.first
    if hotdog.nil?
      new = Hotdog.new(count: 1)
      new.save
      render json: 1
    else
      count = hotdog.count + 1
      hotdog.count = count
      hotdog.save
      render json: count
    end
  end

  def subtract
    hotdog = Hotdog.first
    if hotdog.nil?
      render json: 0
    else
      count = hotdog.count - 1
      hotdog.count = count
      hotdog.save
      render json: count
    end
  end

  def count
    hotdog = Hotdog.first
    burger = Burger.first

    render json: [hotdog.count, burger.count]
  end
end
