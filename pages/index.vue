<script setup lang="ts">
import { type RoomModel, RoomType, createAdjacentRoom } from '~/models/room'

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
</script>

<template>
  <div min-h-200vh min-w-200vw center>
    <div relative size-px>
      <div absolute relative z-8>
        <RoomPlayer v-for="(player, index) in channelStore.players" :key="index" :player-model="player" />
      </div>
      <div absolute relative>
        <Room v-for="(room, index) in roomList" :key="index" :room-model="room" @handle-adjacent-room="handleAdjacentRoom" />
      </div>
    </div>
  </div>
</template>
