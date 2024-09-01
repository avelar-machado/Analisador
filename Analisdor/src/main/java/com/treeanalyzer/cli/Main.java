/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Project/Maven2/JavaApp/src/main/java/${packagePath}/${mainClassName}.java to edit this template
 */

package com.treeanalyzer.cli;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Classe principal para executar a aplicação a partir da linha de comando.
 */
public class Main {
    public static void main(String[] args) {
        // Verifica se os argumentos fornecidos são válidos
        if (args.length < 3 || !args[0].equals("analyze")) {
            System.out.println("Usage: java -jar cli.jar analyze --depth <n> \"{phrase}\" [--verbose]");
            return;
        }

        int depth = 0;
        boolean verbose = false;
        String phrase = "";

        // Processa os argumentos da linha de comando
        for (int i = 1; i < args.length; i++) {
            switch (args[i]) {
                case "--depth":
                    if (i + 1 < args.length) {
                        depth = Integer.parseInt(args[++i]);
                    }
                    break;
                case "--verbose":
                    verbose = true;
                    break;
                default:
                    phrase = args[i];
                    break;
            }
        }

        // Verifica se todos os parâmetros necessários foram fornecidos
        if (depth == 0 || phrase.isEmpty()) {
            System.out.println("Depth and phrase must be specified.");
            return;
        }

        // Carrega a árvore do arquivo JSON
        long startLoadTime = System.currentTimeMillis();
        try {
            List<TreeNode> tree = JsonLoader.loadTreeFromJson("dicts/hierarchy.json");
            long loadTime = System.currentTimeMillis() - startLoadTime;

            // Analisa a frase e calcula o tempo de execução
            TreeAnalyzer analyzer = new TreeAnalyzer(tree);
            long startSearchTime = System.currentTimeMillis();
            Map<String, Integer> results = analyzer.analyzePhrase(phrase, depth);
            long searchTime = System.currentTimeMillis() - startSearchTime;

            // Imprime os resultados da análise
            if (results.isEmpty()) {
                System.out.println("0;");
            } else {
                results.forEach((key, value) -> System.out.println(key + " = " + value + ";"));
            }

            // Imprime o tempo de carregamento e de verificação, se o modo verbose estiver ativado
            if (verbose) {
                System.out.println("Tempo de carregamento dos parâmetros: " + loadTime + "ms");
                System.out.println("Tempo de verificação da frase: " + searchTime + "ms");
            }
        } catch (IOException e) {
            System.err.println("Erro ao carregar o arquivo JSON: " + e.getMessage());
        }
    }
}
