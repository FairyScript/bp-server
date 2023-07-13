import { client } from './mongoInstance'
import boardQuest from './query/boardQuest'

//根据任务名查板子
export interface BoardQuestItem {
  quest_id: number
  quest_name: string
  lang: string
  board_id: number
  board_name: string
  panel_id: number
}

export async function queryBoardQuests(
  text: string,
  pageIndex = 0,
  pageSize = 10
) {
  const pipeline = Array.from(boardQuest)
  //@ts-expect-errory
  pipeline[0].$search.text.query = text
  pipeline[2].$skip = pageIndex * pageSize
  pipeline[3].$limit = pageSize

  const cursor = client.db('bp').collection('texts').aggregate(pipeline)

  return await cursor.toArray()
}
