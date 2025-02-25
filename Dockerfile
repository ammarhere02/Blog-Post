FROM node:20

LABEL authors="Ammar Khan"

COPY package.json package-lock.json ./

RUN npm install -g npm@latest


# Copy the rest of the app files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Compile TypeScript
RUN npx tsc

# Start the application
CMD ["npx", "ts-node", "main.ts"]
