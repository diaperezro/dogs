export default function ReiniciarFiltro(){
    function handleRefresh(){
        window.location.reload();
    }
    
    return(
        <div>
            <button onClick={handleRefresh}>reiniciar filtro</button>
        </div>
    )
}