import { useRouter } from "next/router";
import Image from "next/image";

function SimilarFlowers({
  info: { kindImage, kindId, kindName, subjectId, subjectName },
}) {
  const router = useRouter();

  return (
    <div className="w-screen">
      <Image
        src={kindImage}
        alt={`${kindName + "-" + subjectName}`}
        // layout="fill"
        layout="responsive"
        width={200}
        height={200}
        objectFit="cover"
        className="cursor-pointer rounded-md aspect-square"
      />

      <div className="font-sans text-font2 text-xs pt-1 pb-2">{kindName}</div>
    </div>
  );
}

export default SimilarFlowers;
