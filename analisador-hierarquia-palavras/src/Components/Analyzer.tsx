import React, { useState } from 'react';
import './Analyzer.css';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

interface AnalyzerProps {
  tree: TreeNode[];
}

const Analyzer: React.FC<AnalyzerProps> = ({ tree }) => {
  const [phrase, setPhrase] = useState<string>('');
  const [results, setResults] = useState<Record<string, number>>({});
  const [depth, setDepth] = useState<number>(1);
  const [verbose, setVerbose] = useState<boolean>(false);
  const [timing, setTiming] = useState<{ loadTime: number; searchTime: number } | null>(null);

  // Função recursiva para percorrer a árvore e verificar correspondências
  const analyzePhrase = () => {
    const startLoadTime = performance.now();
    const words = phrase.toLowerCase().split(' ');
    const tempResults: Record<string, number> = {};

    // Função recursiva para buscar nos subnós a partir da profundidade especificada
    const searchTree = (nodes: TreeNode[], currentDepth: number): number => {
      let totalMatches = 0;

      nodes.forEach((node) => {
        if (currentDepth >= depth) {
          // Verifica correspondências no nó atual e em seus subnós
          const matchInNode = words.includes(node.name.toLowerCase()) ? 1 : 0;
          const matchInSubnodes = searchTree(node.children, currentDepth + 1);

          const totalSubtreeMatches = matchInNode + matchInSubnodes;

          if (totalSubtreeMatches > 0 && currentDepth === depth) {
            // Incrementa o total de correspondências no nó atual
            tempResults[node.name] = (tempResults[node.name] || 0) + totalSubtreeMatches;
          }

          totalMatches += totalSubtreeMatches;
        } else {
          // Continua descendo na árvore até atingir a profundidade especificada
          totalMatches += searchTree(node.children, currentDepth + 1);
        }
      });

      return totalMatches;
    };

    // Inicia a busca a partir do nível 1 (raiz)
    searchTree(tree, 1);

    const endSearchTime = performance.now();
    setTiming({
      loadTime: endSearchTime - startLoadTime,
      searchTime: performance.now() - endSearchTime,
    });

    setResults(tempResults);
  };

  return (
    <div className="analyzer">
      <div id="analyzerInput1">
        <h2>Analisador de Frases</h2>
        <input
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="Digite uma frase"
        />
      </div>
      <div id="analyzerInput2">
        <input
          type="number"
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          placeholder="Profundidade"
          min={1}
        /> 
      </div>
      <button onClick={analyzePhrase}>Analisar</button>
      <div>
        {/* Exibe os resultados da análise */}
        <b>Resultado:</b>
        {Object.keys(results).length > 0 ? (
          <ul>
            {Object.entries(results).map(([key, value]) => (
              <li key={key}>
                {key} = {value}
              </li>
            ))}
          </ul>
        ) : (
          <p>0</p>
        )}
        <label>
          <b>Verbose</b>
          <input
            type="checkbox"
            checked={verbose}
            onChange={(e) => setVerbose(e.target.checked)}
          />
        </label>
      </div>
      {verbose && timing && (
        <div>
          <p><b>Tempo de carregamento dos parâmetros:</b> {timing.loadTime.toFixed(2)}ms</p>
          <p><b>Tempo de verificação da frase:</b> {timing.searchTime.toFixed(2)}ms</p>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
