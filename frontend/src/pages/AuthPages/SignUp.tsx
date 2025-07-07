import SignUpForm from "@/components/auth/SignUpForm"
import PageMeta from "@/components/common/PageMeta"
import AuthLayout from "./AuthPageLayout"

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Регистрация | Доктор VR"
        description="Страница регистрации на образовательной платформе Доктор VR"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
