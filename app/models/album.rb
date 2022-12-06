class Album < ApplicationRecord
    has_many :songs
    has_many :artists, through: :songs

    validates :name, presence: true, uniqueness: true
    validates :release_year, presence: true
end
