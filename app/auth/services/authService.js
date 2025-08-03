import api from "@/app/lib/api";

export const login = async (username, password) => {
  try {
    const res = await api.post("/auth/login", { username, password });

    const token = res.data.token;
    const role = res.data.role;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    console.log(res);


    return { success: true, message:"Login successful", role };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Login failed",
    };
  }
};
