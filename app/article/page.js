"use client";

import { useEffect, useState } from "react";
import { getAllArticle, getAllCategory } from "./services/articleService";
import { Search, FileWarning } from "lucide-react";
import Pagination from "@/app/components/Pagination";
import Image from "next/image";

export default function ArticlePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [debouncedCategory, setDebouncedCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Get Categories
  useEffect(() => {
    const fetchCategory = async () => {
      const { success, categories } = await getAllCategory();

      if (success) {
        setCategories(categories);
      }
    };

    fetchCategory();
  }, []);

  // Handle Debounce Filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(title);
      setDebouncedCategory(category);
    }, 500);

    return () => clearTimeout(timer);
  }, [title, category]);

  // Get Articles with Debounce
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { success, articles, total } = await getAllArticle({
        title: debouncedTitle,
        category: debouncedCategory,
        page,
        limit,
      });

      if (success) {
        setArticles(articles);
        setTotal(total);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [debouncedTitle, debouncedCategory, page]);

  // Total Page
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      {/* Jumbotron */}
      <div
        className="relative min-h-100 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-600/80 z-0" />

        {/* Content */}
        <div className="relative lg:w-1/2 z-10 text-center text-white px-6 py-24">
          <p className="text-sm font-bold mb-4">Blog genzet</p>
          <h1 className="text-4xl mb-2">
            The Journal : Design Resources, Interviews, and Industry News
          </h1>
          <p className="text-lg">Your daily dose of design insights!</p>

          {/* Form Filter */}
          <div className="flex flex-col lg:flex-row gap-2 bg-blue-500 rounded-lg p-2 mt-8">
            {/* Category */}
            <div className="w-full md:w-1/3">
              <select
                value={category}
                onChange={(e) => {
                  setPage(1);
                  setCategory(e.target.value);
                }}
                className="flex w-full rounded-lg px-2 py-1.5 text-sm text-gray-900 bg-white outline-0 cursor-pointer"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="w-full md:w-2/3 relative">
              {title === "" && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Search size={16} />
                </div>
              )}
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setPage(1);
                  setTitle(e.target.value);
                }}
                placeholder="         Search articles"
                className="flex w-full rounded-lg px-2 py-1.5 text-sm text-gray-900 bg-white outline-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-600 mb-3 mx-4 md:mx-8 mt-8">
        Showing : {articles?.length} of {total} articles
      </div>

      {/* Article List */}
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
            <p className="text-center text-lg font-medium">No articles found</p>
          </div>
        ) : (
          // Show Article
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white flex flex-col h-auto w-full cursor-pointer"
                onClick={() => window.open(`/article/${article.id}`, "_blank")}
              >
                <div className="relative w-full h-60 mb-2">
                  <Image
                    src={article.imageUrl || "/fallback-image.png"}
                    alt={article.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="py-4 px-2 md:px-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="text-lg font-semibold mb-2">
                      {article.title}
                    </h3>
                    <div
                      className="text-sm text-gray-600 mb-3 prose line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-blue-200 text-blue-900 text-xs px-2 py-1 rounded-full">
                      {article.category.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </>
  );
}
