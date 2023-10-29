<script setup lang="ts">
import { RoomType } from '~/models/room'
import type { RoomModel } from '~/models/room'

const props = defineProps<{
  roomModel: RoomModel
  pathList: RoomModel[]
}>()

const emit = defineEmits<{
  handleAdjacentRoom: [id: number]
  handleMove: [id: number]
  handlePath: [id: number]
  clearPath: []
}>()

function handleClick() {
  if (props.roomModel.type === RoomType.adjacent)
    emit('handleAdjacentRoom', props.roomModel.id)
  if (props.roomModel.type === RoomType.event)
    emit('handleMove', props.roomModel.id)
}
function handleHover() {
  if (props.roomModel.type === RoomType.event)
    emit('handlePath', props.roomModel.id)
}
function handleLeave() {
  emit('clearPath')
}
</script>

<template>
  <div
    v-if="props.roomModel.type === RoomType.event"
    absolute size-34 center hover="opacity-50"
    :class="{
      'bg-amber': props.pathList.includes(props.roomModel),
    }"
    :style="{ left: `${props.roomModel.position.x * 8.5}rem`, top: `${props.roomModel.position.y * 8.5}rem` }"
    @mouseenter="handleHover"
    @mouseleave="handleLeave"
    @click="handleClick"
  >
    <img
      size-32
      src="/room.svg"
    >
  </div>
  <div
    v-if="props.roomModel.type === RoomType.adjacent" absolute
    size-34 bg-red :style="{ left: `${props.roomModel.position.x * 8.5}rem`, top: `${props.roomModel.position.y * 8.5}rem` }"
    @click="handleClick"
  >
    {{ props.roomModel.id }}
  </div>
  <div
    v-if="props.roomModel.type === RoomType.empty"
    absolute size-34 bg-black
    :style="{ left: `${props.roomModel.position.x * 8.5}rem`, top: `${props.roomModel.position.y * 8.5}rem` }"
  />
</template>
