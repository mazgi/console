export const getEndpointWebSocket = (): string => {
  if (process.browser) {
    return document
      .querySelector("meta[name='app-endpoint']")
      .getAttribute('data-bff-endpoint-graphql-websocket')
  } else {
    return process.env.BFF_ENDPOINT_GRAPHQL_WEBSOCKET
  }
}
