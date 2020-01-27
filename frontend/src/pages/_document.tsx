// Next.js Custom Document
// See https://nextjs.org/docs/advanced-features/custom-document

import NextDocument, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

class Document extends NextDocument {
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta
            name="app-endpoint"
            content=""
            data-bff-endpoint-url={process.env.BFF_ENDPOINT_URL}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
