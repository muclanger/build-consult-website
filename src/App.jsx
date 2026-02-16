import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, Mail, MapPin, ChevronRight, Check, ArrowRight, Linkedin, Target } from 'lucide-react';
import logoSvg from '/logo.svg';
import logoHoch from '/logo_hoch.svg';
import logoBreit from '/logo_breit.svg';

// --- Styles Injection ---
// Simulierte CSS-Umgebung. In Produktion sollte dies in eine CSS-Datei oder den Head.
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400;700&display=swap');
  .font-serif { font-family: 'Cinzel', serif; }
  .font-sans { font-family: 'Lato', sans-serif; }
  .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;

// --- Content Data ---

const translations = {
  de: {
    nav: { home: 'Home', about: 'Über Uns', services: 'Dienstleistungen', method: 'Arbeitsweise', why: 'Warum wir?', contact: 'Kontakt' },
    home: {
      title: 'Ihr Partner f\u00fcr Ihr gesamtes Bau- und Immobilienprojekt',
      subtitle: 'Exzellenz in Bau und Immobilien',
      cta: 'Unsere Expertise',
      teaser_title: 'Exzellenz in Bau und Immobilien',
      teaser_text: 'Bauen ist komplex \u2013 wir machen es f\u00fcr Sie einfach.\n\nWir begleiten Sie zuverl\u00e4ssig durch Ihr Bauvorhaben. Mit Erfahrung, klarer F\u00fchrung und pers\u00f6nlicher Betreuung schaffen wir Werte, die Bestand haben.',
      learn_more: 'Mehr erfahren',
      usp2_title: 'Allround-Service / One-Stop-Shop',
      usp2_subtitle: 'Ein Ansprechpartner f\u00fcr den gesamten Immobilienzyklus',
      usp2_text: 'BUILD & CONSULT Real Estate GmbH bietet einen ganzheitlichen Allround-Service f\u00fcr Bau- und Immobilienprojekte.\n\nUnsere Auftraggeber profitieren von einer zentralen Ansprechperson, die sie \u00fcber den gesamten Lebenszyklus einer Immobilie begleitet \u2013 von der ersten Entscheidung bis zur nachhaltigen Nutzung oder Ver\u00e4usserung.',
      usp2_points: ['Unterst\u00fctzung beim Ankauf von Immobilien oder Grundst\u00fccken', 'Projektierung und Entwicklung von Bau- und Sanierungsvorhaben', 'Bauabwicklung inkl. Bauherrenvertretung, Projekt- und Baumanagement', 'Inbetriebnahme und \u00dcbergabe', 'Immobilienverwaltung oder Begleitung beim Verkauf']
    },
    about: {
      title: 'Über Uns',
      intro: 'BUILD & CONSULT ist mehr als eine Beratung. Wir sind Ihr strategischer Partner in einer komplexen Immobilienwelt.',
      mission_title: 'Unsere Mission',
      mission_text: 'Unsere Mission ist es, Bauherren Sicherheit und Verl\u00e4sslichkeit zu geben.\n\nWir schaffen klare Strukturen und f\u00fchren Bauprojekte im Fokus von Termin, Qualit\u00e4t und Kosten auch in anspruchsvollen Situationen planbar, kontrollierbar und erfolgreich zum Ziel.',
      network_title: 'Unser Netzwerk',
      network_text: 'BUILD & CONSULT arbeitet mit einem bew\u00e4hrten Netzwerk aus spezialisierten Partnerfirmen zusammen. Je nach Projektanforderung binden wir gezielt erfahrene Fachplaner, Unternehmer und Dienstleister ein.\n\nUnsere Leistungen k\u00f6nnen dabei ganzheitlich aus einer Hand oder modular als einzelne Leistungspakete erbracht werden. Auf Wunsch vermitteln wir unsere Partnerfirmen auch direkt und unabh\u00e4ngig, transparent und ohne Bindung.\n\nSo erhalten unsere Auftraggeber genau die Unterst\u00fctzung, die sie ben\u00f6tigen \u2013 flexibel, effizient und bedarfsgerecht.',
      quote: 'Qualit\u00e4t entsteht dort, wo Erfahrung auf Leidenschaft trifft.',
      team_title: 'Das Board',
      team_intro: 'Diskretion und persönliche Integrität stehen für uns an erster Stelle.',
      role: 'Managing Partner'
    },
    services: {
      title: 'Unsere Dienstleistungen',
      intro: 'Ein ganzheitliches Portfolio f\u00fcr anspruchsvolle Investoren und Eigent\u00fcmer.',
      details: [
        {
          title: 'Interim-Projektleitung & Baustellen-Turnaround',
          icon: 'Target',
          text: 'Bauprojekte geraten aus unterschiedlichen Gr\u00fcnden in Schieflage: Unklare Zust\u00e4ndigkeiten, Terminverzug, Kosten\u00fcberschreitungen oder fehlende F\u00fchrung auf der Baustelle.\n\nGenau hier setzen wir an.\n\nWir \u00fcbernehmen tempor\u00e4r oder langfristig und unmittelbar Verantwortung in Projekten mit erh\u00f6htem Handlungsbedarf \u2013 nicht nur beratend oder steuernd, sondern operativ und direkt vor Ort.',
          points: ['Sofortige Verf\u00fcgbarkeit', 'Operative Projektleitung', 'Krisenintervention', 'Tempor\u00e4re oder langfristige F\u00fchrung'],
          image: 'images/services/interim-projektleitung.jpg',
          isUsp: true
        },
        {
          title: 'Strategische Beratung',
          icon: 'Briefcase',
          text: 'Wir beraten Sie in strategischen Fragen rund um Immobilien und Bauprojekte. Auf Basis fundierter Analysen schaffen wir klare Entscheidungsgrundlagen und unterst\u00fctzen Sie bei der zielgerichteten Planung und Umsetzung.',
          points: ['Standort- und Marktanalysen', 'Nutzungskonzepte', 'Portfolio-Strategie', 'Entscheidungsgrundlagen'],
          image: 'images/services/strategische-beratung.jpg'
        },
        {
          title: 'Bauherrenvertretung',
          icon: 'Users',
          text: 'Wir vertreten Ihre Interessen gegen\u00fcber allen Projektbeteiligten und sorgen f\u00fcr die Einhaltung von Kosten, Terminen und Qualit\u00e4t. Je nach Mandat \u00fcbernehmen wir Koordinations- und Entscheidungsaufgaben in Ihrem Namen.',
          points: ['Vertretung Ihrer Interessen', 'Koordination aller Beteiligten', 'Qualit\u00e4tssicherung', 'Termin\u00fcberwachung'],
          image: 'images/services/bauherr.jpg'
        },
        {
          title: 'Projektsteuerung',
          icon: 'BarChart',
          text: 'Wir strukturieren und steuern Ihr Projekt hinsichtlich Kosten, Terminen und Qualit\u00e4t. Durch strukturierte Organisation und transparentes Reporting stellen wir einen effizienten Projektablauf sicher.',
          points: ['Kosten- und Termincontrolling', 'Steuerung von Planungsteams', 'Risikomanagement', 'Reporting'],
          image: 'images/services/projektsteuerung.jpg'
        },
        {
          title: 'Baumanagement',
          icon: 'Building',
          text: 'Wir \u00fcbernehmen die operative Organisation und Begleitung Ihres Bauvorhabens. Die Submission, Beauftragung und Koordination von Bauunternehmen (TU, GU oder GP ELT) und aller Beteiligten inkl. abschliessender Abnahmebegehungen. Immer im Fokus auf Kosten, Termine und Qualit\u00e4t.',
          points: ['Submission & Beauftragung', 'Koordination vor Ort', 'Abnahmebegehungen', 'Kosten- & Terminkontrolle'],
          image: 'images/services/baumanagement.jpg'
        },
        {
          title: 'Ankauf / Verkauf',
          icon: 'TrendingUp',
          text: 'Wir begleiten Sie beim An- und Verkauf von Immobilien, von der Analyse \u00fcber die Bewertung bis zur strukturierten Abwicklung.',
          points: ['Immobilienbewertung', 'K\u00e4ufer-/Verk\u00e4uferberatung', 'Transaktionsbegleitung', 'Verhandlungsf\u00fchrung'],
          image: 'images/services/ankauf-verkauf.jpg'
        },
        {
          title: 'Gutachten im Bereich Haustechniken',
          icon: 'BarChart',
          text: 'Wir erstellen fundierte Gutachten zu Zustand, Funktion und Optimierungspotenzialen von haustechnischen Anlagen als Entscheidungsgrundlage f\u00fcr Betrieb und Investitionen.',
          points: ['Zustandsanalyse', 'Funktionspr\u00fcfung', 'Optimierungsvorschl\u00e4ge', 'Investitionsplanung'],
          image: 'images/services/haustechnik.jpg'
        }
      ]
    },
    method: {
      title: 'Unsere Arbeitsweise',
      intro: 'Strukturiert. Transparent. Zielorientiert. Unser Prozess garantiert Sicherheit in jeder Phase.',
      steps: [
        { title: '1. Analyse & Zieldefinition', text: 'Wir analysieren Ihre Ausgangslage, Ziele und Rahmenbedingungen.\n\nRisiken, Potenziale und Handlungsbedarf werden fr\u00fchzeitig erkannt und klar definiert.' },
        { title: '2. Struktur & Planung', text: 'Wir schaffen eine saubere Projektstruktur mit klaren Zust\u00e4ndigkeiten, Terminprogrammen und Kosten\u00fcbersichten, als verl\u00e4ssliche Grundlage f\u00fcr alle weiteren Schritte.' },
        { title: '3. Umsetzung & F\u00fchrung', text: 'Wir koordinieren und f\u00fchren alle Beteiligten.\n\nJe nach Mandat \u00fcbernehmen wir die operative Projekt- oder Baustellenleitung direkt vor Ort.' },
        { title: '4. Controlling & Reporting', text: 'Kosten, Termine und Qualit\u00e4t werden laufend \u00fcberwacht.\n\nSie erhalten transparente Reportings und klare Entscheidungsgrundlagen.' },
        { title: '5. Abschluss & \u00dcbergabe', text: 'Qualit\u00e4tssicherung, Abnahmen und saubere \u00dcbergabe \u2013 strukturiert, nachvollziehbar und vollst\u00e4ndig dokumentiert.' }
      ]
    },
    why: {
      title: 'Warum wir?',
      intro: 'Weil Bauprojekte klare F\u00fchrung brauchen.',
      main_text: 'Mit \u00fcber 60 Jahren Berufserfahrung im Bau- und Immobilienbereich bringen wir Struktur, Verantwortung und Verl\u00e4sslichkeit in jedes Projekt.\n\nWir steuern nicht nur \u2013 wir \u00fcbernehmen Verantwortung.\nBei Bedarf steigen wir direkt ein, \u00fcbernehmen die operative F\u00fchrung auf der Baustelle und bringen Projekte in Schieflage wieder unter Kontrolle.',
      quote: 'Qualit\u00e4t entsteht dort, wo Erfahrung auf Leidenschaft trifft.',
      usps: [
        { title: 'Pers\u00f6nlicher Ansprechpartner', text: 'Sie haben durchg\u00e4ngig einen festen Ansprechpartner, der Ihr Projekt kennt und vorantreibt.' },
        { title: 'Hands-on-Mentalit\u00e4t statt Theorie', text: 'Wir packen an und \u00fcbernehmen operative Verantwortung direkt vor Ort.' },
        { title: 'Klare Entscheidungen & transparente Kommunikation', text: 'Sie wissen jederzeit, wo Ihr Projekt steht und was als n\u00e4chstes passiert.' },
        { title: 'Alles aus einer Hand', text: 'Ein Ansprechpartner f\u00fcr alle Themen \u2013 von der Planung bis zur \u00dcbergabe.' },
        { title: 'Flexible Unterst\u00fctzung', text: 'Von der Beratung bis zur Interim-Projekt- oder Bauleitung \u2013 genau so, wie Sie es brauchen.' }
      ],
      closing_text: 'BUILD & CONSULT Real Estate steht f\u00fcr Planungssicherheit, Qualit\u00e4t und Verl\u00e4sslichkeit.\n\nSprechen Sie uns an \u2013 wir k\u00fcmmern uns um Ihr Projekt.'
    },
    contact: {
      title: 'Kontakt',
      text: 'Haben Sie Fragen, Anregungen oder m\u00f6chten Sie sich unverbindlich \u00fcber ein Bauvorhaben austauschen? Z\u00f6gern Sie nicht, uns zu kontaktieren.',
      contact_details: 'Kontaktdaten',
      office_hours: 'B\u00fcrozeiten',
      office_hours_text: 'Mo - Fr: 09:00 - 18:00 Uhr',
      address: 'Schulhausstrasse 58, 8002 Z\u00fcrich',
      phone: '+41 44 558 44 52',
      form: { name: 'Name', email: 'E-Mail', message: 'Ihre Nachricht', send: 'Nachricht senden' }
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
      imprint: 'Impressum',
      privacy: 'Datenschutz'
    }
  },
  en: {
    nav: { home: 'Home', about: 'About Us', services: 'Services', method: 'Approach', why: 'Why Us?', contact: 'Contact' },
    home: {
      title: 'Your Partner for Your Complete Construction and Real Estate Project',
      subtitle: 'Excellence in Construction and Real Estate',
      cta: 'Our Expertise',
      teaser_title: 'Excellence in Construction and Real Estate',
      teaser_text: 'Construction is complex \u2013 we make it simple for you.\n\nWe reliably guide you through your construction project. With experience, clear leadership, and personal support, we create value that lasts.',
      learn_more: 'Learn More',
      usp2_title: 'Full-Service / One-Stop-Shop',
      usp2_subtitle: 'One contact for the entire real estate lifecycle',
      usp2_text: 'BUILD & CONSULT Real Estate GmbH offers comprehensive full-service solutions for construction and real estate projects.\n\nOur clients benefit from a central contact person who accompanies them through the entire lifecycle of a property \u2013 from the first decision to sustainable use or sale.',
      usp2_points: ['Support for property or land acquisition', 'Planning and development of construction and renovation projects', 'Construction execution incl. owner representation, project and construction management', 'Commissioning and handover', 'Property management or support during sale']
    },
    about: {
      title: 'About Us',
      intro: 'BUILD & CONSULT is more than a consultancy. We are your strategic partner in a complex real estate world.',
      mission_title: 'Our Mission',
      mission_text: 'Our mission is to provide clients with security and reliability.\n\nWe create clear structures and manage construction projects with a focus on deadlines, quality, and costs, making them plannable, controllable, and successfully completed even in challenging situations.',
      network_title: 'Our Network',
      network_text: 'BUILD & CONSULT works with a proven network of specialized partner companies. Depending on project requirements, we strategically engage experienced specialist planners, contractors, and service providers.\n\nOur services can be delivered holistically as a one-stop solution or modularly as individual service packages. If desired, we also arrange our partner companies directly and independently, transparently and without obligation.\n\nThis way, our clients receive exactly the support they need \u2013 flexible, efficient, and tailored to their needs.',
      quote: 'Quality emerges where experience meets passion.',
      team_title: 'The Board',
      team_intro: 'Discretion and personal integrity are our top priorities.',
      role: 'Managing Partner'
    },
    services: {
      title: 'Our Services',
      intro: 'A comprehensive portfolio for discerning investors and owners.',
      details: [
        {
          title: 'Interim Project Management & Construction Site Turnaround',
          icon: 'Target',
          text: 'Construction projects face challenges for various reasons: Unclear responsibilities, schedule delays, cost overruns, or lack of on-site leadership.\n\nThis is where we step in.\n\nWe assume temporary or long-term and immediate responsibility in projects requiring urgent action \u2013 not just advisory or supervisory, but operationally and directly on-site.',
          points: ['Immediate Availability', 'Operational Project Management', 'Crisis Intervention', 'Temporary or Long-term Leadership'],
          image: 'images/services/interim-projektleitung.jpg',
          isUsp: true
        },
        {
          title: 'Strategic Consulting',
          icon: 'Briefcase',
          text: 'We advise you on strategic matters related to real estate and construction projects. Based on sound analysis, we create clear decision-making foundations and support you in targeted planning and implementation.',
          points: ['Location & Market Analysis', 'Usage Concepts', 'Portfolio Strategy', 'Decision-Making Foundations'],
          image: 'images/services/strategische-beratung.jpg'
        },
        {
          title: 'Owner\'s Representation',
          icon: 'Users',
          text: 'We represent your interests to all project stakeholders and ensure compliance with costs, schedules, and quality. Depending on the mandate, we assume coordination and decision-making responsibilities on your behalf.',
          points: ['Representation of Your Interests', 'Coordination of All Stakeholders', 'Quality Assurance', 'Schedule Monitoring'],
          image: 'images/services/bauherr.jpg'
        },
        {
          title: 'Project Control',
          icon: 'BarChart',
          text: 'We structure and control your project regarding costs, schedules, and quality. Through structured organization and transparent reporting, we ensure efficient project execution.',
          points: ['Cost & Schedule Control', 'Planning Team Management', 'Risk Management', 'Reporting'],
          image: 'images/services/projektsteuerung.jpg'
        },
        {
          title: 'Construction Management',
          icon: 'Building',
          text: 'We handle the operational organization and support of your construction project. Tendering, contracting, and coordination of construction companies (subcontractors, general contractors, or MEP general planners) and all stakeholders, including final acceptance inspections. Always focused on costs, schedules, and quality.',
          points: ['Tendering & Contracting', 'On-Site Coordination', 'Acceptance Inspections', 'Cost & Schedule Control'],
          image: 'images/services/baumanagement.jpg'
        },
        {
          title: 'Acquisition / Sale',
          icon: 'TrendingUp',
          text: 'We support you in the purchase and sale of real estate, from analysis to valuation to structured execution.',
          points: ['Property Valuation', 'Buyer/Seller Consulting', 'Transaction Support', 'Negotiation Management'],
          image: 'images/services/ankauf-verkauf.jpg'
        },
        {
          title: 'Technical Building Systems Assessments',
          icon: 'BarChart',
          text: 'We provide comprehensive assessments of the condition, function, and optimization potential of building technical systems as a decision-making basis for operation and investments.',
          points: ['Condition Analysis', 'Function Testing', 'Optimization Recommendations', 'Investment Planning'],
          image: 'images/services/haustechnik.jpg'
        }
      ]
    },
    method: {
      title: 'Our Approach',
      intro: 'Structured. Transparent. Goal-oriented. Our process guarantees security at every stage.',
      steps: [
        { title: '1. Analysis & Goal Definition', text: 'We analyze your initial situation, goals, and framework conditions.\n\nRisks, potentials, and action requirements are identified early and clearly defined.' },
        { title: '2. Structure & Planning', text: 'We create a clear project structure with defined responsibilities, schedules, and cost overviews as a reliable foundation for all further steps.' },
        { title: '3. Implementation & Leadership', text: 'We coordinate and lead all stakeholders.\n\nDepending on the mandate, we assume operational project or construction site management directly on-site.' },
        { title: '4. Controlling & Reporting', text: 'Costs, schedules, and quality are continuously monitored.\n\nYou receive transparent reports and clear decision-making foundations.' },
        { title: '5. Completion & Handover', text: 'Quality assurance, acceptance, and clean handover \u2013 structured, traceable, and fully documented.' }
      ]
    },
    why: {
      title: 'Why Us?',
      intro: 'Because construction projects require clear leadership.',
      main_text: 'With over 60 years of professional experience in construction and real estate, we bring structure, responsibility, and reliability to every project.\n\nWe don\'t just manage \u2013 we take responsibility.\nWhen needed, we step in directly, assume operational leadership on-site, and bring struggling projects back under control.',
      quote: 'Quality emerges where experience meets passion.',
      usps: [
        { title: 'Personal Contact', text: 'You have a dedicated contact person throughout who knows your project and drives it forward.' },
        { title: 'Hands-On Mentality Instead of Theory', text: 'We roll up our sleeves and take operational responsibility directly on-site.' },
        { title: 'Clear Decisions & Transparent Communication', text: 'You always know where your project stands and what happens next.' },
        { title: 'Everything from One Source', text: 'One contact for all topics \u2013 from planning to handover.' },
        { title: 'Flexible Support', text: 'From consulting to interim project or construction management \u2013 exactly as you need it.' }
      ],
      closing_text: 'BUILD & CONSULT Real Estate stands for planning security, quality, and reliability.\n\nContact us \u2013 we\'ll take care of your project.'
    },
    contact: {
      title: 'Contact',
      text: 'Do you have questions, suggestions, or would you like to discuss a construction project without obligation? Don\'t hesitate to contact us.',
      contact_details: 'Contact Details',
      office_hours: 'Office Hours',
      office_hours_text: 'Mon - Fri: 09:00 AM - 06:00 PM',
      address: 'Schulhausstrasse 58, 8002 Zurich',
      phone: '+41 44 558 44 52',
      form: { name: 'Name', email: 'Email', message: 'Your Message', send: 'Send Message' }
    },
    footer: {
      rights: 'All rights reserved.',
      imprint: 'Imprint',
      privacy: 'Privacy'
    }
  },
  it: {
    nav: { home: 'Home', about: 'Chi siamo', services: 'Servizi', method: 'Metodo', why: 'Perché noi?', contact: 'Contatto' },
    home: {
      title: 'Il Vostro Partner per il Vostro Progetto Completo di Costruzione e Immobiliare',
      subtitle: 'Eccellenza in Edilizia e Immobiliare',
      cta: 'La Nostra Expertise',
      teaser_title: 'Eccellenza in Edilizia e Immobiliare',
      teaser_text: 'L\'edilizia \u00e8 complessa \u2013 noi la rendiamo semplice per voi.\n\nVi accompagniamo in modo affidabile attraverso il vostro progetto di costruzione. Con esperienza, leadership chiara e assistenza personale, creiamo valore che dura.',
      learn_more: 'Scopri di pi\u00f9',
      usp2_title: 'Servizio Completo / One-Stop-Shop',
      usp2_subtitle: 'Un contatto per l\'intero ciclo di vita immobiliare',
      usp2_text: 'BUILD & CONSULT Real Estate GmbH offre un servizio completo a 360 gradi per progetti di costruzione e immobiliari.\n\nI nostri clienti beneficiano di un contatto centrale che li accompagna attraverso l\'intero ciclo di vita di un immobile \u2013 dalla prima decisione all\'uso sostenibile o alla vendita.',
      usp2_points: ['Supporto per l\'acquisto di immobili o terreni', 'Progettazione e sviluppo di progetti di costruzione e ristrutturazione', 'Esecuzione costruzione incl. rappresentanza committente, gestione progetto e costruzione', 'Messa in servizio e consegna', 'Gestione immobiliare o supporto durante la vendita']
    },
    about: {
      title: 'Chi Siamo',
      intro: 'BUILD & CONSULT è più di una consulenza. Siamo il vostro partner strategico in un mondo immobiliare complesso.',
      mission_title: 'La Nostra Missione',
      mission_text: 'La nostra missione \u00e8 fornire ai clienti sicurezza e affidabilit\u00e0.\n\nCreiamo strutture chiare e gestiamo progetti di costruzione con un focus su scadenze, qualit\u00e0 e costi, rendendoli pianificabili, controllabili e portati a termine con successo anche in situazioni impegnative.',
      network_title: 'La Nostra Rete',
      network_text: 'BUILD & CONSULT collabora con una rete consolidata di aziende partner specializzate. A seconda dei requisiti del progetto, coinvolgiamo strategicamente progettisti specializzati esperti, appaltatori e fornitori di servizi.\n\nI nostri servizi possono essere forniti in modo olistico come soluzione completa o modulare come pacchetti di servizi individuali. Se desiderato, organizziamo anche le nostre aziende partner direttamente e in modo indipendente, in modo trasparente e senza vincoli.\n\nIn questo modo, i nostri clienti ricevono esattamente il supporto di cui hanno bisogno \u2013 flessibile, efficiente e su misura.',
      quote: 'La qualità nasce dove l\'esperienza incontra la passione.',
      team_title: 'Il Board',
      team_intro: 'Discrezione e integrità personale sono le nostre massime priorità.',
      role: 'Managing Partner'
    },
    services: {
      title: 'I Nostri Servizi',
      intro: 'Un portafoglio completo per investitori e proprietari esigenti.',
      details: [
        {
          title: 'Gestione Progetti Interim & Turnaround Cantieri',
          icon: 'Target',
          text: 'I progetti di costruzione affrontano difficolt\u00e0 per vari motivi: Responsabilit\u00e0 poco chiare, ritardi nei tempi, superamenti dei costi o mancanza di leadership in cantiere.\n\n\u00c8 qui che interveniamo.\n\nAssumiamo responsabilit\u00e0 temporanea o a lungo termine e immediata in progetti che richiedono azione urgente \u2013 non solo consultiva o di supervisione, ma operativa e direttamente in loco.',
          points: ['Disponibilit\u00e0 Immediata', 'Gestione Operativa del Progetto', 'Intervento in Situazioni di Crisi', 'Leadership Temporanea o a Lungo Termine'],
          image: 'images/services/interim-projektleitung.jpg',
          isUsp: true
        },
        {
          title: 'Consulenza Strategica',
          icon: 'Briefcase',
          text: 'Vi consigliamo su questioni strategiche relative a immobili e progetti di costruzione. Sulla base di analisi fondate, creiamo basi decisionali chiare e vi supportiamo nella pianificazione e implementazione mirate.',
          points: ['Analisi di Posizione e Mercato', 'Concetti di Utilizzo', 'Strategia di Portfolio', 'Basi Decisionali'],
          image: 'images/services/strategische-beratung.jpg'
        },
        {
          title: 'Rappresentanza del Committente',
          icon: 'Users',
          text: 'Rappresentiamo i vostri interessi verso tutti gli stakeholder del progetto e garantiamo il rispetto di costi, scadenze e qualit\u00e0. A seconda del mandato, assumiamo responsabilit\u00e0 di coordinamento e decisione per vostro conto.',
          points: ['Rappresentanza dei Vostri Interessi', 'Coordinamento di Tutti gli Stakeholder', 'Assicurazione Qualit\u00e0', 'Monitoraggio Scadenze'],
          image: 'images/services/bauherr.jpg'
        },
        {
          title: 'Controllo Progetto',
          icon: 'BarChart',
          text: 'Strutturiamo e controlliamo il vostro progetto per quanto riguarda costi, scadenze e qualit\u00e0. Attraverso un\'organizzazione strutturata e reporting trasparente, garantiamo un\'esecuzione efficiente del progetto.',
          points: ['Controllo Costi e Scadenze', 'Gestione Team di Pianificazione', 'Gestione Rischi', 'Reporting'],
          image: 'images/services/projektsteuerung.jpg'
        },
        {
          title: 'Gestione Costruzione',
          icon: 'Building',
          text: 'Gestiamo l\'organizzazione operativa e il supporto del vostro progetto di costruzione. Gare, contratti e coordinamento di imprese di costruzione (subappaltatori, general contractor o general planner MEP) e tutti gli stakeholder, incluse le ispezioni finali di accettazione. Sempre con focus su costi, scadenze e qualit\u00e0.',
          points: ['Gare & Contratti', 'Coordinamento in Loco', 'Ispezioni di Accettazione', 'Controllo Costi e Scadenze'],
          image: 'images/services/baumanagement.jpg'
        },
        {
          title: 'Acquisizione / Vendita',
          icon: 'TrendingUp',
          text: 'Vi supportiamo nell\'acquisto e vendita di immobili, dall\'analisi alla valutazione fino all\'esecuzione strutturata.',
          points: ['Valutazione Immobiliare', 'Consulenza Acquirente/Venditore', 'Supporto Transazioni', 'Gestione Negoziazioni'],
          image: 'images/services/ankauf-verkauf.jpg'
        },
        {
          title: 'Perizie Sistemi Tecnici Edificio',
          icon: 'BarChart',
          text: 'Forniamo perizie complete sullo stato, la funzione e il potenziale di ottimizzazione dei sistemi tecnici dell\'edificio come base decisionale per operazione e investimenti.',
          points: ['Analisi dello Stato', 'Test di Funzionamento', 'Raccomandazioni di Ottimizzazione', 'Pianificazione Investimenti'],
          image: 'images/services/haustechnik.jpg'
        }
      ]
    },
    method: {
      title: 'Il Nostro Metodo',
      intro: 'Strutturato. Trasparente. Orientato agli obiettivi. Il nostro processo garantisce sicurezza in ogni fase.',
      steps: [
        { title: '1. Analisi & Definizione Obiettivi', text: 'Analizziamo la vostra situazione iniziale, gli obiettivi e le condizioni quadro.\n\nRischi, potenziali e necessit\u00e0 d\'azione vengono identificati precocemente e definiti chiaramente.' },
        { title: '2. Struttura & Pianificazione', text: 'Creiamo una struttura progettuale chiara con responsabilit\u00e0 definite, programmi temporali e panoramiche dei costi come base affidabile per tutti i passaggi successivi.' },
        { title: '3. Implementazione & Leadership', text: 'Coordiniamo e guidiamo tutti gli stakeholder.\n\nA seconda del mandato, assumiamo la gestione operativa del progetto o del cantiere direttamente in loco.' },
        { title: '4. Controllo & Reporting', text: 'Costi, scadenze e qualit\u00e0 vengono monitorati continuamente.\n\nRicevete report trasparenti e basi decisionali chiare.' },
        { title: '5. Completamento & Consegna', text: 'Assicurazione qualit\u00e0, accettazioni e consegna pulita \u2013 strutturata, tracciabile e completamente documentata.' }
      ]
    },
    why: {
      title: 'Perch\u00e9 noi?',
      intro: 'Perch\u00e9 i progetti di costruzione richiedono una leadership chiara.',
      main_text: 'Con oltre 60 anni di esperienza professionale nel settore edile e immobiliare, portiamo struttura, responsabilit\u00e0 e affidabilit\u00e0 in ogni progetto.\n\nNon gestiamo solo \u2013 ci assumiamo la responsabilit\u00e0.\nQuando necessario, interveniamo direttamente, assumiamo la leadership operativa in loco e riportiamo i progetti in difficolt\u00e0 sotto controllo.',
      quote: 'La qualit\u00e0 nasce dove l\'esperienza incontra la passione.',
      usps: [
        { title: 'Contatto Personale', text: 'Avete un contatto dedicato durante tutto il percorso che conosce il vostro progetto e lo porta avanti.' },
        { title: 'Mentalit\u00e0 Pratica Invece di Teoria', text: 'Ci rimbocchiamo le maniche e assumiamo responsabilit\u00e0 operativa direttamente in loco.' },
        { title: 'Decisioni Chiare & Comunicazione Trasparente', text: 'Sapete sempre a che punto si trova il vostro progetto e cosa succede dopo.' },
        { title: 'Tutto da un\'Unica Fonte', text: 'Un contatto per tutti i temi \u2013 dalla pianificazione alla consegna.' },
        { title: 'Supporto Flessibile', text: 'Dalla consulenza alla gestione progetti interim o costruzione \u2013 esattamente come vi serve.' }
      ],
      closing_text: 'BUILD & CONSULT Real Estate rappresenta sicurezza di pianificazione, qualit\u00e0 e affidabilit\u00e0.\n\nContattateci \u2013 ci occuperemo del vostro progetto.'
    },
    contact: {
      title: 'Contatto',
      text: 'Avete domande, suggerimenti o volete discutere di un progetto di costruzione senza impegno? Non esitate a contattarci.',
      contact_details: 'Dati di Contatto',
      office_hours: 'Orari d\'Ufficio',
      office_hours_text: 'Lun - Ven: 09:00 - 18:00',
      address: 'Schulhausstrasse 58, 8002 Zurigo',
      phone: '+41 44 558 44 52',
      form: { name: 'Nome', email: 'Email', message: 'Il Vostro Messaggio', send: 'Invia Messaggio' }
    },
    footer: {
      rights: 'Tutti i diritti riservati.',
      imprint: 'Impronta',
      privacy: 'Privacy'
    }
  }
};

// --- Sub-Components ---

const Logo = ({ scrolled }) => (
  <div className="flex items-center justify-center select-none relative" style={{ minWidth: '150px' }}>
    <img
      src={logoHoch}
      alt="BUILD & CONSULT"
      className={`h-24 w-auto transition-opacity duration-500 ${scrolled ? 'opacity-0 absolute' : 'opacity-100'}`}
    />
    <img
      src={logoBreit}
      alt="BUILD & CONSULT"
      className={`h-24 w-auto transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 absolute'}`}
    />
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="bg-[#0B1F38] py-20 text-center text-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
       <div className="w-64 h-64 border-4 border-[#D9C5A1] rounded-full absolute -top-10 -left-10"></div>
       <div className="w-96 h-96 border-4 border-[#D9C5A1] rounded-full absolute -bottom-20 -right-20 opacity-50"></div>
    </div>
    <div className="container mx-auto px-6 relative z-10">
      <h1 className="text-4xl md:text-5xl font-serif mb-4 animate-fadeIn">{title}</h1>
      {subtitle && <p className="text-[#D9C5A1] text-xl font-light tracking-wide max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-16 h-1 bg-[#D9C5A1] mx-auto mt-8"></div>
    </div>
  </div>
);

// --- Pages ---

const Home = ({ t, setPage }) => (
  <div className="animate-fadeIn">
    {/* Hero */}
    <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B1F38] bg-opacity-60"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight drop-shadow-lg">
          {t.home.title}
        </h1>
        <p className="text-2xl md:text-3xl text-gray-200 mb-10 font-light max-w-3xl mx-auto tracking-wide">
          {t.home.subtitle}
        </p>
        <button onClick={() => setPage('services')} className="bg-[#D9C5A1] text-[#0B1F38] px-8 py-4 uppercase tracking-[0.15em] text-sm font-bold hover:bg-white transition-colors duration-300">
          {t.home.cta}
        </button>
      </div>
    </div>

    {/* USP Banner - Interim-Projektleitung */}
    <div className="bg-gradient-to-r from-[#0B1F38] via-[#1a3a5c] to-[#0B1F38] py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 border-4 border-[#D9C5A1] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 border-4 border-[#D9C5A1] rounded-full"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#D9C5A1] text-[#0B1F38] px-6 py-2 text-sm font-bold uppercase tracking-widest mb-6 shadow-xl">
            Unser USP
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Interim-Projektleitung
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Wenn es brennt, sind wir für Sie da. Sofortige Verfügbarkeit, operative Excellence und Krisenmanagement –
            wenn Ihre Projekte einen erfahrenen Projektleiter benötigen, stehen wir bereit.
          </p>
          <button
            onClick={() => setPage('services')}
            className="bg-[#D9C5A1] text-[#0B1F38] px-10 py-4 uppercase tracking-[0.15em] text-sm font-bold hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-none inline-flex items-center gap-3"
          >
            Mehr erfahren <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>

    {/* USP Banner 2 - Allround-Service */}
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#D9C5A1] text-[#0B1F38] px-6 py-2 text-sm font-bold uppercase tracking-widest mb-6 shadow-xl">
              Unser USP
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#0B1F38] mb-6 leading-tight">
              {t.home.usp2_title}
            </h2>
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              {t.home.usp2_subtitle}
            </p>
          </div>

          <div className="bg-[#F8F9FA] p-10 border-l-4 border-[#D9C5A1] mb-8">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {t.home.usp2_text}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {t.home.usp2_points && t.home.usp2_points.map((point, i) => (
              <div key={i} className="flex items-start bg-white p-4 shadow-sm border-l-2 border-[#D9C5A1]">
                <Check size={20} className="text-[#D9C5A1] mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setPage('services')}
              className="bg-[#D9C5A1] text-[#0B1F38] px-10 py-4 uppercase tracking-[0.15em] text-sm font-bold hover:bg-[#0B1F38] hover:text-white transition-all duration-300 shadow-lg inline-flex items-center gap-3"
            >
              Mehr erfahren <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Teaser Section */}
    <div className="py-24 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
           <div className="w-16 h-1 bg-[#D9C5A1] mb-6"></div>
           <h2 className="text-3xl font-serif text-[#0B1F38] mb-6">{t.home.teaser_title}</h2>
           <p className="text-gray-600 text-2xl leading-relaxed mb-8">{t.home.teaser_text}</p>
           <button onClick={() => setPage('about')} className="flex items-center text-[#0B1F38] font-bold uppercase tracking-widest text-sm hover:text-[#D9C5A1] transition-colors">
             {t.home.learn_more} <ArrowRight size={16} className="ml-2" />
           </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop" className="w-full h-64 object-cover transform translate-y-8 shadow-xl" alt="Baustelle 1"/>
           <img src="images/home-baustelle-2.jpg" className="w-full h-64 object-cover shadow-xl" alt="Baustelle 2"/>
        </div>
      </div>
    </div>
  </div>
);

const About = ({ t }) => (
  <div className="animate-fadeIn pb-20">
    <SectionHeader title={t.about.title} subtitle={t.about.intro} />
    
    <div className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl font-serif text-[#0B1F38] mb-6">{t.about.mission_title}</h3>
          <p className="text-gray-600 text-xl leading-relaxed mb-6">{t.about.mission_text}</p>
          <div className="bg-[#F8F9FA] p-8 border-l-4 border-[#D9C5A1]">
            <p className="italic text-[#0B1F38] font-serif text-xl">"{t.about.quote}"</p>
          </div>
        </div>
        <div className="relative h-96">
           <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover shadow-2xl" alt="Office"/>
           <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#0B1F38] z-[-1]"></div>
        </div>
      </div>
    </div>

    {/* Network Section */}
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-serif text-[#0B1F38] mb-8 text-center">{t.about.network_title}</h3>
          <div className="bg-[#F8F9FA] p-10 border-l-4 border-[#D9C5A1]">
            <p className="text-gray-700 text-xl leading-relaxed whitespace-pre-line">
              {t.about.network_text}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Team Section with Privacy Hack - COMMENTED OUT FOR LATER USE */}
    {/*
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-2xl font-serif text-[#0B1F38] mb-2">{t.about.team_title}</h3>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">{t.about.team_intro}</p>

        <div className="flex justify-center">
          <div className="bg-white p-8 shadow-xl w-full max-w-sm border-t-4 border-[#0B1F38] hover:-translate-y-2 transition-transform duration-300">
             <div className="w-40 h-40 mx-auto bg-gray-200 rounded-full mb-6 overflow-hidden relative border-4 border-gray-100">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" alt="Partner" className="w-full h-full object-cover" />
             </div>
             <h3 className="text-xl font-serif text-[#0B1F38] mb-1">Max Mustermann</h3>
             <p className="text-[#D9C5A1] font-bold text-xs uppercase tracking-widest mb-6">{t.about.role}</p>
             <div className="flex justify-center space-x-4 text-gray-400">
                <Linkedin size={20} className="hover:text-[#0B1F38] cursor-pointer" />
                <Mail size={20} className="hover:text-[#0B1F38] cursor-pointer" />
             </div>
          </div>
        </div>
      </div>
    </div>
    */}
  </div>
);

const Services = ({ t }) => {
  return (
    <div className="animate-fadeIn pb-20">
      <SectionHeader title={t.services.title} subtitle={t.services.intro} />
      
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 gap-16">
          {t.services.details.map((service, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-start ${service.isUsp ? 'relative' : ''}`}>
               {/* USP Badge */}
               {service.isUsp && (
                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                   <div className="bg-[#D9C5A1] text-[#0B1F38] px-8 py-3 text-sm font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2">
                     <Target size={18} />
                     Unser USP
                   </div>
                 </div>
               )}

               {/* Image Side */}
               <div className={`w-full lg:w-1/3 relative overflow-hidden ${
                 service.isUsp
                   ? 'border-4 border-[#D9C5A1] shadow-2xl'
                   : 'border-t-4 border-[#D9C5A1] shadow-lg'
               }`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                  {service.isUsp && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F38]/80 to-transparent flex items-end justify-center p-6">
                      <h3 className="text-xl font-serif text-[#D9C5A1] text-center">
                        {service.title}
                      </h3>
                    </div>
                  )}
               </div>

               {/* Content Side */}
               <div className={`w-full lg:w-2/3 ${service.isUsp ? 'border-2 border-[#D9C5A1] p-8 bg-gray-50' : ''}`}>
                  <h4 className="text-2xl font-serif text-[#0B1F38] mb-4 flex items-center">
                    <span className="text-[#D9C5A1] text-4xl mr-4 opacity-50 font-sans">0{index + 1}</span>
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {service.text}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.points && service.points.map((point, i) => (
                      <li key={i} className="flex items-center text-gray-700 text-base font-medium">
                        <Check size={16} className="text-[#D9C5A1] mr-3 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Method = ({ t }) => (
  <div className="animate-fadeIn pb-20">
    <SectionHeader title={t.method.title} subtitle={t.method.intro} />
    
    <div className="container mx-auto px-6 py-20">
      <div className="relative">
         {/* Connecting Line (Desktop) */}
         <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>

         <div className="space-y-20">
            {t.method.steps.map((step, index) => (
              <div key={index} className={`relative flex items-center justify-between ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                 {/* Empty half for spacing */}
                 <div className="hidden lg:block w-5/12"></div>
                 
                 {/* Center Dot */}
                 <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-[#0B1F38] rounded-full items-center justify-center text-[#D9C5A1] font-bold z-10 border-4 border-white">
                    {index + 1}
                 </div>

                 {/* Content Box */}
                 <div className="w-full lg:w-5/12 bg-white p-8 shadow-lg border-l-4 border-[#D9C5A1]">
                    <h3 className="text-xl font-serif text-[#0B1F38] mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.text}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  </div>
);

const Why = ({ t }) => (
  <div className="animate-fadeIn pb-20">
    <SectionHeader title={t.why.title} subtitle={t.why.intro} />

    <div className="container mx-auto px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Main Text Section */}
        {t.why.main_text && (
          <div className="mb-16 text-center">
            <p className="text-gray-600 text-xl leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
              {t.why.main_text}
            </p>
          </div>
        )}

        {/* USPs Section */}
        <h3 className="text-3xl font-serif text-[#0B1F38] mb-10 text-center">Ihre Vorteile:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {t.why.usps.map((usp, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 p-6 hover:border-[#D9C5A1] hover:shadow-2xl transition-all duration-300 group cursor-default">
              <div className="flex items-start mb-4">
                <Check size={24} className="text-[#D9C5A1] mr-3 flex-shrink-0 mt-1" />
                <h3 className="text-lg font-bold text-[#0B1F38]">{usp.title}</h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed pl-9">
                {usp.text}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Text */}
        {t.why.closing_text && (
          <div className="text-center bg-[#F8F9FA] p-10 border-l-4 border-[#D9C5A1]">
            <p className="text-gray-700 text-xl leading-relaxed font-medium whitespace-pre-line">
              {t.why.closing_text}
            </p>
          </div>
        )}
      </div>

      {/* Visual Break */}
      <div className="mt-20 relative h-[400px] w-full">
         <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Skyline" />
         <div className="absolute inset-0 bg-[#0B1F38] bg-opacity-80 flex items-center justify-center text-center px-6">
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              "{t.why.quote}"
            </h2>
         </div>
      </div>
    </div>
  </div>
);

const Contact = ({ t }) => (
  <div className="animate-fadeIn pb-20">
    <SectionHeader title={t.contact.title} subtitle={t.contact.text} />
    
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-[#0B1F38] p-12 text-white flex flex-col justify-between">
           <div>
             <h3 className="text-2xl font-serif mb-8 text-[#D9C5A1]">{t.contact.contact_details}</h3>
             <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-[#D9C5A1] mt-1" />
                  <span className="text-gray-300">{t.contact.address}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-[#D9C5A1]" />
                  <span className="text-gray-300">{t.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-[#D9C5A1]" />
                  <span className="text-gray-300">info@buildconsult-realestate.ch</span>
                </div>
             </div>
           </div>
           <div className="mt-12">
              <p className="text-xs text-gray-400 uppercase tracking-widest">{t.contact.office_hours}</p>
              <p className="text-gray-300 mt-2">{t.contact.office_hours_text}</p>
           </div>
        </div>
        
        <div className="w-full md:w-1/2 p-12 bg-gray-50">
           <form className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.form.name}</label>
                <input type="text" className="w-full bg-white border border-gray-300 p-3 focus:outline-none focus:border-[#0B1F38]" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.form.email}</label>
                <input type="email" className="w-full bg-white border border-gray-300 p-3 focus:outline-none focus:border-[#0B1F38]" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.form.message}</label>
                <textarea rows="4" className="w-full bg-white border border-gray-300 p-3 focus:outline-none focus:border-[#0B1F38]"></textarea>
              </div>
              <button className="bg-[#D9C5A1] text-[#0B1F38] px-8 py-3 uppercase tracking-widest font-bold text-sm hover:bg-[#0B1F38] hover:text-white transition-colors w-full">
                {t.contact.form.send}
              </button>
           </form>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Layout ---

export default function App() {
  const [lang, setLang] = useState('de');
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple Router Switch
  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home t={t} setPage={setCurrentPage} />;
      case 'about': return <About t={t} />;
      case 'services': return <Services t={t} />;
      case 'method': return <Method t={t} />;
      case 'why': return <Why t={t} />;
      case 'contact': return <Contact t={t} />;
      default: return <Home t={t} setPage={setCurrentPage} />;
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'method', label: t.nav.method },
    { id: 'why', label: t.nav.why },
    { id: 'contact', label: t.nav.contact }
  ];

  return (
    <div className="font-sans text-[#1A1A1A] bg-white min-h-screen flex flex-col">
      <style>{styles}</style>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B1F38]/80 shadow-lg py-4' : currentPage !== 'home' ? 'bg-[#0B1F38]/95 shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer flex items-center gap-3 hover:opacity-90" onClick={() => setCurrentPage('home')}>
             <Logo scrolled={scrolled} />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); window.scrollTo(0,0); }}
                className={`text-sm uppercase tracking-widest font-medium transition-colors pb-1 border-b-2 ${currentPage === item.id ? 'text-[#D9C5A1] border-[#D9C5A1]' : 'text-white border-transparent hover:text-[#D9C5A1]'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Lang Switch */}
          <div className="hidden lg:flex items-center space-x-4 text-white text-sm">
            <Globe size={18} className="text-[#D9C5A1]" />
            {['de', 'en', 'it'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`uppercase ${lang === l ? 'text-[#D9C5A1] font-bold underline' : 'opacity-70 hover:opacity-100'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0B1F38] py-8 flex flex-col items-center space-y-6 shadow-xl border-t border-gray-800 animate-fadeIn">
             {navItems.map(item => (
               <button
                 key={item.id}
                 onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); window.scrollTo(0,0); }}
                 className={`text-xl uppercase tracking-widest ${currentPage === item.id ? 'text-[#D9C5A1]' : 'text-white'}`}
               >
                 {item.label}
               </button>
             ))}

             {/* Language Switcher in Mobile Menu */}
             <div className="flex items-center space-x-4 text-white text-sm pt-4 border-t border-gray-700 mt-4 w-40">
               {['de', 'en', 'it'].map(l => (
                 <button
                   key={l}
                   onClick={() => setLang(l)}
                   className={`uppercase ${lang === l ? 'text-[#D9C5A1] font-bold underline' : 'opacity-70 hover:opacity-100'}`}
                 >
                   {l}
                 </button>
               ))}
             </div>
          </div>
        )}
      </nav>

      {/* Main Content Area - Pushes content down if not on Home because Home has a Hero that goes under transparent nav */}
      <main className={`flex-grow ${currentPage !== 'home' ? 'pt-36' : ''}`}>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-[#081628] text-gray-500 py-12 border-t border-gray-800 text-sm mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BUILD & CONSULT Real Estate GmbH. {t.footer.rights}
          </div>
          <div className="flex space-x-6">
            <button className="hover:text-[#D9C5A1] transition-colors">{t.footer.imprint}</button>
            <button className="hover:text-[#D9C5A1] transition-colors">{t.footer.privacy}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}