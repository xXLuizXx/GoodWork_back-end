-- ============================================================
-- SEED DE DADOS PARA TESTE - GoodWork TCC
-- Cobre: jobs, applications, interviews
-- ============================================================

-- JOBS (15 vagas, 2-3 por empresa, todas aprovadas pelo admin)
INSERT INTO public.jobs (id, vacancy, contractor, description_vacancy, requirements, workload, location, benefits, banner, vacancy_available, category_id, user_id, created_at, valid_vacancy, amount_vacancy, closing_date) VALUES

-- TechSolution Ltda
('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67891',
 'Desenvolvedor Full Stack Pleno', 'TechSolution Ltda',
 'Buscamos Desenvolvedor Full Stack Pleno para atuar no desenvolvimento de sistemas web modernos, integração de APIs REST e manutenção de plataformas existentes.',
 'React ou Vue.js | Node.js | PostgreSQL | Git | 2 anos de experiência | Inglês técnico',
 '40h semanais (CLT)', 'São Paulo - SP (Híbrido)',
 'VR R$ 40/dia | VT | Plano de Saúde | Gympass | Bônus por performance',
 'banner-techsolution-fullstack.png', true,
 'fe376892-9c62-4b5a-844b-4097a4328557', '4009d609-24d3-42aa-ad5b-76a41b68afcc',
 '2026-02-26 10:00:00', true, 3, '2026-06-30 23:59:59'),

('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67892',
 'Analista de Suporte de TI', 'TechSolution Ltda',
 'Responsável por atendimento técnico N1/N2, administração de estações de trabalho, gerenciamento de contas no Active Directory e suporte presencial e remoto.',
 'Windows Server | Active Directory | Redes TCP/IP | Office 365 | ITIL (desejável)',
 '44h semanais (CLT)', 'São Paulo - SP (Presencial)',
 'VR R$ 35/dia | VT | Plano de Saúde | Seguro de Vida',
 'banner-techsolution-suporte.png', true,
 '9f55ac70-b94a-49e3-93a5-bd66cde82284', '4009d609-24d3-42aa-ad5b-76a41b68afcc',
 '2026-02-26 10:30:00', true, 2, '2026-06-15 23:59:59'),

('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67893',
 'Analista de QA Pleno', 'TechSolution Ltda',
 'Atuará na elaboração e execução de planos de teste, criação de casos de teste funcionais e de regressão, documentação de bugs e trabalho conjunto com a equipe de desenvolvimento.',
 'Testes Manuais e Automatizados | Postman | SQL | JIRA | Metodologias ágeis | Cypress (diferencial)',
 '40h semanais (CLT)', 'São Paulo - SP (Remoto)',
 'VR R$ 40/dia | VT | Plano de Saúde | Home Office',
 'banner-techsolution-qa.png', true,
 'f52ff878-7e80-4f1f-9798-2e5a01233b66', '4009d609-24d3-42aa-ad5b-76a41b68afcc',
 '2026-02-26 11:00:00', true, 1, '2026-05-31 23:59:59'),

-- Saúde Total Clínica Médica
('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67894',
 'Médico(a) Clínico(a) Geral', 'Saúde Total Clínica Médica',
 'Realizará consultas de clínica geral, emissão de laudos, encaminhamentos para especialidades e atendimento a pacientes particulares e conveniados.',
 'CRM ativo | Especialização em Clínica Médica | Experiência mínima 2 anos | Disponibilidade para plantões',
 '36h semanais (Plantões)', 'Rio de Janeiro - RJ (Presencial)',
 'Salário compatível | Plano de Saúde Familiar | Plano Odontológico | PLR',
 'banner-saudetotal-medico.png', true,
 'a497e88f-e5a6-4680-ae93-bfe3ef70ac51', 'dae56499-ead3-458e-ba0f-65750bc6e08b',
 '2026-02-26 09:00:00', true, 2, '2026-07-31 23:59:59'),

('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67895',
 'Enfermeiro(a) UTI Adulto', 'Saúde Total Clínica Médica',
 'Prestará assistência direta a pacientes em estado crítico na UTI Adulto, administrando medicamentos, realizando procedimentos de alta complexidade e elaborando evoluções de enfermagem.',
 'COREN ativo | Especialização em UTI (desejável) | Experiência mínima 1 ano em UTI | BLS atualizado',
 'Escala 12x36 (CLT)', 'Rio de Janeiro - RJ (Presencial)',
 'Insalubridade | Plano de Saúde | Uniforme | Refeição no local | Transporte fretado',
 'banner-saudetotal-enfermeiro.png', true,
 'bd854a4e-2614-4c14-85fb-69ad2e5164bd', 'dae56499-ead3-458e-ba0f-65750bc6e08b',
 '2026-02-26 09:30:00', true, 3, '2026-06-30 23:59:59'),

('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67896',
 'Recepcionista de Clínica Médica', 'Saúde Total Clínica Médica',
 'Agendamento de consultas, acolhimento de pacientes, verificação de convênios, emissão de guias, organização de prontuários e suporte administrativo.',
 'Ensino Médio completo | Experiência em atendimento ao público | Pacote Office básico | Boa comunicação',
 '44h semanais (CLT)', 'Rio de Janeiro - RJ (Presencial)',
 'VR | VT | Plano de Saúde | Convênio Farmácia',
 'banner-saudetotal-recepcao.png', true,
 '4a902f1c-60df-4ad9-ae81-f96094252a5a', 'dae56499-ead3-458e-ba0f-65750bc6e08b',
 '2026-02-26 09:45:00', true, 2, '2026-05-31 23:59:59'),

-- Construtora Nova Era
('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67897',
 'Arquiteto(a) de Projetos', 'Construtora Nova Era',
 'Elaborará projetos arquitetônicos residenciais e comerciais, coordenará equipes, realizará acompanhamento técnico no canteiro e aprovação de projetos junto aos órgãos.',
 'CAU ativo | AutoCAD | Revit | SketchUp | Experiência mínima 3 anos | Disponibilidade para visitas técnicas',
 '44h semanais (CLT)', 'Belo Horizonte - MG (Presencial/Campo)',
 'VR R$ 45/dia | VT | Plano de Saúde | Veículo para visitas técnicas',
 'banner-novaera-arquiteto.png', true,
 '3f2c7cb1-6fe0-4438-a483-c9c4443f8384', '62720391-9857-4532-b945-efdf6f21f987',
 '2026-02-26 08:30:00', true, 1, '2026-06-30 23:59:59'),

('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67898',
 'Pedreiro Especializado', 'Construtora Nova Era',
 'Execução de alvenaria estrutural e de vedação, revestimento cerâmico, contrapiso, acabamento fino e leitura de projetos de execução.',
 'Experiência mínima 3 anos | Leitura de projetos | NR 18 (desejável) | Disponibilidade para viagens',
 '44h semanais (CLT)', 'Belo Horizonte - MG (Canteiro)',
 'VA R$ 30/dia | VT | EPI fornecido | Seguro de Vida | Insalubridade conforme NR',
 'banner-novaera-pedreiro.png', true,
 '178dd3c9-d432-4920-a03c-7d48788b87cf', '62720391-9857-4532-b945-efdf6f21f987',
 '2026-02-26 08:45:00', true, 5, '2026-05-31 23:59:59'),

('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67899',
 'Orçamentista de Obras', 'Construtora Nova Era',
 'Elaborará orçamentos detalhados de obras civis, composição de custos unitários, levantamento de quantitativos, análise de projetos e acompanhamento custo x realizado.',
 'Excel avançado | Software de orçamento (Volare/Orçafascio) | Normas ABNT | Experiência mínima 2 anos',
 '40h semanais (CLT)', 'Belo Horizonte - MG (Híbrido)',
 'VR R$ 40/dia | VT | Plano de Saúde | Notebook',
 'banner-novaera-orcamentista.png', true,
 '39a611b2-842c-4444-af62-3fc985398aaa', '62720391-9857-4532-b945-efdf6f21f987',
 '2026-02-26 08:00:00', true, 1, '2026-06-15 23:59:59'),

-- Alimentos Natural Life
('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67810',
 'Auxiliar de Produção de Alimentos', 'Alimentos Natural Life',
 'Manipulação e preparo de alimentos naturais e orgânicos, controle de validade, higienização de equipamentos, embalagem e organização da linha de produção conforme BPF.',
 'Ensino Médio completo | Curso de Boas Práticas de Fabricação | Experiência em manipulação de alimentos | Disponibilidade para turnos',
 '44h semanais (CLT)', 'Curitiba - PR (Presencial)',
 'VA | VT | Cesta Básica | Plano de Saúde | 20% desconto em produtos',
 'banner-naturallife-producao.png', true,
 'acaa7c8b-0a35-4226-8916-820cab4ac685', '3098d2a6-032d-4ad8-8f58-f8bd9b2cabed',
 '2026-02-26 07:30:00', true, 4, '2026-05-31 23:59:59'),

('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67811',
 'Vendedor(a) Consultivo(a)', 'Alimentos Natural Life',
 'Atendimento em loja física, apresentação dos produtos naturais e orgânicos, orientação nutricional básica, realização de vendas consultivas e pós-venda.',
 'Ensino Médio completo | Experiência em vendas | Boa comunicação | Conhecimento em alimentação saudável (diferencial)',
 '44h semanais (CLT)', 'Curitiba - PR (Presencial)',
 'Comissão sobre vendas | VA | VT | Plano de Saúde | 20% desconto em produtos',
 'banner-naturallife-vendedor.png', true,
 'c7414e51-8430-40a3-8174-884212fb06c3', '3098d2a6-032d-4ad8-8f58-f8bd9b2cabed',
 '2026-02-26 07:45:00', true, 2, '2026-06-15 23:59:59'),

-- Logística Express Transportes
('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67812',
 'Motorista de Caminhão Truck', 'Logística Express Transportes',
 'Condução de caminhão Truck para coleta e entrega de cargas em rotas regionais e interestaduais, checklist do veículo e controle de documentação de entregas.',
 'CNH categoria E | Curso Mopp (desejável) | Experiência mínima 2 anos | Disponibilidade para viagens',
 '44h semanais (CLT)', 'Porto Alegre - RS (Rota Regional)',
 'Diária de viagem | VA | VT | Plano de Saúde | Seguro de Vida',
 'banner-logistica-motorista.png', true,
 '12eda846-fd40-4f81-ad3c-2f164874884c', '237b94a4-80e6-47e6-a87d-878533aeb4b4',
 '2026-02-26 06:30:00', true, 3, '2026-07-31 23:59:59'),

('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67813',
 'Analista de Logística Pleno', 'Logística Express Transportes',
 'Planejamento e otimização de rotas, gestão de frota, rastreamento de veículos via TMS e análise de KPIs operacionais de logística.',
 'WMS ou TMS | Roteirização | Excel avançado | Power BI (desejável) | Experiência mínima 2 anos',
 '40h semanais (CLT)', 'Porto Alegre - RS (Presencial)',
 'VR R$ 40/dia | VT | Plano de Saúde | Participação nos Resultados',
 'banner-logistica-analista.png', true,
 'e94b87fa-c916-484b-93ec-67b617e08973', '237b94a4-80e6-47e6-a87d-878533aeb4b4',
 '2026-02-26 06:45:00', true, 1, '2026-06-30 23:59:59'),

-- Empresa de Testes Ltda
('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67814',
 'QA Automation Engineer Pleno', 'Empresa de Testes Ltda',
 'Desenvolvimento e manutenção de scripts de automação com Cypress e Selenium, criação de pipelines CI/CD para testes e relatórios de qualidade.',
 'Selenium ou Cypress | Java ou JavaScript | Cucumber/BDD | CI/CD (Jenkins/GitLab) | Git | Experiência mínima 2 anos',
 '40h semanais (CLT)', 'Montes Claros - MG (Remoto)',
 'VR | VT | Plano de Saúde | Home Office | Auxílio Internet | Treinamentos',
 'banner-testeldb-automation.png', true,
 '837c097c-3863-4b98-a193-bcf41a30ae33', '3d5aea02-014c-45cb-8321-b5a6c29a94b7',
 '2026-02-26 11:30:00', true, 2, '2026-06-30 23:59:59'),

('f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67815',
 'Analista de Testes Manual', 'Empresa de Testes Ltda',
 'Elaboração e execução de casos de teste funcionais, exploratórios e de regressão, documentação de bugs no JIRA e validação de critérios de aceite com o PO.',
 'Testes Funcionais e Exploratórios | JIRA | SQL básico | Postman | Equipe ágil | Experiência mínima 1 ano',
 '40h semanais (CLT)', 'Montes Claros - MG (Híbrido)',
 'VR | VT | Plano de Saúde | Flexibilidade de horário | Treinamentos',
 'banner-testeldb-manual.png', true,
 '68828df8-93cd-4d3d-8634-8fd97395d5c1', '3d5aea02-014c-45cb-8321-b5a6c29a94b7',
 '2026-02-26 11:45:00', true, 2, '2026-05-31 23:59:59');


-- ============================================================
-- APPLICATIONS (candidaturas com status variados)
-- Aprovadas: app1-app6, app13
-- Rejeitadas: app7, app10
-- Pendentes: app8, app9, app11, app12
-- ============================================================
INSERT INTO public.applications (id, user_id, job_id, curriculum_user, application_approved, created_at) VALUES

-- APROVADAS
('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67801',
 '618c4d3c-3d25-4f14-8ecd-a2b86bd74942',  -- Ana Beatriz (Full Stack)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67891',  -- TechSolution Full Stack
 'f8562f8ffa8eb71a8f4f68b0a47c5011-Curriculo Luiz Fernando Fonseca da Silva.pdf',
 true, '2026-03-01 09:00:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67802',
 '9ea1bafa-9a54-4ebc-84ae-3fa88930b1a3',  -- Marcos (Suporte TI)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67892',  -- TechSolution Suporte
 '837543cb54d6fb6b25536e7fdaad3d3b-Profile.pdf',
 true, '2026-03-01 10:00:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67803',
 '912c9b80-0711-4454-bb97-8b5f7939517b',  -- Ricardo (QA Automation)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67814', -- Empresa Testes - QA Automation
 '62f7f09a772e69465bbbdd042f3952d1-Profile Linkedin Luiz Fernando Fonseca da Silva.pdf',
 true, '2026-03-02 08:30:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67804',
 '179761a9-319b-4ebf-9b8c-4c53d3dd1e80',  -- Juliana (QA Manual)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67815', -- Empresa Testes - Analista Manual
 '316c365c084d3e997a5b16491dcaf90a-Anexo IX - Requerimento de aproveitamento de atividades profissionais para est-gio.docx.pdf',
 true, '2026-03-02 09:00:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67805',
 '36d7b84f-d7b8-4520-98d1-3cd065bbe72c',  -- Roberto (Arquiteto)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67897', -- Construtora - Arquiteto
 '3059839609c50f14359a6d0fff2736ec-Profile.pdf',
 true, '2026-03-03 08:00:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67806',
 'fa394e2a-5044-412f-a2e7-2dabcb46a209',  -- Carlos Eduardo (Enfermeiro)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67895', -- Saúde Total - Enfermeiro UTI
 '1eb43441eebf06900f23eb5ade9842d0-Profile Linkedin Luiz Fernando Fonseca da Silva.pdf',
 true, '2026-03-03 09:00:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67813',
 '912c9b80-0711-4454-bb97-8b5f7939517b',  -- Ricardo (também se candidatou como manual)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67815', -- Empresa Testes - Analista Manual
 '62f7f09a772e69465bbbdd042f3952d1-Profile Linkedin Luiz Fernando Fonseca da Silva.pdf',
 true, '2026-03-04 11:00:00'),

-- REJEITADAS
('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67807',
 'c07c0d44-4442-4297-835a-bf852765d5dc',  -- Fernanda (Logística)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67813', -- Logística Express - Analista
 '012d5178465ba6f3921edcc80ed80446-Profile.pdf',
 false, '2026-03-01 14:00:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67810',
 '596fe2c1-1bb4-4cd7-9297-21829b722ce8',  -- Patrícia (Vendedora)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67811', -- Natural Life - Vendedor
 'a7caccea1d5942f5e77bc930fb66f18a-Profile.pdf',
 false, '2026-03-02 13:00:00'),

-- PENDENTES (aguardando análise da empresa)
('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67808',
 'daf1ce24-60b7-4f02-abeb-753c347c8726',  -- Joaquim (Pedreiro)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67898', -- Construtora - Pedreiro
 'eb04da55083546b23e8c3653258efbb4-Profile.pdf',
 NULL, '2026-03-05 08:00:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67809',
 '03c6614b-77e0-4a81-97c6-c0dc4e7fdb78',  -- Mariana (Produção)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67810', -- Natural Life - Auxiliar Produção
 'f3f6429568079fde45d1e3c2463a9440-Profile Linkedin Luiz Fernando Fonseca da Silva.pdf',
 NULL, '2026-03-05 09:00:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67811',
 '475902ad-2ad2-4164-8052-cbf412c15c5b',  -- Roberto Teste (Tester)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67814', -- Empresa Testes - QA Automation
 '33562e7fba44ad989ad51ec49345583e-Profile Linkedin Luiz Fernando Fonseca da Silva.pdf',
 NULL, '2026-03-06 10:00:00'),

('a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67812',
 '618c4d3c-3d25-4f14-8ecd-a2b86bd74942',  -- Ana Beatriz (também se candidatou para QA)
 'f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67893', -- TechSolution - Analista QA
 'f8562f8ffa8eb71a8f4f68b0a47c5011-Curriculo Luiz Fernando Fonseca da Silva.pdf',
 NULL, '2026-03-06 11:00:00');


-- ============================================================
-- INTERVIEWS (apenas para candidaturas APROVADAS)
-- Tipos: presencial ou online
-- Status: scheduled, completed, cancelled
-- ============================================================
INSERT INTO public.interviews (id, application_id, interview_type, scheduled_date, duration_minutes, location, meeting_link, interviewer_name, interviewer_email, notes, status, created_at) VALUES

-- Ana Beatriz → TechSolution Full Stack (online, scheduled)
('b2c3d4e5-f6a7-8901-b2c3-d4e5f6a78901',
 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67801',
 'online', '2026-04-22 14:00:00', 60,
 NULL, 'https://meet.google.com/abc-defg-hij',
 'Paulo Henrique Almeida', 'paulo.almeida@techsolution.com.br',
 'Entrevista técnica com foco em React e Node.js. Candidata apresentou portfólio excelente.',
 'scheduled', '2026-03-10 09:00:00'),

-- Marcos → TechSolution Suporte (presencial, completed)
('b2c3d4e5-f6a7-8901-b2c3-d4e5f6a78902',
 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67802',
 'presencial', '2026-04-10 10:00:00', 45,
 'Avenida Paulista, 1234 - Bela Vista, São Paulo - SP', NULL,
 'Carla Ferreira', 'carla.ferreira@techsolution.com.br',
 'Candidato demonstrou sólido conhecimento em redes e Active Directory. Aprovado para próxima fase.',
 'completed', '2026-03-11 10:00:00'),

-- Ricardo → Empresa Testes QA Automation (online, scheduled)
('b2c3d4e5-f6a7-8901-b2c3-d4e5f6a78903',
 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67803',
 'online', '2026-04-25 15:00:00', 90,
 NULL, 'https://teams.microsoft.com/l/meet/xyz123',
 'Bruno Lacerda', 'bruno.lacerda@empresadetestes.com.br',
 'Teste técnico prático com Cypress + desafio de automação em Java. Trazer portfólio no GitHub.',
 'scheduled', '2026-03-12 08:00:00'),

-- Juliana → Empresa Testes Analista Manual (presencial, scheduled)
('b2c3d4e5-f6a7-8901-b2c3-d4e5f6a78904',
 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67804',
 'presencial', '2026-04-23 09:30:00', 60,
 'Rua da Couves, 25014 - Crispim Santana, Montes Claros - MG', NULL,
 'Tatiane Reis', 'tatiane.reis@empresadetestes.com.br',
 'Candidata tem perfil aderente. Conversar sobre experiência com JIRA e testes exploratórios.',
 'scheduled', '2026-03-12 09:00:00'),

-- Roberto → Construtora Nova Era Arquiteto (presencial, completed)
('b2c3d4e5-f6a7-8901-b2c3-d4e5f6a78905',
 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67805',
 'presencial', '2026-04-08 09:00:00', 60,
 'Rua dos Construtores, 890 - Funcionários, Belo Horizonte - MG', NULL,
 'Felipe Drummond', 'felipe.drummond@novaera.com.br',
 'Candidato apresentou portfólio de projetos residenciais. Domínio de Revit confirmado. Avançou para entrevista com diretoria.',
 'completed', '2026-03-13 08:00:00'),

-- Carlos Eduardo → Saúde Total Enfermeiro (presencial, scheduled)
('b2c3d4e5-f6a7-8901-b2c3-d4e5f6a78906',
 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67806',
 'presencial', '2026-04-24 11:00:00', 45,
 'Rua das Flores, 567 - Jardim América, Rio de Janeiro - RJ', NULL,
 'Dra. Renata Campos', 'renata.campos@saudetotal.com.br',
 'Verificar COREN e certificados de UTI. Candidato tem experiência em UTI Adulto de alto nível.',
 'scheduled', '2026-03-14 10:00:00'),

-- Ricardo → Empresa Testes Analista Manual (online, cancelled)
('b2c3d4e5-f6a7-8901-b2c3-d4e5f6a78907',
 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67813',
 'online', '2026-04-15 14:00:00', 45,
 NULL, 'https://meet.google.com/xyz-uvwx-yz',
 'Tatiane Reis', 'tatiane.reis@empresadetestes.com.br',
 'Candidato optou por seguir apenas com a vaga de automação. Entrevista cancelada a pedido.',
 'cancelled', '2026-03-15 09:00:00');
