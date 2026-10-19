import React, { useState } from 'react';

// --- TIPAGENS ---
interface Question {
  q: string;
  a: string;
}

interface Piece {
  type: string;
  color: 'w' | 'b';
  sq: string;
}

type BoardSetup = 'start' | Piece[] | null;

interface Level {
  id: number;
  title: string;
  subtitle: string;
  intro: string;
  boardSetup: BoardSetup;
  questions: Question[];
}

interface ChessboardProps {
  setup: BoardSetup;
}

interface QuestionBlockProps {
  question: Question;
}

// --- DADOS COMPLETOS ---
const levelsData: Level[] = [
  {
    id: 1,
    title: "NÍVEL 1 (1º Ano)",
    subtitle: "Mapeamento e Grandezas Visuais",
    intro: "No início de uma partida, os exércitos estão enfileirados no tabuleiro. Vamos mapear esse espaço passo a passo:",
    boardSetup: "start",
    questions: [
      { q: "a) Observação inicial: qual é a forma geométrica exata de uma única casa do tabuleiro?", a: "Quadrado perfeito." },
      { q: "b) Visão macro: qual é a forma geométrica das bordas externas de todo o campo de batalha?", a: "Um quadrado maior." },
      { q: "c) Simetria visual: se você traçar uma linha reta cortando o tabuleiro pela metade exata, o que acontece com os dois lados?", a: "Eles ficam perfeitamente iguais em espaço e quantidade de casas (simetria)." },
      { q: "d) Contagem linear: escolha uma fileira horizontal (linha) e conte quantas casas ela possui de ponta a ponta.", a: "8 casas." },
      { q: "e) Contagem vertical: agora conte quantas casas existem em uma única coluna (de baixo para cima).", a: "8 casas." },
      { q: "f) Relação: o que a contagem das linhas e colunas confirma sobre a forma geométrica que você respondeu na letra B?", a: "Confirma que o tabuleiro inteiro é um quadrado, pois possui lados iguais de 8 por 8." },
      { q: "g) Inventário: cada jogador começa com 8 Peões, 2 Torres, 2 Cavalos, 2 Bispos, 1 Dama e 1 Rei. Monte a conta de adição para descobrir o tamanho de um exército.", a: "8 + 2 + 2 + 2 + 1 + 1 = 16 peças." },
      { q: "h) Oposição: se ambos os jogadores têm a mesma quantidade de peças, qual é o total de peças no tabuleiro antes do primeiro lance?", a: "16 + 16 = 32 peças no total." },
      { q: "i) Estrutura: você possui 8 Peões. Some todas as outras peças juntas (Torres, Cavalos, Bispos, Dama, Rei). Qual grupo tem mais peças?", a: "Nenhum. Os peões somam 8 e o resto do exército também soma 8. Estão empatados em quantidade." },
      { q: "j) Dedução estratégica: se os peões representam exatamente a metade numérica das suas forças e ficam na linha de frente, qual é a função geométrica principal deles?", a: "Criar uma muralha ou barreira de proteção para as peças que operam na retaguarda." }
    ]
  },
  {
    id: 2,
    title: "NÍVEL 2 (2º Ano)",
    subtitle: "Valor Posicional e Operações Básicas",
    intro: "A força das peças é medida em pontos fixos. Peão vale 1, Cavalo vale 3, Bispo vale 3, Torre vale 5, e a Dama vale 9. O Rei tem valor infinito.",
    boardSetup: [
      { type: 'P', color: 'w', sq: 'f2' }, { type: 'P', color: 'w', sq: 'g2' }, { type: 'P', color: 'w', sq: 'h2' },
      { type: 'B', color: 'w', sq: 'g3' }, { type: 'K', color: 'w', sq: 'g1' }
    ],
    questions: [
      { q: "a) Sistema de valores: um Peão vale 1 ponto. Se você tem 3 Peões agrupados defendendo o Rei, qual é a soma desse pequeno grupo?", a: "1 + 1 + 1 = 3 pontos." },
      { q: "b) Adição de força: um Bispo (3 pontos) recua para ajudar esses peões. Qual é o novo valor total dessa muralha de defesa?", a: "3 (dos peões) + 3 (do Bispo) = 6 pontos." },
      { q: "c) Reforço pesado: uma Torre (5 pontos) junta-se à defesa. Atualize a soma total do seu bloco defensivo.", a: "6 pontos + 5 (Torre) = 11 pontos." },
      { q: "d) Subtração por perda: o adversário ataca e consegue destruir o seu Bispo. Monte a conta de subtração e mostre o valor da defesa agora.", a: "11 pontos - 3 (Bispo perdido) = 8 pontos." },
      { q: "e) Equivalência: perder um Bispo (3 pontos) e capturar um Cavalo (3 pontos) no mesmo turno altera o valor matemático total do seu exército?", a: "Não, pois a matemática indica uma troca neutra (3 - 3 = 0). O valor total continua o mesmo." },
      { q: "f) Ocupação de espaço: o tabuleiro total possui 64 casas. O seu exército ocupa 16 casas. Monte a conta para descobrir quantas casas não estão sob o seu controle físico.", a: "64 - 16 = 48 casas." },
      { q: "g) Espaço vazio absoluto: sabendo que o adversário também ocupa 16 casas no início do jogo, calcule exatamente quantas casas começam a partida vazias.", a: "64 (total) - 16 (brancas) - 16 (pretas) = 32 casas vazias." },
      { q: "h) Comparação de poder: a Dama vale 9 pontos. Uma Torre vale 5. Qual é a diferença matemática exata entre as duas peças mais fortes?", a: "9 - 5 = 4 pontos de diferença." },
      { q: "i) Combinações: escreva uma soma usando apenas peças menores (Bispos e Cavalos) que resulte no valor exato de uma Dama.", a: "3 (Bispo) + 3 (Cavalo) + 3 (Bispo ou Cavalo) = 9 pontos." }
    ]
  },
  {
    id: 3,
    title: "NÍVEL 3 (3º Ano)",
    subtitle: "Reta Numérica e Multiplicação",
    intro: "Imagine as laterais do tabuleiro com os números de 1 a 8 representando o Eixo das Linhas.",
    boardSetup: [
      { type: 'R', color: 'w', sq: 'a5' }
    ],
    questions: [
      { q: "a) O eixo numérico: a Torre começou o jogo na linha 1. Ela andou 3 casas para a frente. Qual é a conta de adição que mostra sua nova posição?", a: "1 + 3 = 4." },
      { q: "b) Ponto de parada: baseando-se na resposta anterior, em qual linha a Torre estacionou?", a: "Na linha 4." },
      { q: "c) Recuo: no turno seguinte, a Torre precisou voltar 2 casas para se proteger. Monte a conta de subtração correspondente.", a: "4 - 2 = 2." },
      { q: "d) Posição atual: em qual linha a Torre se encontra após o recuo?", a: "Na linha 2." },
      { q: "e) Padrões repetidos: se a Torre avançar 2 casas por turno durante 3 turnos seguidos, podemos usar a multiplicação no lugar da adição longa. Como fica essa conta?", a: "3 (turnos) x 2 (casas) = 6 casas de avanço total." },
      { q: "f) A lógica da multiplicação: um jogador possui 8 peões. A escola montou 3 tabuleiros para um mini-torneio. Faça a soma repetida (adição) para achar o total de peões em jogo para um dos lados.", a: "8 + 8 + 8 = 24 peões." },
      { q: "g) Atalho matemático: agora transforme a conta gigante da questão anterior em uma única conta de multiplicação.", a: "3 (tabuleiros) x 8 (peões) = 24 peões." },
      { q: "h) Expansão do evento: o torneio cresceu para 10 tabuleiros. Use a multiplicação para descobrir o novo número total de peões usados por um lado.", a: "10 x 8 = 80 peões." },
      { q: "i) Deslocamento do zero: matematicamente, o que acontece com um número inteiro quando você o multiplica por 10?", a: "A ordem decimal se desloca, adicionando um zero à direita do número." }
    ]
  },
  {
    id: 4,
    title: "NÍVEL 4 (4º Ano)",
    subtitle: "Sistema Decimal e Cálculo de Área",
    intro: "A marcenaria aplica a matemática abstrata na construção física dos equipamentos.",
    boardSetup: null,
    questions: [
      { q: "a) Estrutura da grade: o tabuleiro tem 8 colunas e 8 linhas. Como calculamos o número total de casas usando apenas uma operação de multiplicação?", a: "8 colunas x 8 linhas = 64 casas." },
      { q: "b) O Salão: um marceneiro fabricou 10 tabuleiros idênticos. Multiplique o total de casas de um tabuleiro por 10 para descobrir o volume de trabalho dele.", a: "64 x 10 = 640 casas fabricadas." },
      { q: "c) Ordem de grandeza: pegue o resultado da questão anterior e decomponha o número preenchendo as lacunas: ___ Centenas, ___ Dezenas, ___ Unidades.", a: "6 Centenas, 4 Dezenas, 0 Unidades." },
      { q: "d) Ampliando a escala: e se fossem 100 tabuleiros no salão? Como ficaria o número total de casas e sua decomposição?", a: "64 x 100 = 6400. Decomposição: 6 Unidades de Milhar, 4 Centenas, 0 Dezenas, 0 Unidades." },
      { q: "e) Geometria plana: o que significa matematicamente calcular a Área de uma figura quadrada?", a: "Significa multiplicar a medida da Base pela medida da Altura para encontrar o espaço interno total da forma." },
      { q: "f) Medida unitária: o marceneiro fez cada casa com 5 cm de lado. Calcule a Área de apenas UMA casa em centímetros quadrados (cm²).", a: "5 cm x 5 cm = 25 cm² por casa." },
      { q: "g) Área do campo de batalha: usando o resultado da letra F, multiplique pela quantidade total de casas de um tabuleiro para encontrar a Área completa da superfície.", a: "64 casas x 25 cm² = 1600 cm² de área total no tabuleiro." },
      { q: "h) O centro estratégico: as 4 casas bem no meio do tabuleiro formam um quadrado menor (2x2). Qual é a Área total, em cm², apenas desse centro crítico?", a: "4 casas x 25 cm² = 100 cm²." }
    ]
  },
  {
    id: 5,
    title: "NÍVEL 5 (5º Ano)",
    subtitle: "Divisão com Decimais e Gráficos",
    intro: "A gestão do tempo é vital no torneio e o valor das peças precisa ser traduzido graficamente.",
    boardSetup: null,
    questions: [
      { q: "a) O tempo como recurso: uma partida tem 40 minutos totais de reflexão. Se os jogadores fizeram exatos 25 lances, monte a conta de divisão para descobrir o tempo médio gasto por lance.", a: "40 ÷ 25 = 1,6 minutos por lance." },
      { q: "b) Decimais na prática: o resultado da divisão gerou o número 1,6. O que o número \"1\" antes da vírgula representa especificamente?", a: "Representa a parte inteira do tempo, ou seja, 1 minuto completo." },
      { q: "c) A fração do minuto: o \"6\" depois da vírgula representa seis décimos de minuto. Sabendo que 1 minuto tem 60 segundos, multiplique 0,6 por 60 para descobrir o valor fracionado em segundos.", a: "0,6 x 60 = 36 segundos." },
      { q: "d) Tempo exato: junte a resposta da letra B com a da letra C para descrever exatamente o tempo médio por lance no formato tradicional do relógio.", a: "O tempo médio por lance foi de 1 minuto e 36 segundos." },
      { q: "e) Eixos do gráfico: você vai construir um gráfico de barras desenhado à mão. O que deve ser escrito debaixo de cada coluna no eixo horizontal?", a: "A letra de identificação das peças: P, C, B, T e D." },
      { q: "f) Escala de valores: o eixo vertical (a linha em pé que sobe ao lado das barras) vai de 0 até 10. Qual peça gerará a barra mais alta?", a: "A Dama, pois alcançará o nível 9 do eixo." },
      { q: "g) Leitura do diferencial: a barra da Torre atinge a marca 5 e a do Cavalo atinge a marca 3. Qual é a diferença numérica de altura entre elas?", a: "5 - 3 = 2 níveis de altura no gráfico de diferença." },
      { q: "h) Composição visual: observando as alturas, a coluna da Dama (9) tem exatamente a mesma altura se você empilhar quais três outras colunas menores juntas?", a: "Empilhando a Torre (5), o Cavalo ou Bispo (3) e o Peão (1). A soma das três alturas é igual a 9." }
    ]
  },
  {
    id: 6,
    title: "NÍVEL 6 (6º Ano)",
    subtitle: "Frações, Intersecção e Diagrama de Venn",
    intro: "Posicione uma Dama em b2 e um Cavalo em c7 no tabuleiro. Para provar o domínio exato deles, não podemos apenas jogar os números; precisaremos isolar e descontar sobreposições.",
    boardSetup: [
      { type: 'Q', color: 'w', sq: 'b2' },
      { type: 'N', color: 'w', sq: 'c7' }
    ],
    questions: [
      { q: "a) O Todo Matemático: para calcular a fração de controle do tabuleiro, precisamos saber o denominador de todas as equações. Qual é esse número e por que ele é fixo?", a: "O denominador é 64, porque esse é o número absoluto de casas disponíveis no tabuleiro inteiro." },
      { q: "b) O alcance da Dama (Retas): a Dama em b2 ataca 7 casas na coluna vertical e 7 casas na linha horizontal (sem contar a casa em que ela pisa). Qual é o subtotal?", a: "7 + 7 = 14 casas retas." },
      { q: "c) O alcance da Dama (Diagonais): nas diagonais que cruzam a casa b2, a Dama alcança mais 9 casas ininterruptas. Qual é o poder total isolado de controle dela?", a: "14 + 9 = 23 casas sob domínio da Dama." },
      { q: "d) A Fração da Dama: usando as conclusões dos passos anteriores, escreva a força de controle da Dama no formato de fração apropriado.", a: "23/64." },
      { q: "e) O alcance do Cavalo: um Cavalo centralizado em c7 domina 6 casas em formato de \"L\". Escreva a fração isolada de controle do Cavalo.", a: "6/64." },
      { q: "f) A armadilha da soma simples: se somarmos os dois numeradores (23 + 6) diretamente, o resultado mente sobre a realidade do tabuleiro. O que estamos fazendo de errado ao somar de olhos fechados?", a: "Estamos assumindo que a Dama e o Cavalo controlam casas inteiramente diferentes. Se houver sobreposição de domínio sobre a mesma casa, contaremos o mesmo quadrado duas vezes." },
      { q: "g) A Intersecção: observe a trajetória das duas peças no tabuleiro. Existe uma casa específica que ambas ameaçam simultaneamente. Qual é essa coordenada?", a: "A casa b5. Tanto a Dama (pela coluna vertical) quanto o Cavalo (pelo L) atacam esse quadrado." },
      { q: "h) Diagrama de Venn (Preparação): imagine dois grandes círculos que se cruzam. O meio compartilhado é a Intersecção. Preencha esse meio central com o número correspondente à resposta da letra G.", a: "O valor no centro do Diagrama de Venn será 1." },
      { q: "i) Isolando forças exclusivas: pegue o poder total da Dama (23) e subtraia o ponto de intersecção (1) para achar as casas que SÓ ELA ataca. Faça o mesmo para o Cavalo (6 - 1).", a: "Casas exclusivas da Dama: 22. Casas exclusivas do Cavalo: 5." },
      { q: "j) A Equação da União: para saber o número total real de casas atacadas, some as exclusivas da Dama (22), as exclusivas do Cavalo (5) e a intersecção única (1). Transforme o resultado em fração de denominador 64 e simplifique até a forma irredutível.", a: "22 + 5 + 1 = 28 casas dominadas na realidade. A fração é 28/64. Dividindo o numerador e denominador por 4, chegamos à fração final de 7/16." }
    ]
  },
  {
    id: 7,
    title: "NÍVEL 7 (7º Ano)",
    subtitle: "Números Inteiros e Expressões Algébricas",
    intro: "A balança comercial do xadrez opera como transações de banco: Peças que você captura entram como lucros Positivos (+). Peças que você perde entram como saques Negativos (-).",
    boardSetup: null,
    questions: [
      { q: "a) Fundamento de Saldo: neste sistema de números inteiros, o que significa terminar uma sequência de trocas de peças com saldo numérico exatamente igual a 0?", a: "Significa que o material destruído por você e pelo adversário tem exatamente o mesmo valor algébrico. Ninguém saiu lucrando na balança material." },
      { q: "b) Abertura agressiva: você captura um Bispo inimigo (+3). Logo no lance seguinte, o adversário recruta de volta e captura dois de seus Peões (-1 e -1). Monte a expressão matemática desta rodada.", a: "(+3) - 1 - 1" },
      { q: "c) Resolução inicial: resolva a expressão da letra B. O seu saldo material desta fase inicial foi de lucro positivo ou de prejuízo negativo?", a: "+3 - 2 = +1. O saldo é de lucro, você tem 1 ponto de vantagem no tabuleiro." },
      { q: "d) A Armadilha Central: o meio-jogo é complexo. O adversário entrega propositalmente a Dama para você capturá-la (+9). Pela estrutura dele, ele ganha tempo e destrói uma das suas Torres e dois dos seus Cavalos num ataque rápido. Monte essa expressão gigante.", a: "(+9) - 5 (Torre) - 3 (Cavalo) - 3 (Cavalo)" },
      { q: "e) Agrupamento de Saques: some apenas os valores negativos da expressão da letra D para saber o tamanho bruto da força que foi retirada do seu lado.", a: "-5 - 3 - 3 = -11. Você sofreu uma perda bruta de 11 pontos." },
      { q: "f) Fechamento do conflito: agora junte o lucro imenso (+9) com as perdas combinadas (-11) da resposta anterior. Resolva e determine o saldo isolado dessa armadilha específica.", a: "+9 - 11 = -2. Apesar de ganhar a Dama, o saldo desta operação específica gerou um déficit de 2 pontos." },
      { q: "g) A Equação Final da Partida: para descobrir o veredito material de todo o jogo, some o saldo de lucro da abertura (letra C) com o prejuízo que você sofreu na armadilha (letra F).", a: "(+1) + (-2)" },
      { q: "h) Resolvendo o Veredito: aplicando a regra de sinais aritméticos, qual é o número inteiro final do lado da sua conta? Isso significa que o jogo terminou a favor de quem em material?", a: "+1 - 2 = -1. O saldo final é negativo em 1 ponto. Você entregou um total de peças que, na conversão, representa prejuízo de um peão limpo de desvantagem." }
    ]
  },
  {
    id: 8,
    title: "NÍVEL 8 (8º Ano)",
    subtitle: "O Plano Cartesiano e Equações do 1º Grau",
    intro: "Um tabuleiro nada mais é que um diagrama quadriculado de Plano Cartesiano puro, disfarçado de jogo.",
    boardSetup: [
      { type: 'R', color: 'w', sq: 'a5' },
      { type: 'k', color: 'b', sq: 'f5' }
    ],
    questions: [
      { q: "a) A Matriz Universal: a matemática organiza o plano usando letras (a até h) e números (1 até 8). Qual eixo (X horizontal ou Y vertical) as Letras representam? E os Números?", a: "As Letras representam o Eixo X (o horizonte de colunas deitada). Os Números representam o Eixo Y (a altitude das linhas em pé)." },
      { q: "b) O Ponto de Origem: no sistema de coordenadas (X, Y), se a casa 'a1' fosse traduzida em números puros, como ela ficaria sabendo que 'a' é a primeira letra?", a: "O ponto seria (1, 1), indicando o canto esquerdo inferior de início dos dois eixos." },
      { q: "c) Conversão Direta: olhe para o tabuleiro e identifique sua Torre Branca. Traduza a posição dela do dialeto de xadrez para coordenadas puramente numéricas (X, Y).", a: "A Torre está em a5. A letra 'a' é a coluna 1. A linha é 5. A coordenada numérica é (1, 5)." },
      { q: "d) Conversão do Inimigo: encontre o Rei Preto no tabuleiro e faça exatamente a mesma conversão numérica para a posição dele.", a: "O Rei está em f5. A letra 'f' equivale ao número 6 no alfabeto do xadrez. A coordenada fica (6, 5)." },
      { q: "e) Análise Geométrica: compare a coordenada da Torre (1, 5) com a coordenada do Rei (6, 5). Qual eixo permaneceu congelado com exatamente o mesmo número? O que isso prova sobre as duas peças no tabuleiro?", a: "O Eixo Y permaneceu congelado no número 5. Isso prova, algebricamente, que as duas peças estão alinhadas perfeitamente na mesma fileira reta, prontas para colisão." },
      { q: "f) Cálculo Delta: encontre a distância nua entre as peças, subtraindo a posição X do Rei pela posição X da Torre. O resultado absoluto mede a amplitude de casas entre eles.", a: "6 - 1 = 5. A distância ao longo do eixo horizontal compreende 5 medidas." },
      { q: "g) Entendendo Variáveis: ao empacotar as caixas, peças sumiram. Você segurou 1 Torre (5 pts), 1 Bispo (3 pts) e 1 Cavalo (3 pts). Seu professor indicou que a caixa correta tem um valor total de 17. O que faltou eram Peões (que valem 1). Por que o número de Peões na conta será o nosso X?", a: "Porque os peões representam a quantidade desconhecida da nossa conta, a nossa incógnita, que precisa ser descoberta para a equação fazer sentido matemático." },
      { q: "h) Modelagem Matemática: transforme o cenário da caixa da letra G numa Equação do 1º Grau linear, somando os valores das peças que você segura, somando com (1 vezes X) e igualando ao peso final dado pelo professor.", a: "5 + 3 + 3 + 1X = 17" },
      { q: "i) Primeiro passo de isolamento: some todos os números inteiros do lado esquerdo da equação para simplificar o problema.", a: "11 + 1X = 17" },
      { q: "j) Resolução de X: mova a constante inteira para o outro lado da igualdade invertendo a operação para subtração. O valor que sobrar definirá exatamente quantos peões desapareceram.", a: "X = 17 - 11. O valor descoberto da incógnita X é 6. Faltavam 6 peões na caixa." }
    ]
  },
  {
    id: 9,
    title: "NÍVEL 9 (9º Ano)",
    subtitle: "Produtos Notáveis, Porcentagem Sucessiva e Proporção",
    intro: "Espaços operam por taxa e proporção. A área física do tabuleiro não dita as regras vitais, quem dita é a compressão de ameaças na densidade da malha.",
    boardSetup: null,
    questions: [
      { q: "a) Fundamento de Densidade: o que significa matematicamente afirmar que uma área do tabuleiro de xadrez está mais 'densa' que a outra?", a: "Significa que há uma razão alta entre o número de peças operando num setor e o total de casas disponíveis nele, reduzindo o espaço livre por onde peças de movimento longo (Torres, Bispos, Dama) conseguem transitar." },
      { q: "b) Cálculo de Densidade Base: em um quadrante do tabuleiro contendo 16 casas, você acumulou 6 peças fazendo um bloqueio. Qual é a razão ou fração bruta que descreve sua densidade estrutural?", a: "6 peças de ocupação divididas por 16 casas estruturais, ou seja, a fração bruta é 6/16." },
      { q: "c) Conversão Analítica: simplifique a razão obtida na resposta anterior dividindo os membros por 2, e em seguida faça a divisão à mão para achar o coeficiente decimal correspondente.", a: "Simplificando 6/16 por 2 temos 3/8. Dividindo 3 por 8 obtemos 0,375. Esta é a densidade decimal de ocupação." },
      { q: "d) Modelação de Área por Polinômio: você estruturou um quadrado central firme para seus cavalos saltarem que possui 'x' medidas de lado. Como seria a conta básica da área atual dele antes da expansão?", a: "Área de quadrado é lado vezes lado, ou seja, x vezes x. A resposta algébrica é x²." },
      { q: "e) Expansão de Flanco: suas bordas de defesa estenderam os lados do quadrado original somando 2 unidades de espaço novo ao comprimento e à altura. Escreva a equação do Produto Notável que representa a Área deste novo quadrante gigante.", a: "O novo lado passa a ser (x + 2). A expressão algébrica em produto notável para a nova área será (x + 2)²." },
      { q: "f) Expansão do Produto Notável: desenvolva o quadrado da soma que você formou na resposta anterior abrindo todo o trinômio correspondente.", a: "A regra manda calcular o quadrado do primeiro (x²), somar com duas vezes o primeiro pelo segundo (+ 4x), e finalizar com o quadrado do segundo (+ 4). A equação final é x² + 4x + 4." },
      { q: "g) Visualização Trigonométrica: no seu polinômio final da resposta F, existe um número inteiro solitário no final da equação sem estar acompanhado do 'x'. Fisicamente, o que ele representa na expansão quadrada?", a: "O número +4 isolado representa exatamente a sobreposição das bordas nos 4 cantos novos do seu quadrante de expansão que, se não contados com cuidado, podem distorcer o cálculo territorial real." },
      { q: "h) Taxa de Decaimento (Conceito inicial): a mobilidade letal de um Bispo pode ser medida numa escala nota 10. Toda vez que uma parede de peões é erguida na cor dele, ele perde 15% dessa letalidade matemática original. Calcule quanto em pontos puros significa essa primeira pancada percentual.", a: "15% da nota 10 representa um corte bruto de 1,5 ponto." },
      { q: "i) Aplicação do Decaimento Simples: baseando-se no valor da resposta anterior, subtraia essa taxa da nota original. Qual é o novo nível de letalidade do Bispo após a primeira parede?", a: "10 pontos originais - 1,5 de queda de força = 8,5 pontos atuais de letalidade." },
      { q: "j) Decaimento Composto em Sucessão: o adversário constrói uma segunda parede de peões idêntica. Você perderá novos 15%. Cuidado: os decaimentos do mundo real incidem em cima do NOVO valor atual da peça, e não do passado histórico. Aplique a queda de 15% sobre a nota atualizada e descubra a nota morta final do Bispo.", a: "Temos que calcular 15% sobre o valor presente que é 8,5. (8,5 x 0,15 = 1,275). Agora subtraímos isso da força que o Bispo tinha hoje: 8,5 - 1,275 = 7,225 de nota final letal remanescente." }
    ]
  }
];

const PIECE_UNICODE: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

const generateStartBoard = (): Piece[] => {
  const pieces: Piece[] = [];
  const addPiece = (type: string, color: 'w' | 'b', file: string, rank: number) => {
    pieces.push({ type, color, sq: `${file}${rank}` });
  };
  
  FILES.forEach(file => {
    addPiece('P', 'w', file, 2);
    addPiece('p', 'b', file, 7);
  });
  
  const backRankPieces = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
  FILES.forEach((file, i) => {
    addPiece(backRankPieces[i], 'w', file, 1);
    addPiece(backRankPieces[i].toLowerCase(), 'b', file, 8);
  });
  
  return pieces;
};

// --- COMPONENTES ---
const Chessboard: React.FC<ChessboardProps> = ({ setup }) => {
  if (!setup) return null;

  let pieces: Piece[] = [];
  if (setup === 'start') {
    pieces = generateStartBoard();
  } else if (Array.isArray(setup)) {
    pieces = setup;
  }

  const getPieceAt = (sq: string) => pieces.find(p => p.sq === sq);

  return (
    <div className="w-full max-w-100 mx-auto select-none">
      <div className="grid grid-cols-8 border-4 border-slate-800 shadow-xl rounded-sm overflow-hidden">
        {RANKS.map((rank) => (
          FILES.map((file, fileIndex) => {
            const isDark = (rank + fileIndex) % 2 !== 0;
            const sq = `${file}${rank}`;
            const piece = getPieceAt(sq);
            
            const displayPiece = piece 
                ? (piece.color === 'w' ? PIECE_UNICODE[piece.type.toUpperCase()] : PIECE_UNICODE[piece.type.toLowerCase()])
                : null;

            return (
              <div 
                key={sq} 
                className={`aspect-square flex items-center justify-center relative ${isDark ? 'bg-sky-300' : 'bg-slate-50'}`}
              >
                {file === 'a' && (
                  <span className={`absolute top-0.5 left-0.5 text-[10px] font-bold ${isDark ? 'text-sky-900' : 'text-slate-400'}`}>
                    {rank}
                  </span>
                )}
                {rank === 1 && (
                  <span className={`absolute bottom-0 right-1 text-[10px] font-bold ${isDark ? 'text-sky-900' : 'text-slate-400'}`}>
                    {file}
                  </span>
                )}
                
                {displayPiece && (
                  <span className="text-3xl md:text-4xl drop-shadow-md cursor-default text-slate-900 leading-none">
                    {displayPiece}
                  </span>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};

const QuestionBlock: React.FC<QuestionBlockProps> = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="mb-6 bg-white p-5 rounded-xl shadow-sm border border-slate-100 transition-all">
      <p className="text-slate-700 font-medium leading-relaxed mb-4">
        {question.q}
      </p>
      
      {showAnswer ? (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
          <p className="text-emerald-900 whitespace-pre-line font-medium">
            {question.a}
          </p>
          <button 
            onClick={() => setShowAnswer(false)}
            className="mt-3 text-sm text-emerald-600 hover:text-emerald-800 font-semibold"
          >
            Ocultar Gabarito
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowAnswer(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors"
        >
          Visualizar Gabarito
        </button>
      )}
    </div>
  );
};

export default function App() {
  const [activeLevel, setActiveLevel] = useState<Level>(levelsData[0]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      <aside className="w-full md:w-80 bg-slate-900 text-slate-100 flex flex-col shadow-2xl z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white tracking-tight">Trilha Matemática</h1>
          <p className="text-indigo-300 text-sm mt-1">Xadrez: Do Concreto ao Abstrato</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {levelsData.map(level => (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                activeLevel.id === level.id 
                  ? 'bg-indigo-600 text-white font-semibold shadow-md' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{level.title.split('–')[0].trim()}</span>
              {activeLevel.id === level.id && <span className="text-indigo-200">●</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold tracking-wider mb-3">
              MÓDULO ATIVO
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              {activeLevel.title}
            </h2>
            <h3 className="text-xl text-slate-600 font-medium">
              {activeLevel.subtitle}
            </h3>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <p className="text-indigo-900 italic font-medium leading-relaxed">
                  "{activeLevel.intro}"
                </p>
              </div>
              
              {activeLevel.boardSetup ? (
                <div className="sticky top-6 pt-4">
                  <Chessboard setup={activeLevel.boardSetup} />
                  <p className="text-center text-sm text-slate-500 mt-4 font-medium uppercase tracking-widest">
                    Representação Visual
                  </p>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-200 border-dashed">
                  <p className="text-center text-sm text-slate-400 font-medium">
                    (Este desafio dispensa representação visual de peças no tabuleiro)
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-7">
              <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <span className="bg-slate-200 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                  📝
                </span>
                Desafios do Aluno
              </h4>
              
              <div className="space-y-4">
                {activeLevel.questions.map((q, idx) => (
                  <QuestionBlock key={idx} question={q} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}