export const getEndpoint = (): string => {
  if (process.browser) {
    return document
      .querySelector("meta[name='app-endpoint']")
      .getAttribute('data-bff-endpoint-url')
  } else {
    return process.env.BFF_ENDPOINT_URL
  }
}
