<script setup lang="ts">
import type RoomModel from '~/models/room'
import type { Position } from '~/models/room'
import { RoomType, nextPosition } from '~/models/room'

const props = defineProps<{
  roomModel: RoomModel
}>()

const emits = defineEmits<{
  onDoor: [position: Position]
  onRoom: [room: RoomModel]
}>()

function createRoom(direction: 'up' | 'down' | 'left' | 'right') {
  emits('onDoor', nextPosition(props.roomModel.position, direction))
}

function handleClickRoom() {
  console.log(props.roomModel.adjacent)
  emits('onRoom', props.roomModel)
}
</script>

<template>
  <div relative h-240px w-360px rounded :bg="roomModel.type === RoomType.empty ? 'black' : 'blue'" @click="handleClickRoom">
    <div absolute left-170px top-8 text-6 font-bold text-white>
      {{ roomModel.id }}
    </div>
    <div v-if="roomModel.type !== RoomType.empty" h-full flex flex-col items-center justify-between>
      <div h-4 w-8 cursor-pointer bg-yellow transition-all duration-400 hover="bg-teal" @click="createRoom('up')" />
      <div w-62 flex justify-between>
        <div h-8 w-4 bg-yellow transition-all duration-400 hover="bg-teal" @click="createRoom('left')" />

        <div h-8 w-4 bg-yellow transition-all duration-400 hover="bg-teal" @click="createRoom('right')" />
      </div>
      <div h-4 w-8 bg-yellow transition-all duration-400 hover="bg-teal" @click="createRoom('down')" />
    </div>
  </div>
</template>
