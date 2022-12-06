class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre
  has_one :artist
  has_one :album
end
