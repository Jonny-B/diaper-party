class Addhotdog < ActiveRecord::Migration[5.2]
  def change
    create_table :hotdog do |t|
      t.integer :count
      t.timestamps
    end

    create_table :burger do |t|
      t.integer :count
      t.timestamps
    end
  end
end
