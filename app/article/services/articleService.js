import api from "@/app/lib/api";

export const getAllArticle = async ({
  title = "",
  category = "",
  page = 1,
  limit = 10,
}) => {
  try {
    const res = await api.get("/articles", {
      params: { title, category, page, limit },
    });

    const articles = res.data.data;
    const total = res.data.total;
    const currentPage = res.data.page;
    const currentLimit = res.data.limit;

    return {
      success: true,
      message: "Articles fetched successfully",
      articles,
      total,
      currentPage,
      currentLimit,
    };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Failed to fetch articles",
    };
  }
};

export const getArticleById = async (id) => {
  try {
    const res = await api.get(`/articles/${id}`);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Failed to fetch article detail:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Failed to fetch article detail",
    };
  }
};

export const getAllCategory = async () => {
  try {
    const res = await api.get("/categories", {
      params: { limit: 100 },
    });

    const categories = res.data.data;

    return {
      success: true,
      message: "Categories fetched successfully",
      categories,
    };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Failed to fetch categories",
    };
  }
};
