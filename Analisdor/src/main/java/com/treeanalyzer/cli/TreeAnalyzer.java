package com.treeanalyzer.cli;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Classe responsável por analisar uma frase em relação a uma estrutura de árvore.
 */
public class TreeAnalyzer {
    private List<TreeNode> tree;

    public TreeAnalyzer(List<TreeNode> tree) {
        this.tree = tree;
    }

    public Map<String, Integer> analyzePhrase(String phrase, int depth) {
        String[] words = phrase.toLowerCase().split("\\s+");
        Map<String, Integer> results = new HashMap<>();
        searchTree(tree, words, depth, 1, results);
        return results;
    }

    private int searchTree(List<TreeNode> nodes, String[] words, int targetDepth, int currentDepth, Map<String, Integer> results) {
        int totalMatches = 0;

        for (TreeNode node : nodes) {
            if (currentDepth >= targetDepth) {
                // Verifica correspondências no nó atual
                int matchCount = 0;
                for (String word : words) {
                    if (node.getName().equalsIgnoreCase(word)) {
                        matchCount++;
                    }
                }

                // Verifica correspondências em subnós e soma os resultados
                int subMatches = searchTree(node.getChildren(), words, targetDepth, currentDepth + 1, results);
                totalMatches += matchCount + subMatches;

                // Armazena o resultado na profundidade alvo
                if (totalMatches > 0 && currentDepth == targetDepth) {
                    results.put(node.getName(), results.getOrDefault(node.getName(), 0) + totalMatches);
                }
            } else {
                // Continua descendo na árvore até atingir a profundidade especificada
                totalMatches += searchTree(node.getChildren(), words, targetDepth, currentDepth + 1, results);
            }
        }

        return totalMatches;
    }
}
