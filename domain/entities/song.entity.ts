export interface ISong {
  id: string
  title: string
  artist: string
  url: string
  is_playing: boolean
  playing_count: number
}

export class Song {
  public id: ISong["id"]
  public title: ISong["title"]
  public artist: ISong["artist"]
  public url: ISong["url"]
  public is_playing: ISong["is_playing"]
  public playing_count: ISong["playing_count"]

  constructor(song: ISong) {
    this.id = song.id
    this.title = song.title
    this.artist = song.artist
    this.url = song.url
    this.is_playing = song.is_playing
    this.playing_count = song.playing_count
  }
}
