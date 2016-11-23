package jwd.wafepa.repository;

import jwd.wafepa.model.Author;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//Da bismo radili sa celom listom, koristimo JpaRepository
@Repository
public interface AuthorRepository  
extends JpaRepository<Author, Long>{

}
