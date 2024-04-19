import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb';
import { ProjectDetail } from '@/components/admin/ProjectDetail';

export default async function ProjectDetailPage() {
  return (
    <>
      <Breadcrumb pageName='Project Detail' />
      <div className='flex flex-col gap-10'>
        <ProjectDetail />
      </div>
    </>
  );
}
