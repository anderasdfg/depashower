document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const invitationContent = document.getElementById('invitation-content');
    const envelopeFlap = document.querySelector('.envelope-flap');
    const letter = document.querySelector('.letter');
    const heartSeal = document.querySelector('.heart-seal');
    const letterText = document.querySelector('.letter-text');
    const clickableEnvelope = document.getElementById('clickable-envelope');

    // Crear elemento de audio para el sonido de la carta
    const letterSound = new Audio('assets/letter-sound.mp3');
    
    let animationStarted = false;

    // Leer parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviteParam = urlParams.get('invite');
    const turnoParam = urlParams.get('turno');
    
    // Cambiar fecha y hora según el parámetro 'turno'
    const dateTimeElement = document.querySelector('.datetime-stamp .stamp-text');
    if (turnoParam === '0') {
        dateTimeElement.textContent = '29 de Marzo, 2PM';
    } else if (turnoParam === '1') {
        dateTimeElement.textContent = '30 de Marzo, 5PM';
    }
    
    if (inviteParam) {
        try {
            // Decodificar de base64
            const decodedName = atob(inviteParam);
            
            // Detectar si hay múltiples personas (separadas por 'y' o '&')
            const isMultiple = decodedName.includes(' y ') || decodedName.includes(' & ');
            
            // Personalizar el mensaje según si es singular o plural
            if (isMultiple) {
                letterText.innerHTML = `${decodedName}!<br>Mi primer depaaa es realidad<br>Vengan a celebrar mi depashower`;
            } else {
                letterText.innerHTML = `${decodedName}!<br>Mi primer depaaa es realidad<br>Ven a celebrar mi depashower`;
            }
        } catch (e) {
            // Si hay error al decodificar, mantener el mensaje por defecto
            console.error('Error decodificando el nombre:', e);
        }
    }

    // Función para iniciar la animación
    function startAnimation() {
        if (animationStarted) return;
        animationStarted = true;
        
        // Remover cursor pointer y hover del sobre
        clickableEnvelope.style.cursor = 'default';
        clickableEnvelope.style.transform = 'scale(1)';

        setTimeout(() => {
            envelopeFlap.classList.add('open');
        }, 500);

        setTimeout(() => {
            heartSeal.classList.add('fade');
        }, 1000);

        setTimeout(() => {
            letter.classList.add('slide-up');
            // Reproducir sonido cuando la carta se desliza
            letterSound.play().catch(e => console.log('Error reproduciendo sonido:', e));
        }, 1500);

        setTimeout(() => {
            splashScreen.classList.add('fade-out');
        }, 6500);

        setTimeout(() => {
            invitationContent.classList.remove('hidden');
            setTimeout(() => {
                invitationContent.classList.add('visible');
            }, 50);
        }, 7000);
    }

    // Event listener para el sobre clickeable
    clickableEnvelope.addEventListener('click', startAnimation);
});
