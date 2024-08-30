import React, { useState } from 'react';
import './TreeBuilder.css';

// Define a interface TreeNode que representa um nó na árvore hierárquica
interface TreeNode {
  name: string;
  children: TreeNode[];
}

// Define a interface para as props do componente TreeBuilder
interface TreeBuilderProps {
  onSave: (newTree: TreeNode[]) => void;
}

// Componente TreeBuilder para construir a hierarquia de palavras
const TreeBuilder: React.FC<TreeBuilderProps> = ({ onSave }) => {
  // Estado que armazena a árvore de palavras
  const [tree, setTree] = useState<TreeNode[]>([]);
  // Estado para armazenar o nome do novo nó a ser adicionado
  const [nodeName, setNodeName] = useState<string>('');
  // Estado para armazenar o índice do nó pai selecionado (ou null se for raiz)
  const [parentIndex, setParentIndex] = useState<number | null>(null);
  // Feedback ao Usuário
  const [saveMessage, setSaveMessage] = useState<string>('');

  // Função para adicionar um novo nó na árvore
  const addNode = (parentIndex: number | null, nodeName: string) => {
    if (parentIndex === null) {
      // Se o nó não tem pai, adiciona como raiz
      setTree([...tree, { name: nodeName, children: [] }]);
    } else {
      // Caso contrário, adiciona como filho do nó pai
      const updatedTree = [...tree];
      const addNodeRecursively = (nodes: TreeNode[], index: number): void => {
        if (index === 0) {
          nodes.push({ name: nodeName, children: [] });
        } else {
          addNodeRecursively(nodes[index].children, index - 1);
        }
      };
      addNodeRecursively(updatedTree, parentIndex);
      setTree(updatedTree);
    }
  };

  // Função para salvar a árvore em um arquivo JSON e chamar a prop onSave
  const handleSave = () => {
    // Converte a árvore em JSON
    const json = JSON.stringify(tree, null, 2);
    // Cria um Blob para download
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    // Cria um link para o download do arquivo
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hierarquia.json';
    a.click();
    // Chama a função onSave passando a árvore atualizada
    onSave(tree);
    setSaveMessage('Hierarquia salva com sucesso!');
  };

  // Função para renderizar a árvore recursivamente
  const renderTree = (nodes: TreeNode[]) => {
    return (
      <ul>
        {nodes.map((node, index) => (
          <li key={index}>
            {node.name}
            {/* Renderiza filhos se existirem */}
            {node.children.length > 0 && renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="tree-builder">
      <h2>Construtor de Hierarquia</h2>
      <div>
        {/* Campo de texto para inserir o nome do novo nó */}
        <input
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Nome do Nó"
        />
        {/* Dropdown para selecionar o nó pai ou raiz */}
        <select
          onChange={(e) => setParentIndex(e.target.value === '' ? null : parseInt(e.target.value))}
        >
          <option value="">Sem Pai (Raiz)</option>
          {/* Mapeia os nós da árvore para as opções do dropdown */}
          {tree.map((node, index) => (
            <option key={index} value={index}>
              {node.name}
            </option>
          ))}
        </select>
        {/* Botão para adicionar o novo nó */}
        <button onClick={() => addNode(parentIndex, nodeName)}>Adicionar Nó</button>
      </div>
      {/* Renderiza a árvore */}
      {renderTree(tree)}
      {/* Botão para salvar a árvore em JSON */}
      <button onClick={handleSave}>Salvar Hierarquia</button>
      {saveMessage && <p className="success-message">{saveMessage}</p>}
    </div>
  );
};

export default TreeBuilder;
