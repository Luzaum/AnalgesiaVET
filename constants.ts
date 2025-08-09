
import { PainData, QuestionType, Species, Drug } from './types';

export const PAIN_DATA: PainData = {
  dog: {
    acute: {
      scales: [
        {
          id: 'cmps-sf',
          name: 'Escala de Dor Composta de Glasgow - Forma Curta (CMPS-SF)',
          recommended: true,
          description: 'Versão adaptada da escala para uma avaliação estruturada e visual da dor aguda.',
          details: {
            origin: "Desenvolvida na Universidade de Glasgow por Reid J, Nolan AM, Hughes JML, Lascelles D, Pawson P & Scott EM (2007).",
            indications: "Avaliação de dor aguda pós-operatória em cães. Ideal para uso clínico frequente para determinar a necessidade de analgesia de resgate.",
            studies: "Extensivamente validada em múltiplos estudos, demonstrando alta sensibilidade para detectar dor e resposta à analgesia.",
            quality: "Considerada padrão-ouro por se basear exclusivamente em comportamentos observáveis, minimizando a subjetividade. A forma curta (SF) mantém a validade da original, mas é mais rápida de aplicar.",
            reliability: "Apresenta alta confiabilidade inter-observador, significando que diferentes avaliadores tendem a chegar a escores semelhantes."
          },
          questions: [
             {
              id: 'glasgow_observation',
              text: 'A. Observação do Comportamento e Vocalização',
              type: QuestionType.Radio,
              options: [
                { score: 0, text: 'Quieto e confortável, não vocaliza.' },
                { score: 1, text: 'Olha para a ferida ou choraminga baixinho.' },
                { score: 2, text: 'Geme, lambe a ferida intermitentemente.' },
                { score: 3, text: 'Chora, geme ou lambe a ferida continuamente.' },
                { score: 4, text: 'Grita, rosna, late ou morde a ferida.' },
              ],
            },
            {
              id: 'glasgow_touch_neutral',
              text: 'B. Reação ao Toque na Área Não Dolorosa',
              type: QuestionType.Radio,
              options: [
                { score: 0, text: 'Calmo e relaxado, permite toque.' },
                { score: 1, text: 'Quieto, um pouco indiferente mas aceita toque.' },
                { score: 2, text: 'Nervoso ou ansioso, mas não reage ao toque.' },
                { score: 3, text: 'Recua ou mostra tensão ao ser tocado.' },
                { score: 4, text: 'Reage de forma defensiva/medrosa ao ser abordado.' },
              ],
            },
            {
              id: 'glasgow_palpation',
              text: 'C. Reação à Palpação da Área Dolorosa',
              type: QuestionType.Radio,
              options: [
                { score: 0, text: 'Não reage ao toque.' },
                { score: 1, text: 'Olha ao redor para a área palpada.' },
                { score: 2, text: 'Estremece, contrai a musculatura ou geme.' },
                { score: 3, text: 'Rosna ou protege a área.' },
                { score: 4, text: 'Tenta morder ou chora.' },
                { score: 5, text: 'Reage agressivamente antes mesmo do toque.' },
              ],
            },
            {
              id: 'glasgow_demeanor',
              text: 'D. Comportamento e Postura Geral',
              type: QuestionType.Radio,
              options: [
                { score: 0, text: 'Feliz, contente, relaxado.' },
                { score: 1, text: 'Quieto, mas se acalma.' },
                { score: 2, text: 'Indiferente, não responsivo, postura tensa.' },
                { score: 3, text: 'Deprimido ou ansioso, postura curvada/rígida.' },
                { score: 4, text: 'Rola, se debate ou fica rígido de dor.' },
                { score: 5, text: 'Não se move ou precisa de assistência.' },
              ],
            },
          ],
          interpretation: (answers) => {
            const scores = Object.values(answers).filter(v => typeof v === 'number') as number[];
            const totalScore = scores.reduce((sum, val) => sum + val, 0);
            const maxScore = 18; // 4 + 4 + 5 + 5
            const threshold = 5;
            const needsIntervention = totalScore >= threshold;
            return {
              score: `${totalScore} / ${maxScore}`,
              analysis: `Uma pontuação de ≥${threshold}/${maxScore} é o nível recomendado que indica a necessidade de reavaliar o plano analgésico e considerar uma intervenção.`,
              needsIntervention: needsIntervention,
            };
          },
        },
        {
          id: 'csu-cap',
          name: 'Escala de Dor Aguda da Universidade do Colorado (CSU-CAP)',
          recommended: false,
          description: 'Ferramenta visual amplamente utilizada para avaliação e treinamento no reconhecimento da dor aguda. Utiliza imagens e descrições para uma avaliação holística.',
          details: {
            origin: "Criada na Colorado State University College of Veterinary Medicine & Biomedical Sciences, por Peter W. Hellyer et al.",
            indications: "Avaliação holística da dor aguda em cães. Muito útil para treinamento de equipes e para uma avaliação rápida e visual do paciente.",
            studies: "Validada para uso clínico, com boa correlação com outras escalas de dor. Sua natureza pictórica foi projetada para melhorar a consistência da pontuação.",
            quality: "Sua força reside na combinação de descrições comportamentais com ilustrações claras, o que facilita uma avaliação mais intuitiva. No entanto, pode ser menos granular que escalas baseadas em múltiplos itens."
          },
          questions: [
            {
              id: 'holistic_score',
              text: 'Compare suas observações com a imagem e descrições abaixo e atribua o escore que melhor representa o estado do animal.',
              type: QuestionType.Custom,
              compositeImageUrl: 'https://res.cloudinary.com/dwta1roq1/image/upload/escala-dor-colorado/caes',
              options: [
                { score: 0, text: 'Feliz, contente, confortável. Não se incomoda com a ferida e interage normalmente. Sem tensão corporal.' },
                { score: 1, text: 'Quieto, um pouco subjugado ou inquieto, mas se distrai facilmente. Pode olhar para a ferida, estremecer ou choramingar com a palpação. Tensão corporal leve.' },
                { score: 2, text: 'Desconfortável, ansioso, relutante em interagir. Protege a área dolorosa e reage mais intensamente à palpação (geme, chora). Tensão corporal moderada.' },
                { score: 3, text: 'Relutante em se mover, pode gemer ou chorar sem estímulo. Postura anormal (curvado, rígido). Reação à palpação pode ser dramática (grito, rosnado).' },
                { score: 4, text: 'Constantemente gemendo ou gritando. Pode estar prostrado e não responsivo, ou muito agitado e agressivo. A dor é o foco central do animal.' }
              ]
            }
          ],
          interpretation: (answers) => {
            const score = (answers['holistic_score'] as number) ?? 0;
            const needsIntervention = score >= 2;
            return {
              score: `${score} / 4`,
              analysis: 'Um escore ≥ 2 indica que o paciente está sentindo dor e o plano analgésico deve ser reavaliado imediatamente.',
              needsIntervention,
            };
          }
        },
        { id: 'umps', name: 'Escala de Dor da Universidade de Melbourne (UMPS)', recommended: false, description: 'Atenção: Esta escala inclui parâmetros fisiológicos (ex: frequência cardíaca) que podem ser alterados por medo e estresse, não apenas pela dor. Interprete os resultados com cautela.', questions: [], interpretation: () => ({score: 'N/A', analysis: 'Esta escala é fornecida a título informativo e de referência histórica.', needsIntervention: false}),
          details: {
            origin: "Desenvolvida na Universidade de Melbourne por Firth AM & Haldane SL (1999).",
            indications: "Uso histórico para avaliação de dor aguda. Atualmente menos recomendada para decisões clínicas primárias.",
            studies: "Uma das primeiras escalas multidimensionais. Estudos subsequentes mostraram que seus componentes fisiológicos (frequência cardíaca, etc.) são pouco específicos para dor, podendo ser alterados por estresse, medo ou outros fatores.",
            quality: "Embora tenha sido importante para o desenvolvimento da algologia veterinária, sua dependência de sinais fisiológicos é uma limitação significativa. Escalas mais modernas, focadas em comportamento, são preferidas."
          }
        },
      ],
    },
    chronic: {
      scales: [
        {
          id: 'cbpi',
          name: 'Inventário Breve de Dor Canina (CBPI)',
          recommended: true,
          description: 'Versão validada para o português do Brasil. Ferramenta padrão para o tutor avaliar a dor crônica e seu impacto na qualidade de vida.',
          details: {
            origin: "Desenvolvida na Universidade da Pensilvânia por Brown DC, Boston RC, Coyne JC, & Farrar JT (2007).",
            indications: "Avaliação da dor crônica (especialmente osteoartrite) por tutores. Excelente para monitorar o impacto da dor na qualidade de vida e a resposta a tratamentos de longo prazo.",
            studies: "Validada em diversos idiomas, incluindo o português do Brasil. Demonstrou ser uma ferramenta confiável e válida para medir a severidade da dor (PSS) e a interferência da dor nas atividades (PIS).",
            quality: "É o padrão para ensaios clínicos que avaliam analgésicos para dor crônica. Empodera o tutor, que conhece melhor o comportamento normal do seu animal, a participar ativamente do manejo da dor."
          },
          questions: [
            { id: 'pain_worst', text: 'Pior dor do cão nos últimos 7 dias', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Sem dor', labelMax: 'Dor extrema', category: 'Severidade da Dor (PSS)' },
            { id: 'pain_least', text: 'Menor dor do cão nos últimos 7 dias', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Sem dor', labelMax: 'Dor extrema', category: 'Severidade da Dor (PSS)' },
            { id: 'pain_avg', text: 'Dor média do cão nos últimos 7 dias', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Sem dor', labelMax: 'Dor extrema', category: 'Severidade da Dor (PSS)' },
            { id: 'pain_now', text: 'Dor do cão neste momento', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Sem dor', labelMax: 'Dor extrema', category: 'Severidade da Dor (PSS)' },
            { id: 'interference_activity', text: 'Atividade Geral', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Não interfere', labelMax: 'Interfere completamente', category: 'Interferência da Dor (PIS)' },
            { id: 'interference_life', text: 'Aproveitamento da Vida', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Não interfere', labelMax: 'Interfere completamente', category: 'Interferência da Dor (PIS)' },
            { id: 'interference_rise', text: 'Capacidade de se Levantar', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Não interfere', labelMax: 'Interfere completamente', category: 'Interferência da Dor (PIS)' },
            { id: 'interference_walk', text: 'Capacidade de Andar', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Não interfere', labelMax: 'Interfere completamente', category: 'Interferência da Dor (PIS)' },
            { id: 'interference_run', text: 'Capacidade de Correr', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Não interfere', labelMax: 'Interfere completamente', category: 'Interferência da Dor (PIS)' },
            { id: 'interference_stairs', text: 'Capacidade de Subir Escadas', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Não interfere', labelMax: 'Interfere completamente', category: 'Interferência da Dor (PIS)' },
          ],
          interpretation: (answers) => {
            const intensityScores = [answers['pain_worst'], answers['pain_least'], answers['pain_avg'], answers['pain_now']].map(Number);
            const interferenceScores = [answers['interference_activity'], answers['interference_life'], answers['interference_rise'], answers['interference_walk'], answers['interference_run'], answers['interference_stairs']].map(Number);
            const pss = intensityScores.reduce((a, b) => a + b, 0) / intensityScores.length;
            const pis = interferenceScores.reduce((a, b) => a + b, 0) / interferenceScores.length;
            const needsIntervention = pss >= 3 || pis >= 3;
            return {
              score: `Severidade (PSS): ${pss.toFixed(1)} | Interferência (PIS): ${pis.toFixed(1)}`,
              analysis: 'Um escore ≥ 3 (para PSS ou PIS) pode discriminar cães com dor crônica. Uma mudança de ≥1 ponto no PSS e ≥2 pontos no PIS é considerada clinicamente significativa e indica resposta ao tratamento.',
              needsIntervention,
            };
          },
        },
        { 
          id: 'hcpi', 
          name: 'Índice de Dor Crônica de Helsinki (HCPI)', 
          recommended: false, 
          description: 'Questionário validado que foca na disposição, humor e comportamento do cão, capturando dimensões emocionais da dor crônica.',
          details: {
            origin: "Desenvolvida na Universidade de Helsinki por Hielm-Björkman AK, et al. (2009).",
            indications: "Avaliação da dor crônica por tutores, com foco particular em mudanças de humor e comportamento.",
            studies: "Validada para uso em cães com osteoartrite. Mostra boa correlação com a avaliação veterinária.",
            quality: "Complementa outras escalas ao focar nos aspectos mais sutis e emocionais da dor crônica, como relutância em brincar ou mudanças na interação social. É uma ferramenta útil para uma visão holística da qualidade de vida."
          },
          questions: [
            { id: 'hcpi_mood', text: 'Humor / Energia geral', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal/Animado', labelMax: 'Apático/Deprimido' },
            { id: 'hcpi_play', text: 'Disposição para brincar', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Muito disposto', labelMax: 'Não brinca' },
            { id: 'hcpi_walk', text: 'Disposição para passear', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Muito disposto', labelMax: 'Recusa-se' },
            { id: 'hcpi_move_rest', text: 'Movimentação após descanso/repouso', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Muita dificuldade/rigidez' },
            { id: 'hcpi_lameness', text: 'Claudicação (mancar) ao se mover', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma', labelMax: 'Severa/Não usa o membro' },
            { id: 'hcpi_pacing', text: 'Inquietação / Andar sem rumo', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nunca', labelMax: 'Constantemente' },
            { id: 'hcpi_licking', text: 'Lamber/Morder a(s) área(s) dolorida(s)', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nunca', labelMax: 'Constantemente' },
            { id: 'hcpi_vocalization', text: 'Vocalização de dor (gemer, chorar)', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nunca', labelMax: 'Constantemente' },
            { id: 'hcpi_appetite', text: 'Apetite', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Recusa-se a comer' },
            { id: 'hcpi_stiffness', text: 'Rigidez ao se mover', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma', labelMax: 'Muito rígido' },
            { id: 'hcpi_pain_overall', text: 'Na sua opinião, qual o nível de dor geral do cão?', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma dor', labelMax: 'Dor insuportável' },
          ],
          interpretation: (answers) => {
            const scores = Object.values(answers).map(Number);
            const totalScore = scores.reduce((a, b) => a + b, 0);
            const needsIntervention = totalScore > 10;
            return {
              score: `Escore Total: ${totalScore} / 44`,
              analysis: 'Escores mais altos indicam maior dor e impacto na qualidade de vida. Um escore > 10 é sugestivo de dor crônica que requer manejo. Mudanças no escore ao longo do tempo indicam a eficácia do tratamento.',
              needsIntervention,
            };
          },
        },
        { 
          id: 'load', 
          name: 'Questionário Liverpool Osteoarthritis in Dogs (LOAD)', 
          recommended: false, 
          description: 'Ferramenta específica para osteoartrite canina. Fornece faixas de severidade para avaliar a disfunção de mobilidade.',
          details: {
            origin: "Desenvolvida na Universidade de Liverpool por Hercock C, et al. (2009).",
            indications: "Ferramenta específica para quantificar a disfunção de mobilidade associada à osteoartrite em cães, preenchida pelo tutor.",
            studies: "Validada como uma medida de resultados clínicos para osteoartrite canina. É sensível a mudanças após o tratamento.",
            quality: "Excelente para seu propósito específico (osteoartrite), fornecendo um escore numérico que é fácil de acompanhar ao longo do tempo. Sua especificidade é tanto uma força quanto uma limitação, pois não avalia outras fontes de dor crônica."
          },
          questions: [
            { id: 'load_stiffness_general', text: 'Rigidez geral', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Severamente rígido' },
            { id: 'load_stiffness_sleep', text: 'Rigidez ao acordar', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Severamente rígido' },
            { id: 'load_lameness_after_walk', text: 'Claudicação após caminhada leve', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma', labelMax: 'Claudicação severa' },
            { id: 'load_lameness_after_exercise', text: 'Claudicação após exercício intenso', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma', labelMax: 'Claudicação severa' },
            { id: 'load_lameness_start_walk', text: 'Claudicação no início da caminhada', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma', labelMax: 'Claudicação severa' },
            { id: 'load_lameness_end_walk', text: 'Claudicação no final da caminhada', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma', labelMax: 'Claudicação severa' },
            { id: 'load_lameness_walking', text: 'Claudicação ao caminhar', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma', labelMax: 'Claudicação severa' },
            { id: 'load_lameness_trotting', text: 'Claudicação ao trotar', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma', labelMax: 'Claudicação severa' },
            { id: 'load_lameness_running', text: 'Claudicação ao correr', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhuma', labelMax: 'Claudicação severa' },
            { id: 'load_exercise_ability', text: 'Capacidade de se exercitar', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Muito reduzida' },
            { id: 'load_jumping', text: 'Capacidade de pular', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Incapaz de pular' },
            { id: 'load_weather', text: 'Efeito do tempo frio/úmido', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Nenhum', labelMax: 'Muito pior' },
            { id: 'load_qol', text: 'Qualidade de vida geral', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Excelente', labelMax: 'Muito pobre' },
          ],
          interpretation: (answers) => {
            const scores = Object.values(answers).map(Number);
            const totalScore = scores.reduce((a, b) => a + b, 0);
            let severity = '';
            if (totalScore === 0) severity = 'Normal';
            else if (totalScore <= 10) severity = 'Leve';
            else if (totalScore <= 20) severity = 'Moderada';
            else if (totalScore <= 30) severity = 'Severa';
            else severity = 'Extrema';

            const needsIntervention = totalScore > 10;
            return {
              score: `Escore Total: ${totalScore} / 52 (${severity})`,
              analysis: `O escore classifica a disfunção como Leve (1-10), Moderada (11-20), Severa (21-30) ou Extrema (>30). Um escore > 10 geralmente indica dor que necessita de manejo clínico. Acompanhe a evolução do escore para avaliar a resposta ao tratamento.`,
              needsIntervention,
            };
          },
        },
      ],
    },
  },
  cat: {
    acute: {
      scales: [
        {
          id: 'ucaps',
          name: 'Escala UNESP-Botucatu (Forma Curta - UCAPS)',
          recommended: true,
          description: 'Desenvolvida no Brasil e validada internacionalmente, esta é a ferramenta de eleição para avaliação de dor aguda em gatos due à sua praticidade e ponto de corte claro.',
          compositeImageUrl: 'https://res.cloudinary.com/dwta1roq1/image/upload/ESCALA-DOR-UNESP/GATOS',
          details: {
            origin: "Desenvolvida na UNESP-Botucatu, Brasil, por Brondani JT, Luna SPL, et al. (2011, 2013).",
            indications: "Avaliação de dor aguda pós-operatória em gatos. É a ferramenta de escolha em muitas clínicas pela sua simplicidade e ponto de corte claro.",
            studies: "Rigorosamente validada, demonstrou alta acurácia (sensibilidade >80%, especificidade >90%) para diferenciar gatos com dor dos sem dor. Seu ponto de corte para intervenção analgésica é bem estabelecido.",
            quality: "Sua principal vantagem é a rapidez e facilidade de uso, sem perder a robustez científica. Por ser desenvolvida e validada no Brasil, está perfeitamente adaptada à nossa realidade clínica.",
            accuracy: "Acurácia de 93,6%, com sensibilidade de 83,3% e especificidade de 95,8% para o ponto de corte ≥4."
          },
          questions: [
            { id: 'posture', text: '1. Postura do Gato', type: QuestionType.Radio, options: [
              { score: 0, text: 'Normal, relaxado, dormindo confortavelmente.'},
              { score: 1, text: 'Tenso, mas responde a estímulos. Postura encolhida.'},
              { score: 2, text: 'Curvado, abdômen contraído, cabeça baixa, relutante em se mover.'},
            ]},
            { id: 'activity', text: '2. Comportamentos Exibidos', type: QuestionType.Radio, options: [
              { score: 0, text: 'Move-se normalmente, explora o ambiente.'},
              { score: 1, text: 'Quieto, mas move-se quando estimulado.'},
              { score: 2, text: 'Relutante em se mover, permanece em um local.'},
              { score: 3, text: 'Não se move, rígido, protege áreas do corpo.'},
            ]},
            { id: 'attitude', text: '3. Atitude Após o Gato Estar Aberto', type: QuestionType.Radio, options: [
              { score: 0, text: 'Alerta, interativo, amigável ou ronronando.'},
              { score: 1, text: 'Quieto, indiferente, busca isolamento.'},
              { score: 2, text: 'Assustado, agressivo ao ser abordado, sibila.'},
              { score: 3, text: 'Deprimido, não responsivo, dissociado do ambiente.'},
            ]},
            { id: 'touch_response', text: '4. Reação à Palpação do Local Dolorido', type: QuestionType.Radio, options: [
              { score: 0, text: 'Ausente, permite toque sem reação adversa.'},
              { score: 1, text: 'Desconforto leve (contração da pele, vira a cabeça).'},
              { score: 2, text: 'Reação de retirada, vocalização leve (gemido).'},
              { score: 3, text: 'Reação agressiva (choro, sibilo, mordida).'},
            ]},
          ],
          interpretation: (answers) => {
            const scores = Object.values(answers).filter(v => typeof v === 'number') as number[];
            const totalScore = scores.reduce((sum, val) => sum + val, 0);
            const needsIntervention = totalScore >= 4;
            return {
              score: `${totalScore} / 11`,
              analysis: 'Um escore total de ≥4/11 indica a necessidade de intervenção analgésica.',
              needsIntervention: needsIntervention,
            };
          },
        },
        {
          id: 'fgs',
          name: 'Escala de Expressão Facial Felina (Feline Grimace Scale - FGS)',
          recommended: false,
          description: 'Avalia a dor através da análise de cinco unidades de ação facial: posição das orelhas, contração orbital, tensão do focinho, posição dos bigodes e posição da cabeça.',
          details: {
            origin: "Desenvolvida na Universidade de Montreal por Evangelista MC, Watanabe R, Leung VSY, et al. (2019).",
            indications: "Avaliação da dor aguda através da análise objetiva de cinco 'Unidades de Ação' faciais. Útil como ferramenta primária ou complementar.",
            studies: "Demonstrou alta precisão e repetibilidade. O escore da FGS tem forte correlação com escores de escalas multidimensionais como a CMPS-Feline. O treinamento para seu uso é rápido e eficaz.",
            quality: "Sua força é a objetividade, focando apenas em mudanças faciais mensuráveis e minimizando a interpretação do comportamento geral, que pode ser influenciado pelo estresse do ambiente hospitalar.",
            accuracy: "Apresenta excelente acurácia diagnóstica, com estudos mostrando áreas sob a curva ROC (AUC) superiores a 0.95."
          },
          questions: [
            { id: 'ears', text: 'Posição das Orelhas', type: QuestionType.Custom, compositeImageUrl: 'https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/POSICAO-ORELHAS', options: [
                { score: 0, text: 'Orelhas para frente.' },
                { score: 1, text: 'Orelhas ligeiramente afastadas.' },
                { score: 2, text: 'Orelhas achatadas e viradas para fora.' },
            ]},
            { id: 'eyes', text: 'Contração Orbital (Olhos)', type: QuestionType.Custom, compositeImageUrl: 'https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/FECHAMENTO-ORBITAL', options: [
                { score: 0, text: 'Olhos abertos.' },
                { score: 1, text: 'Olhos parcialmente abertos/semicerrados.' },
                { score: 2, text: 'Olhos semicerrados/espremidos.' },
            ]},
            { id: 'muzzle', text: 'Tensão do Focinho', type: QuestionType.Custom, compositeImageUrl: 'https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/TENSAO-BIGODE', options: [
                { score: 0, text: 'Focinho relaxado (formato redondo).' },
                { score: 1, text: 'Focinho levemente tenso.' },
                { score: 2, text: 'Focinho tenso (formato elíptico).' },
            ]},
            { id: 'whiskers', text: 'Posição dos Bigodes', type: QuestionType.Custom, compositeImageUrl: 'https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/MUDANCA-BIGODE', options: [
                { score: 0, text: 'Bigodes soltos e curvados.' },
                { score: 1, text: 'Bigodes ligeiramente curvados ou retos.' },
                { score: 2, text: 'Bigodes retos e movendo-se para frente.' },
            ]},
            { id: 'head', text: 'Posição da Cabeça', type: QuestionType.Custom, compositeImageUrl: 'https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/POSICAO-CABECA', options: [
                { score: 0, text: 'Cabeça acima da linha dos ombros.' },
                { score: 1, text: 'Cabeça alinhada com a linha dos ombros.' },
                { score: 2, text: 'Cabeça abaixo da linha dos ombros ou inclinada.' },
            ]},
          ],
          interpretation: (answers) => {
            const scores = Object.values(answers).filter(v => typeof v === 'number') as number[];
            const totalScore = scores.reduce((sum, val) => sum + val, 0);
            const needsIntervention = totalScore >= 4;
            return {
              score: `${totalScore} / 10`,
              analysis: 'Uma pontuação total de ≥4/10 sugere que o resgate analgésico deve ser considerado.',
              needsIntervention: needsIntervention,
            };
          },
        },
        {
          id: 'csu-faps',
          name: 'Escala de Dor Aguda da Universidade do Colorado para Gatos (CSU-FAPS)',
          recommended: false,
          description: 'Escala visual e comportamental para avaliação de dor aguda pós-operatória em gatos, com base na observação e palpação.',
          details: {
            origin: "Desenvolvida na Colorado State University, por Shipley H, Guedes A, Graham L, et al. (2019/2021).",
            indications: "Avaliação da dor aguda em gatos, especialmente no período pós-operatório. Projetada para ser rápida e prática.",
            studies: "A escala foi desenvolvida para fornecer uma ferramenta de avaliação de dor validada e fácil de usar para felinos na prática clínica.",
            quality: "Sua força está na simplicidade e na combinação de observação à distância com a interação e palpação, fornecendo um escore holístico do estado do paciente."
          },
          questions: [
            {
              id: 'holistic_score_feline',
              text: 'Compare suas observações com a imagem e descrições abaixo e atribua o escore que melhor representa o estado do gato.',
              type: QuestionType.Custom,
              compositeImageUrl: 'https://res.cloudinary.com/dwta1roq1/image/upload/escala-dor-colorado/gatos-2',
              options: [
                { score: 0, text: 'Sem Dor: Contente, quieto, mas interessado no ambiente. Pode estar cochilando, mas é facilmente acordado. Postura relaxada e confortável. Nenhuma reação adversa à palpação.' },
                { score: 1, text: 'Dor Leve: Retraído, menos interessado no ambiente. Postura levemente encolhida, mas ainda se move. Pode se afastar ou demonstrar leve desconforto à palpação da área dolorosa.' },
                { score: 2, text: 'Dor Moderada: Perda de apetite, vocalização (miados baixos), expressão facial tensa com olhos semifechados. Postura arqueada ("em bolinha") com pelos arrepiados. Responde agressivamente à palpação (rosnados, sibilos).' },
                { score: 3, text: 'Dor Severa: Vocalização constante e alta (gritos). Muito agitado ou prostrado. Postura muito tensa, abdômen contraído. Não permite aproximação, reage violentamente.' },
                { score: 4, text: 'Dor Excruciante: Em estado de choque ou prostrado, inconsciente do ambiente. Posturas bizarras, incapaz de se mover. Nenhuma reação por prostração ou reações violentas.' },
              ]
            }
          ],
          interpretation: (answers) => {
            const score = (answers['holistic_score_feline'] as number) ?? 0;
            const needsIntervention = score >= 2;
            return {
              score: `${score} / 4`,
              analysis: 'Um escore ≥ 2 indica que o paciente está sentindo dor e a analgesia de resgate deve ser instituída imediatamente.',
              needsIntervention,
            };
          }
        }
      ],
    },
    chronic: {
      scales: [
        {
          id: 'fmpi',
          name: 'Índice de Dor Musculoesquelética Felina (FMPI)',
          recommended: true,
          description: 'Padrão-ouro para o monitoramento da dor crônica musculoesquelética em gatos. Ideal para avaliar a resposta ao tratamento ao longo do tempo.',
          details: {
            origin: "Desenvolvida na North Carolina State University por Lascelles BDX, et al. (2007).",
            indications: "Padrão-ouro para o monitoramento da dor crônica associada a doenças musculoesqueléticas (ex: doença articular degenerativa) em gatos, preenchida pelo tutor.",
            studies: "Validada como uma ferramenta de medição de resultados clínicos. É sensível para detectar melhora clínica após o início de terapia analgésica.",
            quality: "Capta o impacto funcional da dor na vida do gato, avaliando atividades que são difíceis de observar no ambiente clínico (como pular). É a ferramenta mais recomendada para acompanhamento longitudinal da dor crônica em felinos."
          },
          questions: [
            { id: 'jump_up', text: 'Pular para cima (ex: para uma cadeira, sofá)', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Não consegue' },
            { id: 'jump_down', text: 'Pular para baixo', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Não consegue' },
            { id: 'run', text: 'Correr', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Não consegue' },
            { id: 'stairs_up', text: 'Subir escadas', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Não consegue' },
            { id: 'stairs_down', text: 'Descer escadas', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Não consegue' },
            { id: 'play', text: 'Brincar com brinquedos ou outros animais', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Não brinca' },
            { id: 'grooming', text: 'Higienizar-se (grooming)', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Reduzido/Ausente' },
            { id: 'temperament', text: 'Humor/Temperamento geral', type: QuestionType.Slider, min: 0, max: 4, step: 1, labelMin: 'Normal', labelMax: 'Irritadiço/Recluso' },
          ],
          interpretation: (answers) => {
             const scores = Object.values(answers).filter(v => typeof v === 'number') as number[];
            const totalScore = scores.reduce((sum, val) => sum + val, 0);
            return {
              score: `Escore Total: ${totalScore}`,
              analysis: 'Escores mais altos indicam maior comprometimento e dor. Esta ferramenta é ideal para monitorar a resposta ao tratamento ao longo do tempo. Compare os escores atuais com os anteriores para avaliar a eficácia.',
              needsIntervention: totalScore > 10, // Example heuristic
            };
          },
        },
        {
          id: 'csom',
          name: 'Medidas de Resultado Específicas do Cliente (CSOM)',
          recommended: true,
          description: 'Ferramenta personalizada para o tutor identificar e monitorar as atividades diárias mais afetadas pela dor crônica do gato.',
          details: {
            origin: "Adaptado para uso veterinário por múltiplos pesquisadores, incluindo Lascelles BDX. A metodologia foca naquilo que é mais importante para o paciente individual e seu tutor.",
            indications: "Monitoramento longitudinal da dor crônica e seu impacto na qualidade de vida. Ideal para avaliar a resposta a terapias de longo prazo de forma individualizada.",
            studies: "Demonstrado ser uma ferramenta válida e responsiva para medir resultados clínicos em cães e gatos com dor crônica, especialmente osteoartrite.",
            quality: "Sua maior força é a relevância para o paciente. Em vez de usar uma lista genérica, o CSOM foca nas atividades que o tutor percebe como problemáticas, aumentando o engajamento e a sensibilidade para detectar mudanças clinicamente importantes."
          },
          questions: [
            { id: 'activity_1_name', text: '1. Descreva a primeira atividade que seu gato tem dificuldade em realizar (ex: pular no sofá, se limpar):', type: QuestionType.Text },
            { id: 'activity_1_score', text: 'Avalie a capacidade atual do seu gato para esta Atividade 1:', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Impossível', labelMax: 'Normal' },
            { id: 'activity_2_name', text: '2. Descreva uma segunda atividade (opcional):', type: QuestionType.Text },
            { id: 'activity_2_score', text: 'Avalie a capacidade atual para a Atividade 2:', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Impossível', labelMax: 'Normal' },
            { id: 'activity_3_name', text: '3. Descreva uma terceira atividade (opcional):', type: QuestionType.Text },
            { id: 'activity_3_score', text: 'Avalie a capacidade atual para a Atividade 3:', type: QuestionType.Slider, min: 0, max: 10, step: 1, labelMin: 'Impossível', labelMax: 'Normal' },
          ],
          interpretation: (answers) => {
            const scores = [];
            if (answers['activity_1_name'] && String(answers['activity_1_name']).trim() !== '' && answers['activity_1_score'] !== undefined) {
                scores.push(Number(answers['activity_1_score']));
            }
            if (answers['activity_2_name'] && String(answers['activity_2_name']).trim() !== '' && answers['activity_2_score'] !== undefined) {
                scores.push(Number(answers['activity_2_score']));
            }
            if (answers['activity_3_name'] && String(answers['activity_3_name']).trim() !== '' && answers['activity_3_score'] !== undefined) {
                scores.push(Number(answers['activity_3_score']));
            }
            
            if (scores.length === 0) {
                return {
                    score: 'N/A',
                    analysis: 'Pelo menos uma atividade precisa ser definida e avaliada.',
                    needsIntervention: false,
                };
            }
    
            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            
            return {
              score: `Capacidade Média: ${avgScore.toFixed(1)} / 10`,
              analysis: 'Esta é a sua linha de base. O objetivo é ver o escore de capacidade aumentar com o tratamento (se aproximar de 10). Reavalie periodicamente para monitorar o progresso.',
              needsIntervention: avgScore < 7, // Heurística: se a capacidade média for menor que 7/10, a intervenção é recomendada.
            };
          },
        }
      ],
    },
  },
};


export const DRUG_DATA: Drug[] = [
  // AINEs
  {
    id: 'carprofen_dog',
    name: 'Carprofeno',
    species: [Species.Dog],
    doseRange: { min: 2.2, max: 4.4, default: 4.4, unit: 'mg/kg' },
    presentations: [
      { id: 'carpro_25', name: 'Comprimido 25 mg', concentration: { value: 25, unit: 'mg/tablet' } },
      { id: 'carpro_50', name: 'Comprimido 50 mg', concentration: { value: 50, unit: 'mg/tablet' } },
      { id: 'carpro_75', name: 'Comprimido 75 mg', concentration: { value: 75, unit: 'mg/tablet' } },
      { id: 'carpro_100', name: 'Comprimido 100 mg', concentration: { value: 100, unit: 'mg/tablet' } },
      { id: 'carpro_inj', name: 'Injetável 5% (50 mg/ml)', concentration: { value: 50, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Administrar com alimento. A dose de 4.4 mg/kg pode ser SID ou dividida em 2.2 mg/kg BID.',
    adjustmentFactors: {
      senior: 'Iniciar com a menor dose (2.2 mg/kg) e monitorar função renal/hepática.',
      puppy_kitten: 'Seguro em cães > 6 semanas.',
      pregnant_lactating: 'Contraindicado.',
      liver: 'Contraindicado em hepatopatia grave. Usar com extrema cautela em doença leve a moderada.',
      kidney: 'Contraindicado em doença renal. Pode agravar a condição.',
      heart: 'Cautela em ICC, pode causar retenção de sódio/água.',
      gastro: 'Contraindicado com úlceras ou sangramento gastrointestinal ativo.',
    },
  },
  {
    id: 'meloxicam_dog',
    name: 'Meloxicam (Cão)',
    species: [Species.Dog],
    doseRange: { min: 0.1, max: 0.2, default: 0.2, unit: 'mg/kg' },
    presentations: [
        { id: 'melo_dog_oral_0_5', name: 'Suspensão Oral 0.05% (0.5 mg/ml)', concentration: { value: 0.5, unit: 'mg/ml' } },
        { id: 'melo_dog_oral_1_5', name: 'Suspensão Oral 0.15% (1.5 mg/ml)', concentration: { value: 1.5, unit: 'mg/ml' } },
        { id: 'melo_dog_comp_1', name: 'Comprimido 1 mg', concentration: { value: 1, unit: 'mg/tablet' } },
        { id: 'melo_dog_comp_2_5', name: 'Comprimido 2.5 mg', concentration: { value: 2.5, unit: 'mg/tablet' } },
        { id: 'melo_dog_comp_4', name: 'Comprimido 4 mg', concentration: { value: 4, unit: 'mg/tablet' } },
        { id: 'melo_dog_inj', name: 'Injetável 0.5% (5 mg/ml)', concentration: { value: 5, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Dose de ataque de 0.2 mg/kg no primeiro dia, seguida por 0.1 mg/kg/dia para manutenção. Administrar com alimento.',
    adjustmentFactors: {
        senior: 'Usar a dose de manutenção (0.1 mg/kg) com cautela. Monitoramento renal e hepático é crucial.',
        puppy_kitten: 'Não recomendado para cães com menos de 6 meses de idade.',
        pregnant_lactating: 'Contraindicado.',
        liver: 'Metabolização hepática. Usar com extrema cautela em hepatopatas.',
        kidney: 'Contraindicado em doença renal.',
        heart: 'Cautela na insuficiência cardíaca congestiva.',
        gastro: 'Contraindicado com gastrite ou úlcera ativa.',
    }
  },
  {
    id: 'meloxicam_cat',
    name: 'Meloxicam (Gato)',
    species: [Species.Cat],
    doseRange: { min: 0.05, max: 0.2, default: 0.1, unit: 'mg/kg' },
    presentations: [
        { id: 'melo_cat_oral', name: 'Suspensão Oral 0.05% (0.5 mg/ml)', concentration: { value: 0.5, unit: 'mg/ml' } },
        { id: 'melo_cat_inj_0_2', name: 'Injetável 0.2% (2 mg/ml)', concentration: { value: 2, unit: 'mg/ml' } },
        { id: 'melo_cat_inj_0_5', name: 'Injetável 0.5% (5 mg/ml)', concentration: { value: 5, unit: 'mg/ml' } },
    ],
    administrationNotes: 'USO RESTRITO E COM CAUTELA EM GATOS. Aprovado para dose única injetável (0.2-0.3 mg/kg) pré-operatória. O uso oral crônico é controverso e deve ser feito com doses muito baixas e monitoramento rigoroso. Administrar com alimento.',
    adjustmentFactors: {
        senior: 'Extrema cautela. A doença renal crônica é comum e pode não ser aparente. Triagem sanguínea é mandatória.',
        puppy_kitten: 'Não recomendado para gatos com menos de 4 meses ou menos de 2kg.',
        pregnant_lactating: 'Contraindicado.',
        liver: 'Contraindicado ou usar com extrema cautela.',
        kidney: 'Contraindicado. Gatos são extremamente sensíveis à nefrotoxicidade dos AINEs.',
        heart: 'Contraindicado em cardiomiopatia descompensada.',
        gastro: 'Alto risco de gastrite e úlceras.',
    }
  },
  {
    id: 'robenacoxib',
    name: 'Robenacoxib (Onsior®)',
    species: [Species.Dog, Species.Cat],
    doseRange: { min: 1, max: 2.4, default: 2, unit: 'mg/kg' },
    presentations: [
      { id: 'onsior_comp_6_cat', name: 'Comprimido 6 mg (Gato)', concentration: { value: 6, unit: 'mg/tablet' } },
      { id: 'onsior_comp_5_dog', name: 'Comprimido 5 mg (Cão)', concentration: { value: 5, unit: 'mg/tablet' } },
      { id: 'onsior_comp_10_dog', name: 'Comprimido 10 mg (Cão)', concentration: { value: 10, unit: 'mg/tablet' } },
      { id: 'onsior_comp_20_dog', name: 'Comprimido 20 mg (Cão)', concentration: { value: 20, unit: 'mg/tablet' } },
      { id: 'onsior_comp_40_dog', name: 'Comprimido 40 mg (Cão)', concentration: { value: 40, unit: 'mg/tablet' } },
      { id: 'onsior_inj', name: 'Injetável 2% (20 mg/ml)', concentration: { value: 20, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Administrar em jejum ou com uma pequena quantidade de alimento. Dose cães: 1-2mg/kg. Dose gatos: 1-2.4mg/kg. Usar SID por no máximo 3 dias (inj) ou 6 dias (oral) em gatos.',
    adjustmentFactors: {
      senior: 'Usar com cautela, após avaliação da função renal/hepática.',
      puppy_kitten: 'Não usar em cães < 2.5kg ou < 3 meses. Não usar em gatos < 2.5kg ou < 4 meses.',
      pregnant_lactating: 'Contraindicado.',
      liver: 'Contraindicado em doença hepática.',
      kidney: 'Contraindicado em doença renal.',
      heart: 'Usar com cautela.',
      gastro: 'Contraindicado em animais com ulceração gastrointestinal.',
    },
  },
  {
    id: 'grapiprant_dog',
    name: 'Grapiprant (Galliprant®)',
    species: [Species.Dog],
    doseRange: { min: 2, max: 2, default: 2, unit: 'mg/kg' },
    presentations: [
      { id: 'galli_20', name: 'Comprimido 20 mg', concentration: { value: 20, unit: 'mg/tablet' } },
      { id: 'galli_60', name: 'Comprimido 60 mg', concentration: { value: 60, unit: 'mg/tablet' } },
      { id: 'galli_100', name: 'Comprimido 100 mg', concentration: { value: 100, unit: 'mg/tablet' } },
    ],
    administrationNotes: 'Dose de 2 mg/kg SID. Não é um inibidor da COX, atua no receptor EP4 da prostaglandina, o que confere um melhor perfil de segurança gastrointestinal e renal.',
    adjustmentFactors: {
      senior: 'Considerado mais seguro que AINEs tradicionais, mas monitorar.',
      puppy_kitten: 'Não usar em cães com menos de 8 meses ou 3.6kg.',
      pregnant_lactating: 'Contraindicado.',
      liver: 'Usar com cautela em hepatopatas. Pode causar diminuição da albumina/proteína total.',
      kidney: 'Perfil de segurança renal superior aos AINEs tradicionais, mas usar com cautela.',
      heart: 'Usar com cautela em cardiopatas, especialmente os que usam inibidores da ECA.',
      gastro: 'Mais seguro que AINEs tradicionais, mas vômito e diarreia ainda são possíveis.',
    },
  },
  // Opioides
  {
    id: 'buprenorfina_cat',
    name: 'Buprenorfina (Gato)',
    species: [Species.Cat],
    doseRange: { min: 0.02, max: 0.04, default: 0.03, unit: 'mg/kg' },
    presentations: [
      { id: 'bupre_inj_03', name: 'Injetável 0.3 mg/ml', concentration: { value: 0.3, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Altamente eficaz pela via transmucosa oral (TMO) em gatos. Aplicar o volume na gengiva/bochecha. Não precisa engolir. Também pode ser IV, IM, SC.',
    adjustmentFactors: {
      senior: 'Geralmente seguro, monitorar sedação.',
      puppy_kitten: 'Uso seguro.',
      pregnant_lactating: 'Usar com cautela.',
      liver: 'Metabolismo hepático. Usar com cautela e em doses menores em hepatopatas graves.',
      kidney: 'Seguro em doença renal.',
      heart: 'Geralmente seguro. Pode causar bradicardia leve.',
      gastro: 'Geralmente seguro. Pode causar constipação.',
    },
  },
  {
    id: 'buprenorfina_dog',
    name: 'Buprenorfina (Cão)',
    species: [Species.Dog],
    doseRange: { min: 0.01, max: 0.02, default: 0.02, unit: 'mg/kg' },
    presentations: [
      { id: 'bupre_inj_03_dog', name: 'Injetável 0.3 mg/ml', concentration: { value: 0.3, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Para dor leve a moderada. Duração de ação mais longa que outros opioides. Administrar IV, IM, SC. A via TMO é menos eficaz em cães.',
    adjustmentFactors: {
        senior: 'Geralmente seguro, monitorar sedação.',
        puppy_kitten: 'Uso seguro.',
        pregnant_lactating: 'Usar com cautela.',
        liver: 'Metabolismo hepático. Usar com cautela em hepatopatas.',
        kidney: 'Seguro em doença renal.',
        heart: 'Geralmente seguro.',
        gastro: 'Geralmente seguro.',
    },
  },
   {
    id: 'metadona',
    name: 'Metadona',
    species: [Species.Dog, Species.Cat],
    doseRange: { min: 0.2, max: 0.5, default: 0.3, unit: 'mg/kg' },
    presentations: [
      { id: 'meta_inj_10', name: 'Injetável 10 mg/ml', concentration: { value: 10, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Opioide agonista puro, excelente para dor moderada a severa. Menor probabilidade de causar vômito que a morfina. Também tem ação antagonista NMDA. Administrar IV, IM, SC a cada 4-6h.',
    adjustmentFactors: {
        senior: 'Usar com cautela, pode causar sedação e bradicardia mais pronunciadas.',
        puppy_kitten: 'Uso seguro, monitorar de perto.',
        pregnant_lactating: 'Usar com cautela.',
        liver: 'Metabolizado pelo fígado, usar doses menores e/ou intervalos maiores.',
        kidney: 'Seguro para uso em doença renal.',
        heart: 'Causa bradicardia. Usar com cautela em pacientes com função cardíaca comprometida.',
        gastro: 'Pode causar constipação.',
    },
  },
  {
    id: 'hidromorfona',
    name: 'Hidromorfona',
    species: [Species.Dog, Species.Cat],
    doseRange: { min: 0.025, max: 0.1, default: 0.05, unit: 'mg/kg' },
    presentations: [
        { id: 'hidro_inj_2', name: 'Injetável 2 mg/ml', concentration: { value: 2, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Opioide agonista puro potente. Dose cães: 0.05-0.1 mg/kg. Dose gatos: 0.025-0.05 mg/kg. Administrar IV, IM, SC a cada 4-6h. Monitorar hipertermia em gatos.',
    adjustmentFactors: {
        senior: 'Usar doses mais baixas devido ao risco de sedação.',
        puppy_kitten: 'Uso seguro, monitorar.',
        pregnant_lactating: 'Usar com cautela.',
        liver: 'Metabolismo hepático, usar com cautela.',
        kidney: 'Seguro em doença renal.',
        heart: 'Causa bradicardia. Usar com cautela.',
        gastro: 'Pode causar constipação.',
    },
  },
  {
    id: 'morfina',
    name: 'Morfina',
    species: [Species.Dog],
    doseRange: { min: 0.2, max: 0.5, default: 0.3, unit: 'mg/kg' },
    presentations: [
      { id: 'morf_inj_10', name: 'Injetável 10 mg/ml', concentration: { value: 10, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Opioide agonista puro clássico. Administrar IM ou SC. A administração IV pode causar liberação de histamina e hipotensão. Causa vômito com frequência.',
    adjustmentFactors: {
        senior: 'Risco aumentado de sedação e depressão respiratória. Usar doses menores.',
        puppy_kitten: 'Usar com cautela.',
        pregnant_lactating: 'Usar com cautela.',
        liver: 'Metabolismo hepático, usar com cautela.',
        kidney: ' metabólitos ativos são excretados pelos rins. Usar com cautela em nefropatas.',
        heart: 'Pode causar bradicardia. Evitar IV.',
        gastro: 'Efeito emético forte. Pode causar constipação.',
    },
  },
  // Adjuvantes e Outros
  {
    id: 'gabapentin',
    name: 'Gabapentina',
    species: [Species.Dog, Species.Cat],
    doseRange: { min: 10, max: 30, default: 10, unit: 'mg/kg' },
    presentations: [
      { id: 'gaba_100', name: 'Cápsula 100 mg', concentration: { value: 100, unit: 'mg/tablet' } },
      { id: 'gaba_300', name: 'Cápsula 300 mg', concentration: { value: 300, unit: 'mg/tablet' } },
      { id: 'gaba_400', name: 'Cápsula 400 mg', concentration: { value: 400, unit: 'mg/tablet' } },
      { id: 'gaba_liquid', name: 'Solução Oral 50 mg/ml (Humana)', concentration: { value: 50, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Pode ser administrada BID ou TID. Cuidado com formulações líquidas humanas que contêm xilitol (tóxico para cães). Iniciar com a dose mais baixa e aumentar gradualmente. Efeito sedativo é comum no início.',
    adjustmentFactors: {
      senior: 'Iniciar com a menor dose e frequência. A depuração renal diminui com a idade.',
      puppy_kitten: 'Uso seguro, mas monitorar para sedação excessiva.',
      pregnant_lactating: 'Usar com cautela.',
      liver: 'Seguro, não é metabolizada pelo fígado.',
      kidney: 'A eliminação é quase exclusivamente renal. Reduzir a dose em 50% ou dobrar o intervalo em nefropatas.',
      heart: 'Geralmente seguro.',
      gastro: 'Geralmente seguro.',
    },
  },
  {
    id: 'pregabalina',
    name: 'Pregabalina',
    species: [Species.Dog, Species.Cat],
    doseRange: { min: 2, max: 4, default: 2, unit: 'mg/kg' },
    presentations: [
      { id: 'prega_25', name: 'Cápsula 25 mg', concentration: { value: 25, unit: 'mg/tablet' } },
      { id: 'prega_75', name: 'Cápsula 75 mg', concentration: { value: 75, unit: 'mg/tablet' } },
      { id: 'prega_150', name: 'Cápsula 150 mg', concentration: { value: 150, unit: 'mg/tablet' } },
    ],
    administrationNotes: 'Semelhante à gabapentina, mas mais potente e com dosagem BID. Usada para dor neuropática.',
    adjustmentFactors: {
      senior: 'Iniciar com a menor dose. Risco aumentado de sedação.',
      puppy_kitten: 'Usar com cautela.',
      pregnant_lactating: 'Usar com cautela.',
      liver: 'Seguro, sem metabolismo hepático.',
      kidney: 'Excreção renal. Reduzir a dose e/ou aumentar o intervalo em nefropatas.',
      heart: 'Geralmente seguro.',
      gastro: 'Geralmente seguro.',
    },
  },
  {
    id: 'trazodona',
    name: 'Trazodona',
    species: [Species.Dog, Species.Cat],
    doseRange: { min: 3, max: 10, default: 5, unit: 'mg/kg' },
    presentations: [
      { id: 'trazo_50', name: 'Comprimido 50 mg', concentration: { value: 50, unit: 'mg/tablet' } },
      { id: 'trazo_100', name: 'Comprimido 100 mg', concentration: { value: 100, unit: 'mg/tablet' } },
      { id: 'trazo_150', name: 'Comprimido 150 mg', concentration: { value: 150, unit: 'mg/tablet' } },
    ],
    administrationNotes: 'Antidepressivo usado como adjuvante para ansiedade e sedação leve. Pode ajudar no manejo de animais com dor e agitação. Dose cães: 3-7 mg/kg. Dose gatos: 5-10 mg/kg (~50mg/gato).',
    adjustmentFactors: {
      senior: 'Usar doses mais baixas.',
      puppy_kitten: 'Usar com cautela.',
      pregnant_lactating: 'Usar com cautela.',
      liver: 'Metabolismo hepático, usar com cautela.',
      kidney: 'Usar com cautela.',
      heart: 'Pode causar arritmias, usar com extrema cautela em cardiopatas. Não usar com inibidores da MAO.',
      gastro: 'Geralmente seguro.',
    },
  },
  {
    id: 'maropitant',
    name: 'Maropitant (Cerenia®)',
    species: [Species.Dog, Species.Cat],
    doseRange: { min: 1, max: 2, default: 1, unit: 'mg/kg' },
    presentations: [
        { id: 'maro_comp_16', name: 'Comprimido 16 mg', concentration: { value: 16, unit: 'mg/tablet' } },
        { id: 'maro_comp_24', name: 'Comprimido 24 mg', concentration: { value: 24, unit: 'mg/tablet' } },
        { id: 'maro_comp_60', name: 'Comprimido 60 mg', concentration: { value: 60, unit: 'mg/tablet' } },
        { id: 'maro_inj', name: 'Injetável 1% (10 mg/ml)', concentration: { value: 10, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Antiemético com propriedades analgésicas viscerais. Dose para vômito: 1 mg/kg. Dose para enjoo de movimento (cães): 2 mg/kg PO.',
    adjustmentFactors: {
        senior: 'Seguro, mas usar com cautela.',
        puppy_kitten: 'Não usar injetável em cães < 8 semanas. Não usar oral em cães < 16 semanas. Não usar em gatos < 16 semanas.',
        pregnant_lactating: 'Usar com cautela.',
        liver: 'Metabolizado no fígado. Usar com cautela em hepatopatas.',
        kidney: 'Seguro.',
        heart: 'Usar com cautela em pacientes com disfunção cardíaca ou predisposição.',
        gastro: 'Uso primário é para problemas gastrointestinais.',
    },
  },
   {
    id: 'frunevetmab_cat',
    name: 'Frunevetmab (Solensia®)',
    species: [Species.Cat],
    doseRange: { min: 1, max: 2.8, default: 2.8, unit: 'mg/kg' },
    presentations: [
      { id: 'solensia_vial', name: 'Solensia Frasco (7 mg/ml)', concentration: { value: 7, unit: 'mg/ml' } },
    ],
    administrationNotes: 'Anticorpo monoclonal para dor de osteoartrite felina. Administração SC uma vez por mês. A dose é fixa com base na tabela de peso do produto.',
    adjustmentFactors: {
      senior: 'Tratamento de escolha para dor de OA em gatos idosos devido ao alto perfil de segurança.',
      puppy_kitten: 'Não avaliado em gatos com menos de 12 meses.',
      pregnant_lactating: 'Não recomendado.',
      liver: 'Seguro, não é metabolizado pelo fígado ou rins.',
      kidney: 'Seguro em gatos com doença renal crônica leve a moderada.',
      heart: 'Considerado seguro.',
      gastro: 'Considerado seguro.',
    },
  },
  {
    id: 'prednisolona',
    name: 'Prednisolona/Prednisona',
    species: [Species.Dog, Species.Cat],
    doseRange: { min: 0.5, max: 2, default: 1, unit: 'mg/kg' },
    presentations: [
      { id: 'pred_5', name: 'Comprimido 5 mg', concentration: { value: 5, unit: 'mg/tablet' } },
      { id: 'pred_20', name: 'Comprimido 20 mg', concentration: { value: 20, unit: 'mg/tablet' } },
    ],
    administrationNotes: 'Corticosteroide. Usado para dor inflamatória quando AINEs são contraindicados. NÃO PODE SER USADO COM AINEs. Gatos geralmente requerem doses maiores que cães. Requer desmame gradual.',
    adjustmentFactors: {
        senior: 'Usar com cautela, pode exacerbar doenças subclínicas.',
        puppy_kitten: 'Pode suprimir o crescimento com uso crônico.',
        pregnant_lactating: 'Contraindicado.',
        liver: 'Prednisona é convertida em prednisolona no fígado. Prefira prednisolona em hepatopatas.',
        kidney: 'Pode causar poliúria/polidipsia. Usar com cautela.',
        heart: 'Pode causar retenção de sódio e água. Usar com cautela em ICC.',
        gastro: 'Risco de ulceração gastrointestinal, especialmente se usado com AINEs (contraindicado).',
    },
  },
];
