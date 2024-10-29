import axios from "axios";

export const baseURL = import.meta.env.VITE_APP_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Add a request interceptor to include JWT and CSRF tokens
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // let csrfToken = localStorage.getItem("CSRF_TOKEN");
    
    // if (!csrfToken) {
    //   try {
    //     // Fetch the CSRF token by making a GET request (you still need the request for setting the cookie)
    //     const response = await axios.get(
    //       `${base}/api/csrf-token`,
    //       { withCredentials: true }  // Ensure the cookie is set
    //     );
        
    //     // Now fetch the token from the cookie, not from the response body
    //     csrfToken = getCookie("XSRF-TOKEN");  // Get CSRF token from cookie
    
    //     if (csrfToken) {
    //       localStorage.setItem("CSRF_TOKEN", csrfToken);  // Store the token in localStorage
    //     } else {
    //       console.error("CSRF token not found in cookies");
    //     }
    
    //   } catch (error) {
    //     console.error("Failed to fetch CSRF token", error);
    //   }
    // }
    

    // if (csrfToken) {
    //   config.headers["X-XSRF-TOKEN"] = csrfToken;
    // }
    // console.log("X-XSRF-TOKEN " + csrfToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
