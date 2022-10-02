import { useRouter } from "next/router";

function notFound() {
  const router = useRouter();
  return (
    <div>
      <div>not found</div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            router.push("/recommend/letter");
          }}
          className="bg-sub1 text-font3 w-52 py-2 pt-2.5 rounded-md"
        >
          다시 추천 받기
        </button>
      </div>
    </div>
  );
}

export default notFound;
