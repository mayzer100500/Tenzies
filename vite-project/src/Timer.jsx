export default function Timer(props) {
    let sec = Math.floor(props.curTime / 10)
    let min = Math.floor(sec / 60)
    let bestSec = Math.floor(props.bestTime / 10)
    let bestMin = Math.floor(bestSec / 60)
    const styles = {
        display: "flex",
        justifyContent: "center",
        fontSize: "30px",
        fontWeight: "700",
        marginBottom: "15px",
        border: "solid"
    }
    return (
        <div className="title" >
            <h1 style={{ fontSize: "25px" }}>BEST TIME: {bestMin < 10 ? 0 : ''}{bestMin} : {bestSec - bestMin * 60 < 10 ? 0 : ''}{bestSec - bestMin * 60} : 0{props.bestTime - bestSec * 10}</h1>
            <div style={styles}>{min < 10 ? 0 : ''}{min} : {sec - min * 60 < 10 ? 0 : ''}{sec - min * 60} : 0{props.curTime - sec * 10}</div>
        </div>
    )
}