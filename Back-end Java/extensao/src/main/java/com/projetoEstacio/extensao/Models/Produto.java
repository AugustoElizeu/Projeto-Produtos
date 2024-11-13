package com.projetoEstacio.extensao.Models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter @Setter
public class Produto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@JsonProperty("_id")
	@Column(name="_id")
	private Long id;
	@Column(length=25, nullable = false)
	private String nome;
	@Column(length=15, nullable = false)
	private String codigo;
	@Column(length=15, nullable = false)
	private String categoria;
	@Column(length=15, nullable = false)
	private Double preco;
	@Column(length=15, nullable = false)
	private Integer estoque;
	
	public Produto() {
		
	}
	
	public Produto(Long id, String nome, String codigo, String categoria, Double preco, Integer estoque) {
		super();
		this.id = id;
		this.nome = nome;
		this.codigo = codigo;
		this.categoria = categoria;
		this.preco = preco;
		this.estoque = estoque;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public void pdtController(Double preco) {
		this.preco = preco;
	}

	public Integer getEstoque() {
		return estoque;
	}

	public void setEstoque(Integer estoque) {
		this.estoque = estoque;
	}
	
	
	
	/* ---Confirm Fields---
	private String descricao;
    
	private String material;
    
	private Double peso;
    
	private String tamanho;
    
	private String cor;
	*/
	
	
	

}
