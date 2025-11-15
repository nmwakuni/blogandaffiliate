#!/bin/bash

# Create directory structure
mkdir -p apps/web/src/{app,components,lib,types}
mkdir -p apps/web/src/app/{blog,api,admin}
mkdir -p apps/web/src/app/blog/[slug]
mkdir -p apps/web/src/components/{ui,blog}
mkdir -p apps/web/public

mkdir -p apps/api/src/{routes,services,middleware,db}
mkdir -p apps/api/drizzle/migrations

mkdir -p packages/types/src
mkdir -p packages/db/src
mkdir -p packages/db/drizzle/migrations
mkdir -p packages/utils/src

mkdir -p scripts

# Create placeholder files
touch apps/web/src/app/layout.tsx
touch apps/web/src/app/page.tsx
touch apps/api/src/index.ts
touch packages/types/src/index.ts
touch packages/db/src/index.ts
touch packages/utils/src/index.ts

echo "Structure created successfully!"
