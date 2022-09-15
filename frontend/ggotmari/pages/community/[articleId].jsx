import { useRouter } from "next/router";

function ArticleDetail() {
  const router = useRouter();
  return <div>{router.query.articleId}</div>;
}

export default ArticleDetail;
