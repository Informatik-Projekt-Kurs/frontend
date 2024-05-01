export default function Page({ params }: { params: { id: string } }) {
  return <div className={"text-foreground"}>Company Index: {params.id}</div>;
}
