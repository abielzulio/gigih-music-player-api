import { nanoid } from "nanoid"
import { ISong, Song } from "../domain/entities/song.entity"
import {
  PlaylistRepository,
  Sort,
} from "../domain/repositories/playlist.repository"

export class PlaylistService {
  private playlistRepository: PlaylistRepository

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository
  }

  public addSong(
    song: Pick<ISong, "artist" | "title" | "url">
  ): ReturnType<PlaylistRepository["addSong"]> {
    const newSong = new Song({
      ...song,
      id: nanoid(),
      is_playing: false,
      playing_count: 0,
    })

    this.playlistRepository.addSong(newSong)
  }

  public playSong(id: Song["id"]): ReturnType<PlaylistRepository["playSong"]> {
    const song = this.playlistRepository.getSongById(id)
    if (song) {
      this.playlistRepository.playSong(id)
    }
  }

  public getPlayingSong(): ReturnType<PlaylistRepository["getPlayingSong"]> {
    return this.playlistRepository.getPlayingSong()
  }

  public getAllSongs(
    sort: Sort
  ): ReturnType<PlaylistRepository["getAllSongs"]> {
    return this.playlistRepository.getAllSongs(sort)
  }
}
