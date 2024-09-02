export default async function MyCop() {
  const res = await fetch("/api/hello");
  console.log(await res.json());
  
  return (
    <div>hello</div>
  )
}