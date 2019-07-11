require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  it 'should have 200 statis code' do
    User.create
    post :create
    expect(response.status).to eq(200)
  end
end
