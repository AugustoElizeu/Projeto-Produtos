package com.projetoEstacio.extensao.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projetoEstacio.extensao.Models.Produto;

@Repository	
public interface ProdutoRepository extends JpaRepository<Produto, Long>{

}
