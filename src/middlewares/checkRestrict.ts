import { ContextMessageUpdate } from 'telegraf'
import { globalyRestricted } from '../helpers/newcomers'

export async function checkRestrict(
  ctx: ContextMessageUpdate,
  next: () => any
) {
  if (!ctx.dbchat.restrict) {
    next()
    return
  }
  const restrictedUsers = ctx.dbchat.restrictedUsers
  const restricted =
    restrictedUsers.map(u => u.id).indexOf(ctx.from.id) > -1 ||
    globalyRestricted.indexOf(ctx.from.id) > -1
  if (
    restricted &&
    ctx.message &&
    ((ctx.message.entities && ctx.message.entities.length) ||
      (ctx.message.caption_entities && ctx.message.caption_entities.length) ||
      (ctx.message.forward_from ||
        ctx.message.forward_date ||
        ctx.message.forward_from_chat) ||
      ctx.message.document)
  ) {
    try {
      await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)
    } catch (err) {
      // Do nothing
    }
  } else {
    next()
  }
}
