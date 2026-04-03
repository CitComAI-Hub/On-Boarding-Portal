import { Injectable, signal } from '@angular/core';
import { getMetadata } from '../../../environments/metadata.service';

type ThemeMode = 'light' | 'dark';
type Language = 'en' | 'es';

type TranslationDict = Record<Language, Record<string, string>>;

@Injectable({
    providedIn: 'root',
})
export class UiPreferencesService {
    private static readonly THEME_STORAGE_KEY = 'onboarding.theme';
    private static readonly LANGUAGE_STORAGE_KEY = 'onboarding.lang';

    private readonly currentTheme = signal<ThemeMode>('light');
    private readonly currentLanguage = signal<Language>('en');

    readonly projectWebsiteUrl =
        getMetadata<string>('projectWebsiteUrl', 'https://citcomtef.eu/') || 'https://citcomtef.eu/';
    readonly marketplaceUrl =
        getMetadata<string>('marketplaceUrl', 'https://marketplace.example.com/') ||
        'https://marketplace.example.com/';

    readonly theme = this.currentTheme.asReadonly();
    readonly language = this.currentLanguage.asReadonly();

    private readonly translations: TranslationDict = {
        en: {
            'toolbar.portal': 'Onboarding Portal',
            'toolbar.space': 'Data Space',
            'toolbar.admin': 'Admin Portal',
            'toolbar.start': 'Start Onboarding',
            'toolbar.logout': 'Logout',
            'toolbar.theme': 'Switch theme',
            'toolbar.language': 'Language',
            'toolbar.langEnglish': 'English',
            'toolbar.langSpanish': 'Spanish',
            'toolbar.openProject': 'Project Website',
            'toolbar.openMarketplace': 'Marketplace',

            'landing.eyebrow': 'Data Space \u00b7 Participant Onboarding',
            'landing.title': 'Join the trusted network of your data ecosystem',
            'landing.subtitle':
                'A modern onboarding experience to validate your organization, issue verifiable credentials, and become an active participant in the data space.',
            'landing.ctaStart': 'Start Onboarding',
            'landing.ctaStatus': 'Check Application Status',
            'landing.ctaProject': 'Visit Project Website',
            'landing.ctaMarketplace': 'Open Future Marketplace',

            'landing.pillarTrust': 'Trust by Design',
            'landing.pillarTrustDesc':
                'Build interoperable digital trust with DID-based identity and governance controls from day one.',
            'landing.pillarCompliance': 'Compliance Readiness',
            'landing.pillarComplianceDesc':
                'Align your onboarding process with policy, legal, and operational requirements of the ecosystem.',
            'landing.pillarBusiness': 'Faster Collaboration',
            'landing.pillarBusinessDesc':
                'Once approved, your organization can connect with partners and unlock data-driven opportunities.',

            'landing.storyTitle': 'Why this onboarding portal matters',
            'landing.storyBody':
                'This portal is your official entry point to become a recognized participant in the data space. It reduces friction, standardizes onboarding steps, and accelerates your route to trusted collaboration.',
            'landing.storyPoint1': 'Secure registration of organization identity and key metadata',
            'landing.storyPoint2': 'Transparent review workflow for faster approvals',
            'landing.storyPoint3': 'Direct bridge to project resources and future marketplace services',

            'landing.statsParticipants': 'Target Participants',
            'landing.statsParticipantsValue': '100+',
            'landing.statsNodes': 'Ecosystem Nodes',
            'landing.statsNodesValue': 'EU-wide',
            'landing.statsTime': 'Onboarding Time',
            'landing.statsTimeValue': '< 10 min',

            'landing.mediaCaption': 'Image source: CitCom.ai project materials',

            'footer.euTitle': 'Co-funded by the European Union',
            'footer.euText':
                'Views and opinions expressed are those of the author(s) only and do not necessarily reflect those of the European Union. Neither the European Union nor the granting authority can be held responsible for them.',
            'footer.services': 'Services',
            'footer.news': 'News & Publications',
            'footer.contact': 'Contact',
            'footer.about': 'About',
            'footer.events': 'Events',
            'footer.customerService': 'Customer Service',
            'footer.address': 'Address',
            'footer.phone': 'Phone',
            'footer.rights': 'All rights reserved.',

            'submit.tabRegister': 'Register Entity',
            'submit.tabTrack': 'Track Progress',
            'submit.resumeTitle': 'Resume onboarding',
            'submit.resumeDesc': 'Retrieve the status of a previously submitted application.',
            'submit.trackingId': 'Tracking ID',
            'submit.notFound': 'Registration request {{id}} not found',

            'dashboard.title': 'Registration Requests',
            'dashboard.subtitle': 'Manage and monitor all onboarding applications',
            'dashboard.colEmail': 'Email address',
            'dashboard.colStatus': 'Status',
            'dashboard.colCreatedAt': 'Registration date',
            'dashboard.colUpdatedAt': 'Last update',
            'dashboard.colFiles': 'No. files',

            'review.back': 'Back to previous step',
            'review.title': 'Review Requests',
            'review.notFoundTitle': 'No request found',
            'review.notFoundBody':
                'We could not find details for the provided ID. It may have been deleted or you may not have permission to view it.',
            'review.backToDashboard': 'Back to dashboard',

            'form.headerTitle': 'Organization Registration',
            'form.headerDesc': 'Follow the steps to join the data space onboarding flow.',
            'form.stepCompany': 'Company Information',
            'form.stepContact': 'Contact Information',
            'form.stepDocument': 'Signed Document',
            'form.name': 'Official Registered Name',
            'form.address': 'Full Address',
            'form.city': 'City',
            'form.country': 'Country',
            'form.postCode': 'Postal Code',
            'form.taxId': 'Tax Identifier (VAT/CIF)',
            'form.adminEmail': 'Administrative Contact Email',
            'form.did': 'Decentralized Identifier (DID)',
            'form.invalidEmail': 'Please enter a valid email address',
            'form.invalidDid': 'Invalid DID format. It should follow did:method:id (e.g., did:web:example.com)',
            'form.readDocPrefix': 'Read the following',
            'form.readDocLink': 'document',
            'form.readDocSuffix': 'and upload it signed.',
            'form.readDocTooltip': 'Open acceptance agreement',
            'form.signedAgreement': 'Signed Acceptance Agreement',
            'form.next': 'Next',
            'form.back': 'Back',
            'form.submit': 'Submit Application',
            'form.submitSuccessTitle': 'Submission Received',
            'form.submitSuccessDesc':
                'The application has been queued for review. A confirmation email has been sent to the administrative address provided. Save this ID to track your status.',
            'form.copyLabel': 'Registration ID',
            'form.copyHint': 'Use this ID to track your application in the status tab.',
            'form.submitError': 'Error submitting the application',

            'details.summary': 'Summary',
            'details.companyInfo': 'Company Information',
            'details.registrationId': 'Registration ID',
            'details.did': 'Decentralized Identifier (DID)',
            'details.adminEmail': 'Administrative Email',
            'details.submissionDate': 'Submission date',
            'details.lastUpdate': 'Last update',
            'details.attachedDocs': 'Attached documents',
            'details.remove': 'Remove',
            'details.reasonLabel': 'This application needs review. Please update the information to resolve the issue.',
            'details.reasonRequired': 'A reason is required when status needs review.',
            'details.reasonRevision': 'Reason for revision',
            'details.reasonPlaceholder': 'Describe the action required from the organization',
            'details.reasonHint': 'Explain why this submission should be revised',
            'details.review': 'Review',
            'details.save': 'Save',
            'details.cancel': 'Cancel',
            'details.updatedOk': 'Registration updated',
            'details.updatedFail': 'Registration update failed',
            'details.previewPdf': 'Click to preview PDF',

            'table.search': 'Search...',
            'table.clearFilters': 'Clear Filters',
            'table.noRecords': 'No records found.',

            'upload.select': 'Select',
            'upload.addMore': 'Add more',
            'upload.previewTooltip': 'Click to preview PDF',
            'upload.invalidType': 'File {{name}} is not a valid type.',
            'upload.invalidSize': 'File {{name}} exceeds {{size}}MB.',
            'upload.allowPopups': 'Please allow pop-ups to preview the PDF',

            'copy.label': 'Registration ID',
            'copy.notification': 'Copied to clipboard',
            'copy.tooltip': 'Copy to clipboard',

            'pdf.previewTitle': 'PDF preview',
            'pdf.openNewTab': 'Open in new tab',
            'pdf.openNewTabAria': 'Open PDF in new tab',
            'pdf.closeDialogAria': 'Close dialog',
            'pdf.invalid': 'The PDF file could not be loaded or is invalid.',
        },
        es: {
            'toolbar.portal': 'Portal de Onboarding',
            'toolbar.space': 'Espacio de Datos',
            'toolbar.admin': 'Portal Admin',
            'toolbar.start': 'Iniciar Onboarding',
            'toolbar.logout': 'Cerrar sesión',
            'toolbar.theme': 'Cambiar tema',
            'toolbar.language': 'Idioma',
            'toolbar.langEnglish': 'Inglés',
            'toolbar.langSpanish': 'Español',
            'toolbar.openProject': 'Web del Proyecto',
            'toolbar.openMarketplace': 'Marketplace',

            'landing.eyebrow': 'Espacio de Datos \u00b7 Onboarding de entidades',
            'landing.title': 'Únete a la red de confianza de tu ecosistema de datos',
            'landing.subtitle':
                'Una experiencia moderna de onboarding para validar tu organización, emitir credenciales verificables y participar activamente en el espacio de datos.',
            'landing.ctaStart': 'Iniciar Onboarding',
            'landing.ctaStatus': 'Consultar Estado de Solicitud',
            'landing.ctaProject': 'Visitar Web del Proyecto',
            'landing.ctaMarketplace': 'Abrir Marketplace Futuro',

            'landing.pillarTrust': 'Confianza desde el diseño',
            'landing.pillarTrustDesc':
                'Construye confianza digital interoperable con identidad basada en DID y controles de gobernanza desde el primer día.',
            'landing.pillarCompliance': 'Preparación para cumplimiento',
            'landing.pillarComplianceDesc':
                'Alinea tu proceso de onboarding con los requisitos políticos, legales y operativos del ecosistema.',
            'landing.pillarBusiness': 'Colaboración más rápida',
            'landing.pillarBusinessDesc':
                'Una vez aprobada, tu organización puede conectar con partners y activar oportunidades basadas en datos.',

            'landing.storyTitle': 'Por qué este portal de onboarding es clave',
            'landing.storyBody':
                'Este portal es tu puerta oficial para convertirte en participante reconocido del espacio de datos. Reduce fricción, estandariza pasos y acelera tu camino hacia una colaboración confiable.',
            'landing.storyPoint1': 'Registro seguro de identidad y metadatos de la organización',
            'landing.storyPoint2': 'Flujo de revisión transparente para aprobar más rápido',
            'landing.storyPoint3': 'Conexión directa con recursos del proyecto y servicios del futuro marketplace',

            'landing.statsParticipants': 'Participantes objetivo',
            'landing.statsParticipantsValue': '100+',
            'landing.statsNodes': 'Nodos del ecosistema',
            'landing.statsNodesValue': 'UE',
            'landing.statsTime': 'Tiempo de onboarding',
            'landing.statsTimeValue': '< 10 min',

            'landing.mediaCaption': 'Fuente imagen: materiales del proyecto CitCom.ai',

            'footer.euTitle': 'Cofinanciado por la Unión Europea',
            'footer.euText':
                'Los puntos de vista y opiniones expresados son únicamente los de sus autores y no reflejan necesariamente los de la Unión Europea. Ni la Unión Europea ni la autoridad concedente pueden considerarse responsables.',
            'footer.services': 'Servicios',
            'footer.news': 'Noticias y publicaciones',
            'footer.contact': 'Contacto',
            'footer.about': 'Sobre nosotros',
            'footer.events': 'Eventos',
            'footer.customerService': 'Atención al cliente',
            'footer.address': 'Dirección',
            'footer.phone': 'Teléfono',
            'footer.rights': 'Todos los derechos reservados.',

            'submit.tabRegister': 'Registrar Entidad',
            'submit.tabTrack': 'Seguimiento',
            'submit.resumeTitle': 'Retomar solicitud',
            'submit.resumeDesc': 'Consulta el estado de una solicitud enviada previamente.',
            'submit.trackingId': 'ID de seguimiento',
            'submit.notFound': 'No se encontró la solicitud {{id}}',

            'dashboard.title': 'Listado de solicitudes',
            'dashboard.subtitle': 'Gestión y seguimiento de registros de onboarding',
            'dashboard.colEmail': 'Correo electrónico',
            'dashboard.colStatus': 'Estado',
            'dashboard.colCreatedAt': 'Fecha de registro',
            'dashboard.colUpdatedAt': 'Última actualización',
            'dashboard.colFiles': 'N. documentos',

            'review.back': 'Volver al paso anterior',
            'review.title': 'Revisión de solicitudes',
            'review.notFoundTitle': 'No se encontró la solicitud',
            'review.notFoundBody':
                'No se han encontrado detalles para el ID indicado. Puede haberse eliminado o no tienes permisos para verlo.',
            'review.backToDashboard': 'Volver al panel',

            'form.headerTitle': 'Registro de organización',
            'form.headerDesc': 'Sigue los pasos para unirte al flujo de onboarding del espacio de datos.',
            'form.stepCompany': 'Datos de la empresa',
            'form.stepContact': 'Datos de contacto',
            'form.stepDocument': 'Documento firmado',
            'form.name': 'Razón social',
            'form.address': 'Dirección completa',
            'form.city': 'Ciudad',
            'form.country': 'País',
            'form.postCode': 'Código postal',
            'form.taxId': 'Identificador fiscal (VAT/CIF)',
            'form.adminEmail': 'Email de contacto administrativo',
            'form.did': 'Identificador descentralizado (DID)',
            'form.invalidEmail': 'Introduce un correo válido',
            'form.invalidDid': 'Formato DID inválido. Debe seguir did:method:id (por ejemplo, did:web:example.com)',
            'form.readDocPrefix': 'Lee el siguiente',
            'form.readDocLink': 'documento',
            'form.readDocSuffix': 'y súbelo firmado.',
            'form.readDocTooltip': 'Abrir acuerdo de aceptación',
            'form.signedAgreement': 'Acuerdo de aceptación firmado',
            'form.next': 'Siguiente',
            'form.back': 'Atrás',
            'form.submit': 'Enviar solicitud',
            'form.submitSuccessTitle': 'Solicitud recibida',
            'form.submitSuccessDesc':
                'La solicitud se ha enviado correctamente para revisión. Se ha mandado un correo de confirmación a la dirección administrativa indicada. Guarda este ID para consultar el estado.',
            'form.copyLabel': 'ID de solicitud',
            'form.copyHint': 'Usa este ID para consultar el estado en la pestaña de seguimiento.',
            'form.submitError': 'Error al enviar la solicitud',

            'details.summary': 'Resumen',
            'details.companyInfo': 'Datos de empresa',
            'details.registrationId': 'ID de solicitud',
            'details.did': 'Identificador descentralizado (DID)',
            'details.adminEmail': 'Email administrativo',
            'details.submissionDate': 'Fecha de envío',
            'details.lastUpdate': 'Última actualización',
            'details.attachedDocs': 'Documentos adjuntos',
            'details.remove': 'Eliminar',
            'details.reasonLabel': 'La solicitud requiere revisión. Actualiza la información para resolver la incidencia.',
            'details.reasonRequired': 'El motivo es obligatorio cuando el estado requiere revisión.',
            'details.reasonRevision': 'Motivo de la revisión',
            'details.reasonPlaceholder': 'Indica la acción que debe realizar la entidad',
            'details.reasonHint': 'Explica por qué la solicitud debe pasar a revisión',
            'details.review': 'Revisar',
            'details.save': 'Guardar',
            'details.cancel': 'Cancelar',
            'details.updatedOk': 'Registro actualizado',
            'details.updatedFail': 'Error al actualizar el registro',
            'details.previewPdf': 'Clic para previsualizar PDF',

            'table.search': 'Buscar...',
            'table.clearFilters': 'Limpiar filtros',
            'table.noRecords': 'No se encontraron registros.',

            'upload.select': 'Seleccionar',
            'upload.addMore': 'Añadir más',
            'upload.previewTooltip': 'Clic para previsualizar PDF',
            'upload.invalidType': 'El archivo {{name}} no tiene un tipo válido.',
            'upload.invalidSize': 'El archivo {{name}} supera {{size}}MB.',
            'upload.allowPopups': 'Permite las ventanas emergentes para previsualizar el PDF',

            'copy.label': 'ID de solicitud',
            'copy.notification': 'Copiado al portapapeles',
            'copy.tooltip': 'Copiar al portapapeles',

            'pdf.previewTitle': 'Vista previa PDF',
            'pdf.openNewTab': 'Abrir en nueva pestaña',
            'pdf.openNewTabAria': 'Abrir PDF en nueva pestaña',
            'pdf.closeDialogAria': 'Cerrar diálogo',
            'pdf.invalid': 'No se pudo cargar el PDF o es inválido.',
        },
    };

    constructor() {
        const storedTheme = this.readStorage(UiPreferencesService.THEME_STORAGE_KEY);
        if (storedTheme === 'light' || storedTheme === 'dark') {
            this.currentTheme.set(storedTheme);
        }

        const storedLanguage = this.readStorage(UiPreferencesService.LANGUAGE_STORAGE_KEY);
        if (storedLanguage === 'en' || storedLanguage === 'es') {
            this.currentLanguage.set(storedLanguage);
        }

        this.applyTheme();
        this.applyLanguage();
    }

    setLanguage(language: Language): void {
        this.currentLanguage.set(language);
        this.writeStorage(UiPreferencesService.LANGUAGE_STORAGE_KEY, language);
        this.applyLanguage();
    }

    toggleTheme(): void {
        const nextTheme: ThemeMode = this.currentTheme() === 'light' ? 'dark' : 'light';
        this.currentTheme.set(nextTheme);
        this.writeStorage(UiPreferencesService.THEME_STORAGE_KEY, nextTheme);
        this.applyTheme();
    }

    t(key: string): string {
        const language: Language = this.currentLanguage();
        return this.translations[language][key] || this.translations.en[key] || key;
    }

    private applyTheme(): void {
        if (typeof document === 'undefined') {
            return;
        }
        document.documentElement.setAttribute('data-theme', this.currentTheme());
    }

    private applyLanguage(): void {
        if (typeof document === 'undefined') {
            return;
        }
        document.documentElement.setAttribute('lang', this.currentLanguage());
    }

    replace(key: string, params: Record<string, string | number>): string {
        return Object.entries(params).reduce((acc, [param, value]) => {
            return acc.replaceAll(`{{${param}}}`, String(value));
        }, this.t(key));
    }

    private readStorage(key: string): string | null {
        if (typeof localStorage === 'undefined') {
            return null;
        }
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    }

    private writeStorage(key: string, value: string): void {
        if (typeof localStorage === 'undefined') {
            return;
        }
        try {
            localStorage.setItem(key, value);
        } catch {
            // Ignore storage errors in private mode or restricted environments.
        }
    }
}
