import EditHouseForm from '@/components/admin/EditHouseForm';

export default function EditHousePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <EditHouseForm houseId={params.id} />
    </div>
  );
}
