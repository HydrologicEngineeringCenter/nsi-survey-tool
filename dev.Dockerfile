FROM node:17-alpine3.12

# new openssl provider does not support launching dev environment
# need to include the following env var in container:
# NODE_OPTIONS=--openssl-legacy-provider
