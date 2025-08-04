import api from "@/app/lib/api";

export const login = async (username, password) => {
  try {
    const res = await api.post("/auth/login", { username, password });

    const token = res.data.token;
    const role = res.data.role;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    return { success: true, message: "Login successful", role };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Login failed",
    };
  }
};

export const registerAccount = async (username, password, role) => {
  try {
    const res = await api.post("/auth/register", { username, password, role });

    const newUser = res.data.username;

    return { success: true, message: "Register successful", newUser };
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Register failed",
    };
  }
};