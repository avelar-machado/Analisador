import React, { useState } from 'react';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

const TreeBuilder = () => {
  const [tree, setTree] = useState<TreeNode[]>([]); // Estado que armazena a hierarquia
  const [nodeName, setNodeName] = useState<string>('');
  const [parentIndex, setParentIndex] = useState<number | null>(null);

  const addNode = (parentIndex: number | null, nodeName: string) => {
    if (parentIndex === null) {
      // Se não houver nó pai, adicione um novo nó na raiz
      setTree([...tree, { name: nodeName, children: [] }]);
    } else {
      // Se houver nó pai, adicione o novo nó como filho do nó pai
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
  

  const handleSave = () => {
    const json = JSON.stringify(tree, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hierarquia.json';
    a.click();
  };

  const renderTree = (nodes: TreeNode[]) => {
    return (
      <ul>
        {nodes.map((node, index) => (
          <li key={index}>
            {node.name}
            {node.children.length > 0 && renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div>
      <h2>Construtor de Hierarquia</h2>
      <div>
        <input
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Nome do Nó"
        />
        <select
          onChange={(e) => setParentIndex(e.target.value === '' ? null : parseInt(e.target.value))}
        >
          <option value="">Sem Pai (Raiz)</option>
          {tree.map((node, index) => (
            <option key={index} value={index}>
              {node.name}
            </option>
          ))}
        </select>
        <button onClick={() => addNode(parentIndex, nodeName)}>Adicionar Nó</button>
      </div>
      {renderTree(tree)}
      <button onClick={handleSave}>Salvar Hierarquia</button>
    </div>
  ); 
};

export default TreeBuilder;
