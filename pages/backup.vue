<script setup lang="ts">
import Room from '~/components/room/Room.vue'
import type { Position } from '~/models/room'
import { RoomType, dijkstra, surroundings } from '~/models/room'
import type RoomModel from '~/models/room'

// const online = useOnline()

const roomList = ref<RoomModel[]>([
  {
    id: 0,
    name: 'Room 0',
    type: RoomType.event,
    position: {
      x: 0,
      y: 1,
      layer: 0,
    },
    adjacent: {
      1: 1,

    },
  },
  {
    id: 1,
    name: 'Room 1',
    type: RoomType.event,
    position: {
      x: 1,
      y: 1,
      layer: 0,
    },
    adjacent: {
      0: 1,
      2: 1,
      3: 1,
      4: 1,
    },
  },
  {
    id: 2,
    name: 'Room 2',
    type: RoomType.empty,
    position: {
      x: 1,
      y: 0,
      layer: 0,
    },
    adjacent: {
      1: 1,
    },
  },
  {
    id: 3,
    name: 'Room 3',
    type: RoomType.empty,
    position: {
      x: 1,
      y: 2,
      layer: 0,
    },
    adjacent: {
      1: 1,
    },
  },
  {
    id: 4,
    name: 'Room 4',
    type: RoomType.empty,
    position: {
      x: 2,
      y: 1,
      layer: 0,
    },
    adjacent: {
      1: 1,
    },
  },
])

const columns = computed(() => {
  const temp = roomList.value.map(room => room.position.x)
  return [...new Set(temp)].sort((a, b) => a - b)
})

const rows = computed(() => {
  const temp = roomList.value.map(room => room.position.y)
  return [...new Set(temp)].sort((a, b) => a - b)
})

function getCurrentColumnRooms(col: number) {
  const temp = roomList.value.filter(room => room.position.x === col).sort((a, b) => a.position.y - b.position.y)
  if (temp.length < rows.value.length) {
    rows.value.forEach((row) => {
      if (temp.findIndex(room => room.position.y === row) === -1) {
        temp.push({
          id: temp.length,
          name: 'Room temp',
          type: RoomType.empty,
          position: {
            x: col,
            y: row,
            layer: 0,
          },
          adjacent: {},
        })
      }
    })
  }
  return temp.sort((a, b) => a.position.y - b.position.y)
}

function createRoom(position: Position) {
  const index = roomList.value.findIndex(room => room.position.x === position.x && room.position.y === position.y)
  if (index !== -1) {
    // change empty room to event room
    roomList.value[index] = {
      ...roomList.value[index],
      type: RoomType.event,
    }
    // create new empty room
    surroundings(position).forEach((p) => {
      if (roomList.value.findIndex(room => room.position.x === p.x && room.position.y === p.y) === -1) {
        roomList.value.push({
          id: roomList.value.length,
          name: `Room ${roomList.value.length}`,
          type: RoomType.empty,
          position: p,
          adjacent: {},
        })
      }
    })
    // update adjacent
    roomList.value.forEach((room) => {
      surroundings(room.position).forEach((p) => {
        const index = roomList.value.findIndex(r => r.position.x === p.x && r.position.y === p.y)
        if (index !== -1)
          room.adjacent[roomList.value[index].id] = 1
      })
    })
  }
}
function handleOnDoor(position: Position) {
  createRoom(position)
}

function handleOnRoom(room: RoomModel) {
  console.log(dijkstra(roomList.value.filter(room => room.type !== RoomType.empty), 0, room.id))
}
</script>

<template>
  <div>cols:{{ columns.length }}</div>
  <div>rows:{{ rows.length }}</div>
  <div flex items-start justify-start bg-pink :style="{ width: `${columns.length * 360}px` }">
    <div v-for="col in columns" :key="col">
      <Room v-for="room in getCurrentColumnRooms(col)" :key="room.id" :room-model="room" @on-door="handleOnDoor" @on-room="handleOnRoom" />
    </div>
    <!-- <div v-for="room in roomList" :key="room.id" absolute :style="{ left: `${room.position.x * 360}px`, top: `${room.position.y * 240}px` }">
      <Room :room-model="room" @on-door="handleOnDoor" @on-room="handleOnRoom" />
    </div> -->
  </div>
</template>
