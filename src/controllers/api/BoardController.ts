import { Controller } from '@tsed/di'
import { Default, Description, Get, Required } from '@tsed/schema'
import { QueryParams } from '@tsed/platform-params'
import { queryBoardQuest } from 'src/database/query/boardQuest'
import { $log } from '@tsed/common'
import { BadRequest } from '@tsed/exceptions'

@Controller('/board')
export class BoardController {
  @Get('/quest')
  async get(
    @Description('关键词')
    @QueryParams('q')
    @Required(true)
    q: string,
    @Description('页码')
    @QueryParams('page')
    @Default(1)
    page: number,
    @Description('页面大小')
    @QueryParams('size')
    @Default(10)
    size: number
  ) {
    try {
      const kw = decodeURIComponent(q.trim() || '')
      const p = page ?? 1
      const s = size ?? 10
      return await queryBoardQuest(kw, p, s)
    } catch (error) {
      $log.error(error)
      throw new BadRequest(error)
    }
  }
}
