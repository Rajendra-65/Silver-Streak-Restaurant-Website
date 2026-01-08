

interface OrderParam {
  params: { table : string };
}


const Ordering = async ({params}:OrderParam) => {
    const {table} = await params
    
    return (
        <>
            <h1>hello</h1>
            <h1>{table}</h1>
        </>
    )
}


export default Ordering;