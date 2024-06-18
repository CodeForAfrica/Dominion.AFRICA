# Install dependencies only when needed
FROM node:20.14-alpine as node-alpine

# Always install security updated e.g. https://pythonspeed.com/articles/security-updates-in-docker/
# Update local cache so that other stages don't need to update cache
RUN apk update \
    && apk upgrade \
    # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
    && apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

FROM node-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node-alpine AS runner

ENV NODE_ENV production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/src/data ./src/data

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
