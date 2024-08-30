import React, { useState } from 'react';
import './App.css';
import TreeBuilder from './Components/TreeBuilder';
import Analyzer from './Components/Analyzer';

// Define a interface TreeNode que representa um nó na árvore hierárquica
interface TreeNode {
  name: string;
  children: TreeNode[];
}

// Componente principal da aplicação
const App: React.FC = () => {
  // Estado para armazenar a árvore de palavras construída
  const [tree, setTree] = useState<TreeNode[]>([]);

  // Função que será passada para o TreeBuilder para salvar a árvore
  const handleSave = (newTree: TreeNode[]) => {
    setTree(newTree);
  };

  return (
    <div className="App">
      <h1>Analisador de Hierarquia de Palavras</h1>
      {/* Componente para construir a hierarquia de palavras */}
      <TreeBuilder onSave={handleSave} />
      {/* Componente para analisar frases, exibido apenas se a árvore não estiver vazia */}
      {tree.length > 0 && <Analyzer tree={tree} />}
    </div>
  );
}

export default App;
