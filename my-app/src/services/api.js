const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function parseError(response) {
  try {
    const data = await response.json();
    if (data?.message) return data.message;
    if (data?.title) return data.title;
    if (typeof data === "object") {
      const firstError = Object.values(data).flat()[0];
      if (firstError) return firstError;
    }
  } catch {
    // ignore JSON parse errors
  }

  return response.statusText || "Request failed";
}

export async function apiRequest(endpoint, options = {}) {
  const { headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
