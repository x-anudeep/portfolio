import { type PortfolioProject } from './portfolioConstellation';
import { preloadImage } from '../../utils/assetLoaders';
import { portfolioSkills } from './portfolioSkills';
import {
    PROJECT_DETAILS_IMAGE_SIZES,
    PROJECT_PREVIEW_IMAGE_SIZES,
    projectImagesById,
} from './projectImageAssets';

const withProjectScreenshots = (projects: PortfolioProject[]): PortfolioProject[] =>
    projects.map((project) => ({
        ...project,
        screenshot: projectImagesById[project.id]?.preview,
        detailsScreenshot: projectImagesById[project.id]?.details,
        skills: project.skills.map(
            (skill) =>
                portfolioSkills[portfolioSkills.findIndex((s) => s.id === skill)]?.label ?? skill,
        ),
    }));

const getAdjacentProjects = (
    project: PortfolioProject,
    projects: PortfolioProject[],
): PortfolioProject[] => {
    const index = projects.findIndex((candidate) => candidate.id === project.id);
    if (index < 0 || projects.length < 2) {
        return [];
    }

    return [
        projects[(index - 1 + projects.length) % projects.length],
        projects[(index + 1) % projects.length],
    ];
};

export const preloadAdjacentProjectScreenshots = (project: PortfolioProject): void => {
    const constellationProjects = portfolioProjects.filter(
        (candidate) => candidate.constellation.id === project.constellation.id,
    );
    const adjacentProjects = new Set([
        ...getAdjacentProjects(project, portfolioProjects),
        ...getAdjacentProjects(project, constellationProjects),
    ]);

    adjacentProjects.forEach((candidate) => {
        if (candidate.screenshot) {
            preloadImage(candidate.screenshot, PROJECT_PREVIEW_IMAGE_SIZES);
        }
    });
};

export const preloadAdjacentProjectDetails = async (project: PortfolioProject): Promise<void> => {
    const adjacentScreenshots = getAdjacentProjects(project, portfolioProjects).flatMap(
        (candidate) => (candidate.detailsScreenshot ? [candidate.detailsScreenshot] : []),
    );

    await Promise.allSettled(
        adjacentScreenshots.map((source) => preloadImage(source, PROJECT_DETAILS_IMAGE_SIZES)),
    );
};

export const portfolioProjects: PortfolioProject[] = withProjectScreenshots([
    {
        id: 'multi-agent-intelligence-engine',
        title: 'Multi-Agent Intelligence Engine',
        label: 'Multi-Agent Engine',
        description:
            'An auditable agentic platform for financial-services supply-chain risk assessment. Coordinates specialist research, risk scoring, compliance, reporting, and human-review agents with policy routing, typed state, checkpoints, runtime snapshots, telemetry, and a browser dashboard. Supports live providers alongside offline evaluation workflows.',
        skills: ['Python', 'LangGraph', 'FastAPI', 'SQLite', 'OpenTelemetry', 'Docker'],
        domain: 'Agentic AI / Supply-Chain Risk',
        constellation: {
            id: 'front-end',
            position: [0, -0.05, 0],
            links: ['bionic-agents', 'automation-project', 'multi-agent-project'],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/Multi-Agent-Intelligence-Engine',
    },
    {
        id: 'bionic-agents',
        title: 'Bionic Agents Control Center',
        label: 'Bionic Agents',
        description:
            'A dashboard and execution platform integrating nine primary agents and fourteen pipeline agents from the upstream QBBionicAgents project. Adds registry-driven input forms, isolated execution, persistent results, stage logs, and downloadable artifacts. Preserves upstream implementations and attribution; provider-dependent agents require configured credentials.',
        skills: ['Python', 'TypeScript', 'Agent Orchestration', 'Docker'],
        domain: 'Agent Platforms / Upstream Integration',
        constellation: {
            id: 'front-end',
            position: [-0.85, 0.9, -0.05],
            links: [],
        },
        period: 'GitHub project',
        role: 'Platform Integration Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/Bionic-Agents',
    },
    {
        id: 'automation-project',
        title: 'Universal TMS Data Extractor & Automation Copilot',
        label: 'TMS Copilot',
        description:
            'A logistics automation backend connecting shipment extraction, normalized data models, ERPNext, and Fleetbase. Includes a Twilio and Claude voice intake flow, Claude computer-use browser automation, CSV/Excel imports, confirmation emails, human review, and persistent execution logs. Integrations include mock modes for local testing.',
        skills: ['Python', 'FastAPI', 'Claude', 'Twilio', 'Playwright', 'PostgreSQL', 'Redis'],
        domain: 'Logistics / Voice & Computer-Use Agents',
        constellation: {
            id: 'front-end',
            position: [0.9, 0.65, 0.05],
            links: [],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/Automation_project',
    },
    {
        id: 'multi-agent-project',
        title: 'Multi-Agent Logistics Quotation System',
        label: 'Logistics Agents',
        description:
            'A Node.js logistics quotation platform with a dark operations frontend and Fleetbase integration. LangChain agents handle shipment triage, route and capacity checks, pricing, load optimization, and quote review. The documented backend is complete; phone/email automation is a separate teammate handoff.',
        skills: ['JavaScript', 'Node.js', 'Express', 'LangChain', 'Fleetbase', 'Docker'],
        domain: 'Logistics / Multi-Agent Workflows',
        constellation: {
            id: 'front-end',
            position: [0.35, -1.15, 0],
            links: [],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/Multi-Agent-Project',
    },
    {
        id: 'workflowguard',
        title: 'WorkflowGuard – AI Workflow Evaluation Platform',
        label: 'WorkflowGuard',
        description:
            'A workflow verification and QA platform for BPMN, JSON, and n8n. Combines graph validation, LLM-assisted prompt alignment, reliability and security analysis, test generation, n8n execution, failure injection, coverage, cost forecasts, and controlled repair versioning. Includes audit history, reporting, and CI quality gates.',
        skills: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'PostgreSQL', 'n8n'],
        domain: 'AI Workflow Verification / Developer Tools',
        constellation: {
            id: 'full-stack',
            position: [0, 1, 0],
            links: ['financial-intelligence-manager'],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/WorkflowGuard',
    },
    {
        id: 'financial-intelligence-manager',
        title: 'Financial Statement Intelligence Platform',
        label: 'Financial Intelligence',
        description:
            'An analyst-support platform for SEC EDGAR data and uploaded financial statements. Calculates deterministic financial ratios, flags unusual movements with explainable rules and statistical checks, compares companies, and retrieves supporting document context. Includes a React dashboard and an optional LLM copilot; findings support analyst review.',
        skills: [
            'Python',
            'FastAPI',
            'React',
            'TypeScript',
            'Pandas',
            'scikit-learn',
            'SQLAlchemy',
        ],
        domain: 'Financial Analytics / Decision Support',
        constellation: {
            id: 'full-stack',
            position: [-0.9, -0.1, 0.05],
            links: ['property-management-voice-agent'],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/Financial-Intelligence-Manager',
    },
    {
        id: 'property-management-voice-agent',
        title: 'The Place on Jentilly – Property Management',
        label: 'Property Voice Agent',
        description:
            'A property portal with role-based dashboards for admins, landlords, tenants, and maintenance staff. Covers rent and lease information, maintenance approvals, scheduling, and repair queues. Includes a Twilio-compatible voice webhook, a local demo dataset, and an optional Supabase schema for hosted persistence.',
        skills: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Twilio'],
        domain: 'Property Management / Voice Interfaces',
        constellation: {
            id: 'full-stack',
            position: [0, -1.15, 0],
            links: ['admingate'],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/Property-Management-Voice-Agent',
    },
    {
        id: 'admingate',
        title: 'AdminGate – Role-Based Help & Knowledge System',
        label: 'AdminGate',
        description:
            'An ASU CSE 360 software engineering project for administrators, instructors, and students. Provides role-based access, authentication and OTP reset, help-article management, groups, messaging, and database integration. Built with an Angular frontend and Spring Boot backend, with documented automated testing.',
        skills: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'H2', 'JUnit'],
        domain: 'Education / Knowledge Management',
        constellation: {
            id: 'full-stack',
            position: [0.9, -0.1, -0.05],
            links: ['workflowguard'],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/AdminGate',
    },
    {
        id: 'enterprise-rag-eval-harness',
        title: 'Enterprise RAG + Evaluation Harness',
        label: 'Enterprise RAG',
        description:
            'A reproducible healthcare-compliance retrieval and evaluation platform. Includes ingestion, semantic chunking, BM25 and semantic hybrid retrieval, reranking, answer extraction, synthetic QA, guardrails, reports, and CI gates. Runs locally with deterministic metrics; Pinecone, pgvector, and RAGAS integrations are optional adapters.',
        skills: ['Python', 'FastAPI', 'BM25', 'RAG', 'Pinecone', 'pgvector', 'GitHub Actions'],
        domain: 'Retrieval-Augmented Generation / Evaluation',
        constellation: {
            id: 'back-end',
            position: [-0.9, 0.9, 0],
            links: ['multi-model-router'],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/enterprise-rag-eval-harness',
    },
    {
        id: 'multi-model-router',
        title: 'Enterprise LLM Gateway',
        label: 'LLM Gateway',
        description:
            'A provider-neutral SDK and FastAPI gateway spanning five LLM provider platforms. Routes requests by task, capability, estimated cost, health, and latency, with a three-tier fallback chain. Records requests in a SQLite ledger and exposes Streamlit metrics; deterministic mock providers support no-key local demos.',
        skills: ['Python', 'FastAPI', 'Streamlit', 'SQLite', 'LLM Routing'],
        domain: 'AI Infrastructure / Routing & Observability',
        constellation: {
            id: 'back-end',
            position: [-0.3, -0.05, 0.05],
            links: ['ai-native-microservice'],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/Multi-Model-Router',
    },
    {
        id: 'ai-native-microservice',
        title: 'AI-Native Microservice Platform',
        label: 'AI Microservice',
        description:
            'An asynchronous FastAPI document-processing service for text, PDFs, and images. Routes requests through AI provider profiles and returns structured JSON with cost, latency, and health telemetry. Includes an operations dashboard, Prometheus metrics, Docker, Kubernetes manifests, Helm, Terraform AWS/EKS configuration, and CI/CD.',
        skills: [
            'Python',
            'FastAPI',
            'Prometheus',
            'Docker',
            'Kubernetes',
            'Helm',
            'Terraform',
            'AWS',
        ],
        domain: 'Document Processing / Cloud Infrastructure',
        constellation: {
            id: 'back-end',
            position: [0.8, 0.35, -0.05],
            links: ['student-management-system'],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/AI-Native-Microservice',
    },
    {
        id: 'student-management-system',
        title: 'Student Management System',
        label: 'Student Management',
        description:
            'A full-stack student and course management application with an Angular frontend and Spring Boot backend. Supports administration of student records, courses, and roles, JWT security, H2 development storage, and MySQL configuration. The repository documents frontend hosting while backend hosting remains planned.',
        skills: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'JWT', 'H2', 'MySQL'],
        domain: 'Education / Backend Systems',
        constellation: {
            id: 'back-end',
            position: [0.35, -1.2, 0],
            links: [],
        },
        period: 'GitHub project',
        role: 'Project Developer',
        owner: 'Anudeep Cherukupalli',
        repositoryUrl: 'https://github.com/x-anudeep/student-management-system',
    },
]);
