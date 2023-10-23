interface RoomModel {
  id: number
  name?: string
  position: Position
  type: RoomType
}

interface Position {
  x: number
  y: number
  layer: number
}

enum RoomType {
  empty, adjacent, event, omen,
}

export function createAdjacentRoom(roomList: RoomModel[], centerRoom: RoomModel) {
  const newRoomList: RoomModel[] = []
  const centerPosition = centerRoom.position
  const adjacentPositionList: Position[] = [
    { x: centerPosition.x, y: centerPosition.y - 1, layer: centerPosition.layer },
    { x: centerPosition.x, y: centerPosition.y + 1, layer: centerPosition.layer },
    { x: centerPosition.x - 1, y: centerPosition.y, layer: centerPosition.layer },
    { x: centerPosition.x + 1, y: centerPosition.y, layer: centerPosition.layer },
  ]
  adjacentPositionList.forEach((position) => {
    const room = roomList.find((room) => {
      return room.position.x === position.x && room.position.y === position.y
    })
    if (!room) {
      newRoomList.push({
        id: roomList.length + newRoomList.length,
        position,
        type: RoomType.adjacent,
      })
    }
  })

  return newRoomList
}

export { RoomType }
export type { RoomModel, Position }
