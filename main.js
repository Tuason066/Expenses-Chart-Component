const graphDays = document.querySelector('.graph__days');
const graphBars = document.querySelector('.graph__bars');

fetch('./data.json')
    .then(response => response.json())
    .then(data => {

        let days = [];
        let amounts = [];
        const average = 70;

        for(let i = 0; i < data.length; i++) {
            days.push(data[i].day);
            amounts.push(data[i].amount);
        };

        // ======== days
        const day = days.map(item => {
            return `<p>${item}</p>`;
        }).join('');

        graphDays.innerHTML = day;
        
        // =========== bar items
        const barItems = amounts.map(item => {
            return `<div class="bar">
                        <p class="bar__tooltip">$${item}</p>
                    </div>`;
        }).join('');

        graphBars.innerHTML = barItems;

        // =========== bar heights & hover effect
        const maxHeight = Math.max(...amounts);
        const bars = document.querySelectorAll('.bar');

        for(let i = 0; i < bars.length; i++) {
            if(amounts[i] == maxHeight) {
                bars[i].style.backgroundColor = `hsl(186, 34%, 60%)`;
                bars[i].classList.add('longest');
            };
            bars[i].style.height = `${100 * amounts[i] / average}%`;
        };

        graphBars.addEventListener('mouseover', e => {
            const element = e.target;
            const tooltip = element.querySelector('.bar__tooltip');

            if(element.classList.contains('bar')) {

                element.style.backgroundColor = `hsla(10, 79%, 65%, 0.75)`;
                if(element.classList.contains('longest')) {
                    element.style.backgroundColor = `hsla(186, 34%, 60%, .75)`;
                };

                tooltip.style.opacity = 1;
            };
        });
        graphBars.addEventListener('mouseout', e => {
            const element = e.target;
            const tooltip = element.querySelector('.bar__tooltip');

            if(element.classList.contains('bar')) {

                element.style.backgroundColor = `hsl(10, 79%, 65%)`;
                if(element.classList.contains('longest')) {
                    element.style.backgroundColor = `hsl(186, 34%, 60%)`;
                };

                tooltip.style.opacity = 0;
            };
        });

    });