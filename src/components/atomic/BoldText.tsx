import clsxm from '@/lib/clsxm';

export interface BoldTextProps {
  text: string;
  keywords: string[];
}

export default function BoldText(props: BoldTextProps) {
  const { text, keywords } = props;
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          className={clsxm(
            keywords.some((kw) => part.toLowerCase() === kw.toLowerCase())
              ? 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'
              : ''
          )}
        >
          {part}
        </span>
      ))}
    </span>
  );
}

// Usage example
{
  /* <BoldText
  text='This is a bold text example with multiple keywords.'
  keywords={['bold', 'keywords']}
/>; */
}

// Usage example
{
  /* <BoldText text='This is a bold text example.' keyword='bold' />; */
}
