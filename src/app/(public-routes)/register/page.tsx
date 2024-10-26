import { RegistrationForm } from "@/features/Auth/RegistrationForm";
import { PublicPageWrapper } from "@/shared/UI/PublicPageWrapper";

export default async function RegisterPage() {
  return (
    <PublicPageWrapper>
      <RegistrationForm style={{ width: "300px" }} />
    </PublicPageWrapper>
  );
}
