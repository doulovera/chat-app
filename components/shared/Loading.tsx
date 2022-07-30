import { CircleNotch } from 'phosphor-react';

type Props = {
  className: string,
  iconSize: number,
}

export default function Loading ({ className, iconSize }: Props) {
  return (
    <div className={`${className} grid place-items-center`}>
      <CircleNotch size={iconSize} className="animate-spin opacity-30" />
    </div>
  );
}
