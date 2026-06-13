// ====================================
// CUSTOM CURSOR SYSTEM - MINIMALIST HORROR (120FPS)
// ====================================

const cursorRing = document.getElementById('cursorRing');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;
let isHovering = false;
let animationFrameId = null;

// Optimized smooth cursor follow using requestAnimationFrame
function updateCursorPosition() {
  // Update dot position (instant)
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  
  // Update ring position with smooth easing for 120fps+ feel
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  
  animationFrameId = requestAnimationFrame(updateCursorPosition);
}

// Start animation loop
updateCursorPosition();

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseenter', () => {
  cursorRing.style.opacity = '0.7';
  cursorDot.style.opacity = '0.85';
});

document.addEventListener('mouseleave', () => {
  cursorRing.style.opacity = '0';
  cursorDot.style.opacity = '0';
  isHovering = false;
});

// Subtle horror hover effects
document.addEventListener('mouseover', (e) => {
  const target = e.target;
  isHovering = true;
  
  if (target.matches('button, .access-card, .chapter-card, .risk-card, .missing-card, .creature-card, .gallery-card, .secret-card, .team-card, a')) {
    document.body.classList.add('cursor-hover');
    cursorRing.style.transform = 'scale(1.6) translate3d(0, 0, 0)';
    cursorRing.style.borderColor = 'rgba(255, 60, 60, 0.7)';
    cursorDot.style.transform = 'scale(1.4)';
  }
  
  if (target.matches('.scan-target, .timeline-point')) {
    document.body.classList.add('cursor-scan');
    cursorRing.style.borderColor = 'rgba(255, 100, 100, 0.6)';
    cursorRing.style.animation = 'subtleGlow 2s ease-in-out infinite';
  }
});

document.addEventListener('mouseout', (e) => {
  const target = e.target;
  
  if (target.matches('button, .access-card, .chapter-card, .risk-card, .missing-card, .creature-card, .gallery-card, .secret-card, .team-card, a')) {
    document.body.classList.remove('cursor-hover');
    cursorRing.style.transform = 'scale(1) translate3d(0, 0, 0)';
    cursorRing.style.borderColor = 'rgba(255, 70, 70, 0.6)';
    cursorDot.style.transform = 'scale(1)';
  }
  
  if (target.matches('.scan-target, .timeline-point')) {
    document.body.classList.remove('cursor-scan');
    cursorRing.style.animation = '';
    cursorRing.style.borderColor = 'rgba(255, 70, 70, 0.6)';
  }
});

// ====================================
// AUDIO SYSTEM
// ====================================

const audioToggle = document.getElementById('audioToggle');
let audioEnabled = false;
let ambientAudio = null;

if (audioToggle) {
  audioToggle.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    audioToggle.textContent = audioEnabled ? 'Ambient On' : 'Ambient Off';
    audioToggle.setAttribute('aria-pressed', audioEnabled);
    
    if (audioEnabled && !ambientAudio) {
      // Play ambient audio if available
      console.log('Ambient audio enabled');
    }
  });
}

// ====================================
// TERMINAL SYSTEM
// ====================================

const terminalToggle = document.getElementById('terminalToggle');
const terminalPanel = document.getElementById('terminalPanel');
const terminalClose = document.getElementById('terminalClose');
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

const terminalCommands = {
  help: 'Available commands: FILES • ACCESS • REPORT • LOGS • EVIDENCE • RESEARCH • STATUS • SCAN • DECODE',
  files: 'File System:\n├── incident_reports.txt\n├── infection_data.bin\n├── missing_persons.db\n├── creature_analysis.pdf\n└── encrypted.vault [LOCKED]',
  access: 'Current Access Level: 01\nClearance: STANDARD\nNext Level Available At: Unknown',
  report: 'Latest Report:\nSubject Status: UNKNOWN\nLocation: OFFLINE\nLast Contact: [REDACTED]',
  logs: '[13:47] System initialized\n[14:02] Anomaly detected in Sector 7\n[14:15] Communications compromised\n[14:28] Investigation teams deployed',
  evidence: 'Evidence Vault:\n- Silhouette Scan (Partial)\n- Audio Recording (Corrupted)\n- Security Footage (Frame 1847)\n- Unknown Artifact (Unidentified)',
  research: 'Research Data:\nInfection Vector: UNKNOWN\nReplication Rate: 847%\nContainment Status: FAILED\nEvolution Stage: Phase 3',
  status: 'System Status:\n► Server: ONLINE\n► Database: SYNCING\n► Surveillance: ACTIVE\n► Threat Level: CRITICAL',
  scan: 'Scanning... [████████░░] 82%\nAnomalies Detected: 7\nUnidentified Signals: 3\nScan Complete.',
  decode: '[DECRYPTION INITIATED]\nKey File: ACCESS_GRANTED.txt\n[SUCCESS] Hidden archive unlocked!',
};

function addTerminalOutput(text) {
  if (terminalOutput) {
    terminalOutput.textContent += text + '\n\n';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
}

if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.toLowerCase().trim();
      
      if (command) {
        addTerminalOutput('> ' + command);
        
        if (terminalCommands[command]) {
          addTerminalOutput(terminalCommands[command]);
          
          // Hidden command
          if (command === 'decode') {
            setTimeout(() => {
              document.getElementById('secretArchive').classList.remove('hidden');
              addTerminalOutput('\n[!] Secret archive revealed');
            }, 500);
          }
        } else if (command === 'clear') {
          if (terminalOutput) terminalOutput.textContent = '';
        } else {
          addTerminalOutput('[ERROR] Unknown command: ' + command);
        }
      }
      
      terminalInput.value = '';
    }
  });
}

if (terminalToggle) {
  terminalToggle.addEventListener('click', () => {
    if (terminalPanel) {
      terminalPanel.classList.add('active');
      if (terminalInput) terminalInput.focus();
    }
  });
}

if (terminalClose) {
  terminalClose.addEventListener('click', () => {
    if (terminalPanel) {
      terminalPanel.classList.remove('active');
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && terminalPanel && terminalPanel.classList.contains('active')) {
    terminalPanel.classList.remove('active');
  }
});

// ====================================
// LIGHTBOX SYSTEM
// ====================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.getAttribute('data-src');
    const caption = card.querySelector('span').textContent;
    
    lightboxImage.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

// ====================================
// VIDEO MODAL
// ====================================

const videoModal = document.getElementById('videoModal');
const videoClose = document.getElementById('videoClose');
const trailerVideo = document.getElementById('trailerVideo');
const watchTrailerBtn = document.getElementById('watchTrailer');

watchTrailerBtn.addEventListener('click', () => {
  videoModal.classList.add('active');
  trailerVideo.play();
});

videoClose.addEventListener('click', () => {
  videoModal.classList.remove('active');
  trailerVideo.pause();
});

videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove('active');
    trailerVideo.pause();
  }
});

// ====================================
// TIMELINE INTERACTION
// ====================================

document.querySelectorAll('.timeline-point').forEach(point => {
  point.addEventListener('click', () => {
    document.querySelectorAll('.timeline-point').forEach(p => p.classList.remove('active'));
    point.classList.add('active');
    
    const detail = point.getAttribute('data-detail');
    document.getElementById('timelineDetail').textContent = detail;
  });
});

// ====================================
// SCROLL ANIMATIONS
// ====================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// ====================================
// HERO BUTTON INTERACTIONS
// ====================================

let clickCount = 0;
const enterDatabaseBtn = document.getElementById('enterDatabase');
const beginInvestigationBtn = document.getElementById('beginInvestigation');
const siteLoader = document.getElementById('siteLoader');

enterDatabaseBtn.addEventListener('click', () => {
  document.querySelector('#access').scrollIntoView({ behavior: 'smooth' });
});

beginInvestigationBtn.addEventListener('click', () => {
  clickCount++;
  
  if (clickCount === 1) {
    beginInvestigationBtn.textContent = 'UNLOCK SECRETS? (Click Again)';
  } else if (clickCount === 2) {
    beginInvestigationBtn.textContent = 'FINAL CONFIRMATION?';
  } else if (clickCount >= 3) {
    document.getElementById('secretArchive').classList.remove('hidden');
    beginInvestigationBtn.textContent = 'SECRETS UNLOCKED';
    addTerminalOutput('[!] Hidden archive has been revealed');
  }
});

// ====================================
// LOCKED CARD INTERACTIONS
// ====================================

document.querySelectorAll('.access-card.locked, .creature-card.locked').forEach(card => {
  card.addEventListener('click', () => {
    card.style.borderColor = 'rgba(255, 60, 60, 0.5)';
    card.style.background = 'rgba(40, 15, 15, 0.96)';
    
    setTimeout(() => {
      card.style.borderColor = '';
      card.style.background = '';
    }, 400);
  });
});

// ====================================
// HIDDEN EASTER EGGS
// ====================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-8);
  
  if (konamiCode.join(',') === konamiPattern.join(',')) {
    addTerminalOutput('[CLASSIFIED] EASTER EGG FOUND: System Override Granted');
    document.body.style.filter = 'hue-rotate(15deg) saturate(1.2)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 2000);
  }
});

// ====================================
// GLITCH EFFECT TRIGGER
// ====================================

function glitchEffect() {
  document.body.style.animation = 'none';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 100);
}

// Occasional glitch effect
setInterval(() => {
  if (Math.random() < 0.02) {
    glitchEffect();
  }
}, 3000);

// ====================================
// INITIALIZATION
// ====================================

console.log('[SYSTEM] Death Parasite Archive Online');
console.log('[SYSTEM] Welcome, Investigator');
console.log('[SYSTEM] Begin your investigation when ready');
