


import "./ProductsPage.css";

const offerings = [
  {
    title: "Bronze",
    desc: "1 short creative promo video tailored to your story.",
    price: "$200",
    image: "https://res.cloudinary.com/dooet0x6x/image/upload/v1763615533/pngtree-golden-trophy-with-a-stylized-wolf-head-and-radiating-sound-waves-png-image_15295399_yzperx.png",
    tags: ["Short Promo", "Creative"],
  },
  {
    title: "Silver",
    desc: "1 video plus a curated set of photos to capture the moment.",
    price: "$600",
    image: "https://res.cloudinary.com/dooet0x6x/image/upload/v1763615983/SNxxnZtdWY3Y0wgDoDzp--0--izqlv-removebg-preview_rkpzar.png",
    tags: ["Video", "Photos"],
  },
  {
    title: "Gold",
    desc: "1 video, photos, sponsor highlights, drone shots, and full consultation.",
    price: "$1,200",
    image: "https://res.cloudinary.com/dooet0x6x/image/upload/v1763616159/OZ6GhnVtuiMgHasPMD4S--0--gcy2b-removebg-preview_jkfagd.png",
    tags: ["Video", "Photos", "Sponsor Highlights", "Drone", "Consultation"],
  },
];

function ProductsPage() {
  return (
    <div className="products-page-cont">
      <section className="products-hero">
        <div className="hero-text">
          <p className="eyebrow">Products & Services</p>
          <h1>Create the show. Capture it live.</h1>
          <p className="subhead">
            We produce entertainment-first media—live event coverage, on-location video production, and visuals that keep your crowd locked in.
          </p>
          <div className="hero-actions">
            <a className="hero-primary" href="/contact">Book a call</a>
            <a className="hero-secondary" href="/company">See how we work</a>
          </div>
        </div>
        <div className="hero-metrics">
          <div className="metric-card">
            <span className="metric-number">72 hr</span>
            <span className="metric-label">Fast-track kickoff</span>
          </div>
          <div className="metric-card">
            <span className="metric-number">120+</span>
            <span className="metric-label">Projects delivered</span>
          </div>
          <div className="metric-card">
            <span className="metric-number">4.9⭐</span>
            <span className="metric-label">Avg. client rating</span>
          </div>
        </div>
      </section>

      <section className="products-grid">
        {offerings.map((item) => (
          <article className="product-card" key={item.title}>
            <div className="product-media">
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="product-price">{item.price}</div>
            </div>
            <div className="product-body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="product-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a className="product-cta" href="/contact">Start this package</a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default ProductsPage;
