module.exports = {
  locals: {
    defaultLanguage: "en",
    languages: ["ru", "en", "de"],

    name: {
      ru: "Никита Карамов",
      en: "Nikita Karamov",
      de: "Nikita Karamov"
    },
    descriptionMeta: {
      ru:
        "Фронтенд-разработчик и опенсурс-энтузиаст, любящий TypeScript, Python и Go.",
      en:
        "Front End Developer and Open Source enthusiast fond of TypeScript, Python and Go.",
      de:
        "Front-End-Entwickler und Open-Source-Enthusiast, der TypeScript, Python und Go lieb hat."
    },
    description: {
      ru: [
        "Привет! Я — фронтенд-разработчик и опенсурс-энтузиаст из Казани. В данный момент живу в Брауншвейге (Германия).",
        "Я пишу веб-приложения на Vue, библиотеки на TypeScript и скрипты на Python и Go. Имею опыт работы с бэкендом, в частности с Django, Flask, Express. Умею обращаться с SQL - базами данных. Знаю, как собрать и задеплоить приложение в Docker."
      ],
      en: [
        "Hi! I am a Front End Developer and an Open Source enthusiast from Kazan, Russia. Currently studying in Braunschweig, Germany.",
        "I create Vue web apps, TypeScript libraries and write scripts on Python and Go. I have experience with Back End, in particular, Django, Flask, Express. I can handle SQL Databases and I know how to package and deploy an app with Docker."
      ],
      de: [
        "Hallo! Ich bin ein Front-End-Entwickler und ein Open-Source-Enthusiast aus Kasan, Russland; ich studiere derzeit in Braunschweig.",
        "Ich entwickle Vue.js-Web-Anwendungen und TypeScript-Bibliotheken, schreibe Skripte auf Python und Go. Ich habe Erfahrung mit Back-End, insbesondere mit Django, Flask und Express. Ich kann gut mit SQL-Datenbanken umgehen und weiß, wie man Software mit Docker packt und verteilt."
      ]
    },

    socials: [
      {
        slug: "vk",
        link: "https://vk.com/nickkaramoff",
        name: {
          ru: "ВКонтакте",
          en: "VK",
          de: "VK"
        }
      },
      {
        slug: "twitter",
        link: "https://twitter.com/nickkaramoff",
        name: {
          ru: "Твиттер",
          en: "Twitter",
          de: "Twitter"
        }
      },
      {
        slug: "telegram",
        link: "https://t.me/nickkaramoff",
        name: {
          ru: "Телеграм",
          en: "Telegram",
          de: "Telegram"
        }
      },
      {
        slug: "patreon",
        link: "https://patreon.com/NickKaramoff",
        name: {
          ru: "Патреон",
          en: "Patreon",
          de: "Patreon"
        }
      },
      {
        slug: "github",
        link: "https://github.com/nickkaramoff",
        name: {
          ru: "Гитхаб",
          en: "GitHub",
          de: "GitHub"
        }
      },
      {
        slug: "linkedin",
        link: "https://linkedin.com/in/karamoff",
        name: {
          ru: "Линкедин",
          en: "LinkedIn",
          de: "LinkedIn"
        }
      },
      {
        slug: "mail",
        link: "mailto:nick@karamoff.ru",
        name: {
          ru: "Почта",
          en: "E-Mail",
          de: "E-Mail"
        }
      }
    ],

    listModules: [
      {
        slug: "projects",
        title: {
          ru: "Проекты",
          en: "Projects",
          de: "Projekte"
        },
        items: [
          {
            slug: "pretty-money",
            href: "https://s.karamoff.ru/pretty-money",
            name: "pretty-money",
            description: {
              ru: "JS-библиотека для форматирования валютных значений",
              en: "A currency formatting library for JS",
              de: "Eine JS-Bibliothek für Währungsformatierung"
            },
            year: "2019"
          },
          {
            slug: "vavilon",
            href: "https://s.karamoff.ru/vavilon-js-github",
            name: "vavilon.js",
            description: {
              ru: "i18n-движок для статических сайтов",
              en: "An i18n engine for static websites",
              de: "i18n-Engine für statische Webseiten"
            },
            year: "2019"
          },
          {
            slug: "conspects",
            href: "https://s.karamoff.ru/topconspects",
            name: {
              ru: "Топовые конспекты",
              en: "Top Abstracts",
              de: "Top Skripte"
            },
            description: {
              ru: "Статический сайт на Bootstrap 4",
              en: "A static website built with Bootstrap 4 (in Russian)",
              de: "Statische Webseite erstellt mit Bootstrap 4 (Russisch)"
            },
            year: "2018"
          },
          {
            slug: "arithmaster",
            href: "https://s.karamoff.ru/arithmaster",
            name: "Arithmaster",
            description: {
              ru: "Арифметическая игра для Android",
              en: "An arithmetics game for Android",
              de: "Arithmetikspiel für Android"
            },
            year: "2017"
          },
          {
            slug: "bussow",
            href: "https://s.karamoff.ru/bussow",
            name: {
              ru: "Художник Василий Бусов",
              en: "Vasiliy Busov",
              de: "Wassili Bussow"
            },
            description: {
              ru: "Статический сайт на Bootstrap 3",
              en: "A static website built with Bootstrap 3 (in Russian)",
              de: "Statische Webseite erstellt mit Bootstrap 3 (Russisch)"
            },
            year: "2014"
          }
        ]
      }
    ]
  }
};
