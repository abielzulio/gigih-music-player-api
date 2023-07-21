import { ISong } from "../entities/song.entity"

export type SortBy = "playing_count"
export type SortOrder = "asc" | "desc"
export type Sort = { by: SortBy; order: SortOrder }

export class PlaylistRepository {
  public playlist: ISong[] = []

  public addSong(song: ISong): void {
    this.playlist.push(song)
  }

  public playSong(id: ISong["id"]): void {
    this.playlist.forEach((song) => {
      if (song.id === id) {
        song.is_playing = true
        song.playing_count += 1
      } else {
        song.is_playing = false
      }
    })
  }

  public getAllSongs(sort: Sort): ISong[] {
    if (sort.by === "playing_count") {
      return this.playlist.sort((a, b) => {
        if (sort.order === "asc") {
          return a.playing_count - b.playing_count
        } else {
          return b.playing_count - a.playing_count
        }
      })
    }
    return this.playlist
  }

  public getPlayingSong(): ISong | undefined {
    return this.playlist.find((song) => song.is_playing)
  }

  public getSongById(id: ISong["id"]): ISong | undefined {
    return this.playlist.find((song) => song.id === id)
  }
}
