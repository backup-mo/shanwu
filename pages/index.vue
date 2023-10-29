<script setup lang="ts">
import { type Position, type RoomModel, RoomType, createAdjacentRoom } from '~/models/room'

const channelStore = useChannelStore()
const roomList = ref<RoomModel[]>([
  {
    id: 0,
    name: 'Room 0',
    type: RoomType.event,
    position: {
      x: 0,
      y: 0,
      layer: 0,
    },
  },
])
const pathList = ref<RoomModel[]>([])

onMounted(() => {
  const newRoomList = createAdjacentRoom(roomList.value, roomList.value[0])
  roomList.value = [...roomList.value, ...newRoomList]
})

function handleAdjacentRoom(id: number) {
  const newRoomList = createAdjacentRoom(roomList.value, roomList.value.find(room => room.id === id)!)
  roomList.value = [...roomList.value, ...newRoomList]
  roomList.value = roomList.value.map((room) => {
    if (room.id === id) {
      return {
        ...room,
        type: RoomType.event,
      }
    }
    return room
  })
}

function handleMove(id: number) {
  channelStore.updatePlayerPosition(1, roomList.value.find(room => room.id === id)!.position)
}

function clearPath() {
  pathList.value = []
}

function handlePath(id: number) {
  const tailRoom = roomList.value.find(room => room.id === id)!
  const playerRoom = roomList.value.find(room => (room.position.x === channelStore.players[0].position.x && room.position.y === channelStore.players[0].position.y))!
  const path = findShortPath(playerRoom, tailRoom)
  pathList.value = path
}

function findShortPath(headRoom: RoomModel, tailRoom: RoomModel) {
  const path = [headRoom]
  let tempRoom = headRoom
  while (tempRoom.id !== tailRoom.id) {
    if (tempRoom.position.x < tailRoom.position.x) {
      const findRoom = roomList.value.find(room => (room.position.x === tempRoom.position.x + 1 && room.position.y === tempRoom.position.y && room.position.layer === tempRoom.position.layer && room.type === RoomType.event))
      if (findRoom) {
        tempRoom = findRoom
        path.push(tempRoom)
        continue
      }
      if (tempRoom.position.y < tailRoom.position.y) {
        const findRoom = roomList.value.find(room => (room.position.x === tempRoom.position.x && room.position.y === tempRoom.position.y + 1 && room.position.layer === tempRoom.position.layer && room.type === RoomType.event))
        if (findRoom) {
          tempRoom = findRoom
          path.push(tempRoom)
          continue
        }
      }
      if (tempRoom.position.y > tailRoom.position.y) {
        const findRoom = roomList.value.find(room => (room.position.x === tempRoom.position.x && room.position.y === tempRoom.position.y - 1 && room.position.layer === tempRoom.position.layer && room.type === RoomType.event))
        if (findRoom) {
          tempRoom = findRoom
          path.push(tempRoom)
          continue
        }
      }
    }
    if (tempRoom.position.x > tailRoom.position.x) {
      const findRoom = roomList.value.find(room => (room.position.x === tempRoom.position.x - 1 && room.position.y === tempRoom.position.y && room.position.layer === tempRoom.position.layer && room.type === RoomType.event))
      if (findRoom) {
        tempRoom = findRoom
        path.push(tempRoom)
        continue
      }
      if (tempRoom.position.y < tailRoom.position.y) {
        const findRoom = roomList.value.find(room => (room.position.x === tempRoom.position.x && room.position.y === tempRoom.position.y + 1 && room.position.layer === tempRoom.position.layer && room.type === RoomType.event))
        if (findRoom) {
          tempRoom = findRoom
          path.push(tempRoom)
          continue
        }
      }
      if (tempRoom.position.y > tailRoom.position.y) {
        const findRoom = roomList.value.find(room => (room.position.x === tempRoom.position.x && room.position.y === tempRoom.position.y - 1 && room.position.layer === tempRoom.position.layer && room.type === RoomType.event))
        if (findRoom) {
          tempRoom = findRoom
          path.push(tempRoom)
          continue
        }
      }
    }
    if (tempRoom.position.x === tailRoom.position.x) {
      if (tempRoom.position.y < tailRoom.position.y) {
        const findRoom = roomList.value.find(room => (room.position.x === tempRoom.position.x && room.position.y === tempRoom.position.y + 1 && room.position.layer === tempRoom.position.layer && room.type === RoomType.event))
        if (findRoom) {
          tempRoom = findRoom
          path.push(tempRoom)
          continue
        }
      }
      if (tempRoom.position.y > tailRoom.position.y) {
        const findRoom = roomList.value.find(room => (room.position.x === tempRoom.position.x && room.position.y === tempRoom.position.y - 1 && room.position.layer === tempRoom.position.layer && room.type === RoomType.event))
        if (findRoom) {
          tempRoom = findRoom
          path.push(tempRoom)
          continue
        }
      }
    }
  }
  return path
}
</script>

<template>
  <div min-h-200vh min-w-200vw center>
    <div relative size-px>
      <div absolute relative z-8>
        <RoomPlayer v-for="(player, index) in channelStore.players" :key="index" :player-model="player" />
      </div>
      <div absolute relative>
        <Room v-for="(room, index) in roomList" :key="index" :room-model="room" :path-list="pathList" @handle-adjacent-room="handleAdjacentRoom" @handle-move="handleMove" @handle-path="handlePath" @clear-path="clearPath" />
      </div>
    </div>
  </div>
</template>
