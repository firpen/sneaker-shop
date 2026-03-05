function Home () {
    return (
        <div>
            <img src="home.jpg" alt="Home" className="home-image" />
            <section className="shop-icons-section">
                <h2 className="shop-icons-title">Shop Our Icons</h2>
                <div className="shop-icons-grid">
                    {[1,2,3, 4].map((i) => (
                        <div className="shop-icon-card" key={i}>
                            <img src="nike-air-force.png" alt="Nike Air Force" className="shop-icon-img" />
                            <div className="shop-icon-info">
                                <span className="shop-icon-name">Nike Air Force</span>
                                <span className="shop-icon-price">120$</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home;