        // --- Lógica de la Carta (Modal) ---
        const modal = document.getElementById('letter-modal');
        const modalBox = document.getElementById('letter-box');
        const flowerContainer = document.querySelector('.flower-container');
        const flowerWrapper = document.getElementById('flowerBtn');

        function createSparkles(container = document.querySelector('.sparkle-container')) {
            if (!container) return;

            container.innerHTML = '';

            for (let i = 0; i < 12; i++) {
                const sparkle = document.createElement('span');
                sparkle.className = 'sparkle';

                const angle = (Math.PI * 2 * i) / 12;
                const radius = 30 + Math.random() * 35;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                sparkle.style.left = '50%';
                sparkle.style.top = '50%';
                sparkle.style.setProperty('--sparkle-x', `${x}px`);
                sparkle.style.setProperty('--sparkle-y', `${y}px`);
                sparkle.style.animationDelay = `${i * 0.03}s`;

                container.appendChild(sparkle);
            }
        }

        if (flowerWrapper) {
            flowerWrapper.addEventListener('mouseenter', () => {
                createSparkles(flowerWrapper.querySelector('.sparkle-container'));
            });
        }

        function openLetter() {
            if (!flowerContainer) return;
            flowerContainer.classList.remove('is-blooming');
            void flowerContainer.offsetWidth;
            flowerContainer.classList.add('is-blooming');
            createSparkles();

            // Mostrar el contenedor (display flex)
            modal.classList.remove('hidden');
            
            // Forzar un reflow para que las transiciones CSS funcionen al quitar el 'hidden'
            void modal.offsetWidth; 

            // Aplicar opacidad y escala para la animación de entrada
            modal.classList.remove('opacity-0');
            modalBox.classList.remove('scale-90');
            modalBox.classList.add('scale-100');

            setTimeout(() => {
                flowerContainer.classList.remove('is-blooming');
            }, 900);
        }

        function closeLetter() {
            // Iniciar animación de salida
            modal.classList.add('opacity-0');
            modalBox.classList.remove('scale-100');
            modalBox.classList.add('scale-90');
            
            // Esperar a que termine la transición (500ms) para ocultar el contenedor
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 500);
        }

        // --- Lógica de los Pétalos Cayendo ---
        const petalsContainer = document.getElementById('petals-container');
        const PETAL_COUNT = 35; // Cantidad de pétalos en pantalla

        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            // Propiedades aleatorias para variedad visual
            const startX = Math.random() * 100; // Posición X inicial (0-100vw)
            const duration = Math.random() * 6 + 4; // Duración de la caída (4s - 10s)
            const delay = Math.random() * 10; // Retraso inicial para que no caigan todos a la vez
            const endX = (Math.random() - 0.5) * 300; // Deriva hacia los lados al caer
            const endRotation = Math.random() * 360 + 360; // Rotación al caer
            
            // Aplicar estilos
            petal.style.left = `${startX}vw`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `-${delay}s`; // Negativo para que ya haya pétalos en pantalla al cargar
            petal.style.setProperty('--end-x', `${endX}px`);
            petal.style.setProperty('--end-rotation', `${endRotation}deg`);
            
            // Variar el tamaño
            const scale = Math.random() * 0.6 + 0.4; // 0.4x a 1.0x
            petal.style.transform = `scale(${scale})`;

            petalsContainer.appendChild(petal);
        }

        // Inicializar los pétalos
        for (let i = 0; i < PETAL_COUNT; i++) {
            createPetal();
        }