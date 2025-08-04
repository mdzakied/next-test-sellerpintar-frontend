"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getArticleById } from "../services/articleService";
import OtherArticle from "../components/OtherArticles";
import Image from "next/image";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const res = await getArticleById(id);

      if (res.success && res.data) {
        setArticle(res.data);
      } else {
        return router.push("/article/404");
      }

      setLoading(false);
    };

    if (id) fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 px-4 md:px-24 animate-pulse">
        <div className="h-4 w-1/3 bg-gray-200 mb-4 rounded" />
        <div className="h-8 w-3/4 bg-gray-300 mb-6 rounded" />
        <div className="h-72 bg-gray-200 mb-6 rounded-lg" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 md:px-24">
      {/* Title */}
      <div className="text-sm text-gray-500 font-semibold text-center mb-2">
        {new Date(article?.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        • {article?.user?.username}
      </div>

      <div className="pb-8">
        <h1 className="flex justify-center text-3xl font-semibold text-center mb-2">
          <div className="w-3/4">{article?.title}</div>
        </h1>
      </div>

      {/* Image */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <Image
          src={article?.imageUrl || "/fallback-image.png"}
          alt={article?.title}
          width={1200}
          height={675}
          className="object-cover rounded-lg w-full h-auto"
        />
      </div>

      {/* Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article?.content }}
      />

      {/* Other Articles */}
      <OtherArticle category={article?.categoryId} />
    </div>
  );
}
