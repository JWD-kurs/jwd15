package jwd.wafepa.service;

import java.util.List;

import jwd.wafepa.model.Author;
public interface AuthorService {
	Author save(Author author);
	List<Author> findAll();

}
