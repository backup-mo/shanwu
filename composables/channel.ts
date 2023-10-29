import { createClient } from '@supabase/supabase-js'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Position } from '~/models/room'

export interface PlayerState {
  strength: number
  agility: number
  intelligence: number
  willpower: number
}

export const useChannelStore = defineStore('channel', () => {
  // const supabaseUrl = 'https://suytialgkblkvsfqhlfw.supabase.co'
  // const config = useRuntimeConfig()
  // const supabase = createClient(supabaseUrl, config.public.supabaseKey)

  const players = ref<any[]>(
    [
      {
        id: 1,
        created_at: '2023-10-22T20:17:58.310621+00:00',
        user_id: '950deb85-3130-4c30-9a8c-2f05a49da17b',
        position: {
          x: 0,
          y: 0,
          layer: 1,
        },
      },
      // {
      //   id: 2,
      //   created_at: '2023-10-22T20:18:19.375709+00:00',
      //   user_id: '8e05659d-11b0-4645-9353-9d64cae120f5',
      //   position: {
      //     x: 1,
      //     y: 0,
      //     layer: 3,
      //   },
      // },
    ],
  )

  const playerStates = ref<PlayerState[]>([{
    strength: 3,
    agility: 5,
    intelligence: 2,
    willpower: 2,
  }])

  // supabase
  //   .channel('room1')
  //   .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'shanwu' }, (payload) => {
  //     console.log('Change received!', payload)
  //     players.value = players.value.map((player) => {
  //       if (player.id === payload.old.id)
  //         return payload.new

  //       return player
  //     })
  //   })
  //   .subscribe()

  function updatePlayerPosition(id: number, position: Position) {
    players.value = players.value.map((p) => {
      if (p.id === id)
        return { ...p, position }

      return p
    })
  }

  return {
    players,
    playerStates,
    updatePlayerPosition,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChannelStore, import.meta.hot))
