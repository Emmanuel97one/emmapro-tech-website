import type { ProductTranslation } from "@/data/products/types";

export const frenchProductTranslations: Record<string, ProductTranslation> = {
  "avidata-pro": {
    productName: "AVIDATA PRO",
    shortName: "AVIDATA",
    solutionCategory: "Gestion de ferme avicole",
    tagline: "Pilotez vos élevages et suivez leurs performances.",
    shortDescription:
      "Un logiciel professionnel de gestion de ferme avicole pour organiser les bandes, la production, l’alimentation, le suivi sanitaire, les stocks et les finances.",
    overview:
      "AVIDATA PRO est un logiciel professionnel de gestion de ferme avicole et une plateforme ERP destinée aux élevages de poulets de chair, aux élevages de poules pondeuses et aux entreprises avicoles multi-sites. Il centralise le suivi des bandes, de la croissance, du FCR, de la ponte, de l’alimentation, de la mortalité, des vaccinations, des stocks et des résultats financiers.",
    importance: {
      purpose:
        "Rassembler les informations opérationnelles d’un élevage pour suivre les résultats d’une bande et prendre des décisions à partir de données structurées.",
      problems: [
        "Les données de production, de santé, d’alimentation et de gestion financière sont difficiles à rapprocher lorsqu’elles sont réparties dans plusieurs registres.",
        "Les exploitations multi-sites ont besoin de comparer les résultats des fermes et de consolider leurs rapports.",
      ],
      businessValue:
        "Choisissez une édition adaptée à une ferme ou à une organisation multi-fermes, avec des capacités qui évoluent selon l’édition.",
      operationalBenefits: [
        "Suivre les bandes, la production d’œufs, les poids et la mortalité.",
        "Consigner les vaccinations, les médicaments et les mouvements de stock d’aliments.",
        "Consulter des indicateurs, des courbes de croissance, des analyses FCR et des rapports.",
        "Étendre la gestion aux finances, aux équipes et aux opérations multi-fermes selon l’édition.",
      ],
      targetIndustries: ["Aviculture", "Agriculture"],
      targetOrganizations: [
        "Élevages de poulets de chair",
        "Élevages de poules pondeuses",
        "Entreprises avicoles multi-sites",
      ],
      targetUsers: ["Exploitants", "Responsables d’élevage", "Équipes agricoles"],
      useCases: [
        "Gestion des bandes de volailles",
        "Suivi de croissance et de production",
        "Gestion de l’alimentation et des stocks",
        "Rapports et comparaison entre fermes",
      ],
    },
    features: [
      { id: "fr-farm-operations", name: "Gestion des opérations d’élevage", shortDescription: "Organisez les journaux quotidiens, les bandes, l’historique et le tableau de bord de la ferme.", displayOrder: 1, featured: true },
      { id: "fr-production", name: "Suivi de la production", shortDescription: "Consignez la production, les œufs et le poids des volailles.", displayOrder: 2, featured: true },
      { id: "fr-health", name: "Santé et mortalité", shortDescription: "Suivez les données sanitaires, les vaccinations, l’utilisation des médicaments et la mortalité.", displayOrder: 3, featured: true },
      { id: "fr-feed", name: "Alimentation et stocks", shortDescription: "Suivez les stocks d’aliments et de médicaments, les mouvements et les alertes de stock bas.", displayOrder: 4, featured: true },
      { id: "fr-finance", name: "Finances de la ferme", shortDescription: "Enregistrez les revenus et les dépenses et consultez une vue financière de base.", displayOrder: 5, featured: true },
      { id: "fr-analytics", name: "Indicateurs et rapports", shortDescription: "Consultez des KPI, des graphiques et des rapports opérationnels; les éditions avancées ajoutent les courbes de croissance et l’analyse FCR.", displayOrder: 6, featured: true },
      { id: "fr-multifarm", name: "Gestion multi-fermes", shortDescription: "Les outils Pro Plus permettent de gérer plusieurs fermes et de consolider les indicateurs et rapports.", displayOrder: 7 },
    ],
    editions: [
      { id: "lite", name: "Lite", description: "Les fonctions essentielles pour une ferme : jusqu’à 3 bandes, 1 utilisateur et 1 site.", bestFor: "Les petites exploitations qui commencent à structurer leur suivi.", recommended: false, displayOrder: 1, availability: "available" },
      { id: "pro", name: "Pro", description: "Ajoute des fonctions avancées de stock, finance, ressources humaines, CRM, maintenance, analyses et services cloud. Jusqu’à 10 bandes, 10 utilisateurs et 1 site.", bestFor: "Les exploitations en croissance opérant sur un site.", recommended: true, displayOrder: 2, availability: "available" },
      { id: "pro-plus", name: "Pro Plus", description: "Ajoute les fonctions d’entreprise et la gestion multi-fermes, avec des capacités de bandes, d’utilisateurs et de sites sans limite définie.", bestFor: "Les entreprises avicoles multi-sites.", recommended: false, displayOrder: 3, availability: "available" },
    ],
    faqs: [
      { id: "fr-avidata-editions", question: "Quelles sont les limites de capacité des éditions ?", answer: "Lite prend en charge jusqu’à 3 bandes, 1 utilisateur et 1 site. Pro prend en charge jusqu’à 10 bandes, 10 utilisateurs et 1 site. Pro Plus propose un nombre de bandes, d’utilisateurs et de sites sans limite définie, avec un stockage d’entreprise.", displayOrder: 1 },
      { id: "fr-avidata-cumulative", question: "Les éditions AVIDATA PRO sont-elles cumulatives ?", answer: "Oui. Pro comprend les capacités de Lite et ajoute des fonctions avancées. Pro Plus comprend les fonctions de Lite et Pro, puis ajoute des outils d’entreprise et de gestion multi-fermes.", displayOrder: 2 },
      { id: "fr-avidata-sites", question: "Comment le tarif multi-sites est-il calculé ?", answer: "Le tarif indiqué pour une édition couvre un site. Chaque site supplémentaire est facturé au même tarif que l’édition choisie pour la période sélectionnée. Les capacités d’utilisateurs, de bandes et de stockage dépendent de l’édition.", displayOrder: 3 },
      { id: "fr-avidata-license", question: "Que comprend une licence à paiement unique ?", answer: "Elle permet de continuer à utiliser la version du logiciel sous licence conformément à ses conditions. Les services, mises à niveau ou prestations d’assistance futurs peuvent être facturés séparément.", displayOrder: 4 },
    ],
    ctas: [{ action: "contact-sales", label: "Contacter l’équipe AVIDATA PRO", href: "/fr/contact" }],
    seo: {
      title: "Logiciel de gestion de ferme avicole | AVIDATA PRO",
      description:
        "AVIDATA PRO est un ERP avicole pour les élevages de poulets de chair et de poules pondeuses : bandes, croissance, FCR, alimentation, santé, stocks, finances et gestion multi-fermes.",
      keywords: [
        "logiciel de gestion de ferme avicole",
        "logiciel de gestion avicole",
        "logiciel pour élevage de poulets",
        "logiciel de gestion d'élevage de volailles",
        "logiciel de gestion de poulailler",
        "système de gestion avicole",
        "ERP avicole",
        "logiciel de gestion de ferme",
        "gestion de ferme avicole",
        "gestion des bandes de volailles",
        "gestion des poulets de chair",
        "gestion des poules pondeuses",
        "suivi de croissance des volailles",
        "courbe de croissance des volailles",
        "indice de consommation",
        "suivi FCR",
        "gestion de l'alimentation des volailles",
        "suivi de mortalité",
        "gestion sanitaire avicole",
        "gestion des vaccinations",
        "suivi des médicaments",
        "gestion de la production d'œufs",
        "suivi de ponte",
        "gestion des stocks agricoles",
        "comptabilité de ferme avicole",
        "gestion financière d'une ferme avicole",
        "rentabilité de l'élevage avicole",
        "logiciel de gestion multi-fermes",
        "gestion de plusieurs fermes avicoles",
        "rapports de production avicole",
      ],
    },
  },
  "emmapro-pharma": {
    productName: "EMMAPRO PHARMA",
    shortName: "PHARMA",
    solutionCategory: "Gestion de pharmacie",
    tagline: "Une gestion structurée pour les opérations de pharmacie.",
    shortDescription:
      "Un logiciel professionnel de gestion de pharmacie pour coordonner la dispensation, les achats, le stock et le suivi des opérations.",
    overview:
      "EMMAPRO PHARMA est un logiciel professionnel de gestion de pharmacie et ERP pharmaceutique conçu pour organiser la dispensation, les médicaments, les stocks, les achats, les rapports et les opérations multi-sites. Les fonctions disponibles dépendent de l’édition : certaines ajoutent notamment la synchronisation multi-sites, la récupération de créances, la déclaration d’inventaire et les fonctions liées à l’assurance.",
    importance: {
      purpose:
        "Aider les équipes de pharmacie à coordonner les opérations quotidiennes et à conserver une vue plus claire sur leur activité.",
      problems: [
        "Les opérations de dispensation, d’approvisionnement et de gestion du stock peuvent être dispersées entre plusieurs processus.",
        "Le suivi des activités et des différents sites demande une coordination accrue à mesure que l’organisation grandit.",
      ],
      businessValue:
        "Une plateforme centrée sur la pharmacie, avec des éditions et des capacités de postes clients adaptées au mode d’exploitation.",
      operationalBenefits: [
        "Coordonner la dispensation, les achats et la gestion du stock.",
        "Accéder aux rapports planifiés par e-mail dans les éditions qui les incluent.",
        "Étendre la visibilité et la synchronisation à plusieurs sites avec les éditions compatibles.",
        "Choisir des fonctions adaptées à l’édition, comme la récupération de créances ou la déclaration d’inventaire.",
      ],
      targetIndustries: ["Pharmacie de détail"],
      targetOrganizations: ["Pharmacies", "Groupes de pharmacies"],
      targetUsers: ["Titulaires de pharmacie", "Responsables de pharmacie", "Équipes officinales"],
      useCases: [
        "Dispensation",
        "Achats et approvisionnement",
        "Gestion du stock",
        "Opérations multi-sites selon l’édition",
      ],
    },
    features: [
      { id: "fr-dispensing", name: "Dispensation", shortDescription: "Accompagnez les activités quotidiennes de dispensation en pharmacie.", displayOrder: 1, featured: true },
      { id: "fr-procurement", name: "Achats et approvisionnement", shortDescription: "Organisez les activités d’achat et d’approvisionnement de la pharmacie.", displayOrder: 2, featured: true },
      { id: "fr-stock-control", name: "Gestion du stock", shortDescription: "Mettez à jour et contrôlez les enregistrements de stock pharmaceutique.", displayOrder: 3, featured: true },
      { id: "fr-multisite", name: "Gestion multi-sites", shortDescription: "Consultez et synchronisez les informations entre les sites dans les éditions compatibles.", displayOrder: 4, featured: true },
      { id: "fr-reports", name: "Rapports planifiés", shortDescription: "Enregistrez des rapports et planifiez leur envoi par e-mail quotidien, hebdomadaire ou mensuel selon l’édition.", displayOrder: 5, featured: true },
      { id: "fr-audit", name: "Audit des opérations", shortDescription: "Consultez les activités d’audit et les enregistrements d’audit des transactions.", displayOrder: 6, featured: true },
      { id: "fr-credit", name: "Récupération de créances", shortDescription: "Fonction disponible dans les éditions Pro Max et Ultra.", displayOrder: 7 },
      { id: "fr-inventory-declaration", name: "Déclaration d’inventaire et assurance", shortDescription: "Fonctions disponibles dans l’édition Ultra.", displayOrder: 8 },
    ],
    editions: [
      { id: "pro", name: "Pro", description: "Dispensation, achats et gestion du stock. Comprend un poste client.", bestFor: "Les pharmacies qui recherchent les fonctions opérationnelles essentielles.", recommended: false, displayOrder: 1, availability: "available" },
      { id: "pro-plus", name: "Pro-Plus", description: "Ajoute le tableau de bord global, la synchronisation multi-sites, les rapports enregistrés, la configuration e-mail et la migration de données. Jusqu’à 2 postes clients.", bestFor: "Les pharmacies qui ont besoin d’une visibilité et d’outils de rapport plus étendus.", recommended: false, displayOrder: 2, availability: "available" },
      { id: "pro-max", name: "Pro Max", description: "Ajoute la récupération de créances aux fonctions de Pro-Plus. Jusqu’à 5 postes clients.", bestFor: "Les pharmacies qui ont besoin d’outils de suivi des créances.", recommended: false, displayOrder: 3, availability: "available" },
      { id: "ultra", name: "Ultra", description: "Comprend l’ensemble des fonctions, dont la déclaration d’inventaire et les fonctions d’assurance. Postes clients illimités.", bestFor: "Les pharmacies qui ont besoin de l’ensemble des fonctions PHARMA.", recommended: true, displayOrder: 4, availability: "available" },
    ],
    faqs: [
      { id: "fr-pharma-pcs", question: "Combien de postes clients sont inclus ?", answer: "Pro inclut 1 poste client, Pro-Plus en autorise jusqu’à 2, Pro Max jusqu’à 5 et Ultra un nombre illimité. Le PC serveur ou de la pharmacie principale est inclus et n’est pas compté comme poste client.", displayOrder: 1 },
      { id: "fr-pharma-editions", question: "Quelles différences y a-t-il entre les éditions PHARMA ?", answer: "Pro comprend la dispensation, les achats et le contrôle du stock. Pro-Plus ajoute des fonctions multi-sites, de rapports, de configuration e-mail et de migration de données. Pro Max ajoute la récupération de créances. Ultra ajoute la déclaration d’inventaire et les fonctions d’assurance.", displayOrder: 2 },
      { id: "fr-pharma-payment", question: "Quelles modalités de paiement sont proposées ?", answer: "Chaque édition propose des tarifs mensuels, annuels et à paiement unique. La licence à paiement unique couvre l’utilisation continue de la version sous licence selon ses conditions; les services, mises à niveau ou prestations d’assistance futurs peuvent être facturés séparément.", displayOrder: 3 },
      { id: "fr-pharma-sites", question: "Comment est calculé le tarif multi-sites ?", answer: "Le tarif affiché couvre un site de pharmacie. Chaque site supplémentaire est facturé au même tarif que l’édition sélectionnée pour la période choisie. Le calculateur de sites prend en charge jusqu’à 50 sites; la capacité en postes clients dépend de l’édition.", displayOrder: 4 },
    ],
    ctas: [{ action: "contact-sales", label: "Contacter l’équipe EMMAPRO PHARMA", href: "/fr/contact" }],
    seo: {
      title: "Logiciel de gestion de pharmacie | EMMAPRO PHARMA",
      description:
        "EMMAPRO PHARMA est un logiciel de pharmacie pour la dispensation, les achats, la gestion du stock, les rapports et les opérations multi-sites selon l’édition.",
      keywords: [
        "logiciel de gestion de pharmacie",
        "logiciel pour pharmacie",
        "système de gestion de pharmacie",
        "ERP pharmacie",
        "gestion de stock pharmacie",
        "logiciel de gestion de stock pharmaceutique",
        "gestion des médicaments",
        "gestion des achats pharmacie",
        "logiciel pharmacie multi-sites",
        "gestion multi-pharmacies",
        "rapports de pharmacie",
      ],
    },
  },
  "emmapro-shop": {
    productName: "EMMAPRO SHOP",
    shortName: "SHOP",
    solutionCategory: "Caisse, magasin et gestion commerciale",
    tagline: "Une vision plus claire des opérations de vente au détail.",
    shortDescription:
      "Un logiciel professionnel de caisse, de point de vente et de gestion de magasin pour les commerces, boutiques et supermarchés.",
    overview:
      "EMMAPRO SHOP est un logiciel professionnel de caisse, de point de vente, de gestion de magasin et de gestion de stock destiné aux commerces, boutiques, supermarchés et entreprises de vente au détail. Il réunit les opérations de vente, la visibilité sur les stocks, l’administration du commerce et les rapports. Le fonctionnement multi-postes dépend de la licence choisie.",
    importance: {
      purpose:
        "Aider les équipes de vente au détail à coordonner les ventes, le suivi des stocks et l’administration quotidienne.",
      problems: [
        "Les commerces en croissance ont besoin d’une vue cohérente sur les ventes et les stocks.",
        "La coordination entre utilisateurs et postes de travail dépend de licences adaptées aux besoins de l’équipe.",
      ],
      businessValue:
        "Un système de point de vente et de gestion commerciale destiné aux activités de détail, avec une quantité de postes ou d’utilisateurs définie par licence.",
      operationalBenefits: [
        "Prendre en charge les opérations de caisse et les ventes au détail.",
        "Consulter les informations de stock dans le cadre des opérations du magasin.",
        "Choisir une quantité de postes ou d’utilisateurs selon la licence.",
        "Accéder aux rapports par e-mail lorsque la licence le permet.",
      ],
      targetIndustries: ["Commerce de détail", "Épiceries et supermarchés"],
      targetOrganizations: [
        "Commerces",
        "Boutiques",
        "Supermarchés",
        "Entreprises de vente au détail",
      ],
      targetUsers: ["Commerçants", "Responsables de magasin", "Équipes de vente"],
      useCases: [
        "Opérations de point de vente",
        "Visibilité sur les stocks",
        "Utilisation multi-postes selon la licence",
      ],
    },
    features: [
      { id: "fr-shop-sales", name: "Opérations de caisse et de vente", shortDescription: "Accompagnez les opérations quotidiennes de caisse et de vente au détail.", displayOrder: 1, featured: true },
      { id: "fr-shop-inventory", name: "Visibilité sur les stocks", shortDescription: "Consultez les informations de stock dans le cadre des opérations du magasin.", displayOrder: 2, featured: true },
      { id: "fr-shop-admin", name: "Administration du commerce", shortDescription: "Soutenez les besoins d’administration des boutiques et commerces.", displayOrder: 3, featured: true },
      { id: "fr-shop-reports", name: "Rapports commerciaux", shortDescription: "Consultez les rapports d’activité et planifiez leur envoi par e-mail selon les fonctions de la licence.", displayOrder: 4, featured: true },
      { id: "fr-shop-audit", name: "Audit des opérations", shortDescription: "Consultez les activités d’audit et les enregistrements d’audit des transactions.", displayOrder: 5, featured: true },
      { id: "fr-shop-workstations", name: "Utilisateurs et postes sous licence", shortDescription: "Utilisez plusieurs postes ou comptes selon le nombre prévu par la licence achetée.", displayOrder: 6, featured: true },
    ],
    editions: [
      { id: "pro", name: "Pro", description: "Une licence de départ flexible pour un poste; les postes supplémentaires sont facturés séparément.", bestFor: "Les commerces qui souhaitent choisir séparément le nombre de postes.", recommended: false, displayOrder: 1, availability: "available" },
      { id: "pro-plus", name: "Pro-Plus", description: "Une licence de départ flexible pour un poste; les postes supplémentaires sont facturés séparément.", bestFor: "Les équipes de vente au détail qui choisissent la quantité de postes nécessaire.", recommended: true, displayOrder: 2, availability: "available" },
    ],
    faqs: [
      { id: "fr-shop-editions", question: "Quelles éditions EMMAPRO SHOP sont proposées ?", answer: "Les éditions disponibles sont Pro et Pro-Plus. La quantité de postes est choisie séparément et ne crée pas une édition différente.", displayOrder: 1 },
      { id: "fr-shop-pricing", question: "Comment le tarif des postes SHOP est-il calculé ?", answer: "Le total comprend le tarif de base pour un poste, puis le tarif des postes supplémentaires multiplié par le nombre de postes au-delà du premier. Le calculateur met à jour l’estimation selon l’édition, la période et la quantité choisies.", displayOrder: 2 },
      { id: "fr-shop-trial", question: "Puis-je essayer EMMAPRO SHOP avant de l’acheter ?", answer: "La disponibilité d’une période d’essai, si elle est proposée, doit être confirmée par l’équipe commerciale. Contactez EMMAPRO Tech pour obtenir l’information à jour.", displayOrder: 3 },
      { id: "fr-shop-contact", question: "Comment demander des renseignements sur EMMAPRO SHOP ?", answer: "Utilisez le lien WhatsApp commercial ou le numéro de téléphone indiqué sur cette page. Aucune adresse e-mail dédiée à SHOP n’a été communiquée.", displayOrder: 4 },
    ],
    ctas: [{ action: "contact-sales", label: "Contacter l’équipe EMMAPRO SHOP", href: "/fr/contact" }],
    seo: {
      title: "Logiciel de caisse, magasin et stock | EMMAPRO SHOP",
      description:
        "EMMAPRO SHOP est un logiciel de caisse et de gestion de magasin pour les commerces, boutiques et supermarchés, avec opérations de vente, visibilité sur les stocks et rapports.",
      keywords: [
        "logiciel de caisse",
        "logiciel de point de vente",
        "logiciel POS",
        "logiciel de gestion de magasin",
        "logiciel de gestion commerciale",
        "logiciel de gestion de stock",
        "logiciel de caisse et stock",
        "logiciel pour supermarché",
        "logiciel pour boutique",
        "système de point de vente",
        "gestion des ventes",
        "gestion des stocks",
        "inventaire",
        "rapports de vente",
        "logiciel de caisse multi-postes",
      ],
    },
  },
};
