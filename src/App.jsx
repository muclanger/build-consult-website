import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, Mail, MapPin, ChevronRight, Check, ArrowRight, Linkedin, Building, Briefcase, TrendingUp, Users, Target, BarChart } from 'lucide-react';
import logoSvg from '/public/logo.svg';

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
      title: 'Werte schaffen. Zukunft bauen.',
      subtitle: 'Ihr Premium-Partner für Real Estate Consulting & Development.',
      cta: 'Unsere Expertise',
      teaser_title: 'Exzellenz in Immobilien',
      teaser_text: 'Wir verbinden architektonische Vision mit ökonomischer Präzision. Unser Anspruch ist es, bleibende Werte zu schaffen, die Generationen überdauern.',
      learn_more: 'Mehr erfahren'
    },
    about: {
      title: 'Über Uns',
      intro: 'Build & Consult ist mehr als eine Beratung. Wir sind Ihr strategischer Partner in einer komplexen Immobilienwelt.',
      mission_title: 'Unsere Mission',
      mission_text: 'Wir haben Build & Consult gegründet, um die Lücke zwischen technischer Baurealisierung und strategischem Investment-Consulting zu schließen. Oft sprechen Architekten und Investoren verschiedene Sprachen. Wir sprechen beide.',
      quote: 'Qualität entsteht dort, wo Erfahrung auf Leidenschaft trifft.',
      team_title: 'Das Board',
      team_intro: 'Diskretion und persönliche Integrität stehen für uns an erster Stelle.',
      role: 'Managing Partner'
    },
    services: {
      title: 'Unsere Dienstleistungen',
      intro: 'Ein ganzheitliches Portfolio für anspruchsvolle Investoren und Eigentümer.',
      details: [
        {
          title: 'Projektentwicklung',
          icon: 'Building',
          text: 'Wir begleiten Ihr Projekt von der Grundstücksakquise bis zur schlüsselfertigen Übergabe. Unser Fokus liegt auf nachhaltiger Architektur und Kosteneffizienz.',
          points: ['Machbarkeitsstudien & Baurechtschaffung', 'Steuerung von Planungsteams', 'Kosten- und Termincontrolling', 'Qualitätssicherung']
        },
        {
          title: 'Strategic Consulting',
          icon: 'Target',
          text: 'Investitionsentscheidungen benötigen fundierte Daten. Wir liefern Marktanalysen und Strategiepapiere, die als sichere Entscheidungsgrundlage dienen.',
          points: ['Standort- und Marktanalysen', 'Nutzungskonzepte', 'Portfolio-Strategie', 'ESG-Beratung']
        },
        {
          title: 'Asset Management',
          icon: 'TrendingUp',
          text: 'Immobilien sind lebende Organismen. Wir optimieren den Bestand, heben Mietpotenziale und sorgen für eine nachhaltige Wertsicherung.',
          points: ['Vermietungsmanagement', 'Instandhaltungsstrategien', 'Capex-Maßnahmen', 'Reporting']
        },
        {
          title: 'Transaktionsberatung',
          icon: 'Briefcase',
          text: 'Ob Kauf oder Verkauf: Wir strukturieren Prozesse professionell und diskret, um das optimale Ergebnis für Sie zu erzielen.',
          points: ['Ankaufsprüfung (Due Diligence)', 'Verkaufsstrukturierung', 'Datenraum-Management', 'Verhandlungsführung']
        }
      ]
    },
    method: {
      title: 'Unsere Arbeitsweise',
      intro: 'Strukturiert. Transparent. Zielorientiert. Unser Prozess garantiert Sicherheit in jeder Phase.',
      steps: [
        { title: '1. Analyse', text: 'Jedes Mandat beginnt mit dem Zuhören. Wir analysieren die Ist-Situation, die Marktgegebenheiten und Ihre persönlichen Ziele.' },
        { title: '2. Strategie', text: 'Auf Basis der Analyse entwickeln wir maßgeschneiderte Lösungswege – mit klaren Meilensteinen und Budgets.' },
        { title: '3. Umsetzung', text: 'Wir übernehmen die Verantwortung. Mit Hands-on-Mentalität setzen wir die Strategie um und steuern alle Beteiligten.' },
        { title: '4. Controlling', text: 'Vertrauen ist gut, Kontrolle ist besser. Durch transparentes Reporting wissen Sie jederzeit, wo Ihr Projekt steht.' }
      ]
    },
    why: {
      title: 'Warum Build & Consult?',
      intro: 'In einem gesättigten Markt macht Qualität den Unterschied.',
      quote: 'Exzellenz ist kein Akt, sondern eine Gewohnheit.',
      usps: [
        { title: 'Interdisziplinäre Kompetenz', text: 'Wir vereinen kaufmännisches Wissen mit tiefem technischem Verständnis. Wir erkennen Risiken im Bauplan, bevor sie im Budget auftauchen.' },
        { title: 'C-Level Netzwerk', text: 'Zugang zu Off-Market Deals und Entscheidungsträgern in der DACH-Region.' },
        { title: 'Unabhängigkeit', text: 'Wir sind niemandem verpflichtet außer Ihrem Erfolg. Unsere Beratung ist neutral und objektiv.' }
      ]
    },
    contact: {
      title: 'Kontakt',
      text: 'Lassen Sie uns über Ihre Vision sprechen. Wir freuen uns auf den Dialog.',
      contact_details: 'Kontaktdaten',
      office_hours: 'Bürozeiten',
      office_hours_text: 'Mo - Fr: 09:00 - 18:00 Uhr',
      address: 'Musterstraße 1, 8001 Zürich',
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
      title: 'Creating Value. Building Futures.',
      subtitle: 'Your premium partner for Real Estate Consulting & Development.',
      cta: 'Our Expertise',
      teaser_title: 'Excellence in Real Estate',
      teaser_text: 'We combine architectural vision with economic precision. Our mission is to create lasting value that endures for generations.',
      learn_more: 'Learn More'
    },
    about: {
      title: 'About Us',
      intro: 'Build & Consult is more than a consultancy. We are your strategic partner in a complex real estate world.',
      mission_title: 'Our Mission',
      mission_text: 'We founded Build & Consult to bridge the gap between technical construction realization and strategic investment consulting. Architects and investors often speak different languages. We speak both.',
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
          title: 'Project Development',
          icon: 'Building',
          text: 'We accompany your project from land acquisition to turnkey handover. Our focus is on sustainable architecture and cost efficiency.',
          points: ['Feasibility Studies & Zoning', 'Planning Team Management', 'Cost & Schedule Control', 'Quality Assurance']
        },
        {
          title: 'Strategic Consulting',
          icon: 'Target',
          text: 'Investment decisions require solid data. We deliver market analyses and strategy papers that serve as a reliable decision-making basis.',
          points: ['Location & Market Analysis', 'Usage Concepts', 'Portfolio Strategy', 'ESG Consulting']
        },
        {
          title: 'Asset Management',
          icon: 'TrendingUp',
          text: 'Real estate are living organisms. We optimize portfolios, unlock rental potential and ensure sustainable value preservation.',
          points: ['Leasing Management', 'Maintenance Strategies', 'Capex Measures', 'Reporting']
        },
        {
          title: 'Transaction Advisory',
          icon: 'Briefcase',
          text: 'Whether buying or selling: We structure processes professionally and discreetly to achieve the optimal result for you.',
          points: ['Acquisition Due Diligence', 'Sale Structuring', 'Data Room Management', 'Negotiation Management']
        }
      ]
    },
    method: {
      title: 'Our Approach',
      intro: 'Structured. Transparent. Goal-oriented. Our process guarantees security at every stage.',
      steps: [
        { title: '1. Analysis', text: 'Every mandate begins with listening. We analyze the current situation, market conditions and your personal goals.' },
        { title: '2. Strategy', text: 'Based on the analysis, we develop tailor-made solutions – with clear milestones and budgets.' },
        { title: '3. Implementation', text: 'We take responsibility. With a hands-on mentality, we implement the strategy and manage all stakeholders.' },
        { title: '4. Controlling', text: 'Trust is good, control is better. Through transparent reporting, you always know where your project stands.' }
      ]
    },
    why: {
      title: 'Why Build & Consult?',
      intro: 'In a saturated market, quality makes the difference.',
      quote: 'Excellence is not an act, but a habit.',
      usps: [
        { title: 'Interdisciplinary Expertise', text: 'We combine commercial knowledge with deep technical understanding. We identify risks in construction plans before they appear in the budget.' },
        { title: 'C-Level Network', text: 'Access to off-market deals and decision-makers in the DACH region.' },
        { title: 'Independence', text: 'We are committed to nothing but your success. Our advice is neutral and objective.' }
      ]
    },
    contact: {
      title: 'Contact',
      text: 'Let\'s talk about your vision. We look forward to the dialogue.',
      contact_details: 'Contact Details',
      office_hours: 'Office Hours',
      office_hours_text: 'Mon - Fri: 09:00 AM - 06:00 PM',
      address: 'Sample Street 1, 8001 Zurich',
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
      title: 'Creare Valore. Costruire il Futuro.',
      subtitle: 'Il vostro partner premium per Real Estate Consulting & Development.',
      cta: 'La Nostra Expertise',
      teaser_title: 'Eccellenza nel Settore Immobiliare',
      teaser_text: 'Combiniamo visione architettonica con precisione economica. La nostra missione è creare valore duraturo che duri generazioni.',
      learn_more: 'Scopri di più'
    },
    about: {
      title: 'Chi Siamo',
      intro: 'Build & Consult è più di una consulenza. Siamo il vostro partner strategico in un mondo immobiliare complesso.',
      mission_title: 'La Nostra Missione',
      mission_text: 'Abbiamo fondato Build & Consult per colmare il divario tra realizzazione tecnica di costruzione e consulenza strategica sugli investimenti. Architetti e investitori spesso parlano lingue diverse. Noi parliamo entrambe.',
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
          title: 'Sviluppo Progetti',
          icon: 'Building',
          text: 'Accompagniamo il vostro progetto dall\'acquisizione del terreno alla consegna chiavi in mano. Il nostro focus è su architettura sostenibile ed efficienza dei costi.',
          points: ['Studi di Fattibilità & Zonizzazione', 'Gestione Team di Pianificazione', 'Controllo Costi e Tempi', 'Assicurazione Qualità']
        },
        {
          title: 'Consulenza Strategica',
          icon: 'Target',
          text: 'Le decisioni di investimento richiedono dati solidi. Forniamo analisi di mercato e documenti strategici che servono come base decisionale affidabile.',
          points: ['Analisi Posizione e Mercato', 'Concetti di Utilizzo', 'Strategia di Portfolio', 'Consulenza ESG']
        },
        {
          title: 'Asset Management',
          icon: 'TrendingUp',
          text: 'Gli immobili sono organismi viventi. Ottimizziamo i portafogli, sbloccamo il potenziale di affitto e garantiamo la conservazione sostenibile del valore.',
          points: ['Gestione Locazioni', 'Strategie di Manutenzione', 'Misure Capex', 'Reporting']
        },
        {
          title: 'Consulenza Transazioni',
          icon: 'Briefcase',
          text: 'Che si tratti di acquisto o vendita: Strutturiamo i processi professionalmente e discretamente per ottenere il risultato ottimale per voi.',
          points: ['Due Diligence Acquisizione', 'Strutturazione Vendita', 'Gestione Data Room', 'Gestione Negoziazioni']
        }
      ]
    },
    method: {
      title: 'Il Nostro Metodo',
      intro: 'Strutturato. Trasparente. Orientato agli obiettivi. Il nostro processo garantisce sicurezza in ogni fase.',
      steps: [
        { title: '1. Analisi', text: 'Ogni mandato inizia con l\'ascolto. Analizziamo la situazione attuale, le condizioni di mercato e i vostri obiettivi personali.' },
        { title: '2. Strategia', text: 'Sulla base dell\'analisi, sviluppiamo soluzioni su misura – con traguardi e budget chiari.' },
        { title: '3. Implementazione', text: 'Ci assumiamo la responsabilità. Con mentalità pratica, implementiamo la strategia e gestiamo tutti gli stakeholder.' },
        { title: '4. Controllo', text: 'Fidarsi è bene, controllare è meglio. Attraverso un reporting trasparente, sapete sempre a che punto si trova il vostro progetto.' }
      ]
    },
    why: {
      title: 'Perché Build & Consult?',
      intro: 'In un mercato saturo, la qualità fa la differenza.',
      quote: 'L\'eccellenza non è un atto, ma un\'abitudine.',
      usps: [
        { title: 'Competenza Interdisciplinare', text: 'Combiniamo conoscenze commerciali con una profonda comprensione tecnica. Identifichiamo i rischi nei piani di costruzione prima che appaiano nel budget.' },
        { title: 'Network C-Level', text: 'Accesso a offerte off-market e decisori nella regione DACH.' },
        { title: 'Indipendenza', text: 'Non siamo impegnati verso nulla se non il vostro successo. La nostra consulenza è neutrale e obiettiva.' }
      ]
    },
    contact: {
      title: 'Contatto',
      text: 'Parliamo della vostra visione. Non vediamo l\'ora di dialogare.',
      contact_details: 'Dati di Contatto',
      office_hours: 'Orari d\'Ufficio',
      office_hours_text: 'Lun - Ven: 09:00 - 18:00',
      address: 'Via Esempio 1, 8001 Zurigo',
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

const Logo = () => (
  <div className="flex items-center justify-center select-none">
    <img src={logoSvg} alt="Build & Consult" className="h-32 w-auto" />
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
      {subtitle && <p className="text-[#D9C5A1] text-lg font-light tracking-wide max-w-2xl mx-auto">{subtitle}</p>}
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
        <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-3xl mx-auto tracking-wide">
          {t.home.subtitle}
        </p>
        <button onClick={() => setPage('services')} className="bg-[#D9C5A1] text-[#0B1F38] px-8 py-4 uppercase tracking-[0.15em] text-sm font-bold hover:bg-white transition-colors duration-300">
          {t.home.cta}
        </button>
      </div>
    </div>

    {/* Teaser Section */}
    <div className="py-24 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
           <div className="w-16 h-1 bg-[#D9C5A1] mb-6"></div>
           <h2 className="text-3xl font-serif text-[#0B1F38] mb-6">{t.home.teaser_title}</h2>
           <p className="text-gray-600 text-lg leading-relaxed mb-8">{t.home.teaser_text}</p>
           <button onClick={() => setPage('about')} className="flex items-center text-[#0B1F38] font-bold uppercase tracking-widest text-sm hover:text-[#D9C5A1] transition-colors">
             {t.home.learn_more} <ArrowRight size={16} className="ml-2" />
           </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop" className="w-full h-64 object-cover transform translate-y-8 shadow-xl" alt="Detail 1"/>
           <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop" className="w-full h-64 object-cover shadow-xl" alt="Detail 2"/>
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
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{t.about.mission_text}</p>
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

    {/* Team Section with Privacy Hack */}
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-2xl font-serif text-[#0B1F38] mb-2">{t.about.team_title}</h3>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">{t.about.team_intro}</p>
        
        <div className="flex justify-center">
          <div className="bg-white p-8 shadow-xl w-full max-w-sm border-t-4 border-[#0B1F38] hover:-translate-y-2 transition-transform duration-300">
             <div className="w-40 h-40 mx-auto bg-gray-200 rounded-full mb-6 overflow-hidden relative border-4 border-gray-100">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" alt="Partner" className="w-full h-full object-cover" />
             </div>
             {/* Name protected from simple text search via image or split spans (symbolic here) */}
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
  </div>
);

const Services = ({ t }) => {
  // Mapping icons to string names from lucide
  const getIcon = (name) => {
    if (name === 'Building') return <Building size={32} />;
    if (name === 'Target') return <Target size={32} />;
    if (name === 'TrendingUp') return <TrendingUp size={32} />;
    if (name === 'Briefcase') return <Briefcase size={32} />;
    return <Building size={32} />;
  };

  return (
    <div className="animate-fadeIn pb-20">
      <SectionHeader title={t.services.title} subtitle={t.services.intro} />
      
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 gap-16">
          {t.services.details.map((service, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-start`}>
               {/* Icon/Visual Side */}
               <div className="w-full lg:w-1/3 bg-[#F8F9FA] p-10 flex flex-col items-center justify-center text-center border-t-4 border-[#D9C5A1] min-h-[250px]">
                  <div className="text-[#0B1F38] mb-4 p-4 bg-white rounded-full shadow-md">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-serif text-[#0B1F38]">{service.title}</h3>
               </div>
               
               {/* Content Side */}
               <div className="w-full lg:w-2/3">
                  <h4 className="text-2xl font-serif text-[#0B1F38] mb-4 flex items-center">
                    <span className="text-[#D9C5A1] text-4xl mr-4 opacity-50 font-sans">0{index + 1}</span>
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {service.text}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.points && service.points.map((point, i) => (
                      <li key={i} className="flex items-center text-gray-700 text-sm font-medium">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.why.usps.map((usp, index) => (
          <div key={index} className="bg-gray-50 p-10 hover:bg-[#0B1F38] hover:text-white transition-all duration-300 group cursor-default">
            <div className="text-[#D9C5A1] mb-6 transform group-hover:scale-110 transition-transform">
              <BarChart size={40} />
            </div>
            <h3 className="text-xl font-serif mb-4 group-hover:text-white text-[#0B1F38]">{usp.title}</h3>
            <p className="text-gray-500 group-hover:text-gray-300 leading-relaxed">
              {usp.text}
            </p>
          </div>
        ))}
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
                  <span className="text-gray-300">+41 44 123 45 67</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-[#D9C5A1]" />
                  <span className="text-gray-300">info@build-consult.ch</span>
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
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentPage !== 'home' ? 'bg-[#0B1F38] shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer flex items-center gap-2 hover:opacity-90" onClick={() => setCurrentPage('home')}>
             <Logo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); window.scrollTo(0,0); }}
                className={`text-xs uppercase tracking-widest font-medium transition-colors pb-1 border-b-2 ${currentPage === item.id ? 'text-[#D9C5A1] border-[#D9C5A1]' : 'text-white border-transparent hover:text-[#D9C5A1]'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Lang Switch */}
          <div className="hidden lg:flex items-center space-x-4 text-white text-xs">
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
            {mobileMenuOpen ? <X /> : <Menu />}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0B1F38] py-8 flex flex-col items-center space-y-6 shadow-xl border-t border-gray-800 animate-fadeIn">
             {navItems.map(item => (
               <button
                 key={item.id}
                 onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); window.scrollTo(0,0); }}
                 className={`text-lg uppercase tracking-widest ${currentPage === item.id ? 'text-[#D9C5A1]' : 'text-white'}`}
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
      <main className={`flex-grow ${currentPage !== 'home' ? 'pt-24' : ''}`}>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-[#081628] text-gray-500 py-12 border-t border-gray-800 text-sm mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Build & Consult Real Estate GmbH. {t.footer.rights}
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