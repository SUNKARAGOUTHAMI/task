import React from "react";

export default function ProductPage() {
  return (
    <>
      
      <main className="page">
        <section className="hero">{/* top empty band */}</section>

        <section className="product-wrap">
          {/* Gallery column */}
          <div className="gallery">
            <div className="main-image">
              {/* No images as per your request */}
              <div className="placeholder">[ Product Image ]</div>
            </div>
            <div className="thumbs">
              {/* Empty thumbnails */}
              <div className="placeholder">[ Thumbnails ]</div>
            </div>
          </div>

          {/* Details column */}
          <aside className="details">
            <h1 className="product-title">Manuka Honey</h1>
            <div className="product-sub">
              <div>UMF 24+</div>
              <div>MGO 1122+</div>
            </div>
            <p className="product-desc">
              Premium Manuka honey. Short sample description paragraph goes here
              — benefits, harvesting info, and quality badges.
            </p>

            <div className="badges">
              <span className="badge">UMF Certified</span>
              <span className="badge">Organic</span>
            </div>

            <div className="price-row">
              <div className="price">₹ 4,599</div>
              <div className="sku">SKU: MH-1122</div>
            </div>

            <div className="options">
              <label>
                Size
                <select defaultValue="250g">
                  <option>250g</option>
                  <option>500g</option>
                  <option>1kg</option>
                </select>
              </label>
              <label>
                Quantity
                <input type="number" min="1" defaultValue="1" />
              </label>
            </div>

            <div className="actions">
              <button className="btn primary">Add to Cart</button>
              <button className="btn ghost">Buy Now</button>
            </div>

            <hr />

            <section className="more-details">
              <h3>Details</h3>
              <p>
                Full product details, usage suggestions, storage advice and more.
              </p>
            </section>
          </aside>
        </section>

        {/* Bottom gallery */}
        <section className="bottom-gallery">
          <div className="placeholder">[ Bottom Gallery ]</div>
        </section>
      </main>
    </>
  );
}
