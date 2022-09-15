import { useRouter } from "next/router";

export default function Collection() {
  const router = useRouter();
  console.log(router);
  return <div>{router.query.username}</div>;
}
