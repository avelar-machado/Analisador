import React, { useState } from 'react';
import './TreeBuilder.css';

interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
}

interface TreeBuilderProps {
  onSave: (newTree: TreeNode[]) => void;
}

const TreeBuilder: React.FC<TreeBuilderProps> = ({ onSave }) => {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [nodeName, setNodeName] = useState<string>('');
  const [parentId, setParentId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string>('');

  const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

  const addNode = (parentId: string | null, nodeName: string) => {
    const newNode: TreeNode = {
      id: generateUniqueId(),
      name: nodeName,
      children: [],
    };

    if (parentId === null) {
      // Se não houver pai, adicione como nó raiz
      setTree([...tree, newNode]);
    } else {
      const updatedTree = [...tree];

      // Função recursiva para adicionar o nó ao pai correto
      const addNodeRecursively = (nodes: TreeNode[]) => {
        nodes.forEach((node) => {
          if (node.id === parentId) {
            node.children.push(newNode);
          } else {
            addNodeRecursively(node.children);
          }
        });
      };

      addNodeRecursively(updatedTree);
      setTree(updatedTree);
    }

    setNodeName('');
    setParentId(null);
  };

  const handleSave = () => {
    const json = JSON.stringify(tree, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hierarquia.json';
    a.click();
    onSave(tree);
    setSaveMessage('Hierarquia salva com sucesso!');
  };

  const renderTree = (nodes: TreeNode[]) => {
    return (
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            {node.name}
            {node.children.length > 0 && renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  const generateSelectOptions = (nodes: TreeNode[], depth: number = 0): JSX.Element[] => {
    return nodes.flatMap((node) => [
      <option key={node.id} value={node.id}>
        {'-'.repeat(depth) + ' ' + node.name}
      </option>,
      ...(node.children.length > 0 ? generateSelectOptions(node.children, depth + 1) : []),
    ]);
  };

  return (
    <div className="tree-builder">
      <h2>Construtor de Hierarquia</h2>
      <div>
        <input
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Nome do Nó"
        />
        <select
          value={parentId || ''}
          onChange={(e) => setParentId(e.target.value || null)}
        >
          <option value="">Sem Pai (Raiz)</option>
          {generateSelectOptions(tree)}
        </select>
        <button onClick={() => addNode(parentId, nodeName)}>Adicionar Nó</button>
      </div>
      {renderTree(tree)}
      <button onClick={handleSave}>Salvar Hierarquia</button>
      {saveMessage && <p className="success-message">{saveMessage}</p>}
    </div>
  );
};

export default TreeBuilder;
