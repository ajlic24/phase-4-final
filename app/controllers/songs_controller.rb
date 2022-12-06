class SongsController < ApplicationController

    def index
        render json: Song.all, status: :ok    
    end

    def reset
        render json: Song.all.map(&:destroy), status: :ok
    end

    def destroy
        song = Song.find_by(id: params[:id])
        render json: song.delete, status: :ok
    end

    def create
        song = Song.new(title: songs_params[:title], genre: songs_params[:genre])
        artist = Artist.find_by(name: songs_params[:artist][:name])
        album = Album.find_by(name: songs_params[:album][:name])
        
        if artist
            song.artist_id = artist.id
        else
            song.create_artist(songs_params[:artist])
        end

        if album
            song.album_id = album.id
        else
            song.create_album(songs_params[:album])
        end

        if song.valid?
            song.save
            render json: song, status: :created
        else
            render json: {errors: song.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def songs_params
        params.permit(:title, :genre, {artist: [:name]}, {album: [:name, :release_year]})
    end

end
