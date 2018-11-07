import { Chat } from '../models'
import * as tt from '../../node_modules/telegraf/typings/telegram-types.d'

declare module 'Telegraf' {
  export class ContextMessageUpdate {
    public dbchat: Chat
    replyWithMarkdown(
      markdown: string,
      extra?: tt.ExtraEditMessage | Extra
    ): Promise<tt.Message>
  }
  export interface Composer<TContext extends ContextMessageUpdate> {
    action(
      action: string | string[],
      middleware: Middleware<TContext>,
      ...middlewares: Array<Middleware<TContext>>
    ): Composer<TContext>
  }
}
