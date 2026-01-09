interface OrderParam {
  params: { table: string };
}

export const Cart = async ({ params }: OrderParam) => {

  const { table } = await params;
  return(
    <h1>{table}</h1>
  )
}