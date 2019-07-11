require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  it 'should show user when valid authtoken' do
    User.create
    post :show
    expect(response.status).to eq(200)
    expect(response.body).to eq("unauthorized")
  end
end
