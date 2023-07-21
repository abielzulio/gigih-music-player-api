import express, { Express, Request, Response } from "express"
import {
  PlaylistRepository,
  Sort,
} from "./domain/repositories/playlist.repository"
import { PlaylistService } from "./service/playlist.service"
import { PlaylistHandler, SongResponse } from "./handler/playlist.handler"
import { ISong } from "./domain/entities/song.entity"

const app: Express = express()
const port = 4000

const playlistRepository: PlaylistRepository = new PlaylistRepository()
const playlistService: PlaylistService = new PlaylistService(playlistRepository)
const playlistHandler: PlaylistHandler = new PlaylistHandler(playlistService)

app.use(express.json())

app.get("/song", (req: Request<{}, {}, {}, Sort>, res: Response) => {
  playlistHandler.getAllSongs(req, res)
})

app.post(
  "/song",
  (
    req: Request<{}, {}, Pick<ISong, "title" | "artist" | "url">>,
    res: Response<SongResponse>
  ) => playlistHandler.addSong(req, res)
)

app.get(
  "/song/playing",
  (req: Request, res: Response<SongResponse<{ data: ISong } | undefined>>) =>
    playlistHandler.getPlayingSong(req, res)
)

app.post(
  "/song/playing/:id",
  (req: Request<Pick<ISong, "id">, {}, {}>, res: Response) => {
    playlistHandler.playSong(req, res)
  }
)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
