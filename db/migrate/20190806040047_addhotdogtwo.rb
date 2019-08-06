class Addhotdogtwo < ActiveRecord::Migration[5.2]
  def change
    create_table :hotdogs do |t|
      t.integer :count
      t.timestamps
    end

    create_table :burgers do |t|
      t.integer :count
      t.timestamps
    end
  end
end
