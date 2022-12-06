class Song < ApplicationRecord
  belongs_to :artist
  belongs_to :album

  validates :title, presence: true, uniqueness: true
  validates :genre, presence: true

end
