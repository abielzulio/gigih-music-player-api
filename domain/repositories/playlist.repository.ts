export type SortBy = "playing_count"
export type SortOrder = "asc" | "desc"
export type Sort = { by: SortBy; order: SortOrder }

export class PlaylistRepository {
  public playlist: Song[] = []

  public addSong(song: Song): void {
    this.playlist.push(song)
  }

  public playSong(id: Song["id"]): void {
    this.playlist.forEach((song) => {
      if (song.id === id) {
        song.is_playing = true
        song.playing_count += 1
      } else {
        song.is_playing = false
      }
    })
  }

  public getAllSongs(sort: Sort): Song[] {
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

  public getPlayingSong(): Song | undefined {
    return this.playlist.find((song) => song.is_playing)
  }

  public getSongById(id: Song["id"]): Song | undefined {
    return this.playlist.find((song) => song.id === id)
  }
}
