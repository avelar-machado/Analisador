/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.treeanalyzer.cli;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * Classe responsável por carregar a árvore a partir de um arquivo JSON.
 */
public class JsonLoader {
    /**
     * Carrega a árvore de um arquivo JSON.
     * 
     * @param filePath Caminho para o arquivo JSON.
     * @return Lista de nós da árvore.
     * @throws IOException Se ocorrer um erro ao ler o arquivo JSON.
     */
    public static List<TreeNode> loadTreeFromJson(String filePath) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        // Lê o arquivo JSON e o converte em uma lista de TreeNode
        return mapper.readValue(new File(filePath), mapper.getTypeFactory().constructCollectionType(List.class, TreeNode.class));
    }
}
