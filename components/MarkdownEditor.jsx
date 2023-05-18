import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
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

const mdMermaid = `The following are some examples of the diagrams, charts, and graphs that can be made using Mermaid and the Markdown-inspired text specific to it. You can see more about how to take advantage of this powerful tool by going here: https://mermaid.js.org/intro/n00b-syntaxReference.html 

Tournament Brackets
\`\`\`mermaid
flowchart LR
a --> b
a --> c
b --> d
b --> e
c --> f
c --> g
d --> h
d --> i
e --> j
e --> k
f --> l
f --> m
g --> n
g --> o
h --> p
h --> q
i --> r
i --> s
j --> t
j --> u
k --> v
k --> w
l --> x
l --> y
m --> z
m --> aa
n --> ab
n --> ac
o --> ad
o --> ae
\`\`\`

Kali, the Corrupted encounter flowchart
\`\`\`mermaid
flowchart LR
Kali --> P1
Kali --> P2
Kali --> P3
Kali --> P4
Kali --> P5
Kali --> P6
P1 --> P1a[Check < symbol]
P2 --> P2a[Check < symbol]
P3 --> P3a[Check ^ symbol]
P4 --> P4a[Check ^ symbol]
P5 --> P5a[Check > symbol]
P6 --> P6a[Check > symbol]
P1a --> Pxa[Go < and stand next to matching plate]
P2a --> Pxb[Go > and stand next to matching plate]
P3a --> Pxa[Go < and stand next to matching plate]
P4a --> Pxb[Go > and stand next to matching plate]
P5a --> Pxa[Go < and stand next to matching plate]
P6a --> Pxb[Go > and stand next to matching plate]
Pxa --> Pxc[Step on the plate when everyone is ready]
Pxb --> Pxc[Step on the plate when everyone is ready]
Pxc --> Pxd[Move from third to third to avoid bombs, shoot Kali if she appears, kill knight when it spawns, go to the middle after killing knight for damage]
Pxd --> Pxe[When Kali prepares an ontological weapon run into one of the open doors underneath her to survive the wipe mechanic x3]
Pxe --> r{Kali is dead???}
r --> f[finsihed]
r-->|repeat|Kali
\`\`\`
`;

function MarkdownEditor() {
  const [value, setValue] = useState(mdMermaid);

  return (
    <MDEditor
      onChange={(newValue = '') => setValue(newValue)}
      previewOptions={{
        components: {
          code: Code,
        },
        rehypePlugins: [[rehypeSanitize]],
      }}
      value={value}
    />
  );
}

export default MarkdownEditor;
