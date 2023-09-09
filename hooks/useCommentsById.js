async function getCommentsByArticle(id) {
  const response = await fetch(
    `http://localhost:8000/api/comments/article/${id}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

export function useComments(articleId) {
  // Prenez l'ID de l'article en argument
  const data = getCommentsByArticle(articleId); // Passez l'ID de l'article à la fonction
  return data;
}
