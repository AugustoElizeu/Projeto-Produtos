package com.projetoEstacio.extensao.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.projetoEstacio.extensao.Models.Produto;
import com.projetoEstacio.extensao.Repositories.ProdutoRepository;


@RestController
@RequestMapping("/api/produtosList")
public class ProdutoController {
	
		private ProdutoRepository pdtRepository;
		
		public ProdutoController(ProdutoRepository pdtController) {
			super();
			this.pdtRepository = pdtController;
		}

		@GetMapping
		public @ResponseBody List<Produto> list(){
			return pdtRepository.findAll();
		}
		
		@GetMapping("/{Id}")
		public ResponseEntity<Produto> findId(@PathVariable("Id") Long Id){
			
			return pdtRepository.findById(Id).map(record -> ResponseEntity.ok().body(record)).orElse(ResponseEntity.notFound().build());
		}
		
		@PostMapping
		public ResponseEntity<Produto> create(@RequestBody Produto prods){
				
			return ResponseEntity.status(HttpStatus.CREATED).body(pdtRepository.save(prods));
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<Produto> update(@PathVariable Long id, @RequestBody Produto prods) {
		    return pdtRepository.findById(id)
		    		 .map(record -> {
		                // Atualiza os campos do objeto com os dados do objeto recebido
		                record.setCodigo(prods.getCodigo());
		                record.setNome(prods.getNome());
		                record.setEstoque(prods.getEstoque());
		                record.setCategoria(prods.getCategoria());
		                record.setPreco(prods.getPreco());
		                
		                // Salva o objeto atualizado no repositório
		                Produto updated = pdtRepository.save(record);
		                return ResponseEntity.ok().body(updated);
		            })
		            .orElse(ResponseEntity.notFound().build());
		}
		
		@DeleteMapping("/{id}")
		public ResponseEntity<Void> delete(@PathVariable Long id) {
		    return pdtRepository.findById(id)
		        .map(record -> {
		            pdtRepository.deleteById(id);
		            return ResponseEntity.noContent().<Void>build();
		        })
		        .orElse(ResponseEntity.notFound().build());
		}
}
