import type { Locale, SoundAccess } from "./types";

const copy = {
  en: {
    nav: { sounds: "Pad sounds", features: "Features", help: "Help", download: "Get the app", language: "Português" },
    hero: { eyebrow: "Ambient pads for every moment", title: "Fill the room. Keep the focus.", body: "Warm, continuous pads for worship, prayer, rehearsal, and live music — with a sequencer, drum kits, and metronome built in.", explore: "Explore all sounds" },
    features: { eyebrow: "Made for the flow", title: "Everything stays close to the music.", padsTitle: "Layer the atmosphere", padsBody: "Choose a sound, a key, and let the pad sustain while you play, sing, or speak.", sequenceTitle: "Build simple progressions", sequenceBody: "Arrange notes, choose major or minor, control transitions, and save sequences for later.", rhythmTitle: "Keep everyone together", rhythmBody: "Use drum kits and a flexible metronome without leaving the performance screen." },
    catalog: { eyebrow: "Pads Worship library", title: "Find your atmosphere", body: "Explore every official ambient sound available in Pads Worship.", filter: "Search pad sounds", all: "All", free: "Free", premium: "Premium", noResults: "No sounds match this search.", count: "sounds" },
    sound: { home: "Home", sounds: "Pad sounds", official: "Official Pads Worship sound", notes: "Available notes", access: "Access", available: "Available in Pads Worship", use: "Try this sound in the app", note: "Download Pads Worship for iPhone or Android and find this sound by name in the Pad Kits library.", more: "More sounds to explore", viewAll: "View all pad sounds" },
    access: { free: "Free in the app", task: "Unlock with an in-app task", premium: "Premium sound" } satisfies Record<SoundAccess, string>,
    stores: { apple: "Download on the App Store", google: "Get it on Google Play" },
    footer: { line: "Create space for worship, practice, and live music.", discover: "Discover", legal: "Legal", privacy: "Privacy", terms: "Terms", help: "Help", rights: "© 2026 Oliveira Labs. All rights reserved." },
    download: { eyebrow: "Pads Worship for iPhone and Android", title: "Your atmosphere, always within reach.", body: "Download pad sounds, play offline after download, create sequences, add drums, and shape the experience for your set." },
  },
  pt: {
    nav: { sounds: "Sons de pad", features: "Recursos", help: "Ajuda", download: "Baixar o app", language: "English" },
    hero: { eyebrow: "Pads ambientes para cada momento", title: "Preencha o ambiente. Mantenha o foco.", body: "Pads contínuos e envolventes para adoração, oração, ensaio e música ao vivo — com sequenciador, kits de bateria e metrônomo integrados.", explore: "Explorar todos os sons" },
    features: { eyebrow: "Feito para o momento", title: "Tudo permanece perto da música.", padsTitle: "Crie a atmosfera", padsBody: "Escolha um som, uma nota e deixe o pad sustentar enquanto você toca, canta ou fala.", sequenceTitle: "Monte progressões simples", sequenceBody: "Organize notas, escolha maior ou menor, controle as transições e salve sequências.", rhythmTitle: "Mantenha todos juntos", rhythmBody: "Use kits de bateria e um metrônomo flexível sem sair da tela de performance." },
    catalog: { eyebrow: "Biblioteca Pads Worship", title: "Encontre sua atmosfera", body: "Explore cada som ambiente oficial disponível no Pads Worship.", filter: "Buscar sons de pad", all: "Todos", free: "Grátis", premium: "Premium", noResults: "Nenhum som corresponde a esta busca.", count: "sons" },
    sound: { home: "Início", sounds: "Sons de pad", official: "Som oficial do Pads Worship", notes: "Notas disponíveis", access: "Acesso", available: "Disponível no Pads Worship", use: "Experimente este som no app", note: "Baixe o Pads Worship para iPhone ou Android e encontre este som pelo nome na biblioteca de Kits de Pad.", more: "Mais sons para explorar", viewAll: "Ver todos os sons" },
    access: { free: "Grátis no app", task: "Desbloqueio com tarefa no app", premium: "Som Premium" } satisfies Record<SoundAccess, string>,
    stores: { apple: "Baixar na App Store", google: "Disponível no Google Play" },
    footer: { line: "Crie espaço para adoração, prática e música ao vivo.", discover: "Descobrir", legal: "Legal", privacy: "Privacidade", terms: "Termos", help: "Ajuda", rights: "© 2026 Oliveira Labs. Todos os direitos reservados." },
    download: { eyebrow: "Pads Worship para iPhone e Android", title: "Sua atmosfera, sempre ao alcance.", body: "Baixe sons de pad, toque offline após o download, crie sequências, adicione bateria e personalize seu momento." },
  },
} as const;

export function getCopy(locale: Locale) { return copy[locale]; }
