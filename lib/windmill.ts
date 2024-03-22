import React from "https://esm.sh/node-fetch";

export const request = async (url: string, options: RequestInit = {}) => {
  const baseUrl = "https://wind.iotex.me/api";
  const baseOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: "Bearer fmujPRUJdqVfNYOOhJf5uMwP5Ogc5s",
    },
  };

  try {
    const response = await fetch(baseUrl + url, {
        ...baseOptions,
        ...options,
    });
    // const data = await response.json();
    return await response.json()
  } catch (error) {
    console.error(error);
  }
};

export const getScriptPaths = async () => {
    const res = await request("/w/demo/scripts/list_paths");
    return res.filter(path => path.includes("denodeploy"))
}

export const getScriptByPath = async (path: string) => {
    const res = await request(`/w/demo/scripts/get?path=${path}`);
    return res
}