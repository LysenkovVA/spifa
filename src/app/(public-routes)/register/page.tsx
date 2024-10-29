import { RegistrationForm } from "@/features/Auth/RegistrationForm";
import { ContentWrapper } from "../../../shared/UI/ContentWrapper";

export default async function RegisterPage() {
  return (
    <ContentWrapper>
      <RegistrationForm style={{ width: "300px" }} />
    </ContentWrapper>
  );
}
