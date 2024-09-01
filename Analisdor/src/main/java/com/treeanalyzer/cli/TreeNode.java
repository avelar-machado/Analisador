/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.treeanalyzer.cli;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * Representa um nó na estrutura da árvore.
 */
public class TreeNode {
    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("children")
    private List<TreeNode> children;

    // Construtor padrão
    public TreeNode() {
    }

    // Getters e Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }
}
