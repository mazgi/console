export const getEndpointHttp = (): string => {
  if (process.browser) {
    return document
      .querySelector("meta[name='app-endpoint']")
      .getAttribute('data-bff-endpoint-graphql-http')
  } else {
    return process.env.BFF_ENDPOINT_GRAPHQL_HTTP
  }
}
