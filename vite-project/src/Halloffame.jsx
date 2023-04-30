export default function Halloffame(props) {
    props.rating.length > 5 && props.rating.pop()
    const ratingElements = props.rating.map(
        (it, index) =>
            <div key={index} style={{ fontSize: "22px" }}>
                <b>{index + 1}.</b> {Math.floor(it / 60 / 10) < 10 ? 0 : ''}{Math.floor(it / 60 / 10)} : {Math.floor(it / 10) - Math.floor(it / 60 / 10) * 60 < 10 ? 0 : ''}{Math.floor(it / 10) - Math.floor(it / 60 / 10) * 60} : 0{it - Math.floor(it / 10) * 10}
            </div>
    )
    return (
        props.rating[0] > 0 && <div className="hall">
            <h1>Best time rating</h1>
            {ratingElements}
        </div>
    )
}