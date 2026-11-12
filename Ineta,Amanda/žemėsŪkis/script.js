document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobilus meniu
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // 2. Statistikos skaitiklių animacija
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(num => {
        const target = parseFloat(num.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        let current = 0;
        const steps = 40;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                num.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
                clearInterval(timer);
            } else {
                num.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
            }
        }, 30);
    });

    // 3. Sezoninis darbų kalendorius
    const seasonData = {
        pavasaris: {
            title: 'Pavasario darbai (Kovas – Gegužė)',
            tasks: [
                'Žieminių pasėlių būklės įvertinimas po žiemos ir pirmasis tręšimas azotu.',
                'Dirvos paruošimas ir vasarinių javų (miežių, avižų, kviečių) bei žirnių sėja.',
                'Bulvių sodinimas dirvai įšilus iki +7–8 °C.',
                'Vaismedžių genėjimas soduose ir augalų apsauga nuo pavasarinių kenkėjų.'
            ]
        },
        vasara: {
            title: 'Vasaros darbai (Birželis – Rugpjūtis)',
            tasks: [
                'Šienapjūtė ir pašarų (šienainio, siloso) ruošimas gyvulininkystės ūkiuose.',
                'Pasėlių priežiūra, apsauga nuo ligų ir kenkėjų.',
                'Javapjūtė: žieminių rapsų ir javų kūlimas bei grūdų džiovinimas.',
                'Dirvos skutimas po derliaus nuėmimo ir pasiruošimas žieminių rapsų sėjai.'
            ]
        },
        ruduo: {
            title: 'Rudens darbai (Rugsėjis – Lapkritis)',
            tasks: [
                'Žieminių kviečių, rugių ir kvietrugių sėja optimaliais terminais.',
                'Vėlyvųjų daržovių, bulvių ir cukrinių runkelių derliaus nuėmimas.',
                'Dirvožemio tyrimai, kalkinimas ir rudeninis arimas arba skutimas.',
                'Žemės ūkio technikos valymas, tepimas ir paruošimas žiemojimui.'
            ]
        },
        ziema: {
            title: 'Žiemos darbai (Gruodis – Vasaris)',
            tasks: [
                'Sėklų paruošimas, valymas ir daigumo patikra laboratorijoje.',
                'Trąšų ir augalų apsaugos priemonių planavimas bei įsigijimas.',
                'Technikos remontas dirbtuvėse ir pasiruošimas pavasario sezonui.',
                'Sėjomainos planų sudarymas ir paraiškų paramai ruošimas.'
            ]
        }
    };

    const seasonContent = document.getElementById('seasonContent');
    const tabButtons = document.querySelectorAll('.tab-btn');

    function renderSeason(seasonKey) {
        const data = seasonData[seasonKey];
        seasonContent.innerHTML = `
            <h3>${data.title}</h3>
            <ul class="season-list">
                ${data.tasks.map(task => `<li>✅ <span>${task}</span></li>`).join('')}
            </ul>
        `;
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSeason(btn.getAttribute('data-season'));
        });
    });

    renderSeason('pavasaris');

    // 4. Sėklos ir derliaus skaičiuoklė
    const crops = {
        kvieciai: { seedPerHa: 200, avgYield: 6.2 },
        rapsai:   { seedPerHa: 4.5, avgYield: 3.5 },
        mieziai:  { seedPerHa: 180, avgYield: 4.8 },
        zirniai:  { seedPerHa: 240, avgYield: 3.4 },
        bulves:   { seedPerHa: 2800, avgYield: 28.0 }
    };

    const yieldForm = document.getElementById('yieldForm');

    function calculateYield() {
        const cropKey = document.getElementById('cropSelect').value;
        const area = parseFloat(document.getElementById('areaInput').value) || 0;
        const multiplier = parseFloat(document.getElementById('soilQuality').value);

        const crop = crops[cropKey];
        const totalSeedKg = crop.seedPerHa * area;
        const expectedYieldPerHa = crop.avgYield * multiplier;
        const totalYieldTons = expectedYieldPerHa * area;

        document.getElementById('seedRate').textContent = `${crop.seedPerHa} kg/ha`;
        document.getElementById('totalSeed').textContent = totalSeedKg >= 1000
            ? `${(totalSeedKg / 1000).toFixed(2)} t (${Math.round(totalSeedKg)} kg)`
            : `${Math.round(totalSeedKg)} kg`;
        document.getElementById('yieldPerHa').textContent = `${expectedYieldPerHa.toFixed(1)} t/ha`;
        document.getElementById('totalYield').textContent = `${totalYieldTons.toFixed(1)} t`;
    }

    yieldForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateYield();
    });

    calculateYield();

    // 5. Straipsniai ir Modal langas
    const articles = [
        {
            tag: 'Dirvožemis',
            title: 'Kodėl tarpiniai pasėliai tampa būtinybe moderniame ūkyje?',
            summary: 'Tarpiniai augalai apsaugo dirvą nuo erozijos, sulaiko azotą ir praturtina žemę organine medžiaga.',
            content: [
                'Tarpiniai pasėliai (garstyčios, ridikai, facelijos, dobilai) sėjami nuėmus pagrindinį derlių. Jie neleidžia dirvožemiui likti plikam rudenį ir žiemą.',
                'Gilios šių augalų šaknys purena podirvį, gerina vandens pralaidumą ir iš gilesnių sluoksnių iškelia maisto medžiagas į paviršių.',
                'Be to, tarpiniai augalai slopina piktžolių dygimą ir skatina naudingų dirvožemio mikroorganizmų bei sliekų veiklą.'
            ]
        },
        {
            tag: 'Technologijos',
            title: 'Tikslioji žemdirbystė: GPS ir kintamos normos tręšimas',
            summary: 'Kaip palydoviniai laukų žemėlapiai padeda sutaupyti iki 15 % trąšų ir suvienodinti pasėlių derlingumą.',
            content: [
                'Skirtingose to paties lauko vietose dirvožemio sudėtis ir maisto medžiagų kiekis gali skirtis kelis kartus.',
                'Naudojant NDVI palydovinius žemėlapius bei dirvožemio ėminių duomenis, barstytuvai ir purkštuvai automatiškai keičia normą važiuodami per lauką.',
                'Tai leidžia nepertręšti derlingų zonų, sustiprinti silpnesnes vietas ir sumažinti neigiamą poveikį aplinkai.'
            ]
        },
        {
            tag: 'Sėjomaina',
            title: 'Taisyklingos sėjomainos nauda kovojant su ligomis ir kenkėjais',
            summary: 'Kultūrų kaitaliojimas laukuose natūraliai mažina ligų sukėlėjų plitimą ir didina grūdų kokybę.',
            content: [
                'Atsėliuojant tuos pačius javus kelerius metus iš eilės, dirvoje kaupiasi pašaknio ligų sukėlėjai ir specifinės piktžolės.',
                'Įtraukus į sėjomainą ankštines kultūras (žirnius, pupas), dirvožemis natūraliai praturtinamas biologiniu azotu.',
                'Optimali 4–5 laukų sėjomaina leidžia stabilizuoti derlių net ir nepalankiais meteorologiniais metais.'
            ]
        }
    ];

    const articlesGrid = document.getElementById('articlesGrid');
    const modal = document.getElementById('articleModal');
    const modalClose = document.getElementById('modalClose');

    articles.forEach((article, index) => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.innerHTML = `
            <div>
                <span class="article-tag">${article.tag}</span>
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
            </div>
            <button class="read-more-btn" data-index="${index}">Skaityti daugiau →</button>
        `;
        articlesGrid.appendChild(card);
    });

    articlesGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more-btn')) {
            const idx = e.target.getAttribute('data-index');
            const article = articles[idx];
            document.getElementById('modalTag').textContent = article.tag;
            document.getElementById('modalTitle').textContent = article.title;
            document.getElementById('modalBody').innerHTML = article.content.map(p => `<p>${p}</p>`).join('');
            modal.classList.add('open');
        }
    });

    modalClose.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });

    // 6. Kontaktų forma
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('senderName').value.trim();
        formFeedback.textContent = `Ačiū, ${name}! Jūsų žinutė sėkmingai išsiųsta.`;
        contactForm.reset();
    });
});