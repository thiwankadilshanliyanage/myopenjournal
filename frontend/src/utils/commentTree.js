export const insertReplyIntoTree = (tree, parentId, reply) =>
  tree.map((node) => {
    if (String(node._id) === String(parentId)) {
      return {
        ...node,
        replies: [...(node.replies || []), reply]
      };
    }

    if (node.replies?.length) {
      return {
        ...node,
        replies: insertReplyIntoTree(node.replies, parentId, reply)
      };
    }

    return node;
  });

export const removeCommentFromTree = (tree, commentId) =>
  tree
    .filter((node) => String(node._id) !== String(commentId))
    .map((node) => ({
      ...node,
      replies: node.replies?.length
        ? removeCommentFromTree(node.replies, commentId)
        : []
    }));