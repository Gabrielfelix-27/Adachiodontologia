/* ═══════════════════════════════════════════════════════
   ADACHI ODONTOLOGIA · INTERACTIONS
   ═══════════════════════════════════════════════════════ */

// ─── Lucide icons render ───
const renderIcons = () => {
  if (window.lucide) lucide.createIcons();
};
renderIcons();
// re-render after page fully loaded (covers any race condition with CDN)
window.addEventListener('load', () => setTimeout(renderIcons, 100));

// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');
const handleNavScroll = () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
window.addEventListener('scroll', handleNavScroll);
handleNavScroll();

// ─── Mobile menu ───
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = menuToggle.querySelector('[data-lucide]');
  if (icon) {
    icon.setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
    lucide.createIcons();
  }
});
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ─── Active nav link on scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const setActiveNav = () => {
  const scrollPos = window.scrollY + 150;
  let current = 'home';
  sections.forEach(s => {
    if (scrollPos >= s.offsetTop) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', setActiveNav);

// ─── Counter animation (trust bar stats) ───
const animateCounter = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600; // ms
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutQuart — começa rápido, desacelera no fim
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat[data-target]').forEach(el => counterObserver.observe(el));

// ─── Reveal on scroll ───
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach(el => io.observe(el));

// ─── TREATMENTS CAROUSEL ───
const treatments = [
  { name: 'Invisalign', img: 'assets/invisaling.avif' },
  { name: 'Lentes de Contato BPA Free', img: 'assets/Lentes%20de%20Contato%20BPA%20Free.jpeg' },
  { name: 'Reabilitação Oral Sistêmica', img: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80' },
  { name: 'Harmonização Facial Integrativa', img: 'assets/Armonizacao%20facial.webp' },
  { name: 'Implantes de Cerâmica', img: 'assets/implante%20dentario%20de%20ceramica.jpg' },
  { name: 'Remoção de Amálgama', img: 'assets/remocao-de-amalgama.jpg' },
  { name: 'Tratamento de NICO', img: 'assets/Nico-tratamento-1024x459.jpg' },
  { name: 'Clareamento Dental', img: 'assets/clareamento-dental-dentista-em-londrina.jpg' },
  { name: 'Facetas de Porcelana', img: 'assets/Fcetas.jpeg' },
];

const carousel = document.getElementById('carousel');
if (carousel) {
  carousel.innerHTML = treatments
    .map(
      t => `
    <div class="treatment-card">
      <img src="${t.img}" alt="${t.name}" loading="lazy" />
      <div class="overlay"></div>
      <div class="label">
        <div class="label-title">${t.name}</div>
        <div class="label-arrow">
          <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        </div>
      </div>
    </div>
  `
    )
    .join('');
  lucide.createIcons();
}

let carouselIndex = 0;
const CARD_WIDTH = 280;
const GAP = 20;
const STEP = CARD_WIDTH + GAP; // 300

const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

const getMaxIndex = () => {
  if (!carousel) return 0;
  const containerWidth = carousel.parentElement.clientWidth;
  // total width all cards take, including gaps between
  const totalWidth = treatments.length * CARD_WIDTH + (treatments.length - 1) * GAP;
  const overflow = totalWidth - containerWidth;
  if (overflow <= 0) return 0;
  return Math.ceil(overflow / STEP);
};

const updateButtons = () => {
  const max = getMaxIndex();
  const disabledClasses = ['opacity-40', 'pointer-events-none'];
  if (prevBtn) prevBtn.classList.toggle('opacity-40', carouselIndex <= 0);
  if (prevBtn) prevBtn.classList.toggle('pointer-events-none', carouselIndex <= 0);
  if (nextBtn) nextBtn.classList.toggle('opacity-40', carouselIndex >= max);
  if (nextBtn) nextBtn.classList.toggle('pointer-events-none', carouselIndex >= max);
};

const updateCarousel = () => {
  if (!carousel) return;
  const max = getMaxIndex();
  carouselIndex = Math.max(0, Math.min(carouselIndex, max));

  // when on the last index, snap to fit so last card lines up flush with right edge
  let translate = carouselIndex * STEP;
  if (carouselIndex === max && max > 0) {
    const containerWidth = carousel.parentElement.clientWidth;
    const totalWidth = treatments.length * CARD_WIDTH + (treatments.length - 1) * GAP;
    translate = totalWidth - containerWidth;
  }
  carousel.style.transform = `translateX(-${translate}px)`;
  updateButtons();
};

prevBtn?.addEventListener('click', () => {
  carouselIndex = Math.max(0, carouselIndex - 1);
  updateCarousel();
});
nextBtn?.addEventListener('click', () => {
  carouselIndex++;
  updateCarousel();
});
window.addEventListener('resize', updateCarousel);

// initial position after layout settles
window.addEventListener('load', () => setTimeout(updateCarousel, 100));
updateCarousel();

// touch swipe (mobile)
if (carousel) {
  let startX = 0;
  let isDown = false;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDown = true;
  }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    if (!isDown) return;
    isDown = false;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0) { carouselIndex++; }
    else { carouselIndex = Math.max(0, carouselIndex - 1); }
    updateCarousel();
  }, { passive: true });
}

// ─── FAQ ACCORDION ───
const faqs = [
  {
    q: 'Vocês aceitam convênio?',
    a: 'Não atendemos convênios. Trabalhamos exclusivamente de forma particular para garantir consultas de 1 hora dedicadas, materiais biocompatíveis de alta qualidade e tratamentos personalizados — princípios incompatíveis com a lógica de produtividade dos convênios. Aceitamos cartão (parcelamos em até 12x), Pix e oferecemos planos personalizados.',
  },
  {
    q: 'O que é odontologia sistêmica?',
    a: 'É uma abordagem inovadora que reconhece a conexão vital entre saúde bucal e saúde sistêmica. Tratamos cada paciente entendendo que problemas na boca podem afetar todo o corpo — e vice-versa. Por isso usamos materiais biocompatíveis, livres de metais tóxicos, e técnicas que respeitam o organismo como um todo.',
  },
  {
    q: 'Quanto dura uma consulta?',
    a: 'Nossas consultas duram 1 hora completa. Esse tempo é fundamental pra que possamos ouvir você, fazer um diagnóstico cuidadoso, planejar com calma e explicar tudo com clareza — sem pressa, sem atropelo.',
  },
  {
    q: 'Por que implantes de cerâmica?',
    a: 'Os implantes de cerâmica (zircônia) são metal-free e biocompatíveis: não geram corrente galvânica, não interferem com o sistema imunológico e têm excelente integração tecidual. Indicados especialmente para pacientes sensíveis a metais ou que buscam abordagens mais naturais.',
  },
  {
    q: 'Como funciona a remoção de restaurações prateadas?',
    a: 'Realizamos a remoção segura de restaurações de amálgama seguindo protocolos rigorosos de proteção, com isolamento absoluto, sucção de alta potência e materiais que minimizam a exposição ao mercúrio. Após a remoção, substituímos por materiais estéticos e biocompatíveis.',
  },
  {
    q: 'Como agendar minha primeira consulta?',
    a: 'Você pode ligar para (11) 4750-2605, mandar mensagem no WhatsApp ou preencher o formulário no fim desta página. Estamos na Rua Gravatá, 291 — Vila América, Santo André/SP, com fácil estacionamento.',
  },
  {
    q: 'Quais formas de pagamento?',
    a: 'Aceitamos Pix, transferência, cartão de débito e crédito (parcelamos em até 12x). Para tratamentos extensos, montamos um plano financeiro personalizado junto com você.',
  },
];

const faqList = document.getElementById('faqList');
if (faqList) {
  faqList.innerHTML = faqs
    .map(
      (f, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-header" aria-expanded="false">
        <span>${f.q}</span>
        <span class="faq-icon"><i data-lucide="plus" class="w-4 h-4"></i></span>
      </button>
      <div class="faq-body"><p>${f.a}</p></div>
    </div>
  `
    )
    .join('');
  lucide.createIcons();

  faqList.querySelectorAll('.faq-item').forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close all
      faqList.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ─── REVIEWS CAROUSEL (Google) ───
const reviews = [
  {
    name: 'Marta Leme de Goes Nogueira',
    initials: 'M',
    color: 'bg-rose-100 text-rose-600',
    badge: 'Local Guide · 43 avaliações',
    date: '3 semanas atrás',
    rating: 5,
    text: 'Marquei um orçamento hoje para meu marido. Fiz questão de vir avaliar quanta competência o Dr Adachi tem. Como eu conheço e estudo um pouco sobre "dentista biológico", "dentista integrativo", pude ter a certeza das boas mãos que ele estará. Agora com certeza achamos a clínica certa para nossa família, onde confio de olhos fechados que estarão cuidando da nossa saúde integralmente, boca e corpo. Muito obrigada ao Dr e toda equipe!',
  },
  {
    name: 'Juliane Correia da Silva',
    initials: 'J',
    color: 'bg-purple-100 text-purple-600',
    badge: '3 avaliações · 27 fotos',
    date: 'um mês atrás',
    rating: 5,
    text: 'Indico a clínica para todos, o atendimento sempre impecável. A Dra Patrícia é atenciosa e paciente, sempre faz tudo para nos auxiliar da melhor maneira possível!',
  },
  {
    name: 'Abadia Oliveira',
    initials: 'A',
    color: 'bg-amber-100 text-amber-700',
    badge: '4 avaliações',
    date: 'um mês atrás',
    rating: 5,
    text: 'Fui muito bem atendida na clínica. O Dr Nilton traz clareza sobre o tratamento, explicando tudo. É muito paciente e assertivo. Além disso ele nos ajuda a cuidar não só dos dentes mas da saúde de uma forma geral. Fiquei muito feliz com meu tratamento.',
  },
  {
    name: 'Monick Maia',
    initials: 'M',
    color: 'bg-pink-100 text-pink-600',
    badge: 'Local Guide · 9 avaliações',
    date: 'um mês atrás',
    rating: 5,
    text: 'Clínica com excelentes profissionais, ambiente agradável, atendimento humanizado, que respeita a individualidade e particularidade de cada paciente.',
  },
  {
    name: 'Laerte Cirino',
    initials: 'L',
    color: 'bg-blue-100 text-blue-600',
    badge: '5 avaliações',
    date: 'um mês atrás',
    rating: 5,
    text: 'Desde o primeiro contato, fui muito bem atendido pelas recepcionistas! Todas as minhas dúvidas foram esclarecidas com cordialidade e atenção! Deixo registrado a minha admiração pelo Doutor Adachi, um profissional totalmente atualizado e que gosta muito do que faz! Recomendo para todos os que estão em busca do melhor!',
  },
  {
    name: 'Karine Cassia',
    initials: 'K',
    color: 'bg-red-100 text-red-600',
    badge: '8 avaliações',
    date: 'um mês atrás',
    rating: 5,
    text: 'Eu posso dizer que encontrei o lugar certo para meu tratamento pois o Dr Nilton, dentista biológico, segue uma linha integrativa que eu amo e apoio — e isso envolve não somente a boca mas nós como um todo. Amei o atendimento desde o WhatsApp à recepção, todos muito educados, pacientes e felizes.',
  },
  {
    name: 'Sônia Freitas',
    initials: 'S',
    color: 'bg-orange-100 text-orange-600',
    badge: '2 avaliações',
    date: '8 meses atrás',
    rating: 5,
    text: 'CLÍNICA EXCELENTE, quando se trata de saúde bucal e geral também, pois sempre relacionam os dentes com resto do corpo. Sou paciente há anos da Dra. Patrícia que trata meus dentes e faço harmonização facial também — adoro e indico. O Dr. Nilton, profissional atencioso e competente, fiz 2 implantes com ele. A recepção é acolhedora, limpa e as atendentes um amor, sempre atenciosas e gentis.',
  },
];

const reviewsTrack = document.getElementById('reviewsTrack');
if (reviewsTrack) {
  const star = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
  reviewsTrack.innerHTML = reviews.map(r => `
    <article class="review-card">
      <div class="flex items-start justify-between gap-4 mb-4">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-12 h-12 rounded-full ${r.color} flex items-center justify-center font-bold text-lg shrink-0">${r.initials}</div>
          <div class="min-w-0">
            <div class="font-bold text-navy-900 truncate">${r.name}</div>
            <div class="text-xs text-slate-500 truncate">${r.badge}</div>
          </div>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC04"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
      </div>
      <div class="flex items-center gap-2 mb-4">
        <div class="flex items-center gap-0.5">${star.repeat(r.rating)}</div>
        <span class="text-xs text-slate-500">${r.date}</span>
      </div>
      <p class="text-slate-600 leading-relaxed text-[15px]">${r.text}</p>
    </article>
  `).join('');

  const totalSpan = document.getElementById('reviewsTotal');
  const totalSpanMob = document.getElementById('reviewsTotalMob');
  if (totalSpan) totalSpan.textContent = reviews.length;
  if (totalSpanMob) totalSpanMob.textContent = reviews.length;

  let reviewIdx = 0;
  const reviewCountSpan = document.getElementById('reviewsCount');
  const reviewCountSpanMob = document.getElementById('reviewsCountMob');
  const REVIEW_GAP = 20;

  const getReviewStep = () => {
    const card = reviewsTrack.querySelector('.review-card');
    if (!card) return 400;
    return card.offsetWidth + REVIEW_GAP;
  };

  const getReviewMax = () => {
    const containerWidth = reviewsTrack.parentElement.clientWidth;
    const step = getReviewStep();
    const totalWidth = reviews.length * step - REVIEW_GAP;
    const overflow = totalWidth - containerWidth;
    if (overflow <= 0) return 0;
    return Math.ceil(overflow / step);
  };

  const updateReviews = () => {
    const max = getReviewMax();
    reviewIdx = Math.max(0, Math.min(reviewIdx, max));
    const step = getReviewStep();
    let translate = reviewIdx * step;
    if (reviewIdx === max && max > 0) {
      const containerWidth = reviewsTrack.parentElement.clientWidth;
      translate = (reviews.length * step - REVIEW_GAP) - containerWidth;
    }
    reviewsTrack.style.transform = `translateX(-${translate}px)`;
    if (reviewCountSpan) reviewCountSpan.textContent = reviewIdx + 1;
    if (reviewCountSpanMob) reviewCountSpanMob.textContent = reviewIdx + 1;
  };

  const goPrev = () => { reviewIdx = Math.max(0, reviewIdx - 1); updateReviews(); };
  const goNext = () => { reviewIdx++; updateReviews(); };

  document.getElementById('reviewsPrev')?.addEventListener('click', goPrev);
  document.getElementById('reviewsNext')?.addEventListener('click', goNext);
  document.getElementById('reviewsPrevMob')?.addEventListener('click', goPrev);
  document.getElementById('reviewsNextMob')?.addEventListener('click', goNext);
  window.addEventListener('resize', updateReviews);
  window.addEventListener('load', () => setTimeout(updateReviews, 150));
  updateReviews();

  // Touch swipe
  let startX = 0, isDown = false;
  reviewsTrack.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDown = true; }, { passive: true });
  reviewsTrack.addEventListener('touchend', (e) => {
    if (!isDown) return;
    isDown = false;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    diff > 0 ? goNext() : goPrev();
  }, { passive: true });
}

// ─── LUGAR CAROUSEL (FAQ sidebar) ───
(() => {
  const wrapper = document.getElementById('lugarCarousel');
  if (!wrapper) return;
  const slides = wrapper.querySelectorAll('.lugar-slide');
  const dots = wrapper.querySelectorAll('.lugar-dot');
  const counter = document.getElementById('lugarCount');
  let idx = 0;
  let timer;

  const go = (i) => {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('opacity-100', k === idx) || s.classList.toggle('opacity-0', k !== idx));
    dots.forEach((d, k) => {
      d.classList.toggle('bg-white/90', k === idx);
      d.classList.toggle('bg-white/40', k !== idx);
      d.classList.toggle('w-6', k === idx);
      d.classList.toggle('w-2', k !== idx);
    });
    if (counter) counter.textContent = idx + 1;
  };

  const auto = () => {
    clearInterval(timer);
    timer = setInterval(() => go(idx + 1), 4500);
  };

  document.getElementById('lugarPrev')?.addEventListener('click', () => { go(idx - 1); auto(); });
  document.getElementById('lugarNext')?.addEventListener('click', () => { go(idx + 1); auto(); });
  dots.forEach(d => d.addEventListener('click', () => { go(parseInt(d.dataset.idx)); auto(); }));
  wrapper.addEventListener('mouseenter', () => clearInterval(timer));
  wrapper.addEventListener('mouseleave', auto);

  go(0);
  auto();
})();

// ─── LEAD MODAL · Avaliação Gratuita ───
(() => {
  const modal = document.getElementById('leadModal');
  if (!modal) return;
  const overlay = document.getElementById('leadOverlay');
  const card = document.getElementById('leadCard');
  const closeBtn = document.getElementById('leadClose');
  const form = document.getElementById('leadForm');
  const nameInput = document.getElementById('leadName');
  const phoneInput = document.getElementById('leadPhone');
  const STORAGE_KEY = 'adachi_lead_modal';
  const COOLDOWN_DAYS = 7;

  // já viu nos últimos N dias?
  const wasSeen = () => {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) return false;
    const ts = parseInt(v, 10);
    const elapsed = (Date.now() - ts) / (1000 * 60 * 60 * 24);
    return elapsed < COOLDOWN_DAYS;
  };
  const markSeen = () => localStorage.setItem(STORAGE_KEY, String(Date.now()));

  let opened = false;
  const open = () => {
    if (opened || wasSeen()) return;
    opened = true;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      overlay.classList.remove('opacity-0');
      overlay.classList.add('opacity-100');
      card.classList.remove('opacity-0', 'scale-95');
      card.classList.add('opacity-100', 'scale-100');
    });
  };

  const close = () => {
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    card.classList.remove('opacity-100', 'scale-100');
    card.classList.add('opacity-0', 'scale-95');
    document.body.style.overflow = '';
    markSeen();
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 300);
  };

  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });

  // máscara simples telefone BR
  phoneInput?.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else if (v.length > 0) v = v.replace(/^(\d{0,2})/, '($1');
    e.target.value = v;
  });

  // submit → abre WhatsApp da clínica com mensagem pré-preenchida
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const msg = `Olá! Sou ${name} (${phone}) e gostaria de agendar minha *avaliação gratuita* na Adachi Odontologia. Vim pelo site! 😊`;
    const wa = `https://wa.me/551147502605?text=${encodeURIComponent(msg)}`;
    markSeen();

    // estado de sucesso visual antes de redirecionar
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Abrindo WhatsApp...';
    btn.disabled = true;
    setTimeout(() => window.open(wa, '_blank'), 600);
    setTimeout(close, 1200);
  });

  // ─── TRIGGERS ───

  // 1) Scroll: 60% da página
  let scrollFired = false;
  const onScroll = () => {
    if (scrollFired) return;
    const pct = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if (pct >= 0.6) {
      scrollFired = true;
      window.removeEventListener('scroll', onScroll);
      open();
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // 2) Exit-intent (desktop): cursor sai pra cima
  const onMouseLeave = (e) => {
    if (e.clientY <= 0) {
      document.removeEventListener('mouseleave', onMouseLeave);
      open();
    }
  };
  if (window.matchMedia('(min-width: 1024px)').matches) {
    setTimeout(() => document.addEventListener('mouseleave', onMouseLeave), 5000);
  }

  // 3) Tempo: 45s no site (fallback mobile)
  setTimeout(() => open(), 45000);
})();

// ─── CONTACT FORM · WhatsApp deeplink ───
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const name = document.getElementById('contactName');
  const phone = document.getElementById('contactPhone');
  const email = document.getElementById('contactEmail');
  const message = document.getElementById('contactMessage');
  const WHATSAPP_NUMBER = '551147502605'; // (11) 4750-2605

  // Máscara BR no telefone
  phone?.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else if (v.length > 0) v = v.replace(/^(\d{0,2})/, '($1');
    e.target.value = v;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = name.value.trim();
    const phoneVal = phone.value.trim();
    const emailVal = email.value.trim();
    const messageVal = message.value.trim();

    if (!nameVal || !phoneVal) return;

    // monta mensagem formatada
    const lines = [
      'Olá! Vim pelo site da Adachi Odontologia 😊',
      '',
      `📝 *Nome:* ${nameVal}`,
      `📱 *Telefone:* ${phoneVal}`,
    ];
    if (emailVal) lines.push(`✉️ *E-mail:* ${emailVal}`);
    if (messageVal) {
      lines.push('');
      lines.push(`💬 *Mensagem:* ${messageVal}`);
    } else {
      lines.push('');
      lines.push('💬 Gostaria de agendar uma consulta!');
    }

    const text = encodeURIComponent(lines.join('\n'));
    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    // feedback visual
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Abrindo WhatsApp...
    `;

    setTimeout(() => {
      window.open(wa, '_blank');
    }, 500);

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.innerHTML = originalHTML;
    }, 2500);
  });
})();
