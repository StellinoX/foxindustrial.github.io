(function () {
  'use strict';

  const STORAGE_KEY = 'fox-industrial-admin-works-v1';

  const defaultWorks = [
    {
        "id": "project-warehouse-nippon-gases",
        "type": "project",
        "status": "completed",
        "year": "2024",
        "title": "Warehouse Nippon Gases",
        "client": "Nippon Gases",
        "location": "Italia",
        "summary": "Montaggi e interventi di piping in area warehouse.",
        "description": "Progetto fotografico del cantiere con attività di montaggio piping e lavorazioni correlate presso warehouse industriale.",
        "coverImage": "./foto/webp/warehouse nippon gases (4).webp",
        "galleryImages": [
            "./foto/webp/warehouse nippon gases (1).webp",
            "./foto/webp/warehouse nippon gases (2).webp",
            "./foto/webp/warehouse nippon gases (3).webp",
            "./foto/webp/warehouse nippon gases (4).webp",
            "./foto/webp/warehouse nippon gases (5).webp",
            "./foto/webp/warehouse nippon gases (6).webp"
        ],
        "tags": [
            "piping",
            "montaggio",
            "warehouse"
        ],
        "featured": true,
        "order": 1
    },
    {
        "id": "project-officine-tecnomec-taranto",
        "type": "project",
        "status": "completed",
        "year": "2024",
        "title": "Officine Tecnomec Taranto",
        "client": "Tecnomec",
        "location": "Taranto",
        "summary": "Serie fotografica del progetto in officina e in campo.",
        "description": "Set di immagini per raccontare le lavorazioni svolte nel cantiere Officine Tecnomec Taranto.",
        "coverImage": "./foto/webp/officine tecnomec taranto (2024)1.webp",
        "galleryImages": [
            "./foto/webp/officine tecnomec taranto (2024)1.webp",
            "./foto/webp/officine tecnomec taranto (2024)2.webp",
            "./foto/webp/officine tecnomec taranto (2024)3.webp",
            "./foto/webp/officine tecnomec taranto (2024)4.webp",
            "./foto/webp/officine tecnomec taranto (2024)5.webp",
            "./foto/webp/officine tecnomec taranto (2024)6.webp"
        ],
        "tags": [
            "officina",
            "saldatura",
            "impianti"
        ],
        "featured": false,
        "order": 2
    },
    {
        "id": "work-1",
        "type": "work",
        "status": "ongoing",
        "year": "2026",
        "title": "FINCIMEC SPA",
        "client": "FINCIMEC SPA",
        "location": "Lonigo (VI)",
        "summary": "Costruzione e montaggio tubazioni in acciaio al carbonio e inossidabile, rivestite in PTFE, valvole manuali e strumentali presso lo stabilimento \"FIS\"",
        "description": "Costruzione e montaggio tubazioni in acciaio al carbonio e inossidabile, rivestite in PTFE, valvole manuali e strumentali presso lo stabilimento \"FIS\"",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 3
    },
    {
        "id": "work-2",
        "type": "work",
        "status": "ongoing",
        "year": "2026",
        "title": "FINCIMEC SPA",
        "client": "FINCIMEC SPA",
        "location": "Montecchio Maggiore (VI)",
        "summary": "Costruzione e montaggio tubazioni in acciaio al carbonio - linee servizi e inossidabile - linee processo; montaggio tubazioni rivestite internamente in PTFE, valvole e strumenti presso lo stabilimento \"F.I.S.\" ALTE",
        "description": "Costruzione e montaggio tubazioni in acciaio al carbonio - linee servizi e inossidabile - linee processo; montaggio tubazioni rivestite internamente in PTFE, valvole e strumenti presso lo stabilimento \"F.I.S.\" ALTE",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 4
    },
    {
        "id": "work-3",
        "type": "work",
        "status": "ongoing",
        "year": "2026",
        "title": "SAFAS S.p.A.",
        "client": "SAFAS S.p.A.",
        "location": "Altavilla Vicentina (VI)",
        "summary": "Molatura, Spianatura e Saldatura di apparecchiature meccaniche presso cantiere e Fonderia SAFAS",
        "description": "Molatura, Spianatura e Saldatura di apparecchiature meccaniche presso cantiere e Fonderia SAFAS",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 5
    },
    {
        "id": "work-4",
        "type": "work",
        "status": "ongoing",
        "year": "2026",
        "title": "MAC IMPIANTI S.r.l.",
        "client": "MAC IMPIANTI S.r.l.",
        "location": "Verbania (VB)",
        "summary": "Lavori di prefabbricazione, saldatura e montaggio piping, supporti di sostegno e accessori di linea presso area di stoccaggio – Cantiere Plastipak Italia Preforme S.r.l.",
        "description": "Lavori di prefabbricazione, saldatura e montaggio piping, supporti di sostegno e accessori di linea presso area di stoccaggio – Cantiere Plastipak Italia Preforme S.r.l.",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 6
    },
    {
        "id": "work-5",
        "type": "work",
        "status": "ongoing",
        "year": "2026",
        "title": "CMS SRL",
        "client": "CMS SRL",
        "location": "Medgidia, Costanza (RO)",
        "summary": "Lavori di saldatura e carpenteria in opera presso cantiere stabilimento ROMCIM",
        "description": "Lavori di saldatura e carpenteria in opera presso cantiere stabilimento ROMCIM",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 7
    },
    {
        "id": "work-6",
        "type": "work",
        "status": "completed",
        "year": "2026",
        "title": "DELTAIMPIANTI S.r.l.",
        "client": "DELTAIMPIANTI S.r.l.",
        "location": "Cividate al Piano (BG)",
        "summary": "Lavori di saldatura e prefabbricazione presso lo stabilimento Rubier Special Steel S.p.A.",
        "description": "Lavori di saldatura e prefabbricazione presso lo stabilimento Rubier Special Steel S.p.A.",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 8
    },
    {
        "id": "work-7",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "MAC IMPIANTI S.r.l.",
        "client": "MAC IMPIANTI S.r.l.",
        "location": "Castelmassa (RO)",
        "summary": "Saldatura e installazione piping presso il Cantiere Cargill",
        "description": "Saldatura e installazione piping presso il Cantiere Cargill",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 9
    },
    {
        "id": "work-8",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "MAC IMPIANTI S.r.l.",
        "client": "MAC IMPIANTI S.r.l.",
        "location": "Ivry Sur Seine (Francia)",
        "summary": "Attività di pulizia presso Inceneritore Syctom",
        "description": "Attività di pulizia presso Inceneritore Syctom",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 10
    },
    {
        "id": "work-9",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "FINCIMEC SPA",
        "client": "FINCIMEC SPA",
        "location": "Novara (NO)",
        "summary": "Esecuzione di attività di montaggi meccanici presso il Cantiere Radici-Chimica",
        "description": "Esecuzione di attività di montaggi meccanici presso il Cantiere Radici-Chimica",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 11
    },
    {
        "id": "work-10",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "ITALPROGETTI S.r.l.",
        "client": "ITALPROGETTI S.r.l.",
        "location": "Le Pouy en Velay (Francia)",
        "summary": "Montaggio di pipings comprensivo di saldatura per nuovo impianto di depurazione acque reflue di scarico presso il cantiere",
        "description": "Montaggio di pipings comprensivo di saldatura per nuovo impianto di depurazione acque reflue di scarico presso il cantiere",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 12
    },
    {
        "id": "work-11",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "STEEL TECH S.r.l.",
        "client": "STEEL TECH S.r.l.",
        "location": "Duino (TS)",
        "summary": "Lavori di Saldatura su Manufatti di acciaio di varie dimensioni presso la Cartiera Mondi",
        "description": "Lavori di Saldatura su Manufatti di acciaio di varie dimensioni presso la Cartiera Mondi",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 13
    },
    {
        "id": "work-12",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "MONDI GROUP",
        "client": "MONDI GROUP",
        "location": "Duino (TS)",
        "summary": "Lavori di Saldatura su Manufatti di acciaio di varie dimensioni presso in spazi confinati presso la Cartiera Mondi",
        "description": "Lavori di Saldatura su Manufatti di acciaio di varie dimensioni presso in spazi confinati presso la Cartiera Mondi",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 14
    },
    {
        "id": "work-13",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "DELTA IMPIANTI S.r.l.",
        "client": "DELTA IMPIANTI S.r.l.",
        "location": "Cividale del Friuli (UD)",
        "summary": "Attività di Fabbricazione, Montaggio e Saldatura Pipings presso lo Stabilimento Ofar",
        "description": "Attività di Fabbricazione, Montaggio e Saldatura Pipings presso lo Stabilimento Ofar",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 15
    },
    {
        "id": "work-14",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "DELTA IMPIANTI S.r.l.",
        "client": "DELTA IMPIANTI S.r.l.",
        "location": "Nimis (UD)",
        "summary": "Lavori di Piping presso l'Officina Delta Impianti",
        "description": "Lavori di Piping presso l'Officina Delta Impianti",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 16
    },
    {
        "id": "work-15",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "CMS SRL",
        "client": "CMS SRL",
        "location": "Rezzato (BS)",
        "summary": "Lavori di Carpenteria e tubisteria presso lo stabilimento Heidelberg Cementi Italia",
        "description": "Lavori di Carpenteria e tubisteria presso lo stabilimento Heidelberg Cementi Italia",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 17
    },
    {
        "id": "work-16",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "MAC IMPIANTI S.r.l.",
        "client": "MAC IMPIANTI S.r.l.",
        "location": "Novara (NO)",
        "summary": "Opere di manutenzione delle utilities consistenti nella posa di nuove tubazioni e modifica di quelle esistenti comprese opere relative alle strutture di sostegno presso lo stabilimento MEMC ELECTRONIC MATERIALS",
        "description": "Opere di manutenzione delle utilities consistenti nella posa di nuove tubazioni e modifica di quelle esistenti comprese opere relative alle strutture di sostegno presso lo stabilimento MEMC ELECTRONIC MATERIALS",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 18
    },
    {
        "id": "work-17",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "MAC IMPIANTI S.r.l.",
        "client": "MAC IMPIANTI S.r.l.",
        "location": "Origny Sainte Benoite (FR)",
        "summary": "Lavori di Piping presso il Cantiere Rue de Obernaude - 02390",
        "description": "Lavori di Piping presso il Cantiere Rue de Obernaude - 02390",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 19
    },
    {
        "id": "work-18",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "client": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "location": "Caserta",
        "summary": "Interventi di costruzione e montaggio impianti presso il cantiere Warehouse Nippon Gases",
        "description": "Interventi di costruzione e montaggio impianti presso il cantiere Warehouse Nippon Gases",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 20
    },
    {
        "id": "work-19",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "CMS SRL",
        "client": "CMS SRL",
        "location": "Erwitte (Germania)",
        "summary": "Lavori di carpenteria e tubisteria presso lo stabilimento Spenner",
        "description": "Lavori di carpenteria e tubisteria presso lo stabilimento Spenner",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 21
    },
    {
        "id": "work-20",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "MATI GROUP NAPOLI",
        "client": "MATI GROUP NAPOLI",
        "location": "Napoli",
        "summary": "Saldature e carpenteria per realizzazione di opere meccaniche presso la raffineria Q8",
        "description": "Saldature e carpenteria per realizzazione di opere meccaniche presso la raffineria Q8",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 22
    },
    {
        "id": "work-21",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "NUOVA IMPRESA COSTRUZIONI E MANUTENZIONI INDUSTRIALI S.r.l.",
        "client": "NUOVA IMPRESA COSTRUZIONI E MANUTENZIONI INDUSTRIALI S.r.l.",
        "location": "Tortolì (NU)",
        "summary": "Montaggio e carpenteria piping presso l'Officina Nuova Icom",
        "description": "Montaggio e carpenteria piping presso l'Officina Nuova Icom",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 23
    },
    {
        "id": "work-22",
        "type": "work",
        "status": "completed",
        "year": "2025",
        "title": "NUOVA IMPRESA COSTRUZIONI E MANUTENZIONI INDUSTRIALI S.r.l.",
        "client": "NUOVA IMPRESA COSTRUZIONI E MANUTENZIONI INDUSTRIALI S.r.l.",
        "location": "Assemini (CA)",
        "summary": "Lavori di Montaggio, saldatura e carpenteria piping presso lo Stabilimento Fluorsid di Cagliari - Macchiareddu 09032",
        "description": "Lavori di Montaggio, saldatura e carpenteria piping presso lo Stabilimento Fluorsid di Cagliari - Macchiareddu 09032",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 24
    },
    {
        "id": "work-23",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "FCM Construction SRL",
        "client": "FCM Construction SRL",
        "location": "Novara",
        "summary": "Prefabbricazione tubazioni presso l'officina",
        "description": "Prefabbricazione tubazioni presso l'officina",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 25
    },
    {
        "id": "work-24",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "FINCIMEC SPA",
        "client": "FINCIMEC SPA",
        "location": "Novara",
        "summary": "Esecuzione di attività di saldature di tubazioni e supporti presso l'impianto Radici Group",
        "description": "Esecuzione di attività di saldature di tubazioni e supporti presso l'impianto Radici Group",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 26
    },
    {
        "id": "work-25",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "CMS SRL",
        "client": "CMS SRL",
        "location": "Lecco",
        "summary": "Lavori di Carpenteria e tubisteria presso stabilimento Unicalce SPA",
        "description": "Lavori di Carpenteria e tubisteria presso stabilimento Unicalce SPA",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 27
    },
    {
        "id": "work-26",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "CMS SRL",
        "client": "CMS SRL",
        "location": "Novara",
        "summary": "Assemblaggio e posa in opera strutture e Piping di servizio per linea impianto conductex presso lo stabilimento Birla Carbon",
        "description": "Assemblaggio e posa in opera strutture e Piping di servizio per linea impianto conductex presso lo stabilimento Birla Carbon",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 28
    },
    {
        "id": "work-27",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "CMS SRL",
        "client": "CMS SRL",
        "location": "Gazoldo degli Ippoliti",
        "summary": "Lavori di carpenteria metallica presso lo stabilimento Marcegaglia",
        "description": "Lavori di carpenteria metallica presso lo stabilimento Marcegaglia",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 29
    },
    {
        "id": "work-28",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "FINCIMEC SPA",
        "client": "FINCIMEC SPA",
        "location": "Novara",
        "summary": "Esecuzione di montaggio, pipings, supporti e valvole presso Impianto MEMC ELECTRONIC MATERIALS",
        "description": "Esecuzione di montaggio, pipings, supporti e valvole presso Impianto MEMC ELECTRONIC MATERIALS",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 30
    },
    {
        "id": "work-29",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "PPM SRLS",
        "client": "PPM SRLS",
        "location": "Calcinaia (PI)",
        "summary": "Attività di prefabbricazione e montaggio di pipings, carpenteria metallica e saldature svolte presso l'Officina",
        "description": "Attività di prefabbricazione e montaggio di pipings, carpenteria metallica e saldature svolte presso l'Officina",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 31
    },
    {
        "id": "work-30",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "SIMIND",
        "client": "SIMIND",
        "location": "Caserta",
        "summary": "Interventi di costruzione e montaggio impianti presso il cantiere Warehouse Nippon Gases",
        "description": "Interventi di costruzione e montaggio impianti presso il cantiere Warehouse Nippon Gases",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 32
    },
    {
        "id": "work-31",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "DELTA IMPIANTI S.r.l.",
        "client": "DELTA IMPIANTI S.r.l.",
        "location": "Verona (VR)",
        "summary": "Montaggio, tubazioni e saldature per impianto di trattamento acque di servizio circuito diretti, circuiti forno e circuiti freddi presso Pittini Acciaierie",
        "description": "Montaggio, tubazioni e saldature per impianto di trattamento acque di servizio circuito diretti, circuiti forno e circuiti freddi presso Pittini Acciaierie",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 33
    },
    {
        "id": "work-32",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "CMS SRL",
        "client": "CMS SRL",
        "location": "Erwitte (Germania)",
        "summary": "Lavori specialistici di manutenzione impianti presso lo stabilimento Spenner GmbH & Co. KG",
        "description": "Lavori specialistici di manutenzione impianti presso lo stabilimento Spenner GmbH & Co. KG",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 34
    },
    {
        "id": "work-33",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "NUOVA IMPRESA COSTRUZIONI MANUTENZIONI INDUSTRIALI S.r.l.",
        "client": "NUOVA IMPRESA COSTRUZIONI MANUTENZIONI INDUSTRIALI S.r.l.",
        "location": "Assemini (CA)",
        "summary": "Saldatura di carpenteria metallica presso Officina della NUOVA IMPRESA COSTRUZIONI MANUTENZIONI INDUSTRIALI SRL",
        "description": "Saldatura di carpenteria metallica presso Officina della NUOVA IMPRESA COSTRUZIONI MANUTENZIONI INDUSTRIALI SRL",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 35
    },
    {
        "id": "work-34",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "MATI GROUP NAPOLI",
        "client": "MATI GROUP NAPOLI",
        "location": "Napoli",
        "summary": "Saldature e carpenteria per realizzazione di opere meccaniche presso la raffineria Q8",
        "description": "Saldature e carpenteria per realizzazione di opere meccaniche presso la raffineria Q8",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 36
    },
    {
        "id": "work-35",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "NUOVA IMPRESA COSTRUZIONI MANUTENZIONI INDUSTRIALI S.r.l.",
        "client": "NUOVA IMPRESA COSTRUZIONI MANUTENZIONI INDUSTRIALI S.r.l.",
        "location": "Tortolì (NU)",
        "summary": "Montaggio di strutture portanti e saldature di Jacket sideshore presso cantiere Saipem – Intermare Sarda",
        "description": "Montaggio di strutture portanti e saldature di Jacket sideshore presso cantiere Saipem – Intermare Sarda",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 37
    },
    {
        "id": "work-36",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "client": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "location": "Mozzanica (BG)",
        "summary": "Fabbricazione di Carpenteria e Saldatura per costruzione serbatoio e Cold Box con montaggio tubazioni e saldature presso l'Officina",
        "description": "Fabbricazione di Carpenteria e Saldatura per costruzione serbatoio e Cold Box con montaggio tubazioni e saldature presso l'Officina",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 38
    },
    {
        "id": "work-37",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "TECNOMEC ENGINEERING SRL",
        "client": "TECNOMEC ENGINEERING SRL",
        "location": "Taranto (TA)",
        "summary": "Lavori di pre-fabbricazione e saldatura piping presso l'officina tecnomec",
        "description": "Lavori di pre-fabbricazione e saldatura piping presso l'officina tecnomec",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 39
    },
    {
        "id": "work-38",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "CMS SRL",
        "client": "CMS SRL",
        "location": "Pomponisco (MB)",
        "summary": "Montaggio di piping e saldature presso lo stabilimento Frati Luigi SPA",
        "description": "Montaggio di piping e saldature presso lo stabilimento Frati Luigi SPA",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 40
    },
    {
        "id": "work-39",
        "type": "work",
        "status": "completed",
        "year": "2024",
        "title": "ENERMAC",
        "client": "ENERMAC",
        "location": "Abano Terme (PD)",
        "summary": "Revamping area chiller presso lo stabilimenti FIDIA Farmaceutici",
        "description": "Revamping area chiller presso lo stabilimenti FIDIA Farmaceutici",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 41
    },
    {
        "id": "work-40",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "GRUPPO ITEC SRL",
        "client": "GRUPPO ITEC SRL",
        "location": "Avenza (MS)",
        "summary": "Montaggio di pipings e saldatura di carpenteria metallica presso il cantiere Baker Hughes",
        "description": "Montaggio di pipings e saldatura di carpenteria metallica presso il cantiere Baker Hughes",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 42
    },
    {
        "id": "work-41",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "NAVAL SOLUTION TECHNOLOGY SRL",
        "client": "NAVAL SOLUTION TECHNOLOGY SRL",
        "location": "Napoli",
        "summary": "Saldatura, costruzione ed assemblaggio tubi, montature e assitenza valvole presso la raffineria Q8",
        "description": "Saldatura, costruzione ed assemblaggio tubi, montature e assitenza valvole presso la raffineria Q8",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 43
    },
    {
        "id": "work-42",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "FAV SRL",
        "client": "FAV SRL",
        "location": "Cinisello Balsamo",
        "summary": "Lavori di Montaggio e Saldatura di carpenteria metallica",
        "description": "Lavori di Montaggio e Saldatura di carpenteria metallica",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 44
    },
    {
        "id": "work-43",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "ENERGY WAY",
        "client": "ENERGY WAY",
        "location": "Avenza (MS)",
        "summary": "Montaggio di carpenteria leggera di canali per alloggio cavi elettrici presso il cantiere Baker Hughes",
        "description": "Montaggio di carpenteria leggera di canali per alloggio cavi elettrici presso il cantiere Baker Hughes",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 45
    },
    {
        "id": "work-44",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "ITAL IMPIANTI SRL",
        "client": "ITAL IMPIANTI SRL",
        "location": "Bochum (Germania)",
        "summary": "Demolizione e Smontaggio di impianto industriale presso lo stabilimento Thyssen Krupp Still Europe",
        "description": "Demolizione e Smontaggio di impianto industriale presso lo stabilimento Thyssen Krupp Still Europe",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 46
    },
    {
        "id": "work-45",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "NUOVA IMPRESA COSTRUZIONI MANUTENZIONI INDUSTRIALI S.r.l.",
        "client": "NUOVA IMPRESA COSTRUZIONI MANUTENZIONI INDUSTRIALI S.r.l.",
        "location": "Ravenna (RA)",
        "summary": "Montaggio di pipings, lavori di saldatura e di carpenteria metallica presso stabilimento ENI Versalis",
        "description": "Montaggio di pipings, lavori di saldatura e di carpenteria metallica presso stabilimento ENI Versalis",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 47
    },
    {
        "id": "work-46",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "ENERGY WAY",
        "client": "ENERGY WAY",
        "location": "Aosta (AO)",
        "summary": "Montaggio canaline per alloggio cavi elettrici presso Cogne Acciai Speciali S.P.A.",
        "description": "Montaggio canaline per alloggio cavi elettrici presso Cogne Acciai Speciali S.P.A.",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 48
    },
    {
        "id": "work-47",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "client": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "location": "Montecchio Maggiore",
        "summary": "Montaggio di Piping per servizi di aria compressa e oleo-dinamica per installazione nuove macchine volte alla produzione di lavorati in vetro presso lo stabilimento Revimac",
        "description": "Montaggio di Piping per servizi di aria compressa e oleo-dinamica per installazione nuove macchine volte alla produzione di lavorati in vetro presso lo stabilimento Revimac",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 49
    },
    {
        "id": "work-48",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "client": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "location": "Mozzanica (BG)",
        "summary": "Lavori di manutenzione di Piping e Componenti Meccanici – Fermata Invernale presso Corteva Agriscience",
        "description": "Lavori di manutenzione di Piping e Componenti Meccanici – Fermata Invernale presso Corteva Agriscience",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 50
    },
    {
        "id": "work-49",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "client": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "location": "Besana Brianza (MB)",
        "summary": "Montaggio di Piping presso il cantiere",
        "description": "Montaggio di Piping presso il cantiere",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 51
    },
    {
        "id": "work-50",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "client": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "location": "Belgioioso (PV)",
        "summary": "Montaggio e saldature di Piping nuovo impianto presso lo stabilimento SIAD",
        "description": "Montaggio e saldature di Piping nuovo impianto presso lo stabilimento SIAD",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 52
    },
    {
        "id": "work-51",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "client": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "location": "Marghera (VE)",
        "summary": "Fabbricazione, Montaggio e Saldatura di Carpenteria Metallica per costruzione Cold Box presso lo stabilimento",
        "description": "Fabbricazione, Montaggio e Saldatura di Carpenteria Metallica per costruzione Cold Box presso lo stabilimento",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 53
    },
    {
        "id": "work-52",
        "type": "work",
        "status": "completed",
        "year": "2023",
        "title": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "client": "SIMIND COSTRUZIONI E MONTAGGI IMPIANTI INDUSTRIALI S.r.l.",
        "location": "Pignataro Maggiore (CE)",
        "summary": "Prefabbricazione e Montaggio di Piping presso lo stabilimento IGAT",
        "description": "Prefabbricazione e Montaggio di Piping presso lo stabilimento IGAT",
        "coverImage": "",
        "galleryImages": [],
        "tags": [],
        "featured": false,
        "order": 54
    }
];

  const elements = {};
  const state = {
    works: [],
    activeId: null,
    filter: ''
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function createId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function normalizeWork(work) {
    return {
      id: work.id || createId('work'),
      type: work.type === 'project' ? 'project' : 'work',
      status: work.status || 'completed',
      year: String(work.year || ''),
      title: work.title || '',
      client: work.client || '',
      location: work.location || '',
      summary: work.summary || '',
      description: work.description || '',
      coverImage: work.coverImage || '',
      galleryImages: Array.isArray(work.galleryImages) ? work.galleryImages.filter(Boolean) : [],
      tags: Array.isArray(work.tags)
        ? work.tags.filter(Boolean)
        : String(work.tags || '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      featured: Boolean(work.featured),
      order: Number.isFinite(Number(work.order)) ? Number(work.order) : 0
    };
  }

  function normalizeDataset(dataset) {
    return dataset.map(normalizeWork).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  }

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const works = Array.isArray(parsed.works) ? parsed.works : Array.isArray(parsed) ? parsed : [];
        state.works = normalizeDataset(works);
        state.activeId = parsed.activeId || state.works[0]?.id || null;
        return;
      }
    } catch (error) {
      console.warn('Could not load admin state', error);
    }

    state.works = normalizeDataset(defaultWorks);
    state.activeId = state.works[0]?.id || null;
  }

  function saveState(message) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      works: state.works,
      activeId: state.activeId
    }));

    if (elements.saveStatus) {
      elements.saveStatus.textContent = message || 'Salvato nel browser';
    }
  }

  function getActiveWork() {
    return state.works.find((work) => work.id === state.activeId) || state.works[0] || null;
  }

  function readFormWork() {
    return normalizeWork({
      id: elements.workId.value || createId('work'),
      type: elements.type.value,
      status: elements.status.value,
      year: elements.year.value,
      title: elements.title.value.trim(),
      client: elements.client.value.trim(),
      location: elements.location.value.trim(),
      summary: elements.summary.value.trim(),
      description: elements.description.value.trim(),
      coverImage: elements.coverImage.value.trim(),
      galleryImages: elements.galleryImages.value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      tags: elements.tags.value,
      featured: elements.featured.checked,
      order: elements.order.value
    });
  }

  function fillForm(work) {
    const current = work || {
      id: createId('work'),
      type: 'work',
      status: 'ongoing',
      year: '',
      title: '',
      client: '',
      location: '',
      summary: '',
      description: '',
      coverImage: '',
      galleryImages: [],
      tags: [],
      featured: false,
      order: state.works.length + 1
    };

    elements.workId.value = current.id;
    elements.type.value = current.type;
    elements.status.value = current.status;
    elements.year.value = current.year;
    elements.title.value = current.title;
    elements.client.value = current.client;
    elements.location.value = current.location;
    elements.summary.value = current.summary;
    elements.description.value = current.description;
    elements.coverImage.value = current.coverImage;
    elements.galleryImages.value = current.galleryImages.join('\n');
    elements.tags.value = current.tags.join(', ');
    elements.featured.checked = current.featured;
    elements.order.value = current.order;

    renderPreview(current);
  }

  function matchesFilter(work, filter) {
    if (!filter) return true;
    const haystack = [work.title, work.client, work.location, work.summary, work.description, work.year, work.type, work.status, work.tags.join(' ')]
      .join(' ')
      .toLowerCase();
    return haystack.includes(filter);
  }

  function renderStats() {
    const total = state.works.length;
    const projects = state.works.filter((work) => work.type === 'project').length;
    const works = state.works.filter((work) => work.type === 'work').length;

    elements.statTotal.textContent = total;
    elements.statProjects.textContent = projects;
    elements.statWorks.textContent = works;
    elements.workCount.textContent = `${total} voci`;
  }

  function renderList() {
    const filteredWorks = state.works.filter((work) => matchesFilter(work, state.filter));

    if (filteredWorks.length === 0) {
      elements.workList.innerHTML = `
        <div class="rounded-2xl border border-dashed border-slate-300 p-5 text-slate-500 bg-slate-50">
          Nessun risultato per il filtro corrente.
        </div>
      `;
      return;
    }

    elements.workList.innerHTML = filteredWorks.map((work) => {
      const activeClass = work.id === state.activeId ? 'active' : '';
      const photoCount = work.galleryImages.length;
      const badge = work.type === 'project' ? 'Progetto' : 'Lavoro';
      const statusLabel = work.status === 'ongoing' ? 'In corso' : work.status === 'planned' ? 'Pianificato' : 'Terminato';

      return `
        <button type="button" class="admin-nav-item ${activeClass} w-full rounded-2xl p-4 text-left" data-work-id="${work.id}">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">${badge} · ${statusLabel}</span>
              </div>
              <h3 class="text-base font-bold text-slate-900 truncate">${escapeHtml(work.title || 'Senza titolo')}</h3>
              <p class="text-sm text-slate-600 truncate">${escapeHtml(work.client || 'Cliente non impostato')}</p>
              <p class="text-xs text-slate-500 mt-2">${escapeHtml(work.location || 'Luogo non impostato')} · ${escapeHtml(work.year || 'n.d.')}</p>
            </div>
            <div class="text-right shrink-0">
              <div class="text-lg font-black text-slate-900">${photoCount}</div>
              <div class="text-[11px] uppercase tracking-[0.18em] text-slate-500">Foto</div>
            </div>
          </div>
        </button>
      `;
    }).join('');

    elements.workList.querySelectorAll('[data-work-id]').forEach((button) => {
      button.addEventListener('click', () => {
        state.activeId = button.getAttribute('data-work-id');
        fillForm(getActiveWork());
        renderList();
        saveState('Elemento caricato');
      });
    });
  }

  function renderPreview(work) {
    const current = work || readFormWork();
    const gallery = current.galleryImages.slice(0, 4);
    const statusLabel = current.status === 'ongoing' ? 'In corso' : current.status === 'planned' ? 'Pianificato' : 'Terminato';
    const typeLabel = current.type === 'project' ? 'Progetto homepage' : 'Lavoro / cantiere';

    elements.previewType.textContent = typeLabel;
    elements.previewCard.innerHTML = `
      <div class="glass-effect rounded-2xl p-6 border ${current.status === 'ongoing' ? 'border-[#3FBFFF]/50' : 'border-[#3FBFFF]/30'}">
        <div class="flex flex-col gap-4">
          ${current.type === 'project' ? `
          <div class="rounded-xl overflow-hidden bg-slate-50 mb-2">
            ${current.coverImage
              ? '<img src="' + escapeAttribute(current.coverImage) + '" alt="' + escapeAttribute(current.title || 'Anteprima') + '" class="w-full h-48 object-cover">'
              : '<div class="h-48 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">Nessuna immagine copertina</div>'}
          </div>
          ` : ''}
          <div class="flex items-start ${current.status === 'ongoing' ? 'space-x-4' : ''}">
            ${current.status === 'ongoing' ? '<div class="w-3 h-3 rounded-full mt-2 animate-pulse shrink-0" style="background-color: #3FBFFF;"></div>' : ''}
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-[#3FBFFF]">${escapeHtml(typeLabel)}</span>
                <span class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">${escapeHtml(statusLabel)}</span>
                <span class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">${escapeHtml(current.year || 'n.d.')}</span>
              </div>
              <h3 class="${current.status === 'ongoing' ? 'text-2xl text-[#3FBFFF]' : 'text-xl text-gray-900'} font-bold mb-2">${escapeHtml(current.title || 'Titolo non compilato')}</h3>
              <p class="text-gray-600 mb-2 font-medium">${escapeHtml(current.client || 'Cliente non compilato')}</p>
              <p class="text-gray-700 leading-relaxed mb-2">${escapeHtml(current.description || 'Nessuna descrizione inserita.')}</p>
              <p class="text-gray-400 text-sm">${escapeHtml(current.location || 'Luogo non compilato')}</p>
            </div>
          </div>
          ${current.type === 'project' && gallery.length > 0 ? `
          <div class="grid grid-cols-2 gap-2 mt-2">
            ${gallery.map((src) => '<div class="rounded-lg overflow-hidden bg-gray-100"><img src="' + escapeAttribute(src) + '" alt="Foto" class="w-full h-20 object-cover"></div>').join('')}
          </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function persistCurrentForm() {
    const work = readFormWork();
    if (!work.title) {
      alert('Inserisci almeno un titolo prima di salvare.');
      return false;
    }

    const existingIndex = state.works.findIndex((item) => item.id === work.id);
    if (existingIndex >= 0) {
      state.works[existingIndex] = work;
    } else {
      state.works.unshift(work);
    }

    state.works = normalizeDataset(state.works);
    state.activeId = work.id;
    saveState('Salvato nel browser');
    renderStats();
    renderList();
    fillForm(work);
    return true;
  }

  function deleteActiveWork() {
    const work = getActiveWork();
    if (!work) return;

    const confirmed = window.confirm(`Eliminare "${work.title}" dal catalogo?`);
    if (!confirmed) return;

    state.works = state.works.filter((item) => item.id !== work.id);
    state.activeId = state.works[0]?.id || null;
    saveState('Elemento eliminato');
    renderStats();
    renderList();
    fillForm(getActiveWork());
  }

  function duplicateActiveWork() {
    const work = readFormWork();
    const duplicated = {
      ...work,
      id: createId(work.type || 'work'),
      title: work.title ? `${work.title} (copia)` : 'Nuovo elemento',
      order: work.order + 1,
      featured: false
    };

    state.works.unshift(duplicated);
    state.works = normalizeDataset(state.works);
    state.activeId = duplicated.id;
    saveState('Elemento duplicato');
    renderStats();
    renderList();
    fillForm(duplicated);
  }

  function addNewWork() {
    const newWork = normalizeWork({
      id: createId('work'),
      type: 'work',
      status: 'ongoing',
      year: String(new Date().getFullYear()),
      title: '',
      client: '',
      location: '',
      summary: '',
      description: '',
      coverImage: '',
      galleryImages: [],
      tags: [],
      featured: false,
      order: state.works.length + 1
    });

    state.works.unshift(newWork);
    state.activeId = newWork.id;
    state.works = normalizeDataset(state.works);
    saveState('Nuovo elemento creato');
    renderStats();
    renderList();
    fillForm(newWork);
  }

  function exportJson() {
    const json = JSON.stringify(state.works, null, 2);
    elements.jsonOutput.value = json;
    elements.jsonOutput.focus();
    elements.jsonOutput.select();
    saveState('JSON esportato nel riquadro');
  }

  function downloadJson() {
    const json = JSON.stringify(state.works, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'fox-industrial-works.json';
    anchor.click();
    URL.revokeObjectURL(url);
    saveState('Download creato');
  }

  async function copyJson() {
    const text = elements.jsonOutput.value || JSON.stringify(state.works, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      saveState('JSON copiato negli appunti');
    } catch (error) {
      elements.jsonOutput.focus();
      elements.jsonOutput.select();
      saveState('Seleziona il testo e copia manualmente');
    }
  }

  function resetDemo() {
    const confirmed = window.confirm('Ripristinare i dati demo iniziali? I contenuti salvati nel browser verranno sovrascritti.');
    if (!confirmed) return;

    state.works = normalizeDataset(defaultWorks);
    state.activeId = state.works[0]?.id || null;
    saveState('Demo ripristinata');
    renderStats();
    renderList();
    fillForm(getActiveWork());
    exportJson();
  }

  function importJsonFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '[]'));
        const works = Array.isArray(parsed) ? parsed : Array.isArray(parsed.works) ? parsed.works : [];
        state.works = normalizeDataset(works);
        state.activeId = state.works[0]?.id || null;
        saveState('JSON importato con successo');
        renderStats();
        renderList();
        fillForm(getActiveWork());
        exportJson();
      } catch (error) {
        alert('Il file JSON non è valido.');
      }
    };
    reader.readAsText(file);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/\n/g, '');
  }

  function cacheElements() {
    elements.workList = document.getElementById('work-list');
    elements.searchInput = document.getElementById('search-input');
    elements.statTotal = document.getElementById('stat-total');
    elements.statProjects = document.getElementById('stat-projects');
    elements.statWorks = document.getElementById('stat-works');
    elements.workCount = document.getElementById('work-count');
    elements.previewCard = document.getElementById('preview-card');
    elements.previewType = document.getElementById('preview-type');
    elements.saveStatus = document.getElementById('save-status');
    elements.jsonOutput = document.getElementById('json-output');
    elements.importFile = document.getElementById('import-file');
    elements.workId = document.getElementById('work-id');
    elements.type = document.getElementById('type');
    elements.status = document.getElementById('status');
    elements.year = document.getElementById('year');
    elements.title = document.getElementById('title');
    elements.client = document.getElementById('client');
    elements.location = document.getElementById('location');
    elements.summary = document.getElementById('summary');
    elements.description = document.getElementById('description');
    elements.coverImage = document.getElementById('coverImage');
    elements.galleryImages = document.getElementById('galleryImages');
    elements.tags = document.getElementById('tags');
    elements.featured = document.getElementById('featured');
    elements.order = document.getElementById('order');
  }

  function bindEvents() {
    document.getElementById('new-work-btn').addEventListener('click', addNewWork);
    document.getElementById('save-work-btn').addEventListener('click', persistCurrentForm);
    document.getElementById('delete-work-btn').addEventListener('click', deleteActiveWork);
    document.getElementById('duplicate-work-btn').addEventListener('click', duplicateActiveWork);
    document.getElementById('export-json-btn').addEventListener('click', exportJson);
    document.getElementById('download-json-btn').addEventListener('click', downloadJson);
    document.getElementById('copy-json-btn').addEventListener('click', copyJson);
    document.getElementById('reset-demo-btn').addEventListener('click', resetDemo);
    document.getElementById('import-json-btn').addEventListener('click', () => elements.importFile.click());

    elements.searchInput.addEventListener('input', (event) => {
      state.filter = event.target.value.trim().toLowerCase();
      renderList();
    });

    [
      elements.type,
      elements.status,
      elements.year,
      elements.title,
      elements.client,
      elements.location,
      elements.summary,
      elements.description,
      elements.coverImage,
      elements.galleryImages,
      elements.tags,
      elements.featured,
      elements.order
    ].forEach((field) => {
      field.addEventListener('input', () => renderPreview());
      field.addEventListener('change', () => renderPreview());
    });

    elements.importFile.addEventListener('change', () => {
      const file = elements.importFile.files && elements.importFile.files[0];
      if (file) importJsonFile(file);
      elements.importFile.value = '';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    loadState();
    bindEvents();
    renderStats();
    renderList();
    fillForm(getActiveWork());
    exportJson();
    saveState('Dashboard pronto');
  });
})();