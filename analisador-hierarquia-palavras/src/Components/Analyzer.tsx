import React, { useState } from 'react';
import './Analyzer.css';

// Define a interface TreeNode que representa um nó na árvore hierárquica
interface TreeNode {
  name: string;
  children: TreeNode[];
}

// Define a interface para as props do componente Analyzer
interface AnalyzerProps {
  tree: TreeNode[];
}

// Componente Analyzer para analisar frases com base na hierarquia de palavras
const Analyzer: React.FC<AnalyzerProps> = ({ tree }) => {
  // Estado para armazenar a frase inserida pelo usuário
  const [phrase, setPhrase] = useState<string>('');
  // Estado para armazenar os resultados da análise
  const [results, setResults] = useState<Record<string, number>>({});

  // Função para analisar a frase com base na árvore
  const analyzePhrase = () => {
    // Divide a frase em palavras minúsculas
    const words = phrase.toLowerCase().split(' ');
    const tempResults: Record<string, number> = {};

    // Função recursiva para percorrer a árvore e contar correspondências
    const searchTree = (nodes: TreeNode[], depth: number) => {
      nodes.forEach((node) => {
        // Se a palavra da árvore estiver na frase, conta a ocorrência
        if (words.includes(node.name.toLowerCase())) {
          if (tempResults[node.name]) {
            tempResults[node.name] += 1;
          } else {
            tempResults[node.name] = 1;
          }
        }
        // Percorre recursivamente os filhos do nó
        if (node.children.length > 0) {
          searchTree(node.children, depth + 1);
        }
      });
    };

    // Inicia a busca na árvore a partir da raiz
    searchTree(tree, 0);
    // Atualiza o estado dos resultados
    setResults(tempResults);
  };

  return (
    <div className="analyzer">
      <h2>Analisador de Frases</h2>
      {/* Campo de texto para inserir a frase a ser analisada */}
      <input
        type="text"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        placeholder="Digite uma frase"
      />
      {/* Botão para iniciar a análise da frase */}
      <button onClick={analyzePhrase}>Analisar</button>
      <div>
        {/* Exibe os resultados da análise */}
        {Object.keys(results).length > 0 ? (
          <ul>
            {Object.entries(results).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Analyzer;
