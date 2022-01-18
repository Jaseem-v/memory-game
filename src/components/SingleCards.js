import "./singleCard.scss";


export default function SingleCards({ card, clickEvent, flipped, disable }) {

    const handleClick = () => {
        if (!disable) {
            clickEvent(card)
        }
    }

    return (
        <div className="single__card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="" />
                <img className="back" onClick={handleClick} src="img/cover.png" alt="" />
            </div>
        </div>
    )
}
