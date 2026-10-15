import { Injectable, signal } from '@angular/core';
import { getMetadata, getMetadataAsBoolean } from '../../../environments/metadata.service';

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
    readonly keycloakAdminUrl = getMetadata<string>('keycloakAdminUrl', '') || '';
    readonly enableThemeToggle = getMetadataAsBoolean('enableThemeToggle', true) ?? true;

    readonly theme = this.currentTheme.asReadonly();
    readonly language = this.currentLanguage.asReadonly();

    private readonly translations: TranslationDict = {
        en: {
            'toolbar.portal': 'Onboarding Portal',
            'toolbar.space': 'Data Space',
            'toolbar.start': 'Start Onboarding',
            'toolbar.logout': 'Logout',
            'toolbar.keycloakAdmin': 'Keycloak Admin',
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
            'landing.ctaMarketplace': 'Marketplace',

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
            'landing.statsTimeValue': '< 5 min',

            'landing.mediaCaption': 'Image source: CitCom.ai project materials',

            'footer.euTitle': 'Co-funded by the European Union.',
            'footer.euText':
                'Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union. Neither the European Union nor the granting authority can be held responsible for them.',
            'footer.services': 'Services',
            'footer.news': 'News & Publications',
            'footer.contact': 'Contact',
            'footer.about': 'About',
            'footer.events': 'Events',
            'footer.customerService': 'Customer Service',
            'footer.address': 'Address',
            'footer.phone': 'Phone',
            'footer.rights': 'All rights reserved.',
            'footer.admin': 'Administration',

            'submit.trackingId': 'Application ID',
            'submit.notFound': 'Registration request {{id}} not found',

            'dashboard.title': 'Registration Requests',
            'dashboard.subtitle': 'Manage and monitor all onboarding applications',
            'dashboard.colEmail': 'Email address',
            'dashboard.colStatus': 'Status',
            'dashboard.colCreatedAt': 'Registration date',
            'dashboard.colUpdatedAt': 'Last update',
            'dashboard.colFiles': 'No. files',
            'dashboard.deleteTitle': 'Delete registration',
            'dashboard.deleteMessage': 'Are you sure you want to delete the registration for {{email}}? This action cannot be undone.',
            'dashboard.deleteConfirm': 'Delete',
            'dashboard.deleteSuccess': 'Registration deleted successfully',
            'dashboard.deleteError': 'Failed to delete registration',

            'review.back': 'Back to previous step',
            'review.title': 'Review Requests',
            'review.notFoundTitle': 'No request found',
            'review.notFoundBody':
                'We could not find details for the provided ID. It may have been deleted or you may not have permission to view it.',
            'review.backToDashboard': 'Back to dashboard',

            'wizard.stepOf': 'Step {{current}} of {{total}}',
            'wizard.yourApplication': 'Your application',
            'wizard.step1': 'Organization',
            'wizard.step1Desc': 'Entity details',
            'wizard.step2': 'Contact',
            'wizard.step2Desc': 'Email and digital identity',
            'wizard.step3': 'Agreement',
            'wizard.step3Desc': 'Signing the accession',
            'wizard.step4': 'Verification',
            'wizard.step4Desc': 'Review and onboarding',
            'wizard.done': 'Completed',
            'wizard.current': 'In progress',
            'wizard.pending': 'Pending',
            'wizard.helpPrefix': 'Questions about joining? Visit the',
            'wizard.helpLink': 'CitCom.ai project website',
            'wizard.newPrompt': 'Registering another organization?',
            'wizard.newLink': 'Start a new application',
            'wizard.orgTitle': 'Your organization details',
            'wizard.orgLead':
                'These details identify your entity in the data space and will be reviewed together with the accession agreement.',
            'wizard.contactTitle': 'Contact and digital identity',
            'wizard.contactLead':
                'Tell us who to notify during the review and the identifier your organization will use in the data space.',
            'wizard.contractTitle': 'Sign the accession agreement',
            'wizard.contractLead': 'Download the agreement, sign it electronically and upload it here.',
            'wizard.statusTitle': 'Your application status',
            'wizard.statusLead': 'Follow the review of your application here and get your organization ready to connect.',

            'form.entityGroup': 'Entity details',
            'form.name': 'Legal name of the entity',
            'form.namePlaceholder': 'Full legal name',
            'form.taxId': 'Tax ID (VAT)',
            'form.taxIdPlaceholder': 'e.g. ESA12345678',
            'form.country': 'Country',
            'form.countryPlaceholder': 'e.g. Spain',
            'form.address': 'Postal address',
            'form.addressPlaceholder': 'Street and number',
            'form.city': 'City',
            'form.cityPlaceholder': 'e.g. Valencia',
            'form.postCode': 'Postal code',
            'form.postCodePlaceholder': 'e.g. 46022',
            'form.contactGroup': 'Application contact',
            'form.adminEmail': 'Contact email',
            'form.emailPlaceholder': 'name@organization.eu',
            'form.emailHint': 'It will receive the application notifications and its resolution.',
            'form.didGroup': 'Digital identity',
            'form.did': 'Decentralized identifier (DID)',
            'form.optional': '(optional)',
            'form.didHint': 'Leave it empty and a DID will be generated automatically.',
            'form.didHintRequired': 'Format did:method:id, e.g. did:web:organization.eu',
            'form.required': 'This field is required.',
            'form.minLength': 'Enter at least {{min}} characters.',
            'form.invalidEmail': 'Please enter a valid email address.',
            'form.invalidDid': 'Invalid DID format. It should follow did:method:id (e.g. did:web:example.com).',
            'form.contractTitle': 'Data space accession agreement',
            'form.contractMeta': 'PDF · To be signed electronically by the legal representative of the entity',
            'form.viewContract': 'View agreement',
            'form.downloadPdf': 'Download PDF',
            'form.uploadTitle': 'Upload the signed agreement',
            'form.fileRequired': 'Attach the signed agreement in PDF format.',
            'form.accept1': 'I have read and accept the data space accession agreement.',
            'form.accept2':
                'I declare that the legal representative who signs the agreement is duly authorized to do so on behalf of the entity.',
            'form.acceptRequired': 'You must accept this statement to submit the application.',
            'form.next': 'Continue',
            'form.back': 'Back',
            'form.submit': 'Submit application',
            'form.submitting': 'Submitting…',
            'form.submitSuccessTitle': 'Application received',
            'form.submitSuccessDesc':
                'We have sent a confirmation email to the contact address. Keep this ID to check the status of your application.',
            'form.copyLabel': 'Application ID',
            'form.copyHint': 'Use this ID to check your application status.',
            'form.submitError': 'Error submitting the application',

            'track.calloutTitle': 'Already applied?',
            'track.calloutDesc': 'Check where your application stands using the ID you received by email.',
            'track.calloutAction': 'Check status',
            'track.searchTitle': 'Look up your application',
            'track.searchDesc': 'Enter the ID you received when you submitted your application.',
            'track.searchBtn': 'Look up',
            'track.application': 'Application {{id}}',
            'track.another': 'Look up another application',
            'track.detailsTitle': 'Application details',
            'track.headline.submitted': 'We have received your application',
            'track.headline.under_review': 'Your application is under review',
            'track.headline.action_required': 'Your application needs changes',
            'track.headline.rejected': 'Your application has not been approved',
            'track.headline.active': 'Your organization is now part of the data space',
            'track.note.default':
                'We will email you when the data space administrators resolve your application. If more information is needed, you will be asked for it through this portal.',
            'track.note.action_required':
                'Click “Review” in the application details to correct the information or attach the agreement again.',
            'track.note.rejected': 'If you think this is a mistake, you can start a new application.',
            'track.note.active': 'Check your inbox: you will find the links to manage the users of your organization.',
            'track.note.activeOwnDid':
                'Your DID is now a trusted issuer of the data space: your organization issues its credentials from its own connector.',

            'status.submitted': 'Submitted',
            'status.under_review': 'Under review',
            'status.action_required': 'Action required',
            'status.rejected': 'Rejected',
            'status.active': 'Active',

            'timeline.sent': 'Application submitted',
            'timeline.sentDesc': '{{date}} · Organization details registered',
            'timeline.contract': 'Signed agreement received',
            'timeline.contractDesc': '{{count}} document(s) attached',
            'timeline.contractMissing': 'The signed agreement has not been attached yet',
            'timeline.verification': 'Review by the data space administrators',
            'timeline.verificationPending': 'In progress · We will email you once it is resolved',
            'timeline.verificationAction': 'Changes needed: check the reason and update your application',
            'timeline.verificationRejected': 'Application rejected',
            'timeline.verificationDone': 'Application approved',
            'timeline.reason': 'Reason: {{reason}}',
            'timeline.credentials': 'Credential issuance',
            'timeline.credentialsPending': 'They will be sent to the contact email',
            'timeline.credentialsDone': 'Sent to the contact email',
            'timeline.trust': 'Trust registry',
            'timeline.trustPending': 'Your DID will be added as a trusted issuer of the data space',
            'timeline.trustDone': 'Your DID is registered as a trusted issuer',
            'timeline.connection': 'Connecting to the data space',
            'timeline.connectionDesc': 'Deploy your connector and publish your first assets',

            'common.newTab': '(opens in a new tab)',

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
            'details.manageUsers': 'Manage Users & Groups',
            'details.updatedOk': 'Registration updated',
            'details.updatedFail': 'Registration update failed',
            'details.previewPdf': 'Click to preview PDF',

            'table.search': 'Search...',
            'table.clearFilters': 'Clear Filters',
            'table.noRecords': 'No records found.',

            'upload.dropTitle': 'Drag the signed PDF here or browse',
            'upload.dropHint': 'Signed by the legal representative · PDF, max {{size}} MB',
            'upload.remove': 'Remove {{name}}',
            'upload.preview': 'Preview {{name}}',
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
            'toolbar.start': 'Iniciar Onboarding',
            'toolbar.logout': 'Cerrar sesión',
            'toolbar.keycloakAdmin': 'Admin Keycloak',
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
            'landing.ctaMarketplace': 'Marketplace',

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
            'landing.statsTimeValue': '< 5 min',

            'landing.mediaCaption': 'Fuente imagen: materiales del proyecto CitCom.ai',

            'footer.euTitle': 'Co-funded by the European Union.',
            'footer.euText':
                'Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union. Neither the European Union nor the granting authority can be held responsible for them.',
            'footer.services': 'Servicios',
            'footer.news': 'Noticias y publicaciones',
            'footer.contact': 'Contacto',
            'footer.about': 'Sobre nosotros',
            'footer.events': 'Eventos',
            'footer.customerService': 'Atención al cliente',
            'footer.address': 'Dirección',
            'footer.phone': 'Teléfono',
            'footer.rights': 'Todos los derechos reservados.',
            'footer.admin': 'Administración',

            'submit.trackingId': 'Identificador de la solicitud',
            'submit.notFound': 'No se encontró la solicitud {{id}}',

            'dashboard.title': 'Listado de solicitudes',
            'dashboard.subtitle': 'Gestión y seguimiento de registros de onboarding',
            'dashboard.colEmail': 'Correo electrónico',
            'dashboard.colStatus': 'Estado',
            'dashboard.colCreatedAt': 'Fecha de registro',
            'dashboard.colUpdatedAt': 'Última actualización',
            'dashboard.colFiles': 'N. documentos',
            'dashboard.deleteTitle': 'Eliminar solicitud',
            'dashboard.deleteMessage': '¿Seguro que quieres eliminar la solicitud de {{email}}? Esta acción no se puede deshacer.',
            'dashboard.deleteConfirm': 'Eliminar',
            'dashboard.deleteSuccess': 'Solicitud eliminada correctamente',
            'dashboard.deleteError': 'No se pudo eliminar la solicitud',

            'review.back': 'Volver al paso anterior',
            'review.title': 'Revisión de solicitudes',
            'review.notFoundTitle': 'No se encontró la solicitud',
            'review.notFoundBody':
                'No se han encontrado detalles para el ID indicado. Puede haberse eliminado o no tienes permisos para verlo.',
            'review.backToDashboard': 'Volver al panel',

            'wizard.stepOf': 'Paso {{current}} de {{total}}',
            'wizard.yourApplication': 'Tu solicitud',
            'wizard.step1': 'Organización',
            'wizard.step1Desc': 'Datos de la entidad',
            'wizard.step2': 'Contacto',
            'wizard.step2Desc': 'Correo e identidad digital',
            'wizard.step3': 'Contrato',
            'wizard.step3Desc': 'Firma de la adhesión',
            'wizard.step4': 'Verificación',
            'wizard.step4Desc': 'Revisión y alta',
            'wizard.done': 'Completado',
            'wizard.current': 'En curso',
            'wizard.pending': 'Pendiente',
            'wizard.helpPrefix': '¿Dudas con la adhesión? Visita la',
            'wizard.helpLink': 'web del proyecto CitCom.ai',
            'wizard.newPrompt': '¿Vas a registrar otra organización?',
            'wizard.newLink': 'Iniciar una nueva solicitud',
            'wizard.orgTitle': 'Datos de tu organización',
            'wizard.orgLead':
                'Estos datos identifican a tu entidad en el espacio de datos y se revisarán junto con el contrato de adhesión.',
            'wizard.contactTitle': 'Contacto e identidad digital',
            'wizard.contactLead':
                'Indica a quién avisaremos durante la revisión y el identificador con el que tu organización participará en el espacio de datos.',
            'wizard.contractTitle': 'Firma el contrato de adhesión',
            'wizard.contractLead': 'Descarga el contrato, fírmalo electrónicamente y súbelo aquí.',
            'wizard.statusTitle': 'Estado de tu solicitud',
            'wizard.statusLead': 'Sigue aquí la revisión de tu adhesión y prepara la conexión de tu organización.',

            'form.entityGroup': 'Datos de la entidad',
            'form.name': 'Denominación de la entidad',
            'form.namePlaceholder': 'Nombre legal completo',
            'form.taxId': 'Identificador fiscal (VAT / NIF)',
            'form.taxIdPlaceholder': 'Ej. ESA12345678',
            'form.country': 'País',
            'form.countryPlaceholder': 'Ej. España',
            'form.address': 'Dirección postal',
            'form.addressPlaceholder': 'Calle y número',
            'form.city': 'Municipio',
            'form.cityPlaceholder': 'Ej. Valencia',
            'form.postCode': 'Código postal',
            'form.postCodePlaceholder': 'Ej. 46022',
            'form.contactGroup': 'Contacto de la solicitud',
            'form.adminEmail': 'Correo electrónico de contacto',
            'form.emailPlaceholder': 'nombre@entidad.eu',
            'form.emailHint': 'Recibirá los avisos de la solicitud y su resolución.',
            'form.didGroup': 'Identidad digital',
            'form.did': 'Identificador descentralizado (DID)',
            'form.optional': '(opcional)',
            'form.didHint': 'Si lo dejas vacío, el DID se generará automáticamente.',
            'form.didHintRequired': 'Formato did:método:id, por ejemplo did:web:entidad.eu',
            'form.required': 'Este campo es obligatorio.',
            'form.minLength': 'Introduce al menos {{min}} caracteres.',
            'form.invalidEmail': 'Introduce un correo válido.',
            'form.invalidDid': 'Formato DID inválido. Debe seguir did:método:id (por ejemplo, did:web:example.com).',
            'form.contractTitle': 'Contrato de adhesión al espacio de datos',
            'form.contractMeta': 'PDF · Debe firmarlo electrónicamente el representante legal de la entidad',
            'form.viewContract': 'Ver contrato',
            'form.downloadPdf': 'Descargar PDF',
            'form.uploadTitle': 'Sube el contrato firmado',
            'form.fileRequired': 'Adjunta el contrato firmado en formato PDF.',
            'form.accept1': 'He leído y acepto el contrato de adhesión al espacio de datos.',
            'form.accept2':
                'Declaro que el representante legal que firma el contrato tiene capacidad suficiente para hacerlo en nombre de la entidad.',
            'form.acceptRequired': 'Debes aceptar esta declaración para enviar la solicitud.',
            'form.next': 'Continuar',
            'form.back': 'Atrás',
            'form.submit': 'Enviar solicitud',
            'form.submitting': 'Enviando…',
            'form.submitSuccessTitle': 'Solicitud recibida',
            'form.submitSuccessDesc':
                'Hemos enviado un correo de confirmación a la dirección de contacto. Guarda este identificador para consultar el estado de tu solicitud.',
            'form.copyLabel': 'Identificador de la solicitud',
            'form.copyHint': 'Usa este identificador para consultar el estado de tu solicitud.',
            'form.submitError': 'Error al enviar la solicitud',

            'track.calloutTitle': '¿Ya has enviado tu solicitud?',
            'track.calloutDesc': 'Consulta en qué punto está con el identificador que recibiste por correo.',
            'track.calloutAction': 'Consultar estado',
            'track.searchTitle': 'Consulta tu solicitud',
            'track.searchDesc': 'Introduce el identificador que recibiste al enviar la solicitud.',
            'track.searchBtn': 'Consultar',
            'track.application': 'Solicitud {{id}}',
            'track.another': 'Consultar otra solicitud',
            'track.detailsTitle': 'Datos de la solicitud',
            'track.headline.submitted': 'Hemos recibido tu solicitud',
            'track.headline.under_review': 'Tu solicitud está en revisión',
            'track.headline.action_required': 'Tu solicitud necesita cambios',
            'track.headline.rejected': 'Tu solicitud no ha sido aprobada',
            'track.headline.active': 'Tu organización ya forma parte del espacio de datos',
            'track.note.default':
                'Te avisaremos por correo cuando la administración del espacio de datos resuelva tu solicitud. Si necesita más información, te la pedirá desde este portal.',
            'track.note.action_required':
                'Pulsa «Revisar» en los datos de la solicitud para corregir la información o adjuntar de nuevo el contrato.',
            'track.note.rejected': 'Si crees que se trata de un error, puedes iniciar una nueva solicitud.',
            'track.note.active': 'Revisa tu correo: encontrarás los enlaces para gestionar los usuarios de tu organización.',
            'track.note.activeOwnDid':
                'Tu DID ya es emisor de confianza del espacio de datos: tu organización emite sus credenciales desde su propio conector.',

            'status.submitted': 'Enviada',
            'status.under_review': 'En verificación',
            'status.action_required': 'Acción requerida',
            'status.rejected': 'Rechazada',
            'status.active': 'Activa',

            'timeline.sent': 'Solicitud enviada',
            'timeline.sentDesc': '{{date}} · Datos de la organización registrados',
            'timeline.contract': 'Contrato firmado recibido',
            'timeline.contractDesc': '{{count}} documento(s) adjunto(s)',
            'timeline.contractMissing': 'Todavía no se ha adjuntado el contrato firmado',
            'timeline.verification': 'Revisión por la administración del espacio de datos',
            'timeline.verificationPending': 'En curso · Te avisaremos por correo cuando se resuelva',
            'timeline.verificationAction': 'Se necesitan cambios: revisa el motivo y actualiza tu solicitud',
            'timeline.verificationRejected': 'Solicitud rechazada',
            'timeline.verificationDone': 'Solicitud aprobada',
            'timeline.reason': 'Motivo: {{reason}}',
            'timeline.credentials': 'Emisión de credenciales',
            'timeline.credentialsPending': 'Se enviarán al correo de contacto',
            'timeline.credentialsDone': 'Enviadas al correo de contacto',
            'timeline.trust': 'Registro de confianza',
            'timeline.trustPending': 'Tu DID se añadirá como emisor de confianza del espacio de datos',
            'timeline.trustDone': 'Tu DID está registrado como emisor de confianza',
            'timeline.connection': 'Conexión al espacio de datos',
            'timeline.connectionDesc': 'Despliega tu conector y publica tus primeros activos',

            'common.newTab': '(se abre en una pestaña nueva)',

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
            'details.manageUsers': 'Gestionar usuarios y grupos',
            'details.updatedOk': 'Registro actualizado',
            'details.updatedFail': 'Error al actualizar el registro',
            'details.previewPdf': 'Clic para previsualizar PDF',

            'table.search': 'Buscar...',
            'table.clearFilters': 'Limpiar filtros',
            'table.noRecords': 'No se encontraron registros.',

            'upload.dropTitle': 'Arrastra aquí el PDF firmado o selecciónalo',
            'upload.dropHint': 'Firmado por el representante legal · PDF, máx. {{size}} MB',
            'upload.remove': 'Eliminar {{name}}',
            'upload.preview': 'Previsualizar {{name}}',
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
