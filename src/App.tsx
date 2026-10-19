import React, { useState } from 'react';

// --- TIPAGENS (Resolvem os erros "implicitly has type 'any'") ---
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
  idx: number;
}

// --- DADOS ---
const levelsData: Level[] = [
  // ... (Cole aqui todo o seu array levelsData original sem alterações. Ocultei para economizar espaço, mas mantenha-o idêntico)
];

// O Record<string, string> avisa o TS que qualquer string acessará uma string válida
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
    <div className="w-full max-w-[400px] mx-auto select-none">
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
                  <QuestionBlock key={idx} question={q} idx={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}