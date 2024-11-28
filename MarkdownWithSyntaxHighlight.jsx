import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const MarkdownWithSyntaxHighlighting = ({ markdownText }) => {
  return (
    <Markdown
      options={{
        overrides: {
          code: {
            component: ({ children, className }) => {
              const language = className?.replace('language-', '') || '';
              return (
                <SyntaxHighlighter style={docco} language="javascript">
                  {String(children).trim()}
                </SyntaxHighlighter>
              );
            },
          },
        },
      }}
    >
      {markdownText}
    </Markdown>
  );
};

export default MarkdownWithSyntaxHighlighting;