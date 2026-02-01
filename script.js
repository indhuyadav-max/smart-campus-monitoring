body {
  font-family: Arial, sans-serif;
  background: #0f172a;
  color: white;
  text-align: center;
}

.subtitle {
  color: #38bdf8;
}

.zones {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.zone {
  padding: 20px;
  border-radius: 10px;
  width: 140px;
  background: #1e293b;
}

.safe { background: #166534; }
.alert { background: #7f1d1d; }
document.addEventListener('DOMContentLoaded', () => {
  const timeEl = document.getElementById('time');
  const timelineEl = document.getElementById('timeline');
  const zoneEls = Array.from(document.querySelectorAll('.zone'));

  function updateTime(){
    const now = new Date();
    const fmt = now.toLocaleString();
    timeEl.textContent = fmt;
  }
  setInterval(updateTime,1000); updateTime();

  function addTimelineEntry(zoneName, status){
    const when = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = 'entry';
    entry.innerHTML = `<div><strong>${zoneName}</strong> — ${status}</div><div class="when">${when}</div>`;
    timelineEl.prepend(entry);
  }

  function setZoneStatus(zoneEl, isAlert){
    zoneEl.classList.toggle('alert', isAlert);
    zoneEl.classList.toggle('safe', !isAlert);
    const btn = zoneEl.querySelector('.toggle');
    btn.textContent = isAlert ? 'Mark Safe' : 'Set Alert';
    addTimelineEntry(zoneEl.querySelector('h3').textContent, isAlert ? 'ALERT' : 'SAFE');
  }

  // initialize zones to safe by default
  zoneEls.forEach(z => {
    z.classList.add('safe');
    const btn = z.querySelector('.toggle');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isAlert = z.classList.contains('safe');
      setZoneStatus(z, isAlert);
    });

    // clicking the whole card toggles too
    z.addEventListener('click', () => {
      const isAlert = z.classList.contains('safe');
      setZoneStatus(z, isAlert);
    });
  });

  // Random alert button
  const randomBtn = document.getElementById('randomAlert');
  randomBtn.addEventListener('click', () => {
    const idx = Math.floor(Math.random()*zoneEls.length);
    const z = zoneEls[idx];
    setZoneStatus(z, true);
  });

  // Clear timeline
  const clearBtn = document.getElementById('clearTimeline');
  clearBtn.addEventListener('click', () => { timelineEl.innerHTML = ''; });
});
