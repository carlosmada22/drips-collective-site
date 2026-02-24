import React from 'react';

const handleRegex = /(^|\s)@([a-zA-Z0-9._]{1,30})/g;
const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|(?:https?:\/\/)?(?:www\.)?instagram\.com\/[^\s]+)/gi;

const normalizeUrl = (rawUrl: string) => {
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }
  return `https://${rawUrl}`;
};

const linkifyHandles = (text: string, keyPrefix: string) => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let handleIndex = 0;

  while ((match = handleRegex.exec(text)) !== null) {
    const [fullMatch, leadingSpace, handle] = match;
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }
    if (leadingSpace) {
      nodes.push(leadingSpace);
    }
    nodes.push(
      <a
        key={`${keyPrefix}-handle-${handleIndex}`}
        href={`https://www.instagram.com/${handle}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-white transition-colors"
      >
        @{handle}
      </a>
    );
    lastIndex = matchIndex + fullMatch.length;
    handleIndex += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

const linkifyLine = (line: string, keyPrefix: string) => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let urlIndex = 0;

  while ((match = urlRegex.exec(line)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      const before = line.slice(lastIndex, matchIndex);
      nodes.push(...linkifyHandles(before, `${keyPrefix}-text-${urlIndex}`));
    }

    const rawUrl = match[0];
    nodes.push(
      <a
        key={`${keyPrefix}-url-${urlIndex}`}
        href={normalizeUrl(rawUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-white transition-colors"
      >
        {rawUrl}
      </a>
    );

    lastIndex = matchIndex + rawUrl.length;
    urlIndex += 1;
  }

  if (lastIndex < line.length || line.length === 0) {
    const remaining = line.slice(lastIndex);
    nodes.push(...linkifyHandles(remaining, `${keyPrefix}-tail`));
  }

  return nodes;
};

export const linkifyText = (text: string) => {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];

  lines.forEach((line, lineIndex) => {
    nodes.push(...linkifyLine(line, `line-${lineIndex}`));
    if (lineIndex < lines.length - 1) {
      nodes.push(<br key={`br-${lineIndex}`} />);
    }
  });

  return nodes;
};
