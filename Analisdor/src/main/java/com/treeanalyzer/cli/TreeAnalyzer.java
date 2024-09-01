/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.treeanalyzer.cli;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Classe responsável por analisar uma frase em relação a uma estrutura de árvore.
 */
public class TreeAnalyzer {
    // Lista de nós da árvore a ser analisada
    private List<TreeNode> tree;

    /**
     * Construtor da classe TreeAnalyzer.
     * 
     * @param tree Lista de nós da árvore.
     */
    public TreeAnalyzer(List<TreeNode> tree) {
        this.tree = tree;
    }

    /**
     * Analisa a frase fornecida em relação à árvore.
     * 
     * @param phrase Frase a ser analisada.
     * @param depth Profundidade até onde a análise deve ser feita na árvore.
     * @return Mapa com os nomes dos nós e o número de correspondências encontradas.
     */
    public Map<String, Integer> analyzePhrase(String phrase, int depth) {
        // Divide a frase em palavras e converte para minúsculas
        String[] words = phrase.toLowerCase().split("\\s+");
        Map<String, Integer> results = new HashMap<>();
        // Inicia a busca na árvore
        searchTree(tree, words, depth, 1, results);
        return results;
    }

    /**
     * Busca recursivamente na árvore e conta as correspondências das palavras.
     * 
     * @param nodes Nós atuais da árvore a serem analisados.
     * @param words Palavras da frase a serem pesquisadas.
     * @param targetDepth Profundidade alvo para a pesquisa.
     * @param currentDepth Profundidade atual na árvore.
     * @param results Mapa para armazenar os resultados da análise.
     * @return Número total de correspondências encontradas.
     */
    private int searchTree(List<TreeNode> nodes, String[] words, int targetDepth, int currentDepth, Map<String, Integer> results) {
        int totalMatches = 0;

        for (TreeNode node : nodes) {
            // Se a profundidade atual é maior ou igual à profundidade alvo
            if (currentDepth >= targetDepth) {
                int matchCount = 0;
                // Conta quantas palavras da frase correspondem ao nome do nó
                for (String word : words) {
                    if (node.getName().equalsIgnoreCase(word)) {
                        matchCount++;
                    }
                }
                // Busca nas crianças do nó
                int subMatches = searchTree(node.getChildren(), words, targetDepth, currentDepth + 1, results);
                totalMatches += matchCount + subMatches;

                // Se houver correspondências e a profundidade atual é a profundidade alvo
                if (totalMatches > 0 && currentDepth == targetDepth) {
                    results.put(node.getName(), results.getOrDefault(node.getName(), 0) + totalMatches);
                }
            } else {
                // Continua a busca nas crianças do nó
                totalMatches += searchTree(node.getChildren(), words, targetDepth, currentDepth + 1, results);
            }
        }

        return totalMatches;
    }
}
