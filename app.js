/**
 * Team Palomo RD - Carnet Oficial Generator Logic
 * Junta Central Palomil - República Dominicana
 * Optimized for Vercel Deployment & GitHub
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Audio Context for synthetic sound effects
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;

      if (type === 'shutter') {
        const bufferSize = audioCtx.sampleRate * 0.08;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, now);
        noise.connect(filter);
        filter.connect(audioCtx.destination);
        noise.start(now);
      } else if (type === 'fanfare') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.001, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.09 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.4);
        });
      } else if (type === 'flip') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    } catch (e) {
      console.warn('Audio effect error:', e);
    }
  }

  // --- STATE ---
  const state = {
    name: 'BRAYAN EL ENAMORAO',
    category: 'PALOMO ENAMORAO',
    level: 99.8,
    birthDate: '14 FEB 1999',
    sex: 'M',
    birthPlace: 'SANTO DOMINGO, D.N.',
    civilStatus: 'SOLTERO E ILUSIONAO',
    occupation: 'FINANCIERO DE UÑAS Y SALÓN',
    pollingPlace: 'COL. 0069 - RINCÓN DE LOS ILUSIONADOS',
    photoDataUrl: '',
    signatureDataUrl: '',
    photoZoom: 1,
    photoPosY: 0,
    photoGrayscale: false,
    photoBoost: true,
    isFlipped: false
  };

  // Pre-load default Dominican avatar
  function generateDefaultAvatar() {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createLinearGradient(0, 0, 0, 360);
    bgGrad.addColorStop(0, '#e2e8f0');
    bgGrad.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 300, 360);

    // Torso (Dominican Navy Blue)
    ctx.fillStyle = '#002D62';
    ctx.beginPath();
    ctx.ellipse(150, 380, 120, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shirt Collar
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(130, 260);
    ctx.lineTo(150, 290);
    ctx.lineTo(170, 260);
    ctx.closePath();
    ctx.fill();

    // Neck
    ctx.fillStyle = '#c28859';
    ctx.fillRect(132, 210, 36, 60);

    // Head / Face
    ctx.fillStyle = '#c28859';
    ctx.beginPath();
    ctx.ellipse(150, 160, 55, 70, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair / Corte Dominicano
    ctx.fillStyle = '#1e1b18';
    ctx.beginPath();
    ctx.ellipse(150, 125, 57, 45, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(94, 125, 12, 35);
    ctx.fillRect(194, 125, 12, 35);

    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(132, 160, 9, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(168, 160, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3e2723';
    ctx.beginPath();
    ctx.arc(132, 160, 4, 0, Math.PI * 2);
    ctx.arc(168, 160, 4, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(122, 150);
    ctx.lineTo(142, 152);
    ctx.moveTo(158, 152);
    ctx.lineTo(178, 150);
    ctx.stroke();

    // Nose
    ctx.strokeStyle = '#a4683d';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(150, 155);
    ctx.lineTo(147, 175);
    ctx.lineTo(154, 175);
    ctx.stroke();

    // Smile
    ctx.strokeStyle = '#854724';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(150, 185, 16, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Glasses
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.strokeRect(120, 148, 24, 22);
    ctx.strokeRect(156, 148, 24, 22);
    ctx.beginPath();
    ctx.moveTo(144, 158);
    ctx.lineTo(156, 158);
    ctx.stroke();

    return canvas.toDataURL('image/jpeg', 0.95);
  }

  // --- ELEMENTS ---
  const inputName = document.getElementById('inputName');
  const inputCategory = document.getElementById('inputCategory');
  const customCategoryContainer = document.getElementById('customCategoryContainer');
  const inputCustomCategory = document.getElementById('inputCustomCategory');
  const categoryDescription = document.getElementById('categoryDescription');
  const categoryBadge = document.getElementById('categoryBadge');
  const inputLevel = document.getElementById('inputLevel');
  const palomoLevelLabel = document.getElementById('palomoLevelLabel');

  const photoFileInput = document.getElementById('photoFileInput');
  const openWebcamBtn = document.getElementById('openWebcamBtn');
  const webcamContainer = document.getElementById('webcamContainer');
  const webcamVideo = document.getElementById('webcamVideo');
  const snapPhotoBtn = document.getElementById('snapPhotoBtn');
  const closeWebcamBtn = document.getElementById('closeWebcamBtn');

  const photoZoom = document.getElementById('photoZoom');
  const photoPosY = document.getElementById('photoPosY');
  const photoGrayscaleCheck = document.getElementById('photoGrayscaleCheck');
  const photoBoostCheck = document.getElementById('photoBoostCheck');
  const resetPhotoAdjustBtn = document.getElementById('resetPhotoAdjustBtn');

  const toggleExtraFieldsBtn = document.getElementById('toggleExtraFieldsBtn');
  const extraFieldsContent = document.getElementById('extraFieldsContent');
  const extraFieldsChevron = document.getElementById('extraFieldsChevron');

  const inputBirthDate = document.getElementById('inputBirthDate');
  const inputSex = document.getElementById('inputSex');
  const inputBirthPlace = document.getElementById('inputBirthPlace');
  const inputCivilStatus = document.getElementById('inputCivilStatus');
  const inputOccupation = document.getElementById('inputOccupation');
  const inputPollingPlace = document.getElementById('inputPollingPlace');

  const signatureCanvas = document.getElementById('signatureCanvas');
  const autoSignBtn = document.getElementById('autoSignBtn');
  const clearSignBtn = document.getElementById('clearSignBtn');

  const idCardFlipper = document.getElementById('idCardFlipper');
  const viewFrontBtn = document.getElementById('viewFrontBtn');
  const viewBackBtn = document.getElementById('viewBackBtn');
  const flipCardBtn = document.getElementById('flipCardBtn');

  // Card DOM targets
  const cardHeaderName = document.getElementById('cardHeaderName');
  const cardName = document.getElementById('cardName');
  const cardCategory = document.getElementById('cardCategory');
  const cardLevel = document.getElementById('cardLevel');
  const cardBirthDate = document.getElementById('cardBirthDate');
  const cardSex = document.getElementById('cardSex');
  const cardUserPhoto = document.getElementById('cardUserPhoto');
  const cardSignatureImg = document.getElementById('cardSignatureImg');
  const cardFrontQrContainer = document.getElementById('cardFrontQrContainer');

  const cardBackBirthPlace = document.getElementById('cardBackBirthPlace');
  const cardBackCivilStatus = document.getElementById('cardBackCivilStatus');
  const cardBackOccupation = document.getElementById('cardBackOccupation');
  const cardBackPollingPlace = document.getElementById('cardBackPollingPlace');
  const mrzLine1 = document.getElementById('mrzLine1');
  const mrzLine2 = document.getElementById('mrzLine2');
  const mrzLine3 = document.getElementById('mrzLine3');

  // Buttons & Modals
  const generateCedulaBtn = document.getElementById('generateCedulaBtn');
  const randomizeBtn = document.getElementById('randomizeBtn');
  const toggleSoundBtn = document.getElementById('toggleSoundBtn');
  const downloadFrontBtn = document.getElementById('downloadFrontBtn');
  const downloadBackBtn = document.getElementById('downloadBackBtn');
  const downloadBothBtn = document.getElementById('downloadBothBtn');
  const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');
  const testQrScanBtn = document.getElementById('testQrScanBtn');
  const openScannerModalBtn = document.getElementById('openScannerModalBtn');

  const qrScanBanner = document.getElementById('qrScanBanner');
  const bannerTitularName = document.getElementById('bannerTitularName');
  const bannerCreateYoursBtn = document.getElementById('bannerCreateYoursBtn');

  const verifyModal = document.getElementById('verifyModal');
  const closeVerifyModalBtn = document.getElementById('closeVerifyModalBtn');
  const modalCloseSecondaryBtn = document.getElementById('modalCloseSecondaryBtn');
  const modalCreateYoursBtn = document.getElementById('modalCreateYoursBtn');
  const modalVerifiedName = document.getElementById('modalVerifiedName');
  const modalVerifiedCategory = document.getElementById('modalVerifiedCategory');
  const modalVerifiedLevel = document.getElementById('modalVerifiedLevel');

  const helpModal = document.getElementById('helpModal');
  const openHelpBtn = document.getElementById('openHelpBtn');
  const closeHelpModalBtn = document.getElementById('closeHelpModalBtn');
  const helpOkBtn = document.getElementById('helpOkBtn');

  // --- CATEGORIES ---
  const categoryInfo = {
    'PALOMO ENAMORAO': {
      desc: '"Le compra flores a la que no le contesta, responde historias en 0.2 segundos y sueña despierto."',
      badge: 'Nivel Dios'
    },
    'PALOMO DE ORO': {
      desc: '"Rango Supremo. Ha financiado uñas, pelo, Uber y cena con el supuesto primo."',
      badge: 'Rango Leyenda'
    },
    'PALOMO FIEL': {
      desc: '"Lleva 3 años esperando pacientemente que ella rompa con el novio para tener su oportunidad."',
      badge: 'Veterano'
    },
    'PALOMO VIP': {
      desc: '"Lo dejan en visto a las 8:00 PM y a las 11:30 PM escribe: \'Buenas noches corazón, descansa\'."',
      badge: 'VIP Platinum'
    },
    'PALOMO CHOFER': {
      desc: '"Le da pon a ella y a las amigas a las 4:00 AM lloviendo sin pedir ni medio galón de gasolina."',
      badge: 'Servicio 24/7'
    },
    'PALOMO FINANCIERO': {
      desc: '"Le hace transferencias pal salón y pedidos sin haberle dado ni un solo beso en el cachete."',
      badge: 'Patrocinador'
    },
    'PALOMO POETA': {
      desc: '"Le escribe párrafos bíblicos con emojis de corazones rotos y links de canciones de Romeo Santos."',
      badge: 'Lírico'
    },
    'PALOMO MANDAO': {
      desc: '"Va a la farmacia a buscarle medicina y al colmado a comprarle chocolate cuando ella anda en sus días."',
      badge: 'Mensajero Real'
    },
    'PALOMO CUERNÚ HONORÍFICO': {
      desc: '"Ella le dijo que se durmió temprano pero sale al fondo de un video en la discoteca de Boca Chica."',
      badge: 'Honorífico'
    },
    'PALOMO EN REHABILITACIÓN': {
      desc: '"Dijo \'ya no vuelvo a buscarla jamás\', pero ella subió un estado triste y él la llamó en 2 segundos."',
      badge: 'Recaída Inminente'
    },
    'CUSTOM': {
      desc: '"Categoría exclusiva personalizada en Team Palomo."',
      badge: 'Personalizado'
    }
  };

  // --- SOUND TOGGLE ---
  toggleSoundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    toggleSoundBtn.classList.toggle('bg-red-900/40', !soundEnabled);
    toggleSoundBtn.classList.toggle('border-red-600', !soundEnabled);
    toggleSoundBtn.innerHTML = soundEnabled 
      ? '<i data-lucide="volume-2" class="w-4 h-4"></i><span class="hidden sm:inline font-semibold">Sonido</span>'
      : '<i data-lucide="volume-x" class="w-4 h-4 text-red-400"></i><span class="hidden sm:inline font-semibold text-red-400">Silenciado</span>';
    if (window.lucide) window.lucide.createIcons();
  });

  // --- SIGNATURE PAD ---
  let isSigning = false;
  const sigCtx = signatureCanvas.getContext('2d');
  sigCtx.lineWidth = 2.2;
  sigCtx.lineCap = 'round';
  sigCtx.lineJoin = 'round';
  sigCtx.strokeStyle = '#002D62';

  function getSigCoords(e) {
    const rect = signatureCanvas.getBoundingClientRect();
    const scaleX = signatureCanvas.width / rect.width;
    const scaleY = signatureCanvas.height / rect.height;
    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function startSign(e) {
    isSigning = true;
    const coords = getSigCoords(e);
    sigCtx.beginPath();
    sigCtx.moveTo(coords.x, coords.y);
    e.preventDefault();
  }

  function drawSign(e) {
    if (!isSigning) return;
    const coords = getSigCoords(e);
    sigCtx.lineTo(coords.x, coords.y);
    sigCtx.stroke();
    e.preventDefault();
  }

  function stopSign() {
    if (isSigning) {
      isSigning = false;
      state.signatureDataUrl = signatureCanvas.toDataURL('image/png');
      cardSignatureImg.src = state.signatureDataUrl;
    }
  }

  signatureCanvas.addEventListener('mousedown', startSign);
  signatureCanvas.addEventListener('mousemove', drawSign);
  window.addEventListener('mouseup', stopSign);

  signatureCanvas.addEventListener('touchstart', startSign, { passive: false });
  signatureCanvas.addEventListener('touchmove', drawSign, { passive: false });
  window.addEventListener('touchend', stopSign);

  function clearSignature() {
    sigCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    state.signatureDataUrl = '';
    cardSignatureImg.src = '';
  }
  clearSignBtn.addEventListener('click', clearSignature);

  function generateAutoSignature(name) {
    clearSignature();
    const cleanName = (name || 'Palomo').split(' ')[0] || 'Palomo';
    sigCtx.save();
    sigCtx.font = "38px 'Great Vibes', cursive";
    sigCtx.fillStyle = "#002D62";
    sigCtx.fillText(cleanName, 30, 52);
    
    // Flourish swoosh underline
    sigCtx.strokeStyle = "#002D62";
    sigCtx.lineWidth = 2;
    sigCtx.beginPath();
    sigCtx.moveTo(25, 62);
    sigCtx.bezierCurveTo(90, 75, 180, 55, 260, 68);
    sigCtx.bezierCurveTo(280, 72, 310, 80, 340, 58);
    sigCtx.stroke();
    sigCtx.restore();

    state.signatureDataUrl = signatureCanvas.toDataURL('image/png');
    cardSignatureImg.src = state.signatureDataUrl;
  }
  autoSignBtn.addEventListener('click', () => {
    generateAutoSignature(state.name);
    playSound('shutter');
  });

  // --- WEBCAM CAPTURE ---
  let mediaStream = null;

  async function openWebcam() {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });
      webcamVideo.srcObject = mediaStream;
      webcamContainer.classList.remove('hidden');
      playSound('shutter');
    } catch (err) {
      alert('No se pudo acceder a la cámara. Por favor permite los permisos o sube una foto desde tu galería/archivos.');
      console.error('Camera access error:', err);
    }
  }

  function closeWebcam() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
    webcamContainer.classList.add('hidden');
  }

  function snapPhoto() {
    if (!webcamVideo.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = webcamVideo.videoWidth;
    canvas.height = webcamVideo.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(webcamVideo, 0, 0, canvas.width, canvas.height);

    state.photoDataUrl = canvas.toDataURL('image/jpeg', 0.95);
    closeWebcam();
    applyPhotoFilters();
    playSound('shutter');
  }

  openWebcamBtn.addEventListener('click', openWebcam);
  closeWebcamBtn.addEventListener('click', closeWebcam);
  snapPhotoBtn.addEventListener('click', snapPhoto);

  // Photo file upload
  photoFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      state.photoDataUrl = evt.target.result;
      applyPhotoFilters();
      playSound('shutter');
    };
    reader.readAsDataURL(file);
  });

  // Photo Adjustments
  function applyPhotoFilters() {
    const src = state.photoDataUrl || generateDefaultAvatar();
    const zoom = state.photoZoom;
    const posY = state.photoPosY;
    const isGray = state.photoGrayscale;
    const isBoost = state.photoBoost;

    let filterStr = '';
    if (isGray) filterStr += 'grayscale(100%) ';
    if (isBoost) filterStr += 'contrast(108%) saturate(110%) sharpness(1.2) ';

    cardUserPhoto.style.transform = `scale(${zoom}) translateY(${posY}px)`;
    cardUserPhoto.style.filter = filterStr;
    cardUserPhoto.src = src;
  }

  photoZoom.addEventListener('input', (e) => {
    state.photoZoom = parseFloat(e.target.value);
    applyPhotoFilters();
  });
  photoPosY.addEventListener('input', (e) => {
    state.photoPosY = parseInt(e.target.value, 10);
    applyPhotoFilters();
  });
  photoGrayscaleCheck.addEventListener('change', (e) => {
    state.photoGrayscale = e.target.checked;
    applyPhotoFilters();
  });
  photoBoostCheck.addEventListener('change', (e) => {
    state.photoBoost = e.target.checked;
    applyPhotoFilters();
  });
  resetPhotoAdjustBtn.addEventListener('click', () => {
    photoZoom.value = 1;
    photoPosY.value = 0;
    photoGrayscaleCheck.checked = false;
    photoBoostCheck.checked = true;
    state.photoZoom = 1;
    state.photoPosY = 0;
    state.photoGrayscale = false;
    state.photoBoost = true;
    applyPhotoFilters();
  });

  // --- CARD 3D FLIP LOGIC ---
  function setCardFlipped(flipped) {
    state.isFlipped = flipped;
    idCardFlipper.classList.toggle('flipped', state.isFlipped);
    
    viewFrontBtn.classList.toggle('bg-blue-600', !state.isFlipped);
    viewFrontBtn.classList.toggle('text-white', !state.isFlipped);
    viewFrontBtn.classList.toggle('text-slate-400', state.isFlipped);

    viewBackBtn.classList.toggle('bg-blue-600', state.isFlipped);
    viewBackBtn.classList.toggle('text-white', state.isFlipped);
    viewBackBtn.classList.toggle('text-slate-400', !state.isFlipped);

    playSound('flip');
  }

  viewFrontBtn.addEventListener('click', () => setCardFlipped(false));
  viewBackBtn.addEventListener('click', () => setCardFlipped(true));
  flipCardBtn.addEventListener('click', () => setCardFlipped(!state.isFlipped));

  // Hologram sheen reflection
  const cards = document.querySelectorAll('.id-card-face');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // --- QR CODE GENERATION ON FRONT OF CARD ---
  // When scanned, it opens this card on Vercel/Web and displays the verification & "where to get yours"
  function generateQrVerificationUrl() {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('view', '1');
    url.searchParams.set('name', state.name);
    url.searchParams.set('cat', state.category);
    url.searchParams.set('level', state.level);
    url.searchParams.set('sex', state.sex);
    url.searchParams.set('status', state.civilStatus);
    url.searchParams.set('job', state.occupation);
    url.searchParams.set('place', state.birthPlace);
    url.searchParams.set('date', state.birthDate);
    return url.toString();
  }

  let qrCodeInstance = null;

  function updateFrontQrCode() {
    if (!cardFrontQrContainer) return;
    cardFrontQrContainer.innerHTML = '';
    const verifyUrl = generateQrVerificationUrl();
    try {
      qrCodeInstance = new QRCode(cardFrontQrContainer, {
        text: verifyUrl,
        width: 76,
        height: 76,
        colorDark: '#002D62',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    } catch (e) {
      console.warn('QR Code generation error:', e);
    }
  }

  // --- MACHINE READABLE ZONE (MRZ) ---
  function updateMrzZone() {
    const cleanName = state.name
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Z\s]/g, "")
      .trim()
      .split(/\s+/);

    const line1 = 'I<DOM<TEAM<PALOMO<<<<<<<<<<<<<<<<<<';
    const sexCode = state.sex === 'F' ? 'F' : 'M';
    const line2 = `9902144${sexCode}3010068DOM<<<<<<<<<<<7`;

    let line3Names = '';
    if (cleanName.length >= 2) {
      const surname = cleanName[0];
      const given = cleanName.slice(1).join('<');
      line3Names = `${surname}<<${given}`;
    } else {
      line3Names = `${cleanName[0] || 'PALOMO'}<<ENAMORAO`;
    }
    const line3 = (line3Names + '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<').slice(0, 30);

    mrzLine1.textContent = line1;
    mrzLine2.textContent = line2;
    mrzLine3.textContent = line3;
  }

  // --- MAIN CARD DISPLAY UPDATE ---
  function updateCardDisplay() {
    const upperName = state.name.toUpperCase();
    cardHeaderName.textContent = upperName;
    cardName.textContent = upperName;
    cardCategory.textContent = state.category.toUpperCase();
    cardLevel.textContent = `${state.level}% (${state.level >= 95 ? 'CRÓNICO' : state.level >= 80 ? 'AVANZADO' : 'INICIADO'})`;
    cardBirthDate.textContent = state.birthDate.toUpperCase();
    cardSex.textContent = state.sex;

    cardBackBirthPlace.textContent = state.birthPlace.toUpperCase();
    cardBackCivilStatus.textContent = state.civilStatus.toUpperCase();
    cardBackOccupation.textContent = state.occupation.toUpperCase();
    cardBackPollingPlace.textContent = state.pollingPlace.toUpperCase();

    updateMrzZone();
    updateFrontQrCode();
  }

  // --- FORM EVENT LISTENERS ---
  inputName.addEventListener('input', (e) => {
    state.name = e.target.value.trim() || 'BRAYAN EL ENAMORAO';
    updateCardDisplay();
  });

  inputCategory.addEventListener('change', (e) => {
    if (e.target.value === 'CUSTOM') {
      customCategoryContainer.classList.remove('hidden');
      state.category = inputCustomCategory.value.trim() || 'PALOMO PERSONALIZADO';
      categoryDescription.textContent = categoryInfo.CUSTOM.desc;
      categoryBadge.textContent = categoryInfo.CUSTOM.badge;
    } else {
      customCategoryContainer.classList.add('hidden');
      state.category = e.target.value;
      const info = categoryInfo[state.category] || categoryInfo['PALOMO ENAMORAO'];
      categoryDescription.textContent = info.desc;
      categoryBadge.textContent = info.badge;
    }
    updateCardDisplay();
  });

  inputCustomCategory.addEventListener('input', (e) => {
    state.category = e.target.value.trim() || 'PALOMO PERSONALIZADO';
    updateCardDisplay();
  });

  inputLevel.addEventListener('input', (e) => {
    state.level = parseFloat(e.target.value);
    const tag = state.level >= 95 ? 'Crónico' : state.level >= 80 ? 'Avanzado' : 'En Tratamiento';
    palomoLevelLabel.textContent = `${state.level}% (${tag})`;
    updateCardDisplay();
  });

  toggleExtraFieldsBtn.addEventListener('click', () => {
    const isHidden = extraFieldsContent.classList.contains('hidden');
    extraFieldsContent.classList.toggle('hidden', !isHidden);
    extraFieldsChevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
  });

  inputBirthDate.addEventListener('input', (e) => {
    state.birthDate = e.target.value.trim();
    updateCardDisplay();
  });
  inputSex.addEventListener('change', (e) => {
    state.sex = e.target.value;
    updateCardDisplay();
  });
  inputBirthPlace.addEventListener('input', (e) => {
    state.birthPlace = e.target.value.trim();
    updateCardDisplay();
  });
  inputCivilStatus.addEventListener('change', (e) => {
    state.civilStatus = e.target.value;
    updateCardDisplay();
  });
  inputOccupation.addEventListener('input', (e) => {
    state.occupation = e.target.value.trim();
    updateCardDisplay();
  });
  inputPollingPlace.addEventListener('input', (e) => {
    state.pollingPlace = e.target.value.trim();
    updateCardDisplay();
  });

  // --- RANDOMIZE PRESETS ---
  const dominicanPresets = [
    {
      name: "BRAYAN EL ENAMORAO",
      cat: "PALOMO ENAMORAO",
      status: "SOLTERO E ILUSIONAO",
      job: "FINANCIERO DE UÑAS Y SALÓN",
      place: "SANTO DOMINGO, D.N.",
      poll: "COL. 0069 - RINCÓN DE LOS ILUSIONADOS"
    },
    {
      name: "KEVIN ROMEO",
      cat: "PALOMO POETA",
      status: "EN EL VISTO",
      job: "ESCRITOR DE PÁRRAFOS A LAS 3:00 AM",
      place: "SANTIAGO DE LOS CABALLEROS",
      poll: "COL. 0420 - CALLE DE LAS PROMESAS"
    },
    {
      name: "YOJHAN DE LA ROSA",
      cat: "PALOMO DE ORO",
      status: "PAGANDO CAPRICHOS",
      job: "PATROCINADOR OFICIAL DE UBER",
      place: "VILLA MELLA, SDN",
      poll: "COL. 0101 - PARQUE DE LOS ILUSOS"
    },
    {
      name: "WILMER EL CHOFER",
      cat: "PALOMO CHOFER",
      status: "ESPERANDO EL TURNO",
      job: "CHOFER NOCTURNO DE ELLA Y SUS AMIGAS",
      place: "SAN CRISTÓBAL",
      poll: "COL. 0314 - PARADA DEL DESPECHO"
    },
    {
      name: "STARLYN CORAZÓN DE ORO",
      cat: "PALOMO VIP",
      status: "FRIENDZONE VITALICIA",
      job: "EL AMIGO QUE ES COMO UN HERMANO",
      place: "LOS MINA, SDE",
      poll: "COL. 0777 - BANCO DEL ENGAÑO"
    },
    {
      name: "JUNIOR EL FIEL",
      cat: "PALOMO FIEL",
      status: "RELACIÓN IMAGINARIA",
      job: "ESCUCHADOR DE PROBLEMAS DE SU EX",
      place: "LA ROMANA",
      poll: "COL. 0012 - CALLEJÓN DE LA ESPERANZA"
    }
  ];

  randomizeBtn.addEventListener('click', () => {
    const item = dominicanPresets[Math.floor(Math.random() * dominicanPresets.length)];
    state.name = item.name;
    inputName.value = item.name;

    state.category = item.cat;
    inputCategory.value = item.cat;
    customCategoryContainer.classList.add('hidden');
    const info = categoryInfo[item.cat];
    categoryDescription.textContent = info.desc;
    categoryBadge.textContent = info.badge;

    state.civilStatus = item.status;
    inputCivilStatus.value = item.status;

    state.occupation = item.job;
    inputOccupation.value = item.job;

    state.birthPlace = item.place;
    inputBirthPlace.value = item.place;

    state.pollingPlace = item.poll;
    inputPollingPlace.value = item.poll;

    state.level = Math.floor(880 + Math.random() * 120) / 10;
    inputLevel.value = state.level;
    palomoLevelLabel.textContent = `${state.level}% (Crónico)`;

    generateAutoSignature(state.name);
    updateCardDisplay();
    playSound('shutter');
  });

  // Emit Button
  generateCedulaBtn.addEventListener('click', () => {
    playSound('fanfare');
    if (window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#002D62', '#CE1126', '#D4AF37', '#ffffff']
      });
    }

    if (window.innerWidth < 1024) {
      idCardFlipper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // --- HIGH DEFINITION CANVAS RENDERING (CR80 Standard: 1600x1010) ---
  async function renderCardFaceToCanvas(faceType) {
    const canvas = document.createElement('canvas');
    const width = 1600;
    const height = 1010;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 1. Guilloché Base
    const guillocheImg = new Image();
    guillocheImg.crossOrigin = 'anonymous';
    guillocheImg.src = 'assets/guilloche.svg';
    await new Promise(r => { guillocheImg.onload = r; guillocheImg.onerror = r; });

    if (faceType === 'front') {
      ctx.drawImage(guillocheImg, 0, 0, width, height);

      // Microtext bands
      ctx.fillStyle = 'rgba(0, 45, 98, 0.15)';
      ctx.font = 'bold 11px monospace';
      const microtext = "TEAM PALOMO • REGISTRO NACIONAL DE PALOMOS • REPÚBLICA DOMINICANA • ".repeat(4);
      ctx.fillText(microtext, 20, 160);
      ctx.fillText(microtext, 20, 890);

      // RD Flag & Escudo
      const escudoImg = new Image();
      escudoImg.crossOrigin = 'anonymous';
      escudoImg.src = 'assets/escudo-rd.svg';
      await new Promise(r => { escudoImg.onload = r; escudoImg.onerror = r; });

      const banderaImg = new Image();
      banderaImg.crossOrigin = 'anonymous';
      banderaImg.src = 'assets/bandera-rd.svg';
      await new Promise(r => { banderaImg.onload = r; banderaImg.onerror = r; });

      // Flag (Top Left)
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 8;
      ctx.drawImage(banderaImg, 50, 45, 110, 75);
      ctx.restore();

      // Escudo (Top Right)
      ctx.drawImage(escudoImg, width - 180, 35, 120, 120);

      // Top Title: TEAM PALOMO
      ctx.textAlign = 'center';
      ctx.fillStyle = '#002D62';
      ctx.font = "900 48px 'Cinzel', serif";
      ctx.fillText('TEAM PALOMO', width / 2, 75);

      ctx.fillStyle = '#CE1126';
      ctx.font = "bold 22px 'Cinzel', serif";
      ctx.fillText('REPÚBLICA DOMINICANA • JUNTA CENTRAL PALOMIL', width / 2, 112);

      ctx.fillStyle = '#475569';
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.fillText('CARNET OFICIAL DE IDENTIFICACIÓN', width / 2, 142);

      // Divider line
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 168);
      ctx.lineTo(width - 50, 168);
      ctx.stroke();

      // Prominent Bar with NAME (Replacing DNI Number)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#475569';
      ctx.font = "bold 20px 'Inter', sans-serif";
      ctx.fillText('TITULAR:', 55, 210);

      ctx.fillStyle = '#b91c1c';
      ctx.font = "900 36px 'Cinzel', serif";
      ctx.fillText(state.name.toUpperCase(), 165, 212);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#64748b';
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.fillText('VIGENCIA: ', width - 200, 210);
      ctx.fillStyle = '#002D62';
      ctx.font = "900 20px 'Inter', sans-serif";
      ctx.fillText('VITALICIO', width - 55, 210);

      // Main Photo (Left)
      const photoX = 60;
      const photoY = 245;
      const photoW = 340;
      const photoH = 450;

      const userPhotoImg = new Image();
      userPhotoImg.src = state.photoDataUrl || generateDefaultAvatar();
      await new Promise(r => { userPhotoImg.onload = r; userPhotoImg.onerror = r; });

      ctx.save();
      ctx.shadowColor = 'rgba(0, 45, 98, 0.4)';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = '#002D62';
      ctx.lineWidth = 6;
      ctx.strokeRect(photoX, photoY, photoW, photoH);
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.rect(photoX, photoY, photoW, photoH);
      ctx.clip();
      ctx.drawImage(userPhotoImg, photoX, photoY, photoW, photoH);
      ctx.fillStyle = 'rgba(0, 45, 98, 0.9)';
      ctx.fillRect(photoX, photoY + photoH - 40, photoW, 40);
      ctx.fillStyle = '#FDE047';
      ctx.font = "bold 16px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('REGISTRADO', photoX + photoW / 2, photoY + photoH - 15);
      ctx.restore();

      // Middle Fields
      const fieldsX = 440;
      ctx.textAlign = 'left';

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText('NOMBRES Y APELLIDOS / APODO', fieldsX, 275);
      ctx.fillStyle = '#0f172a';
      ctx.font = "900 32px 'Inter', sans-serif";
      ctx.fillText(state.name.toUpperCase(), fieldsX, 315);

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText('CATEGORÍA TEAM PALOMO', fieldsX, 370);

      // Category Pill
      ctx.fillStyle = 'rgba(0, 45, 98, 0.08)';
      ctx.strokeStyle = '#002D62';
      ctx.lineWidth = 2;
      ctx.fillRect(fieldsX, 385, 760, 52);
      ctx.strokeRect(fieldsX, 385, 760, 52);

      ctx.fillStyle = '#002D62';
      ctx.font = "900 28px 'Inter', sans-serif";
      ctx.fillText(state.category.toUpperCase(), fieldsX + 20, 422);

      // Level + Sex + Origin
      ctx.fillStyle = '#64748b';
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText('NIVEL PALOMERÍA', fieldsX, 480);
      ctx.fillStyle = '#b91c1c';
      ctx.font = "900 26px 'Share Tech Mono', monospace";
      ctx.fillText(`${state.level}% (${state.level >= 95 ? 'CRÓNICO' : 'ALTO'})`, fieldsX, 515);

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText('SEXO', fieldsX + 340, 480);
      ctx.fillStyle = '#0f172a';
      ctx.font = "900 26px 'Inter', sans-serif";
      ctx.fillText(state.sex, fieldsX + 340, 515);

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText('ORIGEN', fieldsX + 500, 480);
      ctx.fillStyle = '#0f172a';
      ctx.font = "900 24px 'Inter', sans-serif";
      ctx.fillText('RD 🇩🇴', fieldsX + 500, 515);

      // Birth Date & Signature
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(fieldsX, 555);
      ctx.lineTo(width - 360, 555);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText('FECHA DE NAC.', fieldsX, 590);
      ctx.fillStyle = '#0f172a';
      ctx.font = "900 24px 'Inter', sans-serif";
      ctx.fillText(state.birthDate.toUpperCase(), fieldsX, 630);

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText('FIRMA DEL PORTADOR', fieldsX + 340, 590);

      if (state.signatureDataUrl) {
        const sigImg = new Image();
        sigImg.src = state.signatureDataUrl;
        await new Promise(r => { sigImg.onload = r; sigImg.onerror = r; });
        ctx.drawImage(sigImg, fieldsX + 340, 600, 240, 80);
      }

      // ========================================================
      // FRONT QR CODE (WHERE SECOND PHOTO WAS PER USER REQUEST)
      // ========================================================
      const frontQrCanvas = cardFrontQrContainer.querySelector('canvas');
      if (frontQrCanvas) {
        const qrBoxX = width - 330;
        const qrBoxY = 250;
        const qrBoxW = 270;
        const qrBoxH = 340;

        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 12;
        ctx.fillRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH);
        ctx.strokeStyle = '#002D62';
        ctx.lineWidth = 3;
        ctx.strokeRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH);
        ctx.restore();

        ctx.drawImage(frontQrCanvas, qrBoxX + 25, qrBoxY + 25, 220, 220);

        ctx.fillStyle = '#002D62';
        ctx.font = "900 18px 'Inter', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText('ESCANEAR CARNET', qrBoxX + qrBoxW / 2, qrBoxY + 275);
        ctx.fillStyle = '#64748b';
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText('VERIFICAR & CONSEGUIR TUYO', qrBoxX + qrBoxW / 2, qrBoxY + 305);
      }

      // Bottom Bar
      ctx.fillStyle = 'rgba(0, 45, 98, 0.9)';
      ctx.fillRect(0, height - 60, width, 60);
      ctx.fillStyle = '#ffffff';
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('TEAM PALOMO • REGISTRO NACIONAL DE PALOMOS • REPÚBLICA DOMINICANA', width / 2, height - 23);

    } else {
      // ================== REVERSO (DETRÁS) ==================
      ctx.save();
      ctx.translate(width, height);
      ctx.rotate(Math.PI);
      ctx.drawImage(guillocheImg, 0, 0, width, height);
      ctx.restore();

      // Top Magnetic Stripe
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, 120);

      const chipImg = new Image();
      chipImg.crossOrigin = 'anonymous';
      chipImg.src = 'assets/chip.svg';
      await new Promise(r => { chipImg.onload = r; chipImg.onerror = r; });
      ctx.drawImage(chipImg, 50, 20, 110, 80);

      ctx.fillStyle = '#94a3b8';
      ctx.font = "bold 20px 'Share Tech Mono', monospace";
      ctx.textAlign = 'left';
      ctx.fillText('TEAM PALOMO ELECTRONIC SMART CARD • REPÚBLICA DOMINICANA', 190, 70);

      ctx.fillStyle = '#FBBF24';
      ctx.textAlign = 'right';
      ctx.fillText('RD-PALOMO-2026', width - 60, 70);

      // Details Block
      const backX = 100;
      ctx.textAlign = 'left';

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.fillText('LUGAR DE NACIMIENTO', backX, 200);
      ctx.fillStyle = '#0f172a';
      ctx.font = "900 28px 'Inter', sans-serif";
      ctx.fillText(state.birthPlace.toUpperCase(), backX, 240);

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.fillText('ESTADO CIVIL', backX + 700, 200);
      ctx.fillStyle = '#b91c1c';
      ctx.font = "900 28px 'Inter', sans-serif";
      ctx.fillText(state.civilStatus.toUpperCase(), backX + 700, 240);

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.fillText('OCUPACIÓN / OFICIO', backX, 320);
      ctx.fillStyle = '#0f172a';
      ctx.font = "900 28px 'Inter', sans-serif";
      ctx.fillText(state.occupation.toUpperCase(), backX, 360);

      ctx.fillStyle = '#64748b';
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.fillText('MESA PALOMIL / RINCÓN', backX + 700, 320);
      ctx.fillStyle = '#002D62';
      ctx.font = "900 28px 'Inter', sans-serif";
      ctx.fillText(state.pollingPlace.toUpperCase(), backX + 700, 360);

      // Fingerprint and RD Escudo
      const huellaImg = new Image();
      huellaImg.crossOrigin = 'anonymous';
      huellaImg.src = 'assets/huella.svg';
      await new Promise(r => { huellaImg.onload = r; huellaImg.onerror = r; });
      ctx.drawImage(huellaImg, backX, 450, 120, 150);

      const escudoImg = new Image();
      escudoImg.crossOrigin = 'anonymous';
      escudoImg.src = 'assets/escudo-rd.svg';
      await new Promise(r => { escudoImg.onload = r; escudoImg.onerror = r; });
      ctx.drawImage(escudoImg, width - 240, 450, 140, 140);

      // Parody Disclaimer
      ctx.fillStyle = '#475569';
      ctx.font = "16px 'Inter', sans-serif";
      const disclaimer = "Certificado oficial emitido por Team Palomo bajo el artículo 69 de la Ley del Enamorao en la República Dominicana. Válido en discotecas, cabañas, colmados y redes sociales para justificar vistos eternos y transferencias bancarias de salón.";
      wrapText(ctx, disclaimer, backX + 170, 490, width - backX - 440, 28);

      // Machine Readable Zone (MRZ Box at Bottom)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(40, 680, width - 80, 270);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 680, width - 80, 270);

      ctx.fillStyle = '#0f172a';
      ctx.font = "bold 34px 'Share Tech Mono', monospace";
      ctx.textAlign = 'left';
      ctx.fillText(mrzLine1.textContent, 80, 755);
      ctx.fillText(mrzLine2.textContent, 80, 825);
      ctx.fillText(mrzLine3.textContent, 80, 895);
    }

    return canvas;
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  function triggerDownload(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    playSound('fanfare');
  }

  // Download Front
  downloadFrontBtn.addEventListener('click', async () => {
    downloadFrontBtn.disabled = true;
    downloadFrontBtn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Generando HD...</span>';
    if (window.lucide) window.lucide.createIcons();
    
    try {
      const canvas = await renderCardFaceToCanvas('front');
      const filename = `Team_Palomo_Frente_${state.name.replace(/\s+/g, '_')}.png`;
      triggerDownload(canvas.toDataURL('image/png'), filename);
    } catch (e) {
      console.error(e);
      alert('Error generando la imagen.');
    } finally {
      downloadFrontBtn.disabled = false;
      downloadFrontBtn.innerHTML = '<i data-lucide="image" class="w-4 h-4 text-blue-400"></i><span>Descargar Frente (HD)</span>';
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // Download Back
  downloadBackBtn.addEventListener('click', async () => {
    downloadBackBtn.disabled = true;
    downloadBackBtn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Generando HD...</span>';
    if (window.lucide) window.lucide.createIcons();
    
    try {
      const canvas = await renderCardFaceToCanvas('back');
      const filename = `Team_Palomo_Detras_${state.name.replace(/\s+/g, '_')}.png`;
      triggerDownload(canvas.toDataURL('image/png'), filename);
    } catch (e) {
      console.error(e);
      alert('Error generando la imagen.');
    } finally {
      downloadBackBtn.disabled = false;
      downloadBackBtn.innerHTML = '<i data-lucide="image" class="w-4 h-4 text-amber-400"></i><span>Descargar Detrás (HD)</span>';
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // Download Both
  downloadBothBtn.addEventListener('click', async () => {
    downloadBothBtn.disabled = true;
    downloadBothBtn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Preparando Carnet Completo...</span>';
    if (window.lucide) window.lucide.createIcons();

    try {
      const frontCanvas = await renderCardFaceToCanvas('front');
      const backCanvas = await renderCardFaceToCanvas('back');

      const combinedCanvas = document.createElement('canvas');
      combinedCanvas.width = frontCanvas.width;
      combinedCanvas.height = frontCanvas.height * 2 + 80;
      const ctx = combinedCanvas.getContext('2d');

      ctx.fillStyle = '#070e1b';
      ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.font = "900 36px 'Cinzel', serif";
      ctx.textAlign = 'center';
      ctx.fillText('TEAM PALOMO • REPÚBLICA DOMINICANA', combinedCanvas.width / 2, 50);

      ctx.drawImage(frontCanvas, 0, 70);
      ctx.drawImage(backCanvas, 0, frontCanvas.height + 70);

      const filename = `Carnet_Team_Palomo_Completo_${state.name.replace(/\s+/g, '_')}.png`;
      triggerDownload(combinedCanvas.toDataURL('image/png'), filename);

      if (window.confetti) {
        window.confetti({ particleCount: 75, spread: 60 });
      }
    } catch (e) {
      console.error(e);
      alert('Error generando el carnet completo.');
    } finally {
      downloadBothBtn.disabled = false;
      downloadBothBtn.innerHTML = '<i data-lucide="layers" class="w-4 h-4"></i><span>Descargar Carnet Completo (Frente + Detrás)</span>';
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // WhatsApp Share
  shareWhatsAppBtn.addEventListener('click', () => {
    const verifyUrl = generateQrVerificationUrl();
    const text = `🇩🇴 ¡MIRA MI CARNET OFICIAL DEL TEAM PALOMO RD! 😂\n\nTitular: ${state.name}\nCategoría: ${state.category}\nNivel: ${state.level}%\n\n👉 ¡Escanea el código QR de mi carnet o crea el tuyo gratis aquí!: ${verifyUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  });

  // --- QR VERIFICATION MODAL DISPLAY ---
  function openVerificationModal(verifiedData) {
    modalVerifiedName.textContent = (verifiedData.nombre || state.name).toUpperCase();
    modalVerifiedCategory.textContent = (verifiedData.cat || state.category).toUpperCase();
    modalVerifiedLevel.textContent = verifiedData.nivel || `${state.level}% (Crónico)`;

    verifyModal.classList.remove('hidden');
    playSound('fanfare');
  }

  function closeVerificationModal() {
    verifyModal.classList.add('hidden');
  }

  closeVerifyModalBtn.addEventListener('click', closeVerificationModal);
  modalCloseSecondaryBtn.addEventListener('click', closeVerificationModal);
  modalCreateYoursBtn.addEventListener('click', () => {
    closeVerificationModal();
    if (qrScanBanner) qrScanBanner.classList.add('hidden');
    window.history.replaceState({}, document.title, window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inputName.focus();
  });

  if (bannerCreateYoursBtn) {
    bannerCreateYoursBtn.addEventListener('click', () => {
      qrScanBanner.classList.add('hidden');
      window.history.replaceState({}, document.title, window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      inputName.focus();
    });
  }

  testQrScanBtn.addEventListener('click', () => {
    openVerificationModal({
      nombre: state.name,
      cat: state.category,
      nivel: `${state.level}% (Crónico)`
    });
  });

  openScannerModalBtn.addEventListener('click', () => {
    openVerificationModal({
      nombre: state.name,
      cat: state.category,
      nivel: `${state.level}% (Crónico)`
    });
  });

  // Help Modal
  openHelpBtn.addEventListener('click', () => helpModal.classList.remove('hidden'));
  closeHelpModalBtn.addEventListener('click', () => helpModal.classList.add('hidden'));
  helpOkBtn.addEventListener('click', () => helpModal.classList.add('hidden'));

  // --- CHECK URL QUERY PARAMS (WHEN SCANNED VIA MOBILE QR CODE ON VERCEL) ---
  function checkUrlForQrScan() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === '1' || params.has('name') || params.has('nombre')) {
      const scannedName = params.get('name') || params.get('nombre') || 'MIEMBRO OFICIAL';
      const scannedCat = params.get('cat') || 'PALOMO ENAMORAO';
      const scannedLevel = params.get('level') || params.get('nivel') || '99.8';
      const scannedSex = params.get('sex') || 'M';
      const scannedStatus = params.get('status') || 'SOLTERO E ILUSIONAO';
      const scannedJob = params.get('job') || 'FINANCIERO DE UÑAS Y SALÓN';
      const scannedPlace = params.get('place') || 'SANTO DOMINGO, D.N.';
      const scannedDate = params.get('date') || '14 FEB 1999';

      // Update state with scanned person's carnet
      state.name = scannedName;
      state.category = scannedCat;
      state.level = parseFloat(scannedLevel) || 99.8;
      state.sex = scannedSex;
      state.civilStatus = scannedStatus;
      state.occupation = scannedJob;
      state.birthPlace = scannedPlace;
      state.birthDate = scannedDate;

      // Update form inputs to match
      inputName.value = scannedName;
      inputCategory.value = scannedCat;
      inputLevel.value = state.level;
      inputCivilStatus.value = scannedStatus;
      inputOccupation.value = scannedJob;
      inputBirthPlace.value = scannedPlace;

      generateAutoSignature(scannedName);
      updateCardDisplay();

      // Show the public landing banner
      if (qrScanBanner) {
        bannerTitularName.textContent = scannedName;
        qrScanBanner.classList.remove('hidden');
      }

      // Automatically show the official verification certificate
      setTimeout(() => {
        openVerificationModal({
          nombre: scannedName,
          cat: scannedCat,
          nivel: `${state.level}% (Crónico)`
        });
      }, 500);
    }
  }

  // --- INIT APPLICATION ---
  generateAutoSignature(state.name);
  applyPhotoFilters();
  updateCardDisplay();
  checkUrlForQrScan();
});
