FROM node:22

# Create base directory
WORKDIR /app

# Install corepack
RUN npm install -g corepack

# Copy files
COPY . .

# Install and run yarn
RUN corepack enable && corepack prepare yarn@4.9.1 --activate && yarn

# Create SQLITE DB
RUN yarn init-db

# Dynamic environment generation at container start
CMD sh -c "echo \"MANGADEX_LIST_ID=$MANGADEX_LIST_ID\" > .env && \
           echo \"WEBHOOK_URL=$WEBHOOK_URL\" >> .env && \
           yarn dev"
