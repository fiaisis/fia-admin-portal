FROM node:23-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /application

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /application
COPY --from=deps /application/node_modules ./node_modules
COPY --from=deps /application/package.json ./
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /application

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /application/public ./public
COPY --from=builder /application/package.json ./

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /application/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /application/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

# to run the container indefinitely 
# CMD tail -f /dev/null
CMD HOSTNAME="0.0.0.0" node server.js