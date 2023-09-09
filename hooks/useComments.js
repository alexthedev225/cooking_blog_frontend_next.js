
async function GetAllPostComment() {
    const response = await fetch("http://localhost:8000/api/comments", {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  }

export function usePosts() {
  const data = GetAllPostComment()
  return data;
}
