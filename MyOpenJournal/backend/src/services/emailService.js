export const sendPasswordResetEmail = async ({ email, name, resetUrl }) => {
  console.log(`Password reset email to ${email} (${name}) => ${resetUrl}`);
  return true;
};
