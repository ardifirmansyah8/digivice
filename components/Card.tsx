import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  data: any;
};

const Card: FC<Props> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      key={data.id}
      className={`flex flex-col rounded-2xl bg-opacity-50 p-4 cursor-pointer border shadow-md`}
      onClick={() => router.push("./" + data.name)}
    >
      <img
        src={`https://digimon-api.com/images/digimon/w/${data.name.replace(/ /g,"_")}.png`}
        className="w-44 h-44 self-center"
      />
      <div>#{data.id}</div>
      <div className="mb-1 font-bold capitalize">{data.name}</div>
    </div>
  );
};

export default Card;
