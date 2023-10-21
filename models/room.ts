interface RoomModel {
  id: number
  name?: string
  position: Position
  type: RoomType
  adjacent: { [nodeId: number]: number }
}

interface Position {
  x: number
  y: number
  layer: number
}

enum RoomType {
  empty, event, omen,
}

function nextPosition(position: Position, direction: 'up' | 'down' | 'left' | 'right') {
  switch (direction) {
    case 'up':
      return {
        x: position.x,
        y: position.y - 1,
        layer: position.layer,
      }
    case 'down':
      return {
        x: position.x,
        y: position.y + 1,
        layer: position.layer,
      }
    case 'left':
      return {
        x: position.x - 1,
        y: position.y,
        layer: position.layer,
      }
    case 'right':
      return {
        x: position.x + 1,
        y: position.y,
        layer: position.layer,
      }
  }
}

function surroundings(position: Position) {
  return [
    nextPosition(position, 'up'),
    nextPosition(position, 'down'),
    nextPosition(position, 'left'),
    nextPosition(position, 'right'),
  ]
}

function dijkstra(graph: RoomModel[], startNodeId: number, endNodeId: number) {
  const distances: { [nodeId: number]: number } = {}
  const previous: { [nodeId: number]: number | null } = {}

  graph.forEach((node) => {
    distances[node.id] = Number.POSITIVE_INFINITY
    previous[node.id] = null
  })

  distances[startNodeId] = 0

  const unvisited = new Set(graph.map(node => node.id))

  while (unvisited.size > 0) {
    let currentNodeId = -1
    let currentDistance = Number.POSITIVE_INFINITY

    for (const nodeId of unvisited) {
      if (distances[nodeId] < currentDistance) {
        currentDistance = distances[nodeId]
        currentNodeId = nodeId
      }
    }

    if (currentNodeId === -1)
      break

    unvisited.delete(currentNodeId)

    const currentNode = graph.find(node => node.id === currentNodeId)
    for (const [adjacentNodeId, distance] of Object.entries(currentNode!.adjacent)) {
      const newDistance = currentDistance + distance
      if (newDistance < distances[Number(adjacentNodeId)]) {
        distances[Number(adjacentNodeId)] = newDistance
        previous[Number(adjacentNodeId)] = currentNodeId
      }
    }
  }

  // 构建最短路径
  const shortestPath = []
  let currentNodeId = endNodeId
  while (previous[currentNodeId]) {
    shortestPath.unshift(currentNodeId)
    currentNodeId = previous[currentNodeId]!
  }
  shortestPath.unshift(startNodeId)

  return {
    distance: distances[endNodeId],
    path: shortestPath,
  }
}

export default RoomModel
export type { Position }
export { RoomType, nextPosition, surroundings, dijkstra }
