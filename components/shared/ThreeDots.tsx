import { DotsThreeVertical } from 'phosphor-react';
// types
import type { FormEvent } from 'react';

type Props = {
  handleClick: () => void,
}

export default function ThreeDots ({ handleClick }: Props) {
  const handlePopupElementClick = (event: FormEvent) => {
    handleClick();
    event.stopPropagation();
  };

  return (
    <button
      className="grid place-items-center hover:bg-gray-700 rounded-full cursor-default"
      onClick={handlePopupElementClick}
    >
      <DotsThreeVertical size={28} />
    </button>
  );
}
