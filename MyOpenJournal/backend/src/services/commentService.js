export const buildCommentTree = (comments) => {
  const map = new Map();
  const roots = [];

  comments.forEach((comment) => {
    map.set(String(comment._id), { ...comment.toObject(), replies: [] });
  });

  comments.forEach((comment) => {
    const key = String(comment._id);
    const parentKey = comment.parentComment ? String(comment.parentComment) : null;

    if (parentKey && map.has(parentKey)) {
      map.get(parentKey).replies.push(map.get(key));
    } else {
      roots.push(map.get(key));
    }
  });

  return roots;
};
