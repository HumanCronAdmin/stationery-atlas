(() => {
  const FLAGS = { japan: "\u{1F1EF}\u{1F1F5}", germany: "\u{1F1E9}\u{1F1EA}", france: "\u{1F1EB}\u{1F1F7}", other: "\u{1F30D}" };
  const LABELS = {
    "fountain-pen": "Fountain Pen", ballpoint: "Ballpoint", "gel-pen": "Gel Pen",
    "mechanical-pencil": "Mech. Pencil", notebook: "Notebook", planner: "Planner",
    "washi-tape": "Washi Tape", marker: "Marker", other: "Other"
  };

  let products = [];
  const grid = document.getElementById("productGrid");
  const count = document.getElementById("productCount");
  const catEl = document.getElementById("filterCategory");
  const countryEl = document.getElementById("filterCountry");
  const sortEl = document.getElementById("sortBy");
  const searchEl = document.getElementById("searchBox");

  async function load() {
    try {
      const res = await fetch("data/products.json");
      products = await res.json();
      render();
    } catch (e) {
      grid.innerHTML = '<p class="no-results">Failed to load products. Please try again.</p>';
    }
  }

  function filtered() {
    const cat = catEl.value;
    const country = countryEl.value;
    const q = searchEl.value.toLowerCase().trim();
    let list = products.filter(p => {
      if (cat && p.category !== cat) return false;
      if (country && p.country_of_origin !== country) return false;
      if (q) {
        const hay = [p.name, p.brand, p.category, p.best_for, p.description].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const sort = sortEl.value;
    if (sort === "price-asc") list.sort((a, b) => a.price_usd - b.price_usd);
    else if (sort === "price-desc") list.sort((a, b) => b.price_usd - a.price_usd);
    else if (sort === "tip-asc") list.sort((a, b) => (a.tip_size_mm || 999) - (b.tip_size_mm || 999));
    else if (sort === "tip-desc") list.sort((a, b) => (b.tip_size_mm || 0) - (a.tip_size_mm || 0));
    return list;
  }

  function card(p) {
    const flag = FLAGS[p.country_of_origin] || "\u{1F30D}";
    const label = LABELS[p.category] || p.category;
    const tip = p.tip_size_mm ? `<span>${p.tip_size_mm}mm tip</span>` : "";
    const pros = (p.pros || []).slice(0, 3).map(t => `<li>${t}</li>`).join("");
    const buy = (p.where_to_buy || []).map(s => `<span>${s}</span>`).join("");
    const bestFor = p.best_for ? `<div class="product-best">Best for: ${p.best_for}</div>` : "";
    return `<div class="product-card">
      <h3>${p.name}</h3>
      <div class="product-meta">
        <span class="badge">${label}</span>
        <span>${flag} ${p.country_of_origin}</span>
        <span>${p.brand}</span>
        ${tip}
      </div>
      <div class="product-price">$${p.price_usd.toFixed(2)}</div>
      <ul class="product-pros">${pros}</ul>
      ${bestFor}
      <div class="product-buy">${buy}</div>
    </div>`;
  }

  function render() {
    const list = filtered();
    count.textContent = `Showing ${list.length} of ${products.length} products`;
    if (list.length === 0) {
      grid.innerHTML = '<p class="no-results">No products match your filters. Try broadening your search.</p>';
      return;
    }
    grid.innerHTML = list.map(card).join("");
  }

  catEl.addEventListener("change", render);
  countryEl.addEventListener("change", render);
  sortEl.addEventListener("change", render);
  let debounce;
  searchEl.addEventListener("input", () => { clearTimeout(debounce); debounce = setTimeout(render, 250); });

  load();
})();
