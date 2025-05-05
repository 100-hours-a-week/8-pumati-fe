import { CreateForm } from '@/features/project/components/create-form/CreateForm';

export default function NewProjectPage() {
  return (
    <section className="flex flex-col items-center min-h-[calc(100vh-6rem)]">
      <h1 className="text-xl font-semibold mt-9">프로젝트 생성</h1>
      <CreateForm />
    </section>
  );
}
