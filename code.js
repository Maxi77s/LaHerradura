// Clase CarruselPresentacion
class CarruselPresentacion {
  constructor(slides, intervalTime = 5000) {
    this.slides = slides;
    this.currentSlide = 0;
    this.interval = null;
    this.intervalTime = intervalTime;
  }

  start() {
    this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
  }

  stop() {
    clearInterval(this.interval);
  }

  nextSlide() {
    this.slides[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.slides[this.currentSlide].classList.add('active');
  }
}

// Clase BotonDesplazamiento
class BotonDesplazamiento {
  constructor(buttonId, destinationId) {
    this.scrollButton = document.getElementById(buttonId);
    this.seccionDestino = document.getElementById(destinationId);
    
    if (this.scrollButton && this.seccionDestino) {
      this.scrollButton.addEventListener('click', () => this.scrollToDestination());
    }
  }

  scrollToDestination() {
    const seccionPosicion = this.seccionDestino.offsetTop;
    window.scrollTo({
      top: seccionPosicion,
      behavior: 'smooth'
    });
  }
  

}

// Uso de las clases
const slides = document.querySelectorAll('.slide');
const carousel = new CarruselPresentacion(slides);
carousel.start(); // Comienza el carrusel
const boton1 = new BotonDesplazamiento('Boton1', 'Destino1');

//CarouselGaleria 
class Carousel {
  constructor(carouselSelector, iconSelectors, firstImgSelector) {
    this.carousel = document.querySelector(carouselSelector);
    this.firstImg = this.carousel.querySelector(firstImgSelector);
    this.arrowIcons = document.querySelectorAll(iconSelectors);
    this.isDragStart = false;
    this.isDragging = false;
    this.prevPageX = null;
    this.prevScrollLeft = null;
    this.positionDiff = null;

    this.showHideIcons();
    this.initListeners();
  }

  showHideIcons() {
    let scrollWidth = this.carousel.scrollWidth - this.carousel.clientWidth;
    this.arrowIcons[0].style.display = this.carousel.scrollLeft === 0 ? 'none' : 'block';
    this.arrowIcons[1].style.display = this.carousel.scrollLeft === scrollWidth ? 'none' : 'block';
  }

  initListeners() {
    this.arrowIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        let firstImgWidth = this.firstImg.clientWidth + 14;
        this.carousel.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
        setTimeout(() => this.showHideIcons(), 60);
      });
    });

    this.carousel.addEventListener('mousedown', this.dragStart.bind(this));
    this.carousel.addEventListener('touchstart', this.dragStart.bind(this));
    document.addEventListener('mousemove', this.dragging.bind(this));
    this.carousel.addEventListener('touchmove', this.dragging.bind(this));
    document.addEventListener('mouseup', this.dragStop.bind(this));
    this.carousel.addEventListener('touchend', this.dragStop.bind(this));
  }

  dragStart(e) {
    this.isDragStart = true;
    this.prevPageX = e.pageX || e.touches[0].pageX;
    this.prevScrollLeft = this.carousel.scrollLeft;
  }

  dragging(e) {
    if (!this.isDragStart) return;
    e.preventDefault();
    let positionDiff = (e.pageX || e.touches[0].pageX) - this.prevPageX;
    this.carousel.scrollLeft = this.prevScrollLeft - positionDiff;
  }

  dragStop() {
    this.isDragStart = false;
    this.carousel.classList.remove('dragging');
    if (!this.isDragging) return;
    this.isDragging = false;
    this.autoSlide();
  }

  autoSlide() {
    // Implement your autoSlide logic here
  }
}

// Uso del objeto Carousel
const myCarousel = new Carousel('.carouselGaleria', '.containerC i', 'img');


let isFixed = false;
let allBotones = document.getElementById("allBotones");
let allBotonesPosition = allBotones.getBoundingClientRect().top + window.scrollY;

window.addEventListener("scroll", function() {
    const currentScroll = window.scrollY;
    const shouldFix = currentScroll > allBotonesPosition;

    if (shouldFix !== isFixed) {
        isFixed = shouldFix;

        if (shouldFix) {
            allBotones.style.position = 'fixed';
            allBotones.style.top = '0';
            allBotones.style.left = '50%';
            allBotones.style.transform = 'translateX(-50%)';
            allBotones.style.zIndex = '999';
            allBotones.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            allBotones.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        } else {
            allBotones.style.position = 'static';
            allBotones.style.top = 'auto';
            allBotones.style.left = 'auto';
            allBotones.style.transform = 'none';
            allBotones.style.zIndex = 'auto';
            allBotones.style.backgroundColor = 'transparent';
            allBotones.style.boxShadow = 'none';
        }
    }
});

function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);

  if (section) {
      section.scrollIntoView({ behavior: 'smooth' , block: 'start' });
  }
}

// Obtener elementos del DOM
const widthElement = document.querySelector('.width');
const heightElement = document.querySelector('.height');

function mostrarMensajeExito() {
  // Mostrar el mensaje de éxito
  var mensajeExito = document.getElementById("mensaje-exito");
  mensajeExito.textContent = "¡Tu mensaje se ha enviado con éxito!";
  mensajeExito.style.display = "block";
}

// Verificar si el mensaje debe mostrarse al cargar la página
window.onload = function() {
  var mensajeEnviado = sessionStorage.getItem("mensajeEnviado");
  if (mensajeEnviado === "true") {
    mostrarMensajeExito();
    // Limpiar sessionStorage después de mostrar el mensaje
    sessionStorage.removeItem("mensajeEnviado");
  }
};

// Obtener el parámetro 'enviado' de la URL
var urlParams = new URLSearchParams(window.location.search);
var enviado = urlParams.get('enviado');

// Mostrar el mensaje si el formulario se ha enviado
if (enviado === "true") {
  mostrarMensajeExito();
  // Almacenar el estado del mensaje en sessionStorage
  sessionStorage.setItem("mensajeEnviado", "true");
  
}
