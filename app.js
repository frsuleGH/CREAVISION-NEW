document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    scrollNav();
    navegacionFija();
   
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navigation a');
    enlaces.forEach(enlaces =>{
        enlaces.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: 'smooth'});
        })
    })
}



function navegacionFija(){
    const barra = document.querySelector('.header');
    const servicios = document.querySelector('.principal');
    

    window.addEventListener('scroll', function(){
        if( servicios.getBoundingClientRect().top < 0 ){
            barra.classList.add('fijo');
          
        } else{
            barra.classList.remove('fijo');
            
        }
    });
}
