(() => {
  let pens = [];
  const grid = document.getElementById("productGrid");
  const count = document.getElementById("productCount");
  const brandEl = document.getElementById("filterBrand");
  const inkEl = document.getElementById("filterInk");
  const leftEl = document.getElementById("filterLeftHand");
  const sortEl = document.getElementById("sortBy");
  const searchEl = document.getElementById("searchBox");

  async function load() {
    try {
      const res = await fetch("data/pens.json");
      pens = await res.json();
      render();
    } catch (e) {
      grid.innerHTML = '<p class="no-results">Failed to load pens. Please try again.</p>';
    }
  }

  function filtered() {
    const brand = brandEl.value;
    const ink = inkEl.value;
    const left = leftEl.value;
    const q = searchEl.value.toLowerCase().trim();
    let list = pens.filter(p => {
      if (brand && p.brand !== brand) return false;
      if (ink && p.ink_type !== ink) return false;
      if (left === "yes" && !p.left_hand_friendly) return false;
      if (q) {
        const hay = [p.name, p.brand, p.ink_type, p.refill_model, p.best_for, p.description].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const sort = sortEl.value;
    if (sort === "price-asc") list.sort((a, b) => a.price_usd - b.price_usd);
    else if (sort === "price-desc") list.sort((a, b) => b.price_usd - a.price_usd);
    else if (sort === "tip-asc") list.sort((a, b) => (a.tip_size_mm || 999) - (b.tip_size_mm || 999));
    else if (sort === "tip-desc") list.sort((a, b) => (b.tip_size_mm || 0) - (a.tip_size_mm || 0));
    else if (sort === "grip-asc") list.sort((a, b) => (a.grip_diameter_mm || 999) - (b.grip_diameter_mm || 999));
    else if (sort === "weight-asc") list.sort((a, b) => (a.weight_g || 999) - (b.weight_g || 999));
    return list;
  }

  function card(p) {
    const tip = p.tip_size_mm ? `<span>${p.tip_size_mm}mm</span>` : "";
    const grip = p.grip_diameter_mm ? `<span>Grip: ${p.grip_diameter_mm}mm</span>` : "";
    const weight = p.weight_g ? `<span>${p.weight_g}g</span>` : "";
    const leftBadge = p.left_hand_friendly ? '<span class="badge" style="background:#4ECDC4;color:#000">Lefty OK</span>' : "";
    const pros = (p.pros || []).slice(0, 3).map(t => `<li>${t}</li>`).join("");
    const refill = p.refill_model ? `<div class="product-best">Refill: ${p.refill_model}</div>` : "";
    const bestFor = p.best_for ? `<div class="product-best">Best for: ${p.best_for}</div>` : "";
    const buy = (p.where_to_buy || []).map(s => `<span>${s}</span>`).join("");
    const inkLabel = (p.ink_type || "").replace(/-/g, " ");
    return `<div class="product-card">
      <h3>${p.name}</h3>
      <div class="product-meta">
        <span class="badge">${p.brand}</span>
        <span>${inkLabel}</span>
        ${tip} ${grip} ${weight} ${leftBadge}
      </div>
      <div class="product-price">$${p.price_usd.toFixed(2)}</div>
      <ul class="product-pros">${pros}</ul>
      ${refill}
      ${bestFor}
      <div class="product-buy">${buy}</div>
    </div>`;
  }

  function render() {
    const list = filtered();
    count.textContent = `Showing ${list.length} of ${pens.length} pens`;
    if (list.length === 0) {
      grid.innerHTML = '<p class="no-results">No pens match your filters. Try broadening your search.</p>';
      return;
    }
    grid.innerHTML = list.map(card).join("");
  }

  brandEl.addEventListener("change", render);
  inkEl.addEventListener("change", render);
  leftEl.addEventListener("change", render);
  sortEl.addEventListener("change", render);
  let debounce;
  searchEl.addEventListener("input", () => { clearTimeout(debounce); debounce = setTimeout(render, 250); });

  load();
})();
