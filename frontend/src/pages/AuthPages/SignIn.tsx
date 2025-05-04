import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "@/components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Вход в личный кабинет | Доктор VR"
        description="Страница входа в личный кабинет на образовательной платформе Доктор VR"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
