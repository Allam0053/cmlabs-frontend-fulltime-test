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
          style={
            keywords.some((kw) => part.toLowerCase() === kw.toLowerCase())
              ? { fontWeight: 'bold' }
              : undefined
          }
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
