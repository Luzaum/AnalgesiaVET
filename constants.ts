import { PainData, QuestionType, Species } from './types';

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
        { id: 'hcpi', name: 'Índice de Dor Crônica de Helsinki (HCPI)', recommended: false, description: 'Questionário validado para o português que foca na disposição, humor e comportamento do cão, capturando dimensões emocionais da dor crônica.', questions: [], interpretation: () => ({score: 'N/A', analysis: 'Esta escala é fornecida a título informativo.', needsIntervention: false}),
          details: {
            origin: "Desenvolvida na Universidade de Helsinki por Hielm-Björkman AK, et al. (2009).",
            indications: "Avaliação da dor crônica por tutores, com foco particular em mudanças de humor e comportamento.",
            studies: "Validada para uso em cães com osteoartrite. Mostra boa correlação com a avaliação veterinária.",
            quality: "Complementa outras escalas ao focar nos aspectos mais sutis e emocionais da dor crônica, como relutância em brincar ou mudanças na interação social. É uma ferramenta útil, mas o CBPI é mais amplamente utilizado."
          }
        },
        { id: 'load', name: 'Questionário Liverpool Osteoarthritis in Dogs (LOAD)', recommended: false, description: 'Ferramenta específica para osteoartrite canina. Fornece faixas de severidade: Leve (0-10), Moderada (11-20), Severa (21-30), Extrema (31-52).', questions: [], interpretation: () => ({score: 'N/A', analysis: 'Esta escala é fornecida a título informativo.', needsIntervention: false}),
          details: {
            origin: "Desenvolvida na Universidade de Liverpool por Hercock C, et al. (2009).",
            indications: "Ferramenta específica para quantificar a disfunção de mobilidade associada à osteoartrite em cães, preenchida pelo tutor.",
            studies: "Validada como uma medida de resultados clínicos para osteoartrite canina. É sensível a mudanças após o tratamento.",
            quality: "Excelente para seu propósito específico (osteoartrite), fornecendo um escore numérico que é fácil de acompanhar ao longo do tempo. Sua especificidade é tanto uma força quanto uma limitação, pois não avalia outras fontes de dor crônica."
          }
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
      ],
    },
  },
};
