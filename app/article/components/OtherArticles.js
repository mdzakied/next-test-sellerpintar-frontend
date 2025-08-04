"use client";

import { useEffect, useState } from "react";
import { getAllArticle } from "../services/articleService";
import { FileWarning } from "lucide-react";
import Image from "next/image";

export default function OtherArticle({ category }) {
  const [articles, setArticles] = useState([]);

  const [limit] = useState(3);
  const [loading, setLoading] = useState(false);

  // Get Article
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);

      const { success, articles } = await getAllArticle({ category, limit });

      if (success) {
        setArticles(articles);
        console.log(articles);
      }
      setLoading(false);
    };

    fetchArticle();
  }, []);

  return (
    <>
      {/* Info */}
      <div className="text-2x1 font-semibold text-black mb-3 mx-4 md:mx-8 mt-8">
        Other Articles
      </div>

      {/* Article Others List */}
      <div className="mt-4 mx-4 md:mx-8">
        {loading ? (
          // Skeleton for Loading
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow overflow-hidden animate-pulse flex flex-col h-[400px]"
              >
                <div className="bg-gray-200 w-full h-48"></div>
                <div className="py-4 px-2 md:px-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded"></div>
                    <div className="h-5 bg-gray-300 w-3/4 mb-3 rounded"></div>
                    <div className="h-3 bg-gray-200 w-full mb-1 rounded"></div>
                    <div className="h-3 bg-gray-200 w-5/6 mb-1 rounded"></div>
                  </div>
                  <div className="h-6 w-24 bg-gray-200 rounded-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : articles?.length === 0 ? (
          // Fallback Article
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <FileWarning className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-center text-lg font-medium">
              No others articles found
            </p>
          </div>
        ) : (
          // Show Article
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            {articles.map((article) => (
              <div
                key={article?.id}
                className="bg-white flex flex-col h-auto w-full"
              >
                <div className="relative w-full h-60 mb-2">
                  <Image
                    src={article?.imageUrl || "/fallback-image.png"}
                    alt={article?.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="py-4 px-2 md:px-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(article?.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="text-lg font-semibold mb-2">
                      {article?.title}
                    </h3>
                    <div
                      className="text-sm text-gray-600 mb-3 prose line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: article?.content }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-blue-200 text-blue-900 text-xs px-2 py-1 rounded-full">
                      {article?.category?.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
