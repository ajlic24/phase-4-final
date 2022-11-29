class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre
end
