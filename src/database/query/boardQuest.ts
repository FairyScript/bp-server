import { $log } from '@tsed/common'
import { client } from '../instance'

export function queryBoardQuest(text: string, page: number, size: number) {
  const pipeline = [
    {
      $search: {
        index: 'texts_index',
        text: {
          query: text,
          path: 'text',
        },
      },
    },
    {
      $match: {
        type: 'master_adventure_board_quests_text',
      },
    },
    {
      $skip: size * (page - 1),
    },
    {
      $limit: size,
    },
    {
      $lookup: {
        from: 'master_adventure_board_quest',
        localField: 'id',
        foreignField: 'quest_name',
        as: 'quest',
      },
    },
    {
      $unwind: {
        path: '$quest',
      },
    },
    {
      $lookup: {
        from: 'master_adventure_board_panel',
        localField: 'quest.id',
        foreignField: '_id',
        as: 'panel',
      },
    },
    {
      $unwind: {
        path: '$panel',
      },
    },
    {
      $lookup: {
        from: 'master_adventure_board',
        localField: 'panel.board_id',
        foreignField: '_id',
        as: 'board',
      },
    },
    {
      $unwind: {
        path: '$board',
      },
    },
    {
      $lookup: {
        from: 'texts',
        localField: 'board.name',
        foreignField: 'id',
        as: 'board_name',
        pipeline: [
          {
            $match: {
              type: 'master_adventure_boards_text',
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: '$board_name',
      },
    },
    {
      $project: {
        board_id: '$board._id',
        board_name: '$board_name.text',
        panel_id: '$panel._id',
        quest_id: '$id',
        quest_name: '$text',
        lang: '$lang',
      },
    },
  ]
  $log.debug(pipeline)

  return client
    .db(process.env.DATABASE_NAME)
    .collection('texts')
    .aggregate(pipeline)
    .toArray()
}
