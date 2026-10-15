const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 12), { passive: true });
header.classList.toggle('scrolled', scrollY > 12);

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const works = {
  'Coronas de zirconio': 'Restauraciones de alta resistencia y excelente estética, diseñadas digitalmente para una integración precisa en cada caso.',
  'Coronas de disilicato': 'Restauraciones estéticas de disilicato, pensadas para lograr naturalidad, translucidez y un ajuste confiable.',
  'Incrustaciones de zirconio': 'Soluciones conservadoras de zirconio, planificadas para devolver función y resistencia al remanente dentario.',
  'Incrustaciones de disilicato': 'Incrustaciones estéticas de disilicato para restauraciones conservadoras y de alta precisión.',
  'Encerados diagnósticos': 'Una herramienta visual y clínica para anticipar el resultado del tratamiento y ordenar la planificación.',
  'Modelos 3D': 'Modelos digitales y físicos que aportan precisión al diagnóstico, la planificación y la comunicación del caso.',
  'Escaneo de modelos': 'Digitalización de modelos para integrarlos al flujo de diseño CAD/CAM de manera ágil y trazable.',
  'Planificación de guías quirúrgicas': 'Planificación digital para transformar la información clínica y radiográfica en una cirugía más previsible.',
  'Impresión de guías quirúrgicas': 'Guías quirúrgicas impresas con control de diseño y fabricación para acompañar cada intervención.',
  'Protectores bucales': 'Protectores personalizados que priorizan ajuste, comodidad y protección para cada paciente.'
};
const modal = document.querySelector('.work-modal');
const workTitle = document.querySelector('#work-title');
const workDescription = document.querySelector('#work-description');
const workImage = document.querySelector('#work-image');
let selectedWork = '';

// 1. Listado de imágenes correspondientes a cada uno de los 10 trabajos
const imagenesTrabajos = {
  'Coronas de zirconio': 'Fotos/coronas-zirconio.jpeg',
  'Coronas de disilicato': 'Fotos/coronas-disilicato.jpeg',
  'Incrustaciones de zirconio': 'Fotos/incrustaciones-zirconio.jpeg',
  'Incrustaciones de disilicato': 'Fotos/incrustaciones-disilicato.jpeg',
  'Encerados diagnósticos': 'Fotos/encerados.jpeg',
  'Modelos 3D': 'Fotos/modelos-3d.jpeg',
  'Escaneo de modelos': 'Fotos/escaneo.jpeg',
  'Planificación de guías quirúrgicas': 'Fotos/planificacion-guias.jpeg',
  'Impresión de guías quirúrgicas': 'Fotos/impresion-guias.jpeg',
  'Protectores bucales': 'Fotos/protectores.jpeg'
};

// 2. Evento modificado para cargar la foto
document.querySelectorAll('.solution button').forEach(button => button.addEventListener('click', () => {
  const savedScrollY = window.scrollY;
  selectedWork = button.dataset.work;
  workTitle.textContent = selectedWork;
  workDescription.textContent = works[selectedWork];
  
  // ACÁ ASIGNAMOS TU FOTO REAL DINÁMICAMENTE
  if (imagenesTrabajos[selectedWork]) {
    workImage.src = imagenesTrabajos[selectedWork];
    workImage.style.display = 'block'; 
  } else {
    workImage.removeAttribute('src'); 
  }
  
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => window.scrollTo(0, savedScrollY));
}));

const closeWorkModal = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); };
document.querySelector('.modal-close')?.addEventListener('click', closeWorkModal);
modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeWorkModal);
document.querySelector('#work-cta')?.addEventListener('click', () => {
  const select = document.querySelector('[name="tipo"]');
  const matches = [...select.options].find(option => option.textContent.trim() === selectedWork || selectedWork.includes(option.textContent.trim()));
  if (matches) select.value = matches.value;
  closeWorkModal();
});

document.querySelector('#case-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = Object.fromEntries(new FormData(form));
  const message = `Hola, quiero enviar un caso a VILAB.\n\nNombre: ${values.nombre}\nMatrícula: ${values.matricula}\nWhatsApp: ${values.whatsapp}\nEmail: ${values.email}\nTipo de trabajo: ${values.tipo}\nMensaje: ${values.mensaje || '-'}`;
  window.open(`https://wa.me/5493813333555?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
