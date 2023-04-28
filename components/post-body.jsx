import markdownStyles from '../styles/markdown-styles.module.css';

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto" style={{ width: '90vw', maxWidth: '800px', margin: 'auto' }}>
      <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
