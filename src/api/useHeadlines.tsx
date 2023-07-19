import {useQuery} from '@tanstack/react-query';
import {Headlines} from '../types/headlines';
import {
  createTable,
  deleteTable,
  fetchRandomItems,
  getDBConnection,
  saveItems,
} from '../sqlite/datastore';
import 'react-native-get-random-values';
// @ts-ignore
import {v4 as uuidv4} from 'uuid';

const gNewsDummy = {
  totalArticles: 1542667,
  articles: [
    {
      title:
        'Rammstein Keyboarder Christian Lorenz soll Frauen sexuell genötigt haben',
      description:
        'Rammstein tourt derzeit durch Europa. Derweil mehren sich die Vorwürfe wegen sexueller Nötigung – und richten sich nicht nur gegen Till Lindemann.',
      content:
        'Rammstein tourt derzeit durch Europa. Derweil mehren sich die Vorwürfe wegen sexueller Nötigung – und richten sich nicht nur gegen Till Lindemann.\n1 / 3 Mit den Vorwürfen gegen Till Lindemann begann der Skandal um die Band Rammstein – nun werfen eini... [3985 chars]',
      url: 'https://www.20min.ch/story/neue-vorwuerfe-gegen-rammstein-keyboarder-flake-im-visier-722004497703',
      image:
        'https://cdn.unitycms.io/images/AptipzhIqk99cemV3ADbsm.jpg?op=focus&val=1200,675,995,537,21,5,468,347&sum=uk63Cn-rmsQ',
      publishedAt: '2023-07-17T09:27:29Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'आप संवैधानिक पदों पर हैं, लड़ाई-झगड़े से ऊपर उठिए; DERC अध्यक्ष मिलकर चुनें',
      description:
        'सुप्रीम कोर्ट में दिल्ली इलेक्ट्रिसिटी रेगुलेटरी कमीशन (DERC) के अध्यक्ष को लेकर दाखिल याचिका पर सोमवार को सुनवाई हुई। | Delhi Govt vs Centre ordinance row दिल्ली में अधिकारियों के ट्रांसफर-पोस्टिंग के मुद्दे पर केंद्र के अध्यादेश को चुनौती देने वाली दिल्ली सरकार की याचिका पर आज सुप्रीम कोर्ट में सुनवाई होगी।',
      content:
        'Hindi News\nNational\nCentre Ordinance Hearing Update; Arvind Kejriwal Vs Narendra Modi Govt | Delhi News\nसुप्रीम कोर्ट बोला- दिल्ली के LG और CM बात करें: आप संवैधानिक पदों पर हैं, लड़ाई-झगड़े से ऊपर उठिए; DERC अध्यक्ष मिलकर चुनें\nनई दिल्ली 8 मिनट पहले... [7438 chars]',
      url: 'https://www.bhaskar.com/national/news/sc-to-hear-aap-governments-plea-against-centres-ordinance-131546848.html',
      image:
        'https://images.bhaskarassets.com/web2images/521/2023/07/17/news-pic-2023-07-17t145209028_1689585732.jpg',
      publishedAt: '2023-07-17T09:22:21Z',
      source: {
        name: 'Dainik Bhaskar',
        url: 'https://www.bhaskar.com',
      },
    },
    {
      title:
        'UFO Robot Grendizer - The Feast of the Wolves tem lançamento em novembro',
      description:
        'Um dos “avôs” dos mechas regressa das sombras com um novo jogo de ação.',
      content:
        'Um dos “avôs” dos mechas regressa das sombras com um novo jogo de ação.\nA Microids revelou a data de lançamento para o inesperado regresso de Grendizer, um dos primeiros robôs de anime que cimentaram o género mecha, a par de Mazinger Z e de Great Maz... [865 chars]',
      url: 'https://echoboomer.pt/ufo-robot-grendizer-the-feast-of-the-wolves-tem-lancamento-em-novembro/',
      image:
        'https://echoboomer.pt/wp-content/uploads/2023/07/ufo-robot-grendizer.jpg',
      publishedAt: '2023-07-17T09:18:15Z',
      source: {
        name: 'Echo Boomer',
        url: 'https://echoboomer.pt',
      },
    },
    {
      title:
        'Cum să mâncăm în vacanțe ca să nu ne îngrășăm: sfaturi de la Cori Grămescu',
      description:
        'În perioada vacanțelor este important să ne setăm un obiectiv sănătos prin care să ne menținem greutatea și nu este indicat ca în aceste perioade să urmăm cure de slăbire.',
      content:
        'Acest gen de restricție alimentară nu ar trebui să se regăsească în programul de vacanță, așa cum nu ar trebui să existe nici preocupările exagerate pentru mâncarea hipocalorică, cea care semnalizează instalarea unui comportament alimentar problemati... [7146 chars]',
      url: 'https://www.csid.ro/dieta-sport/dieta-si-nutritie/cum-sa-mancam-in-vacante-ca-sa-nu-ne-ingrasam-sfaturi-de-la-cori-gramescu-20365566/',
      image:
        'https://www.csid.ro/wp-content/uploads/2023/07/cori-gramescu-2.jpg',
      publishedAt: '2023-07-17T09:15:06Z',
      source: {
        name: 'CSID: Ce se întâmplă Doctore?',
        url: 'https://www.csid.ro',
      },
    },
    {
      title: 'Dødsulykken i Vestby: Kritisk skadet 17-åring er død',
      description:
        'Den 17 år gamle Aline Waatvik Sandaker har omkommet på sykehus etter dødsulykken i Vestby natt til 8. juli.',
      content:
        'Ulykken skjedde i Osloveien i Vestby natt til lørdag 8. juli.\nDødsulykken i Vestby: Kritisk skadet 17-åring er død\nDen 17 år gamle Aline Waatvik Sandaker har omkommet på sykehus etter dødsulykken i Vestby natt til 8. juli.\nPolitiet bekrefter dødsfall... [1746 chars]',
      url: 'https://www.vg.no/nyheter/innenriks/i/2B050v/doedsulykken-i-vestby-kritisk-skadet-17-aaring-er-doed',
      image:
        'https://akamai.vgc.no/v2/images/9b9383e1-13bb-4d83-be52-423c1bc8fc4f?fit=crop&format=auto&h=1318&w=1900&s=bb3305d021bbb636d67a2be342807f872547ff63',
      publishedAt: '2023-07-17T09:09:02Z',
      source: {
        name: 'VG',
        url: 'https://www.vg.no',
      },
    },
    {
      title:
        'Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte',
      description:
        '"Dat ligt wel in de lijn der verwachting", vertelt ploegleider Arthur van Dongen in Spraakmakers op NPO Radio 1.',
      content:
        'Reuters Een gehavende Nathan Van Hooydonck na de val\nTour 2023 NOS Wielrennen • vandaag, 11:08 Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte\nWielerploeg Jumbo-Visma overweegt aangifte te doen tegen de toeschouwer die zon... [2909 chars]',
      url: 'https://nos.nl/collectie/13935/artikel/2483122-jumbo-visma-overweegt-aangifte-tegen-selfienemer-die-valpartij-veroorzaakte',
      image: 'https://cdn.nos.nl/image/2023/07/17/988172/1024x576a.jpg',
      publishedAt: '2023-07-17T09:08:30Z',
      source: {
        name: 'NOS',
        url: 'https://nos.nl',
      },
    },
    {
      title:
        'England recall Anderson for fourth Ashes Test and Moeen to bat at No 3',
      description:
        'England have made one change to their team for the fourth Ashes Test against Australia at Old Trafford, with fast bowler Jimmy Anderson replacing Ollie Robinson',
      content:
        'England have recalled Jimmy Anderson for the fourth Ashes Test at Old Trafford. The 40-year-old Lancashire seamer will feature on home turf as he returns to the team in place of Ollie Robinson, the only change to the side that defeated Australia at H... [2237 chars]',
      url: 'https://www.theguardian.com/sport/2023/jul/17/england-recall-jimmy-anderson-fourth-ashes-test-moeen-ali-bat-no3',
      image:
        'https://i.guim.co.uk/img/media/e165e72b2ac4e99a418d807debb1c7a728ec6db3/0_5_4140_2484/master/4140.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5a185b12f7833d4d105cd405a85fb02c',
      publishedAt: '2023-07-17T09:06:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title: 'Kanton Luzern: Belgier überlädt Auto massiv',
      description:
        'Ein Belgier war auf der A2 im Kanton Luzern überbeladen unterwegs. Er musste die Ladung zwischendeponieren.',
      content:
        'Ein Belgier war am Sonntag auf der A2 im Kanton Luzern massiv überbeladen unterwegs. Er musste die Ladung von seinem Auto nehmen und zwischendeponieren.\nKanton Luzern : Rate mal, wie viele Kilos hier zu viel auf dem Auto sind\n1 / 1 So überladen war d... [2971 chars]',
      url: 'https://www.20min.ch/story/rate-mal-wie-viele-kilos-hier-zu-viel-auf-dem-auto-sind-137983149080',
      image:
        'https://cdn.unitycms.io/images/3UOg75OpqL4AmpTGMecP8M.jpg?op=focus&val=1200,675,1000,719,0,0,470,397&sum=sDr6_o6PTPg',
      publishedAt: '2023-07-17T09:01:37Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title: 'Hetebølge:',
      description:
        'Samtidig som den kraftige hetebølgen herjer i Sør-Europa, har en ny varmerekord blitt satt i Kina.',
      content:
        'Den nye hetebølgen «Charon», også kjent som «monsteret», har truffet Sør-Europa.\nItalienske myndigheter har sendt ut rødt farevarsel for varme i 16 byer, som følge av temperaturer som er ventet å sette nye rekorder over hele Sør-Europa denne uka.\nDet... [1666 chars]',
      url: 'https://www.dagbladet.no/nyheter/slar-alarm/79892106',
      image:
        'https://www.dagbladet.no/images/79892203.jpg?imageId=79892203&panow=100&panoh=100&panox=0&panoy=0&heightw=100&heighth=100&heightx=0&heighty=0&width=1200&height=630',
      publishedAt: '2023-07-17T09:00:43Z',
      source: {
        name: 'Dagbladet.no',
        url: 'https://www.dagbladet.no',
      },
    },
    {
      title:
        'Alcaraz-Djokovic, la sfida per scegliere il re di Wimbledon DIRETTA',
      description:
        'Il n.1 al mondo sfida il favoritissimo campione serbo (ANSA)',
      content:
        "Edizione n.136 di Wimbledon. Il numero uno al mondo Carlos Alcaraz sfida il favoritissimo Novak Djokovic, che ha superato in semifinale l'italiano Jannik Sinner, match seguito su Sky da oltre mezzo milione di telespettatori, per uno share pari al 6,3... [1206 chars]",
      url: 'https://www.ansa.it/sito/notizie/sport/2023/07/16/alcaraz-djokovic-la-sfida-per-scegliere-il-re-di-wimbledon-diretta_92e10808-9bfb-4529-a30a-66ccf153c704.html',
      image:
        'https://www.ansa.it/webimages/img_700/2023/7/16/9997f24debac4385006ade952fd1a7b6.jpg',
      publishedAt: '2023-07-16T14:07:00Z',
      source: {
        name: 'Agenzia ANSA',
        url: 'https://www.ansa.it',
      },
    },
    {
      title:
        'Alianza Lima vs. Sport Boys EN VIVO: transmisión de GOLPERU y Movistar',
      description:
        'Alianza Lima vs. Sport Boys juegan EN VIVO y EN DIRECTO vía GOLPERU y Movistar por la fecha 4 del Torneo Clausura 2023, este domingo 16 de julio desde las 3:00 p.m. Sigue los detalles en la web de Depor.',
      content:
        'Alianza Lima vs. Sport Boys (EN VIVO | EN DIRECTO | ONLINE | GRATIS) vía GOLPERU, Movistar y Fútbol Libre TV por la fecha 4 del Torneo Clausura 2023 de la Liga 1 Betsson. Este compromiso está programado para este domingo 16 de julio desde las 3:00 p.... [3153 chars]',
      url: 'https://depor.com/futbol-peruano/descentralizado/alianza-lima-vs-sport-boys-en-vivo-en-directo-gratis-via-golperu-movistar-liga-1-max-y-directv-a-que-hora-juegan-y-donde-ver-transmision-online-via-dsports-y-futbol-libre-por-el-torneo-clausura-2023-alineaciones-deportes-noticia/',
      image:
        'https://depor.com/resizer/XTAeq3riNFoDGG9LJ1_qJm-Ckls=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/MLHOGXGPEBEUDKEO6PC5EPFTDY.jpg',
      publishedAt: '2023-07-16T14:02:39Z',
      source: {
        name: 'Diario Depor',
        url: 'https://depor.com',
      },
    },
    {
      title:
        'Genève: La Lake Parade a convaincu petits et grands pour son retour festif',
      description:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.',
      content:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.\nEntre 80 et 120’000 fans de musiques électroniques ont défilé samedi lors de la ... [1192 chars]',
      url: 'https://www.20min.ch/fr/story/la-lake-parade-a-convaincu-petits-et-grands-pour-son-retour-festif-672781238547',
      image:
        'https://cdn.unitycms.io/images/0DkFyhuSqBmAim8QHhVB1V.png?op=focus&val=1200,675,1000,1000,0,0,500,500&sum=hUapAbOtry4',
      publishedAt: '2023-07-16T13:58:05Z',
      source: {
        name: '20 minutes',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'WATCH: Injured Kai Sotto wraps up NBA Summer League with block, assist',
      description:
        "Filipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Magic loss",
      content:
        "This is AI generated summarization, which may have errors. For context, always refer to the full article.\nFilipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Mag... [1181 chars]",
      url: 'https://www.rappler.com/sports/nba/video-highlights-kai-sotto-summer-league-orlando-magic-boston-celtics-july-15-2023/',
      image: 'https://www.rappler.com/tachyon/2023/07/Untitled-design-1.png',
      publishedAt: '2023-07-16T13:51:56Z',
      source: {
        name: 'Rappler',
        url: 'https://www.rappler.com',
      },
    },
    {
      title:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: - Vet ikke hvor mange sommerferier vi har igjen sammen',
      description:
        'Alf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.',
      content:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: – Vet ikke hvor mange sommerferier vi har igjen sammen\nAlf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.\nALS-syk... [5304 chars]',
      url: 'https://www.aftenposten.no/norge/i/EQkPGj/doedssyke-alf-34-maa-selv-dekke-assistentenes-reisekostnader-paa-ferie-vet-ikke-hvor-mange-sommerferier-vi-har-igjen-sammen',
      image:
        'https://premium.vgc.no/v2/images/10eb0f20-bec4-41d4-a0cd-a76bfa0c91bc?fit=crop&format=auto&h=2731&w=2048&s=92fa4c6b2864f02fb73a85041c2793e624a07a37',
      publishedAt: '2023-07-16T13:48:32Z',
      source: {
        name: 'Aftenposten',
        url: 'https://www.aftenposten.no',
      },
    },
    {
      title:
        'Rishi Sunak to appoint new defence secretary after Ben Wallace says he is quitting',
      description:
        'Minister announces he will leave PM’s cabinet at next reshuffle and quit Westminster at general election',
      content:
        'Rishi Sunak is to appoint a new defence secretary after Ben Wallace announced he will soon quit after four years in the post, and will not fight the general election expected next year.\nHe said he had decided to leave the government at Rishi Sunak’s ... [2995 chars]',
      url: 'https://www.ft.com/content/5d1c9594-71ca-4572-b335-ae6d4082d482',
      image:
        'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F2ddc3893-bc54-449f-8a79-4e36d83cc648.jpg?source=next-opengraph&fit=scale-down&width=900',
      publishedAt: '2023-07-16T13:47:47Z',
      source: {
        name: 'Financial Times',
        url: 'https://www.ft.com',
      },
    },
    {
      title:
        'Smokers who get e-cigarette flavour advice more likely to quit, report finds',
      description:
        'Study says quarter of smokers had quit after three months and 13% cut consumption by more than half',
      content:
        'Smokers who get help picking the flavour of e-cigarette they use and receive supportive text messages are much more likely to quit, research has found.\nThe study, led by London South Bank University (LSBU), explored in what settings vapes could help ... [2706 chars]',
      url: 'https://www.theguardian.com/society/2023/jul/16/smokers-who-get-e-cigarette-flavour-advice-more-likely-to-quit-report-finds',
      image:
        'https://i.guim.co.uk/img/media/dbe754f9d2baceab138b12ce268869cce0b15cde/0_0_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=a4fc0748863120a6aff82126be7d84a7',
      publishedAt: '2023-07-16T13:44:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title:
        'Tour de France: Wieder Fan-Ärger - Zuschauer löst mit Selfie einen Massensturz aus',
      description:
        'Ein unachtsamer Zuschauer hat bei der Tour de France einen Massensturz ausgelöst und den wichtigsten Helfer von Titelverteidiger Jonas Vingegaard zu Fall gebracht.',
      content:
        'An der Tour de France ist es zum wiederholten Mal zu einem Sturz wegen eines Zuschauers gekommen.\nEtwa 128 Kilometer vor dem Ziel der 15. Etappe stand ein Fan zu weit auf der Strasse und hielt seinen Arm heraus, mit dem er offenbar ein Smartphone hie... [655 chars]',
      url: 'https://www.20min.ch/story/wieder-fan-aerger-zuschauer-loest-mit-selfie-einen-massensturz-aus-454911969993',
      image:
        'https://cdn.unitycms.io/images/9VdAGQI3KSp8HuR1L1lqdL.jpg?op=focus&val=1200,675,492,611,389,222,552,564&sum=E7OMkKLdlb0',
      publishedAt: '2023-07-16T13:42:21Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'Dordogne : le corps de la femme portée disparue retrouvé par un promeneur dans les bois',
      description:
        'Le corps de cette habitante portée disparue depuis le 13 juillet dernier a été retrouvé ce dimanche. La piste du suicide est privilégiée.',
      content:
        "C'est un promeneur en vélo qui a découvert le corps ce dimanche en tout début d'après-midi sur la commune d'Annesse-et-Beaulieu, là où les recherches s'étaient concentrée depuis ce samedi. Il s'agit bien de cette habitante de Mensignac de 61 ans, por... [544 chars]",
      url: 'https://www.francebleu.fr/infos/faits-divers-justice/dordogne-le-corps-de-la-femme-portee-disparue-retrouve-5469905',
      image:
        'https://www.francebleu.fr/s3/cruiser-production/2023/07/30c52429-bbaa-4536-bdb2-726eafed2b16/1200x680_sc_41128-kvvx8sdoby-whr.jpg',
      publishedAt: '2023-07-16T13:39:46Z',
      source: {
        name: 'France Bleu',
        url: 'https://www.francebleu.fr',
      },
    },
    {
      title:
        'Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte',
      description:
        '"Dat ligt wel in de lijn der verwachting", vertelt ploegleider Arthur van Dongen in Spraakmakers op NPO Radio 1.',
      content:
        'Reuters Een gehavende Nathan Van Hooydonck na de val\nTour 2023 NOS Wielrennen • vandaag, 11:08 Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte\nWielerploeg Jumbo-Visma overweegt aangifte te doen tegen de toeschouwer die zon... [2909 chars]',
      url: 'https://nos.nl/collectie/13935/artikel/2483122-jumbo-visma-overweegt-aangifte-tegen-selfienemer-die-valpartij-veroorzaakte',
      image: 'https://cdn.nos.nl/image/2023/07/17/988172/1024x576a.jpg',
      publishedAt: '2023-07-17T09:08:30Z',
      source: {
        name: 'NOS',
        url: 'https://nos.nl',
      },
    },
    {
      title:
        'England recall Anderson for fourth Ashes Test and Moeen to bat at No 3',
      description:
        'England have made one change to their team for the fourth Ashes Test against Australia at Old Trafford, with fast bowler Jimmy Anderson replacing Ollie Robinson',
      content:
        'England have recalled Jimmy Anderson for the fourth Ashes Test at Old Trafford. The 40-year-old Lancashire seamer will feature on home turf as he returns to the team in place of Ollie Robinson, the only change to the side that defeated Australia at H... [2237 chars]',
      url: 'https://www.theguardian.com/sport/2023/jul/17/england-recall-jimmy-anderson-fourth-ashes-test-moeen-ali-bat-no3',
      image:
        'https://i.guim.co.uk/img/media/e165e72b2ac4e99a418d807debb1c7a728ec6db3/0_5_4140_2484/master/4140.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5a185b12f7833d4d105cd405a85fb02c',
      publishedAt: '2023-07-17T09:06:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title: 'Kanton Luzern: Belgier überlädt Auto massiv',
      description:
        'Ein Belgier war auf der A2 im Kanton Luzern überbeladen unterwegs. Er musste die Ladung zwischendeponieren.',
      content:
        'Ein Belgier war am Sonntag auf der A2 im Kanton Luzern massiv überbeladen unterwegs. Er musste die Ladung von seinem Auto nehmen und zwischendeponieren.\nKanton Luzern : Rate mal, wie viele Kilos hier zu viel auf dem Auto sind\n1 / 1 So überladen war d... [2971 chars]',
      url: 'https://www.20min.ch/story/rate-mal-wie-viele-kilos-hier-zu-viel-auf-dem-auto-sind-137983149080',
      image:
        'https://cdn.unitycms.io/images/3UOg75OpqL4AmpTGMecP8M.jpg?op=focus&val=1200,675,1000,719,0,0,470,397&sum=sDr6_o6PTPg',
      publishedAt: '2023-07-17T09:01:37Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title: 'Hetebølge:',
      description:
        'Samtidig som den kraftige hetebølgen herjer i Sør-Europa, har en ny varmerekord blitt satt i Kina.',
      content:
        'Den nye hetebølgen «Charon», også kjent som «monsteret», har truffet Sør-Europa.\nItalienske myndigheter har sendt ut rødt farevarsel for varme i 16 byer, som følge av temperaturer som er ventet å sette nye rekorder over hele Sør-Europa denne uka.\nDet... [1666 chars]',
      url: 'https://www.dagbladet.no/nyheter/slar-alarm/79892106',
      image:
        'https://www.dagbladet.no/images/79892203.jpg?imageId=79892203&panow=100&panoh=100&panox=0&panoy=0&heightw=100&heighth=100&heightx=0&heighty=0&width=1200&height=630',
      publishedAt: '2023-07-17T09:00:43Z',
      source: {
        name: 'Dagbladet.no',
        url: 'https://www.dagbladet.no',
      },
    },
    {
      title:
        'Alcaraz-Djokovic, la sfida per scegliere il re di Wimbledon DIRETTA',
      description:
        'Il n.1 al mondo sfida il favoritissimo campione serbo (ANSA)',
      content:
        "Edizione n.136 di Wimbledon. Il numero uno al mondo Carlos Alcaraz sfida il favoritissimo Novak Djokovic, che ha superato in semifinale l'italiano Jannik Sinner, match seguito su Sky da oltre mezzo milione di telespettatori, per uno share pari al 6,3... [1206 chars]",
      url: 'https://www.ansa.it/sito/notizie/sport/2023/07/16/alcaraz-djokovic-la-sfida-per-scegliere-il-re-di-wimbledon-diretta_92e10808-9bfb-4529-a30a-66ccf153c704.html',
      image:
        'https://www.ansa.it/webimages/img_700/2023/7/16/9997f24debac4385006ade952fd1a7b6.jpg',
      publishedAt: '2023-07-16T14:07:00Z',
      source: {
        name: 'Agenzia ANSA',
        url: 'https://www.ansa.it',
      },
    },
    {
      title:
        'Alianza Lima vs. Sport Boys EN VIVO: transmisión de GOLPERU y Movistar',
      description:
        'Alianza Lima vs. Sport Boys juegan EN VIVO y EN DIRECTO vía GOLPERU y Movistar por la fecha 4 del Torneo Clausura 2023, este domingo 16 de julio desde las 3:00 p.m. Sigue los detalles en la web de Depor.',
      content:
        'Alianza Lima vs. Sport Boys (EN VIVO | EN DIRECTO | ONLINE | GRATIS) vía GOLPERU, Movistar y Fútbol Libre TV por la fecha 4 del Torneo Clausura 2023 de la Liga 1 Betsson. Este compromiso está programado para este domingo 16 de julio desde las 3:00 p.... [3153 chars]',
      url: 'https://depor.com/futbol-peruano/descentralizado/alianza-lima-vs-sport-boys-en-vivo-en-directo-gratis-via-golperu-movistar-liga-1-max-y-directv-a-que-hora-juegan-y-donde-ver-transmision-online-via-dsports-y-futbol-libre-por-el-torneo-clausura-2023-alineaciones-deportes-noticia/',
      image:
        'https://depor.com/resizer/XTAeq3riNFoDGG9LJ1_qJm-Ckls=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/MLHOGXGPEBEUDKEO6PC5EPFTDY.jpg',
      publishedAt: '2023-07-16T14:02:39Z',
      source: {
        name: 'Diario Depor',
        url: 'https://depor.com',
      },
    },
    {
      title:
        'Genève: La Lake Parade a convaincu petits et grands pour son retour festif',
      description:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.',
      content:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.\nEntre 80 et 120’000 fans de musiques électroniques ont défilé samedi lors de la ... [1192 chars]',
      url: 'https://www.20min.ch/fr/story/la-lake-parade-a-convaincu-petits-et-grands-pour-son-retour-festif-672781238547',
      image:
        'https://cdn.unitycms.io/images/0DkFyhuSqBmAim8QHhVB1V.png?op=focus&val=1200,675,1000,1000,0,0,500,500&sum=hUapAbOtry4',
      publishedAt: '2023-07-16T13:58:05Z',
      source: {
        name: '20 minutes',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'WATCH: Injured Kai Sotto wraps up NBA Summer League with block, assist',
      description:
        "Filipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Magic loss",
      content:
        "This is AI generated summarization, which may have errors. For context, always refer to the full article.\nFilipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Mag... [1181 chars]",
      url: 'https://www.rappler.com/sports/nba/video-highlights-kai-sotto-summer-league-orlando-magic-boston-celtics-july-15-2023/',
      image: 'https://www.rappler.com/tachyon/2023/07/Untitled-design-1.png',
      publishedAt: '2023-07-16T13:51:56Z',
      source: {
        name: 'Rappler',
        url: 'https://www.rappler.com',
      },
    },
    {
      title:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: - Vet ikke hvor mange sommerferier vi har igjen sammen',
      description:
        'Alf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.',
      content:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: – Vet ikke hvor mange sommerferier vi har igjen sammen\nAlf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.\nALS-syk... [5304 chars]',
      url: 'https://www.aftenposten.no/norge/i/EQkPGj/doedssyke-alf-34-maa-selv-dekke-assistentenes-reisekostnader-paa-ferie-vet-ikke-hvor-mange-sommerferier-vi-har-igjen-sammen',
      image:
        'https://premium.vgc.no/v2/images/10eb0f20-bec4-41d4-a0cd-a76bfa0c91bc?fit=crop&format=auto&h=2731&w=2048&s=92fa4c6b2864f02fb73a85041c2793e624a07a37',
      publishedAt: '2023-07-16T13:48:32Z',
      source: {
        name: 'Aftenposten',
        url: 'https://www.aftenposten.no',
      },
    },
    {
      title:
        'Rishi Sunak to appoint new defence secretary after Ben Wallace says he is quitting',
      description:
        'Minister announces he will leave PM’s cabinet at next reshuffle and quit Westminster at general election',
      content:
        'Rishi Sunak is to appoint a new defence secretary after Ben Wallace announced he will soon quit after four years in the post, and will not fight the general election expected next year.\nHe said he had decided to leave the government at Rishi Sunak’s ... [2995 chars]',
      url: 'https://www.ft.com/content/5d1c9594-71ca-4572-b335-ae6d4082d482',
      image:
        'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F2ddc3893-bc54-449f-8a79-4e36d83cc648.jpg?source=next-opengraph&fit=scale-down&width=900',
      publishedAt: '2023-07-16T13:47:47Z',
      source: {
        name: 'Financial Times',
        url: 'https://www.ft.com',
      },
    },
    {
      title:
        'Smokers who get e-cigarette flavour advice more likely to quit, report finds',
      description:
        'Study says quarter of smokers had quit after three months and 13% cut consumption by more than half',
      content:
        'Smokers who get help picking the flavour of e-cigarette they use and receive supportive text messages are much more likely to quit, research has found.\nThe study, led by London South Bank University (LSBU), explored in what settings vapes could help ... [2706 chars]',
      url: 'https://www.theguardian.com/society/2023/jul/16/smokers-who-get-e-cigarette-flavour-advice-more-likely-to-quit-report-finds',
      image:
        'https://i.guim.co.uk/img/media/dbe754f9d2baceab138b12ce268869cce0b15cde/0_0_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=a4fc0748863120a6aff82126be7d84a7',
      publishedAt: '2023-07-16T13:44:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title:
        'Tour de France: Wieder Fan-Ärger - Zuschauer löst mit Selfie einen Massensturz aus',
      description:
        'Ein unachtsamer Zuschauer hat bei der Tour de France einen Massensturz ausgelöst und den wichtigsten Helfer von Titelverteidiger Jonas Vingegaard zu Fall gebracht.',
      content:
        'An der Tour de France ist es zum wiederholten Mal zu einem Sturz wegen eines Zuschauers gekommen.\nEtwa 128 Kilometer vor dem Ziel der 15. Etappe stand ein Fan zu weit auf der Strasse und hielt seinen Arm heraus, mit dem er offenbar ein Smartphone hie... [655 chars]',
      url: 'https://www.20min.ch/story/wieder-fan-aerger-zuschauer-loest-mit-selfie-einen-massensturz-aus-454911969993',
      image:
        'https://cdn.unitycms.io/images/9VdAGQI3KSp8HuR1L1lqdL.jpg?op=focus&val=1200,675,492,611,389,222,552,564&sum=E7OMkKLdlb0',
      publishedAt: '2023-07-16T13:42:21Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'Dordogne : le corps de la femme portée disparue retrouvé par un promeneur dans les bois',
      description:
        'Le corps de cette habitante portée disparue depuis le 13 juillet dernier a été retrouvé ce dimanche. La piste du suicide est privilégiée.',
      content:
        "C'est un promeneur en vélo qui a découvert le corps ce dimanche en tout début d'après-midi sur la commune d'Annesse-et-Beaulieu, là où les recherches s'étaient concentrée depuis ce samedi. Il s'agit bien de cette habitante de Mensignac de 61 ans, por... [544 chars]",
      url: 'https://www.francebleu.fr/infos/faits-divers-justice/dordogne-le-corps-de-la-femme-portee-disparue-retrouve-5469905',
      image:
        'https://www.francebleu.fr/s3/cruiser-production/2023/07/30c52429-bbaa-4536-bdb2-726eafed2b16/1200x680_sc_41128-kvvx8sdoby-whr.jpg',
      publishedAt: '2023-07-16T13:39:46Z',
      source: {
        name: 'France Bleu',
        url: 'https://www.francebleu.fr',
      },
    },
    {
      title:
        'Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte',
      description:
        '"Dat ligt wel in de lijn der verwachting", vertelt ploegleider Arthur van Dongen in Spraakmakers op NPO Radio 1.',
      content:
        'Reuters Een gehavende Nathan Van Hooydonck na de val\nTour 2023 NOS Wielrennen • vandaag, 11:08 Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte\nWielerploeg Jumbo-Visma overweegt aangifte te doen tegen de toeschouwer die zon... [2909 chars]',
      url: 'https://nos.nl/collectie/13935/artikel/2483122-jumbo-visma-overweegt-aangifte-tegen-selfienemer-die-valpartij-veroorzaakte',
      image: 'https://cdn.nos.nl/image/2023/07/17/988172/1024x576a.jpg',
      publishedAt: '2023-07-17T09:08:30Z',
      source: {
        name: 'NOS',
        url: 'https://nos.nl',
      },
    },
    {
      title:
        'England recall Anderson for fourth Ashes Test and Moeen to bat at No 3',
      description:
        'England have made one change to their team for the fourth Ashes Test against Australia at Old Trafford, with fast bowler Jimmy Anderson replacing Ollie Robinson',
      content:
        'England have recalled Jimmy Anderson for the fourth Ashes Test at Old Trafford. The 40-year-old Lancashire seamer will feature on home turf as he returns to the team in place of Ollie Robinson, the only change to the side that defeated Australia at H... [2237 chars]',
      url: 'https://www.theguardian.com/sport/2023/jul/17/england-recall-jimmy-anderson-fourth-ashes-test-moeen-ali-bat-no3',
      image:
        'https://i.guim.co.uk/img/media/e165e72b2ac4e99a418d807debb1c7a728ec6db3/0_5_4140_2484/master/4140.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5a185b12f7833d4d105cd405a85fb02c',
      publishedAt: '2023-07-17T09:06:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title: 'Kanton Luzern: Belgier überlädt Auto massiv',
      description:
        'Ein Belgier war auf der A2 im Kanton Luzern überbeladen unterwegs. Er musste die Ladung zwischendeponieren.',
      content:
        'Ein Belgier war am Sonntag auf der A2 im Kanton Luzern massiv überbeladen unterwegs. Er musste die Ladung von seinem Auto nehmen und zwischendeponieren.\nKanton Luzern : Rate mal, wie viele Kilos hier zu viel auf dem Auto sind\n1 / 1 So überladen war d... [2971 chars]',
      url: 'https://www.20min.ch/story/rate-mal-wie-viele-kilos-hier-zu-viel-auf-dem-auto-sind-137983149080',
      image:
        'https://cdn.unitycms.io/images/3UOg75OpqL4AmpTGMecP8M.jpg?op=focus&val=1200,675,1000,719,0,0,470,397&sum=sDr6_o6PTPg',
      publishedAt: '2023-07-17T09:01:37Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title: 'Hetebølge:',
      description:
        'Samtidig som den kraftige hetebølgen herjer i Sør-Europa, har en ny varmerekord blitt satt i Kina.',
      content:
        'Den nye hetebølgen «Charon», også kjent som «monsteret», har truffet Sør-Europa.\nItalienske myndigheter har sendt ut rødt farevarsel for varme i 16 byer, som følge av temperaturer som er ventet å sette nye rekorder over hele Sør-Europa denne uka.\nDet... [1666 chars]',
      url: 'https://www.dagbladet.no/nyheter/slar-alarm/79892106',
      image:
        'https://www.dagbladet.no/images/79892203.jpg?imageId=79892203&panow=100&panoh=100&panox=0&panoy=0&heightw=100&heighth=100&heightx=0&heighty=0&width=1200&height=630',
      publishedAt: '2023-07-17T09:00:43Z',
      source: {
        name: 'Dagbladet.no',
        url: 'https://www.dagbladet.no',
      },
    },
    {
      title:
        'Alcaraz-Djokovic, la sfida per scegliere il re di Wimbledon DIRETTA',
      description:
        'Il n.1 al mondo sfida il favoritissimo campione serbo (ANSA)',
      content:
        "Edizione n.136 di Wimbledon. Il numero uno al mondo Carlos Alcaraz sfida il favoritissimo Novak Djokovic, che ha superato in semifinale l'italiano Jannik Sinner, match seguito su Sky da oltre mezzo milione di telespettatori, per uno share pari al 6,3... [1206 chars]",
      url: 'https://www.ansa.it/sito/notizie/sport/2023/07/16/alcaraz-djokovic-la-sfida-per-scegliere-il-re-di-wimbledon-diretta_92e10808-9bfb-4529-a30a-66ccf153c704.html',
      image:
        'https://www.ansa.it/webimages/img_700/2023/7/16/9997f24debac4385006ade952fd1a7b6.jpg',
      publishedAt: '2023-07-16T14:07:00Z',
      source: {
        name: 'Agenzia ANSA',
        url: 'https://www.ansa.it',
      },
    },
    {
      title:
        'Alianza Lima vs. Sport Boys EN VIVO: transmisión de GOLPERU y Movistar',
      description:
        'Alianza Lima vs. Sport Boys juegan EN VIVO y EN DIRECTO vía GOLPERU y Movistar por la fecha 4 del Torneo Clausura 2023, este domingo 16 de julio desde las 3:00 p.m. Sigue los detalles en la web de Depor.',
      content:
        'Alianza Lima vs. Sport Boys (EN VIVO | EN DIRECTO | ONLINE | GRATIS) vía GOLPERU, Movistar y Fútbol Libre TV por la fecha 4 del Torneo Clausura 2023 de la Liga 1 Betsson. Este compromiso está programado para este domingo 16 de julio desde las 3:00 p.... [3153 chars]',
      url: 'https://depor.com/futbol-peruano/descentralizado/alianza-lima-vs-sport-boys-en-vivo-en-directo-gratis-via-golperu-movistar-liga-1-max-y-directv-a-que-hora-juegan-y-donde-ver-transmision-online-via-dsports-y-futbol-libre-por-el-torneo-clausura-2023-alineaciones-deportes-noticia/',
      image:
        'https://depor.com/resizer/XTAeq3riNFoDGG9LJ1_qJm-Ckls=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/MLHOGXGPEBEUDKEO6PC5EPFTDY.jpg',
      publishedAt: '2023-07-16T14:02:39Z',
      source: {
        name: 'Diario Depor',
        url: 'https://depor.com',
      },
    },
    {
      title:
        'Genève: La Lake Parade a convaincu petits et grands pour son retour festif',
      description:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.',
      content:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.\nEntre 80 et 120’000 fans de musiques électroniques ont défilé samedi lors de la ... [1192 chars]',
      url: 'https://www.20min.ch/fr/story/la-lake-parade-a-convaincu-petits-et-grands-pour-son-retour-festif-672781238547',
      image:
        'https://cdn.unitycms.io/images/0DkFyhuSqBmAim8QHhVB1V.png?op=focus&val=1200,675,1000,1000,0,0,500,500&sum=hUapAbOtry4',
      publishedAt: '2023-07-16T13:58:05Z',
      source: {
        name: '20 minutes',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'WATCH: Injured Kai Sotto wraps up NBA Summer League with block, assist',
      description:
        "Filipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Magic loss",
      content:
        "This is AI generated summarization, which may have errors. For context, always refer to the full article.\nFilipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Mag... [1181 chars]",
      url: 'https://www.rappler.com/sports/nba/video-highlights-kai-sotto-summer-league-orlando-magic-boston-celtics-july-15-2023/',
      image: 'https://www.rappler.com/tachyon/2023/07/Untitled-design-1.png',
      publishedAt: '2023-07-16T13:51:56Z',
      source: {
        name: 'Rappler',
        url: 'https://www.rappler.com',
      },
    },
    {
      title:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: - Vet ikke hvor mange sommerferier vi har igjen sammen',
      description:
        'Alf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.',
      content:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: – Vet ikke hvor mange sommerferier vi har igjen sammen\nAlf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.\nALS-syk... [5304 chars]',
      url: 'https://www.aftenposten.no/norge/i/EQkPGj/doedssyke-alf-34-maa-selv-dekke-assistentenes-reisekostnader-paa-ferie-vet-ikke-hvor-mange-sommerferier-vi-har-igjen-sammen',
      image:
        'https://premium.vgc.no/v2/images/10eb0f20-bec4-41d4-a0cd-a76bfa0c91bc?fit=crop&format=auto&h=2731&w=2048&s=92fa4c6b2864f02fb73a85041c2793e624a07a37',
      publishedAt: '2023-07-16T13:48:32Z',
      source: {
        name: 'Aftenposten',
        url: 'https://www.aftenposten.no',
      },
    },
    {
      title:
        'Rishi Sunak to appoint new defence secretary after Ben Wallace says he is quitting',
      description:
        'Minister announces he will leave PM’s cabinet at next reshuffle and quit Westminster at general election',
      content:
        'Rishi Sunak is to appoint a new defence secretary after Ben Wallace announced he will soon quit after four years in the post, and will not fight the general election expected next year.\nHe said he had decided to leave the government at Rishi Sunak’s ... [2995 chars]',
      url: 'https://www.ft.com/content/5d1c9594-71ca-4572-b335-ae6d4082d482',
      image:
        'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F2ddc3893-bc54-449f-8a79-4e36d83cc648.jpg?source=next-opengraph&fit=scale-down&width=900',
      publishedAt: '2023-07-16T13:47:47Z',
      source: {
        name: 'Financial Times',
        url: 'https://www.ft.com',
      },
    },
    {
      title:
        'Smokers who get e-cigarette flavour advice more likely to quit, report finds',
      description:
        'Study says quarter of smokers had quit after three months and 13% cut consumption by more than half',
      content:
        'Smokers who get help picking the flavour of e-cigarette they use and receive supportive text messages are much more likely to quit, research has found.\nThe study, led by London South Bank University (LSBU), explored in what settings vapes could help ... [2706 chars]',
      url: 'https://www.theguardian.com/society/2023/jul/16/smokers-who-get-e-cigarette-flavour-advice-more-likely-to-quit-report-finds',
      image:
        'https://i.guim.co.uk/img/media/dbe754f9d2baceab138b12ce268869cce0b15cde/0_0_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=a4fc0748863120a6aff82126be7d84a7',
      publishedAt: '2023-07-16T13:44:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title:
        'Tour de France: Wieder Fan-Ärger - Zuschauer löst mit Selfie einen Massensturz aus',
      description:
        'Ein unachtsamer Zuschauer hat bei der Tour de France einen Massensturz ausgelöst und den wichtigsten Helfer von Titelverteidiger Jonas Vingegaard zu Fall gebracht.',
      content:
        'An der Tour de France ist es zum wiederholten Mal zu einem Sturz wegen eines Zuschauers gekommen.\nEtwa 128 Kilometer vor dem Ziel der 15. Etappe stand ein Fan zu weit auf der Strasse und hielt seinen Arm heraus, mit dem er offenbar ein Smartphone hie... [655 chars]',
      url: 'https://www.20min.ch/story/wieder-fan-aerger-zuschauer-loest-mit-selfie-einen-massensturz-aus-454911969993',
      image:
        'https://cdn.unitycms.io/images/9VdAGQI3KSp8HuR1L1lqdL.jpg?op=focus&val=1200,675,492,611,389,222,552,564&sum=E7OMkKLdlb0',
      publishedAt: '2023-07-16T13:42:21Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'Dordogne : le corps de la femme portée disparue retrouvé par un promeneur dans les bois',
      description:
        'Le corps de cette habitante portée disparue depuis le 13 juillet dernier a été retrouvé ce dimanche. La piste du suicide est privilégiée.',
      content:
        "C'est un promeneur en vélo qui a découvert le corps ce dimanche en tout début d'après-midi sur la commune d'Annesse-et-Beaulieu, là où les recherches s'étaient concentrée depuis ce samedi. Il s'agit bien de cette habitante de Mensignac de 61 ans, por... [544 chars]",
      url: 'https://www.francebleu.fr/infos/faits-divers-justice/dordogne-le-corps-de-la-femme-portee-disparue-retrouve-5469905',
      image:
        'https://www.francebleu.fr/s3/cruiser-production/2023/07/30c52429-bbaa-4536-bdb2-726eafed2b16/1200x680_sc_41128-kvvx8sdoby-whr.jpg',
      publishedAt: '2023-07-16T13:39:46Z',
      source: {
        name: 'France Bleu',
        url: 'https://www.francebleu.fr',
      },
    },
    {
      title:
        'Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte',
      description:
        '"Dat ligt wel in de lijn der verwachting", vertelt ploegleider Arthur van Dongen in Spraakmakers op NPO Radio 1.',
      content:
        'Reuters Een gehavende Nathan Van Hooydonck na de val\nTour 2023 NOS Wielrennen • vandaag, 11:08 Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte\nWielerploeg Jumbo-Visma overweegt aangifte te doen tegen de toeschouwer die zon... [2909 chars]',
      url: 'https://nos.nl/collectie/13935/artikel/2483122-jumbo-visma-overweegt-aangifte-tegen-selfienemer-die-valpartij-veroorzaakte',
      image: 'https://cdn.nos.nl/image/2023/07/17/988172/1024x576a.jpg',
      publishedAt: '2023-07-17T09:08:30Z',
      source: {
        name: 'NOS',
        url: 'https://nos.nl',
      },
    },
    {
      title:
        'England recall Anderson for fourth Ashes Test and Moeen to bat at No 3',
      description:
        'England have made one change to their team for the fourth Ashes Test against Australia at Old Trafford, with fast bowler Jimmy Anderson replacing Ollie Robinson',
      content:
        'England have recalled Jimmy Anderson for the fourth Ashes Test at Old Trafford. The 40-year-old Lancashire seamer will feature on home turf as he returns to the team in place of Ollie Robinson, the only change to the side that defeated Australia at H... [2237 chars]',
      url: 'https://www.theguardian.com/sport/2023/jul/17/england-recall-jimmy-anderson-fourth-ashes-test-moeen-ali-bat-no3',
      image:
        'https://i.guim.co.uk/img/media/e165e72b2ac4e99a418d807debb1c7a728ec6db3/0_5_4140_2484/master/4140.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5a185b12f7833d4d105cd405a85fb02c',
      publishedAt: '2023-07-17T09:06:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title: 'Kanton Luzern: Belgier überlädt Auto massiv',
      description:
        'Ein Belgier war auf der A2 im Kanton Luzern überbeladen unterwegs. Er musste die Ladung zwischendeponieren.',
      content:
        'Ein Belgier war am Sonntag auf der A2 im Kanton Luzern massiv überbeladen unterwegs. Er musste die Ladung von seinem Auto nehmen und zwischendeponieren.\nKanton Luzern : Rate mal, wie viele Kilos hier zu viel auf dem Auto sind\n1 / 1 So überladen war d... [2971 chars]',
      url: 'https://www.20min.ch/story/rate-mal-wie-viele-kilos-hier-zu-viel-auf-dem-auto-sind-137983149080',
      image:
        'https://cdn.unitycms.io/images/3UOg75OpqL4AmpTGMecP8M.jpg?op=focus&val=1200,675,1000,719,0,0,470,397&sum=sDr6_o6PTPg',
      publishedAt: '2023-07-17T09:01:37Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title: 'Hetebølge:',
      description:
        'Samtidig som den kraftige hetebølgen herjer i Sør-Europa, har en ny varmerekord blitt satt i Kina.',
      content:
        'Den nye hetebølgen «Charon», også kjent som «monsteret», har truffet Sør-Europa.\nItalienske myndigheter har sendt ut rødt farevarsel for varme i 16 byer, som følge av temperaturer som er ventet å sette nye rekorder over hele Sør-Europa denne uka.\nDet... [1666 chars]',
      url: 'https://www.dagbladet.no/nyheter/slar-alarm/79892106',
      image:
        'https://www.dagbladet.no/images/79892203.jpg?imageId=79892203&panow=100&panoh=100&panox=0&panoy=0&heightw=100&heighth=100&heightx=0&heighty=0&width=1200&height=630',
      publishedAt: '2023-07-17T09:00:43Z',
      source: {
        name: 'Dagbladet.no',
        url: 'https://www.dagbladet.no',
      },
    },
    {
      title:
        'Alcaraz-Djokovic, la sfida per scegliere il re di Wimbledon DIRETTA',
      description:
        'Il n.1 al mondo sfida il favoritissimo campione serbo (ANSA)',
      content:
        "Edizione n.136 di Wimbledon. Il numero uno al mondo Carlos Alcaraz sfida il favoritissimo Novak Djokovic, che ha superato in semifinale l'italiano Jannik Sinner, match seguito su Sky da oltre mezzo milione di telespettatori, per uno share pari al 6,3... [1206 chars]",
      url: 'https://www.ansa.it/sito/notizie/sport/2023/07/16/alcaraz-djokovic-la-sfida-per-scegliere-il-re-di-wimbledon-diretta_92e10808-9bfb-4529-a30a-66ccf153c704.html',
      image:
        'https://www.ansa.it/webimages/img_700/2023/7/16/9997f24debac4385006ade952fd1a7b6.jpg',
      publishedAt: '2023-07-16T14:07:00Z',
      source: {
        name: 'Agenzia ANSA',
        url: 'https://www.ansa.it',
      },
    },
    {
      title:
        'Alianza Lima vs. Sport Boys EN VIVO: transmisión de GOLPERU y Movistar',
      description:
        'Alianza Lima vs. Sport Boys juegan EN VIVO y EN DIRECTO vía GOLPERU y Movistar por la fecha 4 del Torneo Clausura 2023, este domingo 16 de julio desde las 3:00 p.m. Sigue los detalles en la web de Depor.',
      content:
        'Alianza Lima vs. Sport Boys (EN VIVO | EN DIRECTO | ONLINE | GRATIS) vía GOLPERU, Movistar y Fútbol Libre TV por la fecha 4 del Torneo Clausura 2023 de la Liga 1 Betsson. Este compromiso está programado para este domingo 16 de julio desde las 3:00 p.... [3153 chars]',
      url: 'https://depor.com/futbol-peruano/descentralizado/alianza-lima-vs-sport-boys-en-vivo-en-directo-gratis-via-golperu-movistar-liga-1-max-y-directv-a-que-hora-juegan-y-donde-ver-transmision-online-via-dsports-y-futbol-libre-por-el-torneo-clausura-2023-alineaciones-deportes-noticia/',
      image:
        'https://depor.com/resizer/XTAeq3riNFoDGG9LJ1_qJm-Ckls=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/MLHOGXGPEBEUDKEO6PC5EPFTDY.jpg',
      publishedAt: '2023-07-16T14:02:39Z',
      source: {
        name: 'Diario Depor',
        url: 'https://depor.com',
      },
    },
    {
      title:
        'Genève: La Lake Parade a convaincu petits et grands pour son retour festif',
      description:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.',
      content:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.\nEntre 80 et 120’000 fans de musiques électroniques ont défilé samedi lors de la ... [1192 chars]',
      url: 'https://www.20min.ch/fr/story/la-lake-parade-a-convaincu-petits-et-grands-pour-son-retour-festif-672781238547',
      image:
        'https://cdn.unitycms.io/images/0DkFyhuSqBmAim8QHhVB1V.png?op=focus&val=1200,675,1000,1000,0,0,500,500&sum=hUapAbOtry4',
      publishedAt: '2023-07-16T13:58:05Z',
      source: {
        name: '20 minutes',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'WATCH: Injured Kai Sotto wraps up NBA Summer League with block, assist',
      description:
        "Filipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Magic loss",
      content:
        "This is AI generated summarization, which may have errors. For context, always refer to the full article.\nFilipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Mag... [1181 chars]",
      url: 'https://www.rappler.com/sports/nba/video-highlights-kai-sotto-summer-league-orlando-magic-boston-celtics-july-15-2023/',
      image: 'https://www.rappler.com/tachyon/2023/07/Untitled-design-1.png',
      publishedAt: '2023-07-16T13:51:56Z',
      source: {
        name: 'Rappler',
        url: 'https://www.rappler.com',
      },
    },
    {
      title:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: - Vet ikke hvor mange sommerferier vi har igjen sammen',
      description:
        'Alf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.',
      content:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: – Vet ikke hvor mange sommerferier vi har igjen sammen\nAlf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.\nALS-syk... [5304 chars]',
      url: 'https://www.aftenposten.no/norge/i/EQkPGj/doedssyke-alf-34-maa-selv-dekke-assistentenes-reisekostnader-paa-ferie-vet-ikke-hvor-mange-sommerferier-vi-har-igjen-sammen',
      image:
        'https://premium.vgc.no/v2/images/10eb0f20-bec4-41d4-a0cd-a76bfa0c91bc?fit=crop&format=auto&h=2731&w=2048&s=92fa4c6b2864f02fb73a85041c2793e624a07a37',
      publishedAt: '2023-07-16T13:48:32Z',
      source: {
        name: 'Aftenposten',
        url: 'https://www.aftenposten.no',
      },
    },
    {
      title:
        'Rishi Sunak to appoint new defence secretary after Ben Wallace says he is quitting',
      description:
        'Minister announces he will leave PM’s cabinet at next reshuffle and quit Westminster at general election',
      content:
        'Rishi Sunak is to appoint a new defence secretary after Ben Wallace announced he will soon quit after four years in the post, and will not fight the general election expected next year.\nHe said he had decided to leave the government at Rishi Sunak’s ... [2995 chars]',
      url: 'https://www.ft.com/content/5d1c9594-71ca-4572-b335-ae6d4082d482',
      image:
        'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F2ddc3893-bc54-449f-8a79-4e36d83cc648.jpg?source=next-opengraph&fit=scale-down&width=900',
      publishedAt: '2023-07-16T13:47:47Z',
      source: {
        name: 'Financial Times',
        url: 'https://www.ft.com',
      },
    },
    {
      title:
        'Smokers who get e-cigarette flavour advice more likely to quit, report finds',
      description:
        'Study says quarter of smokers had quit after three months and 13% cut consumption by more than half',
      content:
        'Smokers who get help picking the flavour of e-cigarette they use and receive supportive text messages are much more likely to quit, research has found.\nThe study, led by London South Bank University (LSBU), explored in what settings vapes could help ... [2706 chars]',
      url: 'https://www.theguardian.com/society/2023/jul/16/smokers-who-get-e-cigarette-flavour-advice-more-likely-to-quit-report-finds',
      image:
        'https://i.guim.co.uk/img/media/dbe754f9d2baceab138b12ce268869cce0b15cde/0_0_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=a4fc0748863120a6aff82126be7d84a7',
      publishedAt: '2023-07-16T13:44:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title:
        'Tour de France: Wieder Fan-Ärger - Zuschauer löst mit Selfie einen Massensturz aus',
      description:
        'Ein unachtsamer Zuschauer hat bei der Tour de France einen Massensturz ausgelöst und den wichtigsten Helfer von Titelverteidiger Jonas Vingegaard zu Fall gebracht.',
      content:
        'An der Tour de France ist es zum wiederholten Mal zu einem Sturz wegen eines Zuschauers gekommen.\nEtwa 128 Kilometer vor dem Ziel der 15. Etappe stand ein Fan zu weit auf der Strasse und hielt seinen Arm heraus, mit dem er offenbar ein Smartphone hie... [655 chars]',
      url: 'https://www.20min.ch/story/wieder-fan-aerger-zuschauer-loest-mit-selfie-einen-massensturz-aus-454911969993',
      image:
        'https://cdn.unitycms.io/images/9VdAGQI3KSp8HuR1L1lqdL.jpg?op=focus&val=1200,675,492,611,389,222,552,564&sum=E7OMkKLdlb0',
      publishedAt: '2023-07-16T13:42:21Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'Dordogne : le corps de la femme portée disparue retrouvé par un promeneur dans les bois',
      description:
        'Le corps de cette habitante portée disparue depuis le 13 juillet dernier a été retrouvé ce dimanche. La piste du suicide est privilégiée.',
      content:
        "C'est un promeneur en vélo qui a découvert le corps ce dimanche en tout début d'après-midi sur la commune d'Annesse-et-Beaulieu, là où les recherches s'étaient concentrée depuis ce samedi. Il s'agit bien de cette habitante de Mensignac de 61 ans, por... [544 chars]",
      url: 'https://www.francebleu.fr/infos/faits-divers-justice/dordogne-le-corps-de-la-femme-portee-disparue-retrouve-5469905',
      image:
        'https://www.francebleu.fr/s3/cruiser-production/2023/07/30c52429-bbaa-4536-bdb2-726eafed2b16/1200x680_sc_41128-kvvx8sdoby-whr.jpg',
      publishedAt: '2023-07-16T13:39:46Z',
      source: {
        name: 'France Bleu',
        url: 'https://www.francebleu.fr',
      },
    },
    {
      title:
        'Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte',
      description:
        '"Dat ligt wel in de lijn der verwachting", vertelt ploegleider Arthur van Dongen in Spraakmakers op NPO Radio 1.',
      content:
        'Reuters Een gehavende Nathan Van Hooydonck na de val\nTour 2023 NOS Wielrennen • vandaag, 11:08 Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte\nWielerploeg Jumbo-Visma overweegt aangifte te doen tegen de toeschouwer die zon... [2909 chars]',
      url: 'https://nos.nl/collectie/13935/artikel/2483122-jumbo-visma-overweegt-aangifte-tegen-selfienemer-die-valpartij-veroorzaakte',
      image: 'https://cdn.nos.nl/image/2023/07/17/988172/1024x576a.jpg',
      publishedAt: '2023-07-17T09:08:30Z',
      source: {
        name: 'NOS',
        url: 'https://nos.nl',
      },
    },
    {
      title:
        'England recall Anderson for fourth Ashes Test and Moeen to bat at No 3',
      description:
        'England have made one change to their team for the fourth Ashes Test against Australia at Old Trafford, with fast bowler Jimmy Anderson replacing Ollie Robinson',
      content:
        'England have recalled Jimmy Anderson for the fourth Ashes Test at Old Trafford. The 40-year-old Lancashire seamer will feature on home turf as he returns to the team in place of Ollie Robinson, the only change to the side that defeated Australia at H... [2237 chars]',
      url: 'https://www.theguardian.com/sport/2023/jul/17/england-recall-jimmy-anderson-fourth-ashes-test-moeen-ali-bat-no3',
      image:
        'https://i.guim.co.uk/img/media/e165e72b2ac4e99a418d807debb1c7a728ec6db3/0_5_4140_2484/master/4140.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5a185b12f7833d4d105cd405a85fb02c',
      publishedAt: '2023-07-17T09:06:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title: 'Kanton Luzern: Belgier überlädt Auto massiv',
      description:
        'Ein Belgier war auf der A2 im Kanton Luzern überbeladen unterwegs. Er musste die Ladung zwischendeponieren.',
      content:
        'Ein Belgier war am Sonntag auf der A2 im Kanton Luzern massiv überbeladen unterwegs. Er musste die Ladung von seinem Auto nehmen und zwischendeponieren.\nKanton Luzern : Rate mal, wie viele Kilos hier zu viel auf dem Auto sind\n1 / 1 So überladen war d... [2971 chars]',
      url: 'https://www.20min.ch/story/rate-mal-wie-viele-kilos-hier-zu-viel-auf-dem-auto-sind-137983149080',
      image:
        'https://cdn.unitycms.io/images/3UOg75OpqL4AmpTGMecP8M.jpg?op=focus&val=1200,675,1000,719,0,0,470,397&sum=sDr6_o6PTPg',
      publishedAt: '2023-07-17T09:01:37Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title: 'Hetebølge:',
      description:
        'Samtidig som den kraftige hetebølgen herjer i Sør-Europa, har en ny varmerekord blitt satt i Kina.',
      content:
        'Den nye hetebølgen «Charon», også kjent som «monsteret», har truffet Sør-Europa.\nItalienske myndigheter har sendt ut rødt farevarsel for varme i 16 byer, som følge av temperaturer som er ventet å sette nye rekorder over hele Sør-Europa denne uka.\nDet... [1666 chars]',
      url: 'https://www.dagbladet.no/nyheter/slar-alarm/79892106',
      image:
        'https://www.dagbladet.no/images/79892203.jpg?imageId=79892203&panow=100&panoh=100&panox=0&panoy=0&heightw=100&heighth=100&heightx=0&heighty=0&width=1200&height=630',
      publishedAt: '2023-07-17T09:00:43Z',
      source: {
        name: 'Dagbladet.no',
        url: 'https://www.dagbladet.no',
      },
    },
    {
      title:
        'Alcaraz-Djokovic, la sfida per scegliere il re di Wimbledon DIRETTA',
      description:
        'Il n.1 al mondo sfida il favoritissimo campione serbo (ANSA)',
      content:
        "Edizione n.136 di Wimbledon. Il numero uno al mondo Carlos Alcaraz sfida il favoritissimo Novak Djokovic, che ha superato in semifinale l'italiano Jannik Sinner, match seguito su Sky da oltre mezzo milione di telespettatori, per uno share pari al 6,3... [1206 chars]",
      url: 'https://www.ansa.it/sito/notizie/sport/2023/07/16/alcaraz-djokovic-la-sfida-per-scegliere-il-re-di-wimbledon-diretta_92e10808-9bfb-4529-a30a-66ccf153c704.html',
      image:
        'https://www.ansa.it/webimages/img_700/2023/7/16/9997f24debac4385006ade952fd1a7b6.jpg',
      publishedAt: '2023-07-16T14:07:00Z',
      source: {
        name: 'Agenzia ANSA',
        url: 'https://www.ansa.it',
      },
    },
    {
      title:
        'Alianza Lima vs. Sport Boys EN VIVO: transmisión de GOLPERU y Movistar',
      description:
        'Alianza Lima vs. Sport Boys juegan EN VIVO y EN DIRECTO vía GOLPERU y Movistar por la fecha 4 del Torneo Clausura 2023, este domingo 16 de julio desde las 3:00 p.m. Sigue los detalles en la web de Depor.',
      content:
        'Alianza Lima vs. Sport Boys (EN VIVO | EN DIRECTO | ONLINE | GRATIS) vía GOLPERU, Movistar y Fútbol Libre TV por la fecha 4 del Torneo Clausura 2023 de la Liga 1 Betsson. Este compromiso está programado para este domingo 16 de julio desde las 3:00 p.... [3153 chars]',
      url: 'https://depor.com/futbol-peruano/descentralizado/alianza-lima-vs-sport-boys-en-vivo-en-directo-gratis-via-golperu-movistar-liga-1-max-y-directv-a-que-hora-juegan-y-donde-ver-transmision-online-via-dsports-y-futbol-libre-por-el-torneo-clausura-2023-alineaciones-deportes-noticia/',
      image:
        'https://depor.com/resizer/XTAeq3riNFoDGG9LJ1_qJm-Ckls=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/MLHOGXGPEBEUDKEO6PC5EPFTDY.jpg',
      publishedAt: '2023-07-16T14:02:39Z',
      source: {
        name: 'Diario Depor',
        url: 'https://depor.com',
      },
    },
    {
      title:
        'Genève: La Lake Parade a convaincu petits et grands pour son retour festif',
      description:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.',
      content:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.\nEntre 80 et 120’000 fans de musiques électroniques ont défilé samedi lors de la ... [1192 chars]',
      url: 'https://www.20min.ch/fr/story/la-lake-parade-a-convaincu-petits-et-grands-pour-son-retour-festif-672781238547',
      image:
        'https://cdn.unitycms.io/images/0DkFyhuSqBmAim8QHhVB1V.png?op=focus&val=1200,675,1000,1000,0,0,500,500&sum=hUapAbOtry4',
      publishedAt: '2023-07-16T13:58:05Z',
      source: {
        name: '20 minutes',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'WATCH: Injured Kai Sotto wraps up NBA Summer League with block, assist',
      description:
        "Filipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Magic loss",
      content:
        "This is AI generated summarization, which may have errors. For context, always refer to the full article.\nFilipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Mag... [1181 chars]",
      url: 'https://www.rappler.com/sports/nba/video-highlights-kai-sotto-summer-league-orlando-magic-boston-celtics-july-15-2023/',
      image: 'https://www.rappler.com/tachyon/2023/07/Untitled-design-1.png',
      publishedAt: '2023-07-16T13:51:56Z',
      source: {
        name: 'Rappler',
        url: 'https://www.rappler.com',
      },
    },
    {
      title:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: - Vet ikke hvor mange sommerferier vi har igjen sammen',
      description:
        'Alf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.',
      content:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: – Vet ikke hvor mange sommerferier vi har igjen sammen\nAlf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.\nALS-syk... [5304 chars]',
      url: 'https://www.aftenposten.no/norge/i/EQkPGj/doedssyke-alf-34-maa-selv-dekke-assistentenes-reisekostnader-paa-ferie-vet-ikke-hvor-mange-sommerferier-vi-har-igjen-sammen',
      image:
        'https://premium.vgc.no/v2/images/10eb0f20-bec4-41d4-a0cd-a76bfa0c91bc?fit=crop&format=auto&h=2731&w=2048&s=92fa4c6b2864f02fb73a85041c2793e624a07a37',
      publishedAt: '2023-07-16T13:48:32Z',
      source: {
        name: 'Aftenposten',
        url: 'https://www.aftenposten.no',
      },
    },
    {
      title:
        'Rishi Sunak to appoint new defence secretary after Ben Wallace says he is quitting',
      description:
        'Minister announces he will leave PM’s cabinet at next reshuffle and quit Westminster at general election',
      content:
        'Rishi Sunak is to appoint a new defence secretary after Ben Wallace announced he will soon quit after four years in the post, and will not fight the general election expected next year.\nHe said he had decided to leave the government at Rishi Sunak’s ... [2995 chars]',
      url: 'https://www.ft.com/content/5d1c9594-71ca-4572-b335-ae6d4082d482',
      image:
        'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F2ddc3893-bc54-449f-8a79-4e36d83cc648.jpg?source=next-opengraph&fit=scale-down&width=900',
      publishedAt: '2023-07-16T13:47:47Z',
      source: {
        name: 'Financial Times',
        url: 'https://www.ft.com',
      },
    },
    {
      title:
        'Smokers who get e-cigarette flavour advice more likely to quit, report finds',
      description:
        'Study says quarter of smokers had quit after three months and 13% cut consumption by more than half',
      content:
        'Smokers who get help picking the flavour of e-cigarette they use and receive supportive text messages are much more likely to quit, research has found.\nThe study, led by London South Bank University (LSBU), explored in what settings vapes could help ... [2706 chars]',
      url: 'https://www.theguardian.com/society/2023/jul/16/smokers-who-get-e-cigarette-flavour-advice-more-likely-to-quit-report-finds',
      image:
        'https://i.guim.co.uk/img/media/dbe754f9d2baceab138b12ce268869cce0b15cde/0_0_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=a4fc0748863120a6aff82126be7d84a7',
      publishedAt: '2023-07-16T13:44:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title:
        'Tour de France: Wieder Fan-Ärger - Zuschauer löst mit Selfie einen Massensturz aus',
      description:
        'Ein unachtsamer Zuschauer hat bei der Tour de France einen Massensturz ausgelöst und den wichtigsten Helfer von Titelverteidiger Jonas Vingegaard zu Fall gebracht.',
      content:
        'An der Tour de France ist es zum wiederholten Mal zu einem Sturz wegen eines Zuschauers gekommen.\nEtwa 128 Kilometer vor dem Ziel der 15. Etappe stand ein Fan zu weit auf der Strasse und hielt seinen Arm heraus, mit dem er offenbar ein Smartphone hie... [655 chars]',
      url: 'https://www.20min.ch/story/wieder-fan-aerger-zuschauer-loest-mit-selfie-einen-massensturz-aus-454911969993',
      image:
        'https://cdn.unitycms.io/images/9VdAGQI3KSp8HuR1L1lqdL.jpg?op=focus&val=1200,675,492,611,389,222,552,564&sum=E7OMkKLdlb0',
      publishedAt: '2023-07-16T13:42:21Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'Dordogne : le corps de la femme portée disparue retrouvé par un promeneur dans les bois',
      description:
        'Le corps de cette habitante portée disparue depuis le 13 juillet dernier a été retrouvé ce dimanche. La piste du suicide est privilégiée.',
      content:
        "C'est un promeneur en vélo qui a découvert le corps ce dimanche en tout début d'après-midi sur la commune d'Annesse-et-Beaulieu, là où les recherches s'étaient concentrée depuis ce samedi. Il s'agit bien de cette habitante de Mensignac de 61 ans, por... [544 chars]",
      url: 'https://www.francebleu.fr/infos/faits-divers-justice/dordogne-le-corps-de-la-femme-portee-disparue-retrouve-5469905',
      image:
        'https://www.francebleu.fr/s3/cruiser-production/2023/07/30c52429-bbaa-4536-bdb2-726eafed2b16/1200x680_sc_41128-kvvx8sdoby-whr.jpg',
      publishedAt: '2023-07-16T13:39:46Z',
      source: {
        name: 'France Bleu',
        url: 'https://www.francebleu.fr',
      },
    },
    {
      title:
        'Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte',
      description:
        '"Dat ligt wel in de lijn der verwachting", vertelt ploegleider Arthur van Dongen in Spraakmakers op NPO Radio 1.',
      content:
        'Reuters Een gehavende Nathan Van Hooydonck na de val\nTour 2023 NOS Wielrennen • vandaag, 11:08 Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte\nWielerploeg Jumbo-Visma overweegt aangifte te doen tegen de toeschouwer die zon... [2909 chars]',
      url: 'https://nos.nl/collectie/13935/artikel/2483122-jumbo-visma-overweegt-aangifte-tegen-selfienemer-die-valpartij-veroorzaakte',
      image: 'https://cdn.nos.nl/image/2023/07/17/988172/1024x576a.jpg',
      publishedAt: '2023-07-17T09:08:30Z',
      source: {
        name: 'NOS',
        url: 'https://nos.nl',
      },
    },
    {
      title:
        'England recall Anderson for fourth Ashes Test and Moeen to bat at No 3',
      description:
        'England have made one change to their team for the fourth Ashes Test against Australia at Old Trafford, with fast bowler Jimmy Anderson replacing Ollie Robinson',
      content:
        'England have recalled Jimmy Anderson for the fourth Ashes Test at Old Trafford. The 40-year-old Lancashire seamer will feature on home turf as he returns to the team in place of Ollie Robinson, the only change to the side that defeated Australia at H... [2237 chars]',
      url: 'https://www.theguardian.com/sport/2023/jul/17/england-recall-jimmy-anderson-fourth-ashes-test-moeen-ali-bat-no3',
      image:
        'https://i.guim.co.uk/img/media/e165e72b2ac4e99a418d807debb1c7a728ec6db3/0_5_4140_2484/master/4140.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5a185b12f7833d4d105cd405a85fb02c',
      publishedAt: '2023-07-17T09:06:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title: 'Kanton Luzern: Belgier überlädt Auto massiv',
      description:
        'Ein Belgier war auf der A2 im Kanton Luzern überbeladen unterwegs. Er musste die Ladung zwischendeponieren.',
      content:
        'Ein Belgier war am Sonntag auf der A2 im Kanton Luzern massiv überbeladen unterwegs. Er musste die Ladung von seinem Auto nehmen und zwischendeponieren.\nKanton Luzern : Rate mal, wie viele Kilos hier zu viel auf dem Auto sind\n1 / 1 So überladen war d... [2971 chars]',
      url: 'https://www.20min.ch/story/rate-mal-wie-viele-kilos-hier-zu-viel-auf-dem-auto-sind-137983149080',
      image:
        'https://cdn.unitycms.io/images/3UOg75OpqL4AmpTGMecP8M.jpg?op=focus&val=1200,675,1000,719,0,0,470,397&sum=sDr6_o6PTPg',
      publishedAt: '2023-07-17T09:01:37Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title: 'Hetebølge:',
      description:
        'Samtidig som den kraftige hetebølgen herjer i Sør-Europa, har en ny varmerekord blitt satt i Kina.',
      content:
        'Den nye hetebølgen «Charon», også kjent som «monsteret», har truffet Sør-Europa.\nItalienske myndigheter har sendt ut rødt farevarsel for varme i 16 byer, som følge av temperaturer som er ventet å sette nye rekorder over hele Sør-Europa denne uka.\nDet... [1666 chars]',
      url: 'https://www.dagbladet.no/nyheter/slar-alarm/79892106',
      image:
        'https://www.dagbladet.no/images/79892203.jpg?imageId=79892203&panow=100&panoh=100&panox=0&panoy=0&heightw=100&heighth=100&heightx=0&heighty=0&width=1200&height=630',
      publishedAt: '2023-07-17T09:00:43Z',
      source: {
        name: 'Dagbladet.no',
        url: 'https://www.dagbladet.no',
      },
    },
    {
      title:
        'Alcaraz-Djokovic, la sfida per scegliere il re di Wimbledon DIRETTA',
      description:
        'Il n.1 al mondo sfida il favoritissimo campione serbo (ANSA)',
      content:
        "Edizione n.136 di Wimbledon. Il numero uno al mondo Carlos Alcaraz sfida il favoritissimo Novak Djokovic, che ha superato in semifinale l'italiano Jannik Sinner, match seguito su Sky da oltre mezzo milione di telespettatori, per uno share pari al 6,3... [1206 chars]",
      url: 'https://www.ansa.it/sito/notizie/sport/2023/07/16/alcaraz-djokovic-la-sfida-per-scegliere-il-re-di-wimbledon-diretta_92e10808-9bfb-4529-a30a-66ccf153c704.html',
      image:
        'https://www.ansa.it/webimages/img_700/2023/7/16/9997f24debac4385006ade952fd1a7b6.jpg',
      publishedAt: '2023-07-16T14:07:00Z',
      source: {
        name: 'Agenzia ANSA',
        url: 'https://www.ansa.it',
      },
    },
    {
      title:
        'Alianza Lima vs. Sport Boys EN VIVO: transmisión de GOLPERU y Movistar',
      description:
        'Alianza Lima vs. Sport Boys juegan EN VIVO y EN DIRECTO vía GOLPERU y Movistar por la fecha 4 del Torneo Clausura 2023, este domingo 16 de julio desde las 3:00 p.m. Sigue los detalles en la web de Depor.',
      content:
        'Alianza Lima vs. Sport Boys (EN VIVO | EN DIRECTO | ONLINE | GRATIS) vía GOLPERU, Movistar y Fútbol Libre TV por la fecha 4 del Torneo Clausura 2023 de la Liga 1 Betsson. Este compromiso está programado para este domingo 16 de julio desde las 3:00 p.... [3153 chars]',
      url: 'https://depor.com/futbol-peruano/descentralizado/alianza-lima-vs-sport-boys-en-vivo-en-directo-gratis-via-golperu-movistar-liga-1-max-y-directv-a-que-hora-juegan-y-donde-ver-transmision-online-via-dsports-y-futbol-libre-por-el-torneo-clausura-2023-alineaciones-deportes-noticia/',
      image:
        'https://depor.com/resizer/XTAeq3riNFoDGG9LJ1_qJm-Ckls=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/MLHOGXGPEBEUDKEO6PC5EPFTDY.jpg',
      publishedAt: '2023-07-16T14:02:39Z',
      source: {
        name: 'Diario Depor',
        url: 'https://depor.com',
      },
    },
    {
      title:
        'Genève: La Lake Parade a convaincu petits et grands pour son retour festif',
      description:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.',
      content:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.\nEntre 80 et 120’000 fans de musiques électroniques ont défilé samedi lors de la ... [1192 chars]',
      url: 'https://www.20min.ch/fr/story/la-lake-parade-a-convaincu-petits-et-grands-pour-son-retour-festif-672781238547',
      image:
        'https://cdn.unitycms.io/images/0DkFyhuSqBmAim8QHhVB1V.png?op=focus&val=1200,675,1000,1000,0,0,500,500&sum=hUapAbOtry4',
      publishedAt: '2023-07-16T13:58:05Z',
      source: {
        name: '20 minutes',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'WATCH: Injured Kai Sotto wraps up NBA Summer League with block, assist',
      description:
        "Filipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Magic loss",
      content:
        "This is AI generated summarization, which may have errors. For context, always refer to the full article.\nFilipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Mag... [1181 chars]",
      url: 'https://www.rappler.com/sports/nba/video-highlights-kai-sotto-summer-league-orlando-magic-boston-celtics-july-15-2023/',
      image: 'https://www.rappler.com/tachyon/2023/07/Untitled-design-1.png',
      publishedAt: '2023-07-16T13:51:56Z',
      source: {
        name: 'Rappler',
        url: 'https://www.rappler.com',
      },
    },
    {
      title:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: - Vet ikke hvor mange sommerferier vi har igjen sammen',
      description:
        'Alf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.',
      content:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: – Vet ikke hvor mange sommerferier vi har igjen sammen\nAlf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.\nALS-syk... [5304 chars]',
      url: 'https://www.aftenposten.no/norge/i/EQkPGj/doedssyke-alf-34-maa-selv-dekke-assistentenes-reisekostnader-paa-ferie-vet-ikke-hvor-mange-sommerferier-vi-har-igjen-sammen',
      image:
        'https://premium.vgc.no/v2/images/10eb0f20-bec4-41d4-a0cd-a76bfa0c91bc?fit=crop&format=auto&h=2731&w=2048&s=92fa4c6b2864f02fb73a85041c2793e624a07a37',
      publishedAt: '2023-07-16T13:48:32Z',
      source: {
        name: 'Aftenposten',
        url: 'https://www.aftenposten.no',
      },
    },
    {
      title:
        'Rishi Sunak to appoint new defence secretary after Ben Wallace says he is quitting',
      description:
        'Minister announces he will leave PM’s cabinet at next reshuffle and quit Westminster at general election',
      content:
        'Rishi Sunak is to appoint a new defence secretary after Ben Wallace announced he will soon quit after four years in the post, and will not fight the general election expected next year.\nHe said he had decided to leave the government at Rishi Sunak’s ... [2995 chars]',
      url: 'https://www.ft.com/content/5d1c9594-71ca-4572-b335-ae6d4082d482',
      image:
        'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F2ddc3893-bc54-449f-8a79-4e36d83cc648.jpg?source=next-opengraph&fit=scale-down&width=900',
      publishedAt: '2023-07-16T13:47:47Z',
      source: {
        name: 'Financial Times',
        url: 'https://www.ft.com',
      },
    },
    {
      title:
        'Smokers who get e-cigarette flavour advice more likely to quit, report finds',
      description:
        'Study says quarter of smokers had quit after three months and 13% cut consumption by more than half',
      content:
        'Smokers who get help picking the flavour of e-cigarette they use and receive supportive text messages are much more likely to quit, research has found.\nThe study, led by London South Bank University (LSBU), explored in what settings vapes could help ... [2706 chars]',
      url: 'https://www.theguardian.com/society/2023/jul/16/smokers-who-get-e-cigarette-flavour-advice-more-likely-to-quit-report-finds',
      image:
        'https://i.guim.co.uk/img/media/dbe754f9d2baceab138b12ce268869cce0b15cde/0_0_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=a4fc0748863120a6aff82126be7d84a7',
      publishedAt: '2023-07-16T13:44:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title:
        'Tour de France: Wieder Fan-Ärger - Zuschauer löst mit Selfie einen Massensturz aus',
      description:
        'Ein unachtsamer Zuschauer hat bei der Tour de France einen Massensturz ausgelöst und den wichtigsten Helfer von Titelverteidiger Jonas Vingegaard zu Fall gebracht.',
      content:
        'An der Tour de France ist es zum wiederholten Mal zu einem Sturz wegen eines Zuschauers gekommen.\nEtwa 128 Kilometer vor dem Ziel der 15. Etappe stand ein Fan zu weit auf der Strasse und hielt seinen Arm heraus, mit dem er offenbar ein Smartphone hie... [655 chars]',
      url: 'https://www.20min.ch/story/wieder-fan-aerger-zuschauer-loest-mit-selfie-einen-massensturz-aus-454911969993',
      image:
        'https://cdn.unitycms.io/images/9VdAGQI3KSp8HuR1L1lqdL.jpg?op=focus&val=1200,675,492,611,389,222,552,564&sum=E7OMkKLdlb0',
      publishedAt: '2023-07-16T13:42:21Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'Dordogne : le corps de la femme portée disparue retrouvé par un promeneur dans les bois',
      description:
        'Le corps de cette habitante portée disparue depuis le 13 juillet dernier a été retrouvé ce dimanche. La piste du suicide est privilégiée.',
      content:
        "C'est un promeneur en vélo qui a découvert le corps ce dimanche en tout début d'après-midi sur la commune d'Annesse-et-Beaulieu, là où les recherches s'étaient concentrée depuis ce samedi. Il s'agit bien de cette habitante de Mensignac de 61 ans, por... [544 chars]",
      url: 'https://www.francebleu.fr/infos/faits-divers-justice/dordogne-le-corps-de-la-femme-portee-disparue-retrouve-5469905',
      image:
        'https://www.francebleu.fr/s3/cruiser-production/2023/07/30c52429-bbaa-4536-bdb2-726eafed2b16/1200x680_sc_41128-kvvx8sdoby-whr.jpg',
      publishedAt: '2023-07-16T13:39:46Z',
      source: {
        name: 'France Bleu',
        url: 'https://www.francebleu.fr',
      },
    },
    {
      title:
        'Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte',
      description:
        '"Dat ligt wel in de lijn der verwachting", vertelt ploegleider Arthur van Dongen in Spraakmakers op NPO Radio 1.',
      content:
        'Reuters Een gehavende Nathan Van Hooydonck na de val\nTour 2023 NOS Wielrennen • vandaag, 11:08 Jumbo-Visma overweegt aangifte tegen selfienemer die valpartij veroorzaakte\nWielerploeg Jumbo-Visma overweegt aangifte te doen tegen de toeschouwer die zon... [2909 chars]',
      url: 'https://nos.nl/collectie/13935/artikel/2483122-jumbo-visma-overweegt-aangifte-tegen-selfienemer-die-valpartij-veroorzaakte',
      image: 'https://cdn.nos.nl/image/2023/07/17/988172/1024x576a.jpg',
      publishedAt: '2023-07-17T09:08:30Z',
      source: {
        name: 'NOS',
        url: 'https://nos.nl',
      },
    },
    {
      title:
        'England recall Anderson for fourth Ashes Test and Moeen to bat at No 3',
      description:
        'England have made one change to their team for the fourth Ashes Test against Australia at Old Trafford, with fast bowler Jimmy Anderson replacing Ollie Robinson',
      content:
        'England have recalled Jimmy Anderson for the fourth Ashes Test at Old Trafford. The 40-year-old Lancashire seamer will feature on home turf as he returns to the team in place of Ollie Robinson, the only change to the side that defeated Australia at H... [2237 chars]',
      url: 'https://www.theguardian.com/sport/2023/jul/17/england-recall-jimmy-anderson-fourth-ashes-test-moeen-ali-bat-no3',
      image:
        'https://i.guim.co.uk/img/media/e165e72b2ac4e99a418d807debb1c7a728ec6db3/0_5_4140_2484/master/4140.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5a185b12f7833d4d105cd405a85fb02c',
      publishedAt: '2023-07-17T09:06:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title: 'Kanton Luzern: Belgier überlädt Auto massiv',
      description:
        'Ein Belgier war auf der A2 im Kanton Luzern überbeladen unterwegs. Er musste die Ladung zwischendeponieren.',
      content:
        'Ein Belgier war am Sonntag auf der A2 im Kanton Luzern massiv überbeladen unterwegs. Er musste die Ladung von seinem Auto nehmen und zwischendeponieren.\nKanton Luzern : Rate mal, wie viele Kilos hier zu viel auf dem Auto sind\n1 / 1 So überladen war d... [2971 chars]',
      url: 'https://www.20min.ch/story/rate-mal-wie-viele-kilos-hier-zu-viel-auf-dem-auto-sind-137983149080',
      image:
        'https://cdn.unitycms.io/images/3UOg75OpqL4AmpTGMecP8M.jpg?op=focus&val=1200,675,1000,719,0,0,470,397&sum=sDr6_o6PTPg',
      publishedAt: '2023-07-17T09:01:37Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title: 'Hetebølge:',
      description:
        'Samtidig som den kraftige hetebølgen herjer i Sør-Europa, har en ny varmerekord blitt satt i Kina.',
      content:
        'Den nye hetebølgen «Charon», også kjent som «monsteret», har truffet Sør-Europa.\nItalienske myndigheter har sendt ut rødt farevarsel for varme i 16 byer, som følge av temperaturer som er ventet å sette nye rekorder over hele Sør-Europa denne uka.\nDet... [1666 chars]',
      url: 'https://www.dagbladet.no/nyheter/slar-alarm/79892106',
      image:
        'https://www.dagbladet.no/images/79892203.jpg?imageId=79892203&panow=100&panoh=100&panox=0&panoy=0&heightw=100&heighth=100&heightx=0&heighty=0&width=1200&height=630',
      publishedAt: '2023-07-17T09:00:43Z',
      source: {
        name: 'Dagbladet.no',
        url: 'https://www.dagbladet.no',
      },
    },
    {
      title:
        'Alcaraz-Djokovic, la sfida per scegliere il re di Wimbledon DIRETTA',
      description:
        'Il n.1 al mondo sfida il favoritissimo campione serbo (ANSA)',
      content:
        "Edizione n.136 di Wimbledon. Il numero uno al mondo Carlos Alcaraz sfida il favoritissimo Novak Djokovic, che ha superato in semifinale l'italiano Jannik Sinner, match seguito su Sky da oltre mezzo milione di telespettatori, per uno share pari al 6,3... [1206 chars]",
      url: 'https://www.ansa.it/sito/notizie/sport/2023/07/16/alcaraz-djokovic-la-sfida-per-scegliere-il-re-di-wimbledon-diretta_92e10808-9bfb-4529-a30a-66ccf153c704.html',
      image:
        'https://www.ansa.it/webimages/img_700/2023/7/16/9997f24debac4385006ade952fd1a7b6.jpg',
      publishedAt: '2023-07-16T14:07:00Z',
      source: {
        name: 'Agenzia ANSA',
        url: 'https://www.ansa.it',
      },
    },
    {
      title:
        'Alianza Lima vs. Sport Boys EN VIVO: transmisión de GOLPERU y Movistar',
      description:
        'Alianza Lima vs. Sport Boys juegan EN VIVO y EN DIRECTO vía GOLPERU y Movistar por la fecha 4 del Torneo Clausura 2023, este domingo 16 de julio desde las 3:00 p.m. Sigue los detalles en la web de Depor.',
      content:
        'Alianza Lima vs. Sport Boys (EN VIVO | EN DIRECTO | ONLINE | GRATIS) vía GOLPERU, Movistar y Fútbol Libre TV por la fecha 4 del Torneo Clausura 2023 de la Liga 1 Betsson. Este compromiso está programado para este domingo 16 de julio desde las 3:00 p.... [3153 chars]',
      url: 'https://depor.com/futbol-peruano/descentralizado/alianza-lima-vs-sport-boys-en-vivo-en-directo-gratis-via-golperu-movistar-liga-1-max-y-directv-a-que-hora-juegan-y-donde-ver-transmision-online-via-dsports-y-futbol-libre-por-el-torneo-clausura-2023-alineaciones-deportes-noticia/',
      image:
        'https://depor.com/resizer/XTAeq3riNFoDGG9LJ1_qJm-Ckls=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/MLHOGXGPEBEUDKEO6PC5EPFTDY.jpg',
      publishedAt: '2023-07-16T14:02:39Z',
      source: {
        name: 'Diario Depor',
        url: 'https://depor.com',
      },
    },
    {
      title:
        'Genève: La Lake Parade a convaincu petits et grands pour son retour festif',
      description:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.',
      content:
        'La manifesation s’est déroulée pour la première fois en six ans ce week-end au bout du lac. Cette édition se voulait plus ouvertes aux familles, et le pari a été réussi.\nEntre 80 et 120’000 fans de musiques électroniques ont défilé samedi lors de la ... [1192 chars]',
      url: 'https://www.20min.ch/fr/story/la-lake-parade-a-convaincu-petits-et-grands-pour-son-retour-festif-672781238547',
      image:
        'https://cdn.unitycms.io/images/0DkFyhuSqBmAim8QHhVB1V.png?op=focus&val=1200,675,1000,1000,0,0,500,500&sum=hUapAbOtry4',
      publishedAt: '2023-07-16T13:58:05Z',
      source: {
        name: '20 minutes',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'WATCH: Injured Kai Sotto wraps up NBA Summer League with block, assist',
      description:
        "Filipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Magic loss",
      content:
        "This is AI generated summarization, which may have errors. For context, always refer to the full article.\nFilipino center Kai Sotto's NBA Summer League stint ends early due to a reported back injury, but nonetheless contributes in another Orlando Mag... [1181 chars]",
      url: 'https://www.rappler.com/sports/nba/video-highlights-kai-sotto-summer-league-orlando-magic-boston-celtics-july-15-2023/',
      image: 'https://www.rappler.com/tachyon/2023/07/Untitled-design-1.png',
      publishedAt: '2023-07-16T13:51:56Z',
      source: {
        name: 'Rappler',
        url: 'https://www.rappler.com',
      },
    },
    {
      title:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: - Vet ikke hvor mange sommerferier vi har igjen sammen',
      description:
        'Alf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.',
      content:
        'Dødssyke Alf (34) må selv dekke assistentenes reisekostnader på ferie: – Vet ikke hvor mange sommerferier vi har igjen sammen\nAlf Brun må ut med minst 70.000 for tre dager med sommerferie i Norge og Sverige. Kommunen skylder på stram økonomi.\nALS-syk... [5304 chars]',
      url: 'https://www.aftenposten.no/norge/i/EQkPGj/doedssyke-alf-34-maa-selv-dekke-assistentenes-reisekostnader-paa-ferie-vet-ikke-hvor-mange-sommerferier-vi-har-igjen-sammen',
      image:
        'https://premium.vgc.no/v2/images/10eb0f20-bec4-41d4-a0cd-a76bfa0c91bc?fit=crop&format=auto&h=2731&w=2048&s=92fa4c6b2864f02fb73a85041c2793e624a07a37',
      publishedAt: '2023-07-16T13:48:32Z',
      source: {
        name: 'Aftenposten',
        url: 'https://www.aftenposten.no',
      },
    },
    {
      title:
        'Rishi Sunak to appoint new defence secretary after Ben Wallace says he is quitting',
      description:
        'Minister announces he will leave PM’s cabinet at next reshuffle and quit Westminster at general election',
      content:
        'Rishi Sunak is to appoint a new defence secretary after Ben Wallace announced he will soon quit after four years in the post, and will not fight the general election expected next year.\nHe said he had decided to leave the government at Rishi Sunak’s ... [2995 chars]',
      url: 'https://www.ft.com/content/5d1c9594-71ca-4572-b335-ae6d4082d482',
      image:
        'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F2ddc3893-bc54-449f-8a79-4e36d83cc648.jpg?source=next-opengraph&fit=scale-down&width=900',
      publishedAt: '2023-07-16T13:47:47Z',
      source: {
        name: 'Financial Times',
        url: 'https://www.ft.com',
      },
    },
    {
      title:
        'Smokers who get e-cigarette flavour advice more likely to quit, report finds',
      description:
        'Study says quarter of smokers had quit after three months and 13% cut consumption by more than half',
      content:
        'Smokers who get help picking the flavour of e-cigarette they use and receive supportive text messages are much more likely to quit, research has found.\nThe study, led by London South Bank University (LSBU), explored in what settings vapes could help ... [2706 chars]',
      url: 'https://www.theguardian.com/society/2023/jul/16/smokers-who-get-e-cigarette-flavour-advice-more-likely-to-quit-report-finds',
      image:
        'https://i.guim.co.uk/img/media/dbe754f9d2baceab138b12ce268869cce0b15cde/0_0_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=a4fc0748863120a6aff82126be7d84a7',
      publishedAt: '2023-07-16T13:44:00Z',
      source: {
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
      },
    },
    {
      title:
        'Tour de France: Wieder Fan-Ärger - Zuschauer löst mit Selfie einen Massensturz aus',
      description:
        'Ein unachtsamer Zuschauer hat bei der Tour de France einen Massensturz ausgelöst und den wichtigsten Helfer von Titelverteidiger Jonas Vingegaard zu Fall gebracht.',
      content:
        'An der Tour de France ist es zum wiederholten Mal zu einem Sturz wegen eines Zuschauers gekommen.\nEtwa 128 Kilometer vor dem Ziel der 15. Etappe stand ein Fan zu weit auf der Strasse und hielt seinen Arm heraus, mit dem er offenbar ein Smartphone hie... [655 chars]',
      url: 'https://www.20min.ch/story/wieder-fan-aerger-zuschauer-loest-mit-selfie-einen-massensturz-aus-454911969993',
      image:
        'https://cdn.unitycms.io/images/9VdAGQI3KSp8HuR1L1lqdL.jpg?op=focus&val=1200,675,492,611,389,222,552,564&sum=E7OMkKLdlb0',
      publishedAt: '2023-07-16T13:42:21Z',
      source: {
        name: '20 Minuten',
        url: 'https://www.20min.ch',
      },
    },
    {
      title:
        'Dordogne : le corps de la femme portée disparue retrouvé par un promeneur dans les bois',
      description:
        'Le corps de cette habitante portée disparue depuis le 13 juillet dernier a été retrouvé ce dimanche. La piste du suicide est privilégiée.',
      content:
        "C'est un promeneur en vélo qui a découvert le corps ce dimanche en tout début d'après-midi sur la commune d'Annesse-et-Beaulieu, là où les recherches s'étaient concentrée depuis ce samedi. Il s'agit bien de cette habitante de Mensignac de 61 ans, por... [544 chars]",
      url: 'https://www.francebleu.fr/infos/faits-divers-justice/dordogne-le-corps-de-la-femme-portee-disparue-retrouve-5469905',
      image:
        'https://www.francebleu.fr/s3/cruiser-production/2023/07/30c52429-bbaa-4536-bdb2-726eafed2b16/1200x680_sc_41128-kvvx8sdoby-whr.jpg',
      publishedAt: '2023-07-16T13:39:46Z',
      source: {
        name: 'France Bleu',
        url: 'https://www.francebleu.fr',
      },
    },
  ],
};

let dummyData: Headlines[] = [];
//| PromiseLike<Headlines[]>
export const fetchAndStoreHeadlines = async (): Promise<Headlines[]> => {
  const db = await getDBConnection();
  await createTable(db);
  //clears existing data leaving pinned options
  await deleteTable(db);
  dummyData = [];
  gNewsDummy.articles.map(i => {
    dummyData.push({
      id: uuidv4(),
      headline: i.title,
      icon: i.image,
      link: i.source.url,
      brief: 'br',
      seen: false,
      pinned: false,
    });
  });

  await saveItems(db, dummyData);
  return dummyData;
};

const useHeadLines = () => {
  const {isLoading, isError, data, error, refetch, isRefetching} = useQuery({
    queryKey: ['gnews'],
    queryFn: async () => {
      const db = await getDBConnection();
      let results = await fetchRandomItems(db);
      if (!results) {
        results = await fetchRandomItems(db);
      }
      return results;
    },
  });
  return {isLoading, isError, data, error, refetch, isRefetching};
};

export default useHeadLines;
