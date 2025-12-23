import HouseDetails from "@/components/house/HouseDetails";

export default function HousePage({ params }: { params: { id: string } }) {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <HouseDetails houseId={params.id} />
        </div>
    )
}
