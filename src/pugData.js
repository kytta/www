module.exports = {
    defaultLanguage: 'en',
    languages: ['ru', 'en', 'de'],

    name: {
        ru: 'Никита Карамов',
        en: 'Nikita Karamov',
        de: 'Nikita Karamov',
    },
    descriptionMeta: {
        ru:
            'Фронтенд-разработчик и опенсурс-энтузиаст, любящий TypeScript и Vue.',
        en:
            'Front End Developer and Open Source enthusiast fond of TypeScript and Vue.',
        de:
            'Front-End-Entwickler und Open-Source-Enthusiast, der TypeScript und Vue lieb hat.',
    },
    description: {
        ru: [
            'Привет! Я — фронтенд-разработчик и опенсурс-энтузиаст.',
            'Я пишу веб-приложения на Vue и Svelte, библиотеки на TypeScript и скрипты на Python и Go. Имею опыт работы с бэкендом, в частности с Django, Flask и Express. Умею обращаться с РСУБД. Знаю, как собрать и задеплоить приложение в Docker.',
        ],
        en: [
            'Hi! I am a Front End Developer and an Open Source enthusiast.',
            'I create web apps with Vue and Svelte, libraries with TypeScript and scripts with Python and Go. I have experience with Back End, in particular, Django, Flask, and Express. I can handle RDBMS and I know how to package and deploy apps with Docker.',
        ],
        de: [
            'Hi! Ich bin ein Front-End-Entwickler und ein Open-Source-Enthusiast.',
            'Ich entwickle Vue- und Svelte-Web-Apps, TypeScript-Bibliotheken und Python- und Go-Skripte. Ich habe Erfahrung mit Back-End, insbesondere mit Django, Flask und Express. Ich kann gut mit RDBMS umgehen und weiß, wie man Software mit Docker packt und verteilt.',
        ],
    },

    socials: [
        {
            slug: 'soc-tg',
            link: 'https://t.me/nickkaramoff',
            name: {
                ru: 'Телеграм',
                en: 'Telegram',
                de: 'Telegram',
            },
            color: '#179CDE'
        },
        {
            slug: 'soc-em',
            link: 'mailto:nick@karamoff.dev',
            name: {
                ru: 'Почта',
                en: 'E-Mail',
                de: 'E-Mail',
            },
            color: '#669999'
        },
        {
            slug: 'soc-tw',
            link: 'https://twitter.com/nickkaramoff',
            name: {
                ru: 'Твиттер',
                en: 'Twitter',
                de: 'Twitter',
            },
            color: '#1DA1F2'
        },
        {
            slug: 'soc-li',
            link: 'https://linkedin.com/in/karamoff',
            name: {
                ru: 'Линкедин',
                en: 'LinkedIn',
                de: 'LinkedIn',
            },
            color: '#0077B5'
        },
        {
            slug: 'soc-gh',
            link: 'https://github.com/nickkaramoff',
            name: {
                ru: 'Гитхаб',
                en: 'GitHub',
                de: 'GitHub',
            },
            color: '#171515'
        },
        {
            slug: 'soc-pa',
            link: 'https://patreon.com/NickKaramoff',
            name: {
                ru: 'Патреон',
                en: 'Patreon',
                de: 'Patreon',
            },
            color: '#f96854'
        },
        {
            slug: 'soc-pg',
            link: 'https://keys.openpgp.org/vks/v1/by-fingerprint/3CC5EA53F4DFEFCA568C41A0E40DFE6E993540FF',
            name: {
                ru: 'ПГП',
                en: 'PGP',
                de: 'PGP',
            },
            color: '#4aa3ff'
        },
    ],

    listModules: [
        {
            slug: 'projects',
            title: {
                ru: 'Проекты',
                en: 'Projects',
                de: 'Projekte',
            },
            items: [
                {
                    slug: 'shareon',
                    href: 'https://shareon.js.org',
                    name: 'shareon',
                    description: {
                        ru: 'Легковесные социальные кнопки без слежки',
                        en: 'Lightweight and ethical share buttons',
                        de: 'Leichte und ethische Freigabe-Schaltflächen',
                    },
                    year: '2020',
                },
                {
                    slug: 'vue-tinybox',
                    href: 'https://os.karamoff.dev/vue-tinybox',
                    name: 'vue-tinybox',
                    description: {
                        ru: 'Lightbox-галерея для Vue.js',
                        en: 'A lightbox gallery for Vue.js',
                        de: 'Lightbox-Galerie für Vue.js',
                    },
                    year: '2020',
                },
                {
                    slug: 'pretty-money',
                    href: 'https://os.karamoff.dev/pretty-money',
                    name: 'pretty-money',
                    description: {
                        ru: 'JS-библиотека для форматирования валютных значений',
                        en: 'A currency formatting library for JS',
                        de: 'Eine JS-Bibliothek für Währungsformatierung',
                    },
                    year: '2019',
                },
                {
                    slug: 'vavilon',
                    href: 'https://vavilon.js.org',
                    name: 'vavilon.js',
                    description: {
                        ru: 'i18n-движок для статических сайтов',
                        en: 'An i18n engine for static websites',
                        de: 'i18n-Engine für statische Webseiten',
                    },
                    year: '2019',
                },
                {
                    slug: 'conspects',
                    href: 'https://conspects.karamoff.dev/',
                    name: {
                        ru: 'Топовые конспекты',
                        en: 'Top Abstracts',
                        de: 'Top Skripte',
                    },
                    description: {
                        ru: 'Статический сайт на Bootstrap 4',
                        en: 'A static website built with Bootstrap 4 (in Russian)',
                        de: 'Statische Webseite erstellt mit Bootstrap 4 (Russisch)',
                    },
                    year: '2018',
                },
                {
                    slug: 'arithmaster',
                    href: 'https://play.google.com/store/apps/details?id=ru.karamoff.kawan_kawan.arithmaster',
                    name: 'Arithmaster',
                    description: {
                        ru: 'Арифметическая игра для Android',
                        en: 'An arithmetics game for Android',
                        de: 'Arithmetikspiel für Android',
                    },
                    year: '2017',
                },
                {
                    slug: 'bussow',
                    href: 'https://bussow.ru',
                    name: {
                        ru: 'Художник Василий Бусов',
                        en: 'Vasiliy Busov',
                        de: 'Wassili Bussow',
                    },
                    description: {
                        ru: 'Статический сайт на Bootstrap 3',
                        en: 'A static website built with Bootstrap 3 (in Russian)',
                        de: 'Statische Webseite erstellt mit Bootstrap 3 (Russisch)',
                    },
                    year: '2014',
                },
            ],
        },
    ],
};
