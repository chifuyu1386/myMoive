const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;


export async function apiClient<T>(endpoint: string, params: Record<string, string> = {}):Promise<T> {
  const queryParams = new URLSearchParams({
    language: "fa-IR",
    ...params
  })

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    }
  })

  if (!response.ok) {
    throw new Error(`خطا در برقراری ارتباط با سرور: ${response.status} ${response.statusText}`)
  } 

  return response.json();
}

export function getTMDBImageUrl(path: string | null, size: 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string {
  if (!path) {
    return 'https://placehold.co/500x750/121215/8b5cf6?text=No+Image';
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
}