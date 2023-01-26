class AlbumsController < ApplicationController

    def index
        render json: Album.all, status: :ok
    end

    def destroy
        album = Album.find_by(id: params[:id])
        render json: album.delete, status: :no_content
    end

    def create
        album = Album.create(album_params)
        if album.valid?
            render json: album, status: :created
        else
            render json: {errors: album.errors.full_messages}, status: :unprocessable_entity            
        end
    end

    private

    def album_params
        params.permit(:name, :release_year)
    end
end
