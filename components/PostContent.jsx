import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import useBioRead from '../hooks/useBioRead';
import { useState } from 'react';
import { useCallback } from 'react';

const MDViewer = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);
const mermaid = dynamic(() => import('mermaid'), { ssr: false });

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);
const Code = ({ inline, children = [], className, ...props }) => {
  const demoid = useRef(`dome${randomid()}`);
  const code = getCode(children);
  const demo = useRef(null);

  function getCode(arr = []) {
    return arr
      .map((dt) => {
        if (typeof dt === 'string') {
          return dt;
        }
        if (dt.props && dt.props.children) {
          return getCode(dt.props.children);
        }
        return false;
      })
      .filter(Boolean)
      .join('');
  }

  useEffect(() => {
    if (demo.current) {
      try {
        const str = mermaid.render(demoid.current, code, () => null, demo.current);
        // @ts-ignore
        demo.current.innerHTML = str;
      } catch (error) {
        // @ts-ignore
        demo.current.innerHTML = error;
      }
    }
  }, [code, demo]);

  if (
    typeof code === 'string' &&
    typeof className === 'string' &&
    /^language-mermaid/.test(className.toLocaleLowerCase())
  ) {
    return (
      <code ref={demo}>
        <code id={demoid.current} style={{ display: 'none' }} />
      </code>
    );
  }
  return <code className={String(className)}>{children}</code>;
};

const PostContent = (props) => {
  const [content, setContent] = useState(props.content);
  const { getText, isBio, toggleIsBio } = useBioRead(props.content);

  const getContent = useCallback(async () => {
    let localContent = await getText(isBio);
    setContent(localContent);
  }, [isBio]);

  useEffect(() => {
    getContent();
  }, [isBio]);

  return (
    <div className='container' data-color-mode='light'>
      <button onClick={toggleIsBio}>Read Faster!</button>
      <MDViewer
        previewOptions={{
          components: {
            code: Code,
          },
          rehypePlugins: [[rehypeSanitize]],
        }}
        source={content}
      />
    </div>
  );
};

export default PostContent;
