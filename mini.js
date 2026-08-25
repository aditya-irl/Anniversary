document.addEventListener('DOMContentLoaded',function()
 {
    createParticles();
    initializeAnimations();
    setupScrollAnimations();
    initScratchCard();
 });


 function createParticles ()
   {
    const particles = document.getElementById('particles');
    const particleEmojis = ['❤️','❣️','💓','💖','💘','💕','💞','💝','💗'];
  
    for(let i=0; i<15; i++)
         {
           const particle = document.createElement('div');
           particle.className ='particle';
           particle.innerHTML = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];

           particle.style.left = Math.random() *100 + '%';
           particle.style.top = Math.random() *100 + '%';

           particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
           particle.style.animationDelay = Math.random() * 2 + 's';
           
           particles.appendChild(particle);

         }
   }


function initializeAnimations ()
    {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach((element,index) => {element.style.animationDelay = (index * 0.2) + 's';});
    }   

function setupScrollAnimations ()
  {
    const observerOptions = 
    {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(
                entry => {
                    if(entry.isIntersecting)
                        {entry.target.classList.add('aos-animate');
                        
                        if(entry.target.classList.contains('message-card'))
                            {
                              animateMessageText();  
                            }
                        }
                     });
            }, observerOptions
        );

    const elementsToObserve = document.querySelectorAll('[data-aos], .section-title, .message-card');
    elementsToObserve.forEach(element => {observer.observe(element);
      
     const delay = element.getAttribute('data-delay');
     if(delay)
        {
            element.style.transitionDelay = delay + 'ms';
        }   
      });    
  }

  function animateMessageText ()
    {
        const messageTexts = document.querySelectorAll('.message-text');
        messageTexts.forEach((text,index) => {
            setTimeout(() => {
                text.classList.add('fade-in-animate');
            },index * 500);
        });
    }


    function scrollToSection (sectionId)
    {
        const section = document.getElementById(sectionId);
        if(section) 
              {
                section.scrollIntoView(
                    {
                        behavior:'smooth',
                        block:'start'
                    });
                 }
              }



  function toggleLike(button)
  {
    const heartIcon = button.querySelector('.heart-icon');
    button.classList.toggle('liked');
     
    if(button.classList.contains('liked'))
    {
        heartIcon.textContent ='❤️';
        createFloatingHeart(button);
    }
    else
    {
        heartIcon.textContent ='🤍';
    }  
  }  

  function createFloatingHeart(button)
    {
     const heart = document.createElement('div');
     heart.innerHTML = '❤️';
     heart.style.position = 'absolute';
     heart.style.fontSize = '1.5rem';
     heart.style.pointerEvents = 'none';
     heart.style.zIndex = '1000';
    

    const rect = button.getBoundingClientRect();
    heart.style.left= (rect.left + window.scrollX) + 'px';
    heart.style.top = (rect.top + window.scrollY) + 'px';
    
    document.body.appendChild(heart);

    heart.animate(
        [
            {transform: 'translateY(0px) scale(1)', opacity:1},
            {transform: 'translateY(-60px) scale(1.5)', opacity:0}
        ],
        {
            duration:1500,
            easing: 'ease-out'

        }).onfinish = () => {
            document.body.removeChild(heart);
        };
    }

 window.addEventListener('scroll',()=> 
    {
       const scrolled = window.scrollY;
       const hero = document.querySelector('.hero');
       const parallaxSpeed = 0.5;

      if(hero)
        {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        } 
       
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle,index) => 
        {
          const speed = 0.2 + (index % 3) * 0.1;
          particle.style.transform = `translateY(${scrolled * speed}px)`;  
        });
    });

 document.addEventListener('mousemove',(e) => {
    const hero = document.querySelector('.hero');
    if(!hero) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const moveX = (x * 0.5) * 20;
    const moveY = (y * 0.5) * 20;

    const floatingHearts = document.querySelector('.floating-hearts');
    if(floatingHearts)
    {
        floatingHearts.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });
  
  
  document.querySelectorAll('button').forEach(button => 
    {
      button.addEventListener('click', function(e)
      {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText =`
         position: absolute;
         width: ${size}px;
         height: ${size}px;
         left: ${x}px;
         top: ${y}px;
         background: rgba(255,255,255,0.5);
         border-radius: 50%;
         transform: scale(0);
         animation: ripple 0.6s ease-out;
         pointer-events: none;

        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        },600);
      });
    });
    
    
    const style = document.createElement('style');
    style.textContent = `
           @keyframes ripple
           {
             to
             {
               transform: scale(2);
               opacity:0;
             }
           }
        `;

     document.head.appendChild(style);
     
     const photoObserver = new IntersectionObserver((entries) => 
        {
          entries.forEach(entry => 
               {
                if(entry.isIntersecting)
                {
                    const img = entry.target.querySelector('img');
                    if(img)
                    {
                        img.style.animation = 'photoEnter 0.8s ease-out forwards';
                    }
                  }
               });  
        }, {threshold: 0.2});


     document.querySelectorAll('.photo-card').forEach(card => 
        {
            photoObserver.observe(card);
        });
        
        
     const photoStyle = document.createElement('style');
     photoStyle.textContent = `
       @keyframes photoEnter
                {
                  from 
                  {
                    transform: scale(0.8) rotate(-5deg);
                    opacity: 0;
                      }

                      to
                      {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                      }
                     }   
                    `;
        
       document.head.appendChild(photoStyle);             
                    
      function initScratchCard() {
          const canvas = document.getElementById('scratch-canvas');
          const container = document.getElementById('scratch-container');
          if (!canvas || !container) return;

          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          let isDrawing = false;
          let lastX = 0;
          let lastY = 0;
          let musicStarted = false;

          function resizeCanvas() {
              canvas.width = container.offsetWidth;
              canvas.height = container.offsetHeight;
              drawCover();
          }

          function drawCover() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
              gradient.addColorStop(0, '#ff9a9e');
              gradient.addColorStop(0.5, '#fecfef');
              gradient.addColorStop(1, '#a1c4fd');
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
              for (let i = 0; i < 40; i++) {
                  ctx.beginPath();
                  ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3 + 1.5, 0, Math.PI * 2);
                  ctx.fill();
              }

              ctx.fillStyle = '#8b3a3a';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              let fontSize = 22;
              if (canvas.width < 480) {
                  fontSize = 16;
              }
              
              ctx.font = `bold ${fontSize}px "Poppins", sans-serif`;
              ctx.fillText('Scratch here to read my message... 💖', canvas.width / 2, canvas.height / 2 - 15);
              
              ctx.font = `${fontSize - 4}px "Poppins", sans-serif`;
              ctx.fillText('(Drag or Swipe your finger)', canvas.width / 2, canvas.height / 2 + 20);
          }

          function playSong() {
              if (!musicStarted) {
                  const song = document.getElementById('birthday-song');
                  if (song) {
                      // If local song.mp3 is missing or fails to load, fall back to online URL
                      if (!song.dataset.fallbackSetup) {
                          song.dataset.fallbackSetup = "true";
                          song.addEventListener('error', function(e) {
                              console.log("Local audio file not found, falling back to online URL...");
                              if (song.src.includes('song.mp3')) {
                                  song.src = "https://archive.org/download/SoftPianoMusicSleepingMusic/Soft%20Piano%20Music%20Sleeping%20Music.mp3";
                                  song.load();
                                  song.play().then(() => {
                                      musicStarted = true;
                                  }).catch(err => {
                                      console.log("Online fallback playback failed:", err);
                                  });
                              }
                          }, true);
                      }

                      song.play().then(() => {
                          musicStarted = true;
                      }).catch(err => {
                          console.log('Audio autoplay blocked or failed:', err);
                      });
                  }
              }
          }

          function getMousePos(e) {
              const rect = canvas.getBoundingClientRect();
              const clientX = e.touches ? e.touches[0].clientX : e.clientX;
              const clientY = e.touches ? e.touches[0].clientY : e.clientY;
              return {
                  x: clientX - rect.left,
                  y: clientY - rect.top
              };
          }

          function scratchStart(e) {
              isDrawing = true;
              const pos = getMousePos(e);
              lastX = pos.x;
              lastY = pos.y;
              playSong();
          }

          function scratch(e) {
              if (!isDrawing) return;
              
              if (e.cancelable) {
                  e.preventDefault();
              }

              const pos = getMousePos(e);

              ctx.globalCompositeOperation = 'destination-out';
              
              ctx.beginPath();
              ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
              ctx.fill();

              ctx.beginPath();
              ctx.lineWidth = 50;
              ctx.lineCap = 'round';
              ctx.moveTo(lastX, lastY);
              ctx.lineTo(pos.x, pos.y);
              ctx.stroke();

              lastX = pos.x;
              lastY = pos.y;
          }

          function scratchEnd() {
              if (!isDrawing) return;
              isDrawing = false;
              checkPercentage();
          }

          function checkPercentage() {
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;
              let cleared = 0;
              let checked = 0;
              const step = 25;

              for (let i = 3; i < data.length; i += 4 * step) {
                  checked++;
                  if (data[i] === 0) {
                      cleared++;
                  }
              }

              const percentage = (cleared / checked) * 100;
              if (percentage > 40) {
                  canvas.style.transition = 'opacity 1s ease';
                  canvas.style.opacity = '0';
                  setTimeout(() => {
                      canvas.remove();
                  }, 1000);
              }
          }

          canvas.addEventListener('mousedown', scratchStart);
          canvas.addEventListener('mousemove', scratch);
          window.addEventListener('mouseup', scratchEnd);

          canvas.addEventListener('touchstart', scratchStart, { passive: false });
          canvas.addEventListener('touchmove', scratch, { passive: false });
          window.addEventListener('touchend', scratchEnd);

          setTimeout(resizeCanvas, 150);

          window.addEventListener('resize', () => {
              if (canvas && document.body.contains(canvas)) {
                  resizeCanvas();
              }
          });
      }