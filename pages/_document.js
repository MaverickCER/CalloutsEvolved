import Document, { Head, Html, Main, NextScript } from 'next/document';

import { getCsp } from '../utils/csp';
import { getLangFromReq } from '../utils/fromReq';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const lang = getLangFromReq(ctx.req);
    return { ...initialProps, lang };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <meta
            name="Description"
            content="An Augmentative and Alternative Communication (AAC) interface for gamers."></meta>
          <meta name="theme-color" content="#003DA5" />
          <meta name="referrer" content={'strict-origin'} />
          <meta
            httpEquiv="Content-Security-Policy"
            content={getCsp(NextScript.getInlineScriptSource(this.props))}
          />

          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
