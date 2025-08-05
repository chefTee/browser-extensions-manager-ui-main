document.addEventListener('DOMContentLoaded', () => {
  let extensionData = [];
  const allButton = document.getElementById('all-button');
  const activeButton = document.getElementById('active-button');
  const inActiveButton = document.getElementById('inactive-button');
  allButton.addEventListener('click', () => {
      renderExtensions(extensionData);
  });

  activeButton.addEventListener('click', () => {
    const filteredExtension = extensionData.filter((extension) => extension.isActive);
    renderExtensions(filteredExtension);
  });

  inActiveButton.addEventListener('click', () => {
    const filteredExtension = extensionData.filter((extension) => !extension.isActive);
    renderExtensions(filteredExtension);
  });

  const themeMode = document.querySelector('.theme-mode');
  const themeIcon = document.getElementById('theme-icon');
    // CHECKING THE USER'S DEFUALT PREFERED COLOR THEME
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        document.documentElement.classList.add("dark");
        themeIcon.src = './assets/images/icon-sun.svg';
    }else{
        document.documentElement.classList.remove("dark");
        themeIcon.src = './assets/images/icon-moon.svg'
    }

    themeMode.addEventListener('click', () => {
        document.documentElement.classList.toggle("dark");
        if(!document.documentElement.classList.contains('dark')){
            themeIcon.src = './assets/images/icon-moon.svg'
        }else{
            themeIcon.src = './assets/images/icon-sun.svg';
        }
    });

    fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      extensionData = data;
      renderExtensions(extensionData);
      }
    );

    function renderExtensions(extensions){
      const extensionContainer = document.querySelector('.extension-container');
      extensionContainer.innerHTML = '';
      extensions.forEach(extension => {
        const extensionCard = document.createElement('div');
        extensionCard.className = "ext p-3.5 w-[95%] mx-auto bg-[hsl(200,60%,99%)] shadow-md rounded-2xl space-y-15 dark:bg-[hsl(226,25%,17%)] dark:border dark:border-[hsl(226,11%,37%)] md:w-full";
        extensionCard.innerHTML = `
          <div class="flex space-x-3">
          <div class="ext-logo">
            <img src="${extension.logo}" alt="logo">
          </div>
          <div class="ext-details text-wrap">
            <p class="name text-[hsl(227,75%,14%)] font-extrabold text-xl dark:text-white">${extension.name}</p>
            <p class="description text-base text-[hsl(226,11%,37%)] dark:text-[hsl(0,0%,93%)] font-normal">${extension.description}</p>
          </div>
          </div>
          <div class="flex items-center justify-between">
            <button type="button" class="remove-btn px-3 py-2 font-bold border text-sm border-[hsl(0,0%,93%)] rounded-full cursor-pointer hover:bg-[hsl(3,86%,64%)] hover:text-white dark:text-white hover:dark:text-[hsl(227,75%,14%)] dark:hover:border-[hsl(3,86%,64%)] focus:outline-2 focus:outline-[hsl(3,77%,44%)] outline-offset-2 focus:bg-[hsl(0,0%,93%)] focus:text-[hsl(227,75%,14%)] dark:focus:bg-[hsl(226,11%,37%)] dark:focus:border-[hsl(226,11%,37%)]">Remove</button>
            <div class="toogle-button cursor-pointer">
              <label class="relative inline-block w-[55px] h-[30px]">
                <input type="checkbox" class="sr-only peer" id="switch-checkbox">
                <span class="block w-full h-full rounded-full bg-[hsl(226,11%,37%)] peer-checked:bg-[hsl(3,86%,64%)] transition-colors duration-300 peer-focus:outline-1 peer-focus:outline-[hsl(3,86%,64%)] peer-focus:outline-offset-2"></span>
                <span class="absolute left-[3px] bottom-[3.5px] w-[23px] h-[23px] bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-[25px]"></span>
              </label>
            </div>
          </div>
        `;
        const removeButton = extensionCard.querySelector('.remove-btn');
        removeButton.addEventListener('click', () => {
        extensionCard.remove();
        });

        // const toogleSwitch = document.querySelector('#switch-checkbox');
        const toogleSwitch = extensionCard.querySelector('.sr-only');
        toogleSwitch.checked = extension.isActive;
        toogleSwitch.addEventListener('change', () => {
          extension.isActive = toogleSwitch.checked;
        });


        extensionContainer.appendChild(extensionCard);
      });
     };

});