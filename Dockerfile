FROM node:22

# Create base directory
WORKDIR /app

# Install corepack
RUN npm install -g corepack

# Move project setup dependencies
COPY package.json yarn.lock .yarnrc.yml .pnp.* ./

# Install and run yarn
RUN yarn -y

# Copy remaining
COPY . .

# Create SQLITE DB
RUN yarn init-db

# Dynamic environment generation at container start
CMD sh -c "echo \"MANGADEX_LIST_ID=$MANGADEX_LIST_ID\" > .env && \
           echo \"WEBHOOK_URL=$WEBHOOK_URL\" >> .env && \
           yarn dev"
