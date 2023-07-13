const pipeline = [
  {
    $search: {
      index: 'texts_index',
      text: {
        query: 'メリソス 採取する',
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
    $skip: 0,
  },
  {
    $limit: 10,
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

export default pipeline
