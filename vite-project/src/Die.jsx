export default function Die(props) {
    const { value, held, hold } = props
    return (
        <div className="die"
            style={{ background: held ? "#59E391" : "#FFFFFF" }}
            onClick={hold}
        >
            <h1>{value}</h1>
        </div >
    )
}