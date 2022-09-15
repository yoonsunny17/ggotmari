import { useRouter } from "next/router";

export default function Like() {
  const router = useRouter();
  console.log(router);
  return <div>{router.query.username}</div>;
}
