
import { UserManagementTable } from '@/components/users/UsersTable'
import PageMeta from "../../components/common/PageMeta"

export default function TeacherUsers() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <UserManagementTable />
    </>
  );
}
