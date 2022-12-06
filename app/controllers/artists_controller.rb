class ArtistsController < ApplicationController

    def index
        render json: Artist.all, status: :ok
    end

    def destroy
        artist = Artist.find_by(id: params[:id])
        render json: artist.delete, status: :ok
    end

    def create
        artist = Artist.create(artist_params)
        if artist.valid?
            render json: artist, status: :created
        else
            render json: {errors: artist.errors.full_messages}, status: :unprocessable_entity            
        end
    end

    private

    def artist_params
        params.permit(:name)
    end
end
