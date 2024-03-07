export default async function Page() {
    await res = await fetch('https://api.example.com/data')
    return (
        <div>
            <h1>Page</h1>
            <p>Esta pagina es el contenido del dashboard.</p>
        </div>
    )
}