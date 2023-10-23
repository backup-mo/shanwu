import type { Position } from './room'

interface PlayerModel {
  id: number
  name?: string
  position: Position
}

export type { PlayerModel }
