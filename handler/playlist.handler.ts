import { Sort } from "../domain/repositories/playlist.repository"
import { PlaylistService } from "../service/playlist.service"
import { Request, Response } from "express"

type SongResponse<T = undefined> = {
  meta: {
    status: number
    message: string
  }
} & (T extends undefined ? {} : T)

export class PlaylistHandler {
  private playlistService: PlaylistService
  constructor(playlistService: PlaylistService) {
    this.playlistService = playlistService
  }

  public addSong = (
    req: Request<{}, {}, Pick<ISong, "title" | "artist" | "url">>,
    res: Response<SongResponse>
  ) => {
    try {
      const song = req.body
      this.playlistService.addSong(song)
      res.status(200).json({
        meta: {
          status: 200,
          message: "Musik berhasil ditambahkan",
        },
      })
    } catch (e) {
      res.status(500).json({
        meta: {
          status: 500,
          message: (e as Error).message,
        },
      })
    }
  }

  public playSong = (
    req: Request<{}, {}, Pick<ISong, "id">>,
    res: Response<SongResponse>
  ) => {
    try {
      const { id } = req.body
      this.playlistService.playSong(id)

      res.status(200).json({
        meta: {
          status: 200,
          message: "Musik berhasil diputar",
        },
      })
    } catch (e) {
      res.status(500).json({
        meta: {
          status: 500,
          message: (e as Error).message,
        },
      })
    }
  }

  public getAllSongs = (
    req: Request<{}, {}, {}, { sort: Sort }>,
    res: Response<SongResponse<{ data: ISong[] } | undefined>>
  ) => {
    try {
      const {
        sort: { by = "playing_count", order = "asc" },
      } = req.query
      const songs = this.playlistService.getAllSongs({ by, order })
      res.status(200).json({
        meta: {
          status: 200,
          message: "Berhasil mendapatkan semua musik",
        },
        data: songs,
      })
    } catch (e) {
      res.status(500).json({
        meta: {
          status: 500,
          message: (e as Error).message,
        },
      })
    }
  }

  public getPlayingSong = (
    req: Request,
    res: Response<SongResponse<{ data: ISong } | undefined>>
  ) => {
    try {
      const song = this.playlistService.getPlayingSong()

      res.status(200).json({
        meta: {
          status: 200,
          message: "Berhasil mendapatkan musik yang sedang diputar",
        },
        data: song,
      })
    } catch (e) {
      res.status(500).json({
        meta: {
          status: 500,
          message: (e as Error).message,
        },
      })
    }
  }
}
