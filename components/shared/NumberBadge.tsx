type Props = {
  number: number,
  important?: boolean,
}

export default function NumberBadge ({ number = 0, important }: Props) {
  return (
    <span className={`${important ? 'bg-red-100 text-red-800' : 'bg-gray-300 text-black'} text-sm font-medium mr-2 px-2.5 py-0.5 rounded`}>
      {number}
    </span>
  );
}
