import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getComparator from "../../queries/getComparator";
import { EditComparator } from "../../components/EditComparator";

type EditComparatorPageProps = {
  params: { comparatorId: string };
};

export async function generateMetadata({
  params,
}: EditComparatorPageProps): Promise<Metadata> {
  const Comparator = await invoke(getComparator, {
    id: Number(params.comparatorId),
  });
  return {
    title: `Edit Comparator ${Comparator.id} - ${Comparator.name}`,
  };
}

export default async function Page({ params }: EditComparatorPageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditComparator comparatorId={Number(params.comparatorId)} />
      </Suspense>
    </div>
  );
}
