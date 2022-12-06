class ChangeSongsDetails < ActiveRecord::Migration[6.1]
  def change
    change_column_null :songs, :artist_id, true
    change_column_null :songs, :album_id, true
  end
end
