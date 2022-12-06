class ChangeAlbumsTable < ActiveRecord::Migration[6.1]
  def change
    change_table :albums do |t|
      t.remove :release_date
      t.integer :release_year
    end
  end
end
