import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { authApi } from "../../api/authApi";

export default function VerifyEmailPage() {
  const { token } = useParams();

  useEffect(() => {
    authApi.verifyEmail(token);
  }, []);

  return <h2>Email Verified</h2>;
}