import { getUserId, Context } from '../utils'
import { forwardTo } from 'prisma-binding'

export const Query = {
  // products: forwardTo('prisma'),
  // TODO: forwardTo is looking for prisma.query.products
  products(parent, { where, skip, last, first }, ctx) {
    return ctx.prisma.products({ where, skip, last, first })
  },

  feed(parent, args, ctx: Context) {
    return ctx.prisma.posts({ where: { published: true } })
  },

  drafts(parent, args, ctx: Context) {
    const id = getUserId(ctx)

    const where = {
      published: false,
      author: {
        id,
      },
    }

    return ctx.prisma.posts({ where })
  },

  post(parent, { id }, ctx: Context) {
    return ctx.prisma.post({ id })
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx)
    return ctx.prisma.user({ id })
  },
}
