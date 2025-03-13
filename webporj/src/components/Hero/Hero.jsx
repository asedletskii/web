import "./Hero.css"
import Button from "../Button/Button"

export default function Hero() {
    return (
        <section className="hero">
            <div className="left">
                <h1 className="Herotext">Wishlify</h1>
                <p className="subHerotext">Умный список простых желаний</p>
                <Button>Создать список!</Button>
            </div>
        </section>
    )
}