/* =============================================
   AutoValuate — Frontend Logic
   ============================================= */

// ── DOM REFS ──────────────────────────────────
const form        = document.getElementById('predictForm');
const predictBtn  = document.getElementById('predictBtn');
const btnLoader   = document.getElementById('btnLoader');
const resultCard  = document.getElementById('resultCard');
const resultEmpty = document.getElementById('resultEmpty');
const resultData  = document.getElementById('resultData');
const priceDisplay  = document.getElementById('priceDisplay');
const lowerDisplay  = document.getElementById('lowerDisplay');
const upperDisplay  = document.getElementById('upperDisplay');
const importanceList = document.getElementById('importanceList');

// ── FEATURE IMPORTANCE LABELS ─────────────────
const featureLabels = {
  max_power:    'Engine Power',
  year:         'Year',
  km_driven:    'KM Driven',
  mileage:      'Fuel Efficiency',
  engine:       'Engine CC',
  transmission: 'Transmission',
  fuel:         'Fuel Type',
  seats:        'Seats',
  owner:        'Owner History',
  seller_type:  'Seller Type',
};

// ── LOAD FEATURE IMPORTANCE ───────────────────
async function loadImportance() {
  try {
    const res  = await fetch('/importance');
    const data = await res.json();

    // Sort descending
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);

    importanceList.innerHTML = '';

    sorted.forEach(([key, pct], idx) => {
      const row = document.createElement('div');
      row.className = 'importance-row';
      row.innerHTML = `
        <div class="importance-meta">
          <span class="importance-name">${featureLabels[key] || key}</span>
          <span class="importance-pct">${pct.toFixed(1)}%</span>
        </div>
        <div class="importance-bar-bg">
          <div class="importance-bar-fill"
               style="width:${pct}%; animation-delay:${idx * 80}ms"></div>
        </div>`;
      importanceList.appendChild(row);
    });

  } catch (e) {
    importanceList.innerHTML = '<p style="color:var(--text-muted);font-size:12px;">Could not load importance data.</p>';
  }
}

// ── FORM VALIDATION ───────────────────────────
function validateForm() {
  let valid = true;

  // Clear previous errors
  document.querySelectorAll('.input-wrap input, .select-wrap select').forEach(el => {
    el.classList.remove('error');
  });

  const numericFields = [
    { id: 'year',      min: 1994, max: 2020 },
    { id: 'km_driven', min: 1,    max: 475000 },
    { id: 'max_power', min: 32,   max: 280 },
    { id: 'engine',    min: 624,  max: 3604 },
    { id: 'mileage',   min: 0,    max: 34 },
  ];

  numericFields.forEach(({ id, min, max }) => {
    const el  = document.getElementById(id);
    const val = parseFloat(el.value);
    if (isNaN(val) || val < min || val > max) {
      el.classList.add('error');
      valid = false;
    }
  });

  const selectFields = ['seats', 'fuel', 'transmission', 'owner', 'seller_type'];
  selectFields.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value) {
      el.classList.add('error');
      valid = false;
    }
  });

  return valid;
}

// ── TOAST ─────────────────────────────────────
function showToast(msg) {
  let toast = document.querySelector('.error-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'error-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── ANIMATE COUNTER ───────────────────────────
function animateCounter(element, target, prefix = '₹') {
  const duration = 900;
  const start    = performance.now();
  const startVal = 0;

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    element.textContent = `${prefix}${current.toLocaleString('en-IN')}`;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ── FORM SUBMIT ───────────────────────────────
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    showToast('⚠️ Please fill all fields with valid values.');
    return;
  }

  // Set loading state
  predictBtn.classList.add('loading');

  const payload = {
    year:         parseInt(document.getElementById('year').value),
    km_driven:    parseInt(document.getElementById('km_driven').value),
    max_power:    parseFloat(document.getElementById('max_power').value),
    engine:       parseFloat(document.getElementById('engine').value),
    mileage:      parseFloat(document.getElementById('mileage').value),
    seats:        parseFloat(document.getElementById('seats').value),
    fuel:         document.getElementById('fuel').value,
    transmission: document.getElementById('transmission').value,
    owner:        document.getElementById('owner').value,
    seller_type:  document.getElementById('seller_type').value,
  };

  try {
    const res  = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) throw new Error(data.error || 'Prediction failed.');

    // Show result
    resultEmpty.style.display = 'none';
    resultData.style.display  = 'block';
    resultCard.style.background = 'rgba(245,185,60,0.06)';
    resultCard.style.borderColor = 'rgba(245,185,60,0.25)';

    // Animate the price counter
    animateCounter(priceDisplay, data.price);
    lowerDisplay.textContent = data.lower_formatted;
    upperDisplay.textContent = data.upper_formatted;

  } catch (err) {
    showToast(`❌ ${err.message}`);
    console.error(err);
  } finally {
    predictBtn.classList.remove('loading');
  }
});

// ── REAL-TIME VALIDATION (remove error on input) ──
document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', () => el.classList.remove('error'));
  el.addEventListener('change', () => el.classList.remove('error'));
});

// ── INIT ──────────────────────────────────────
loadImportance();
