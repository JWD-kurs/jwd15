package jwd.wafepa.service;

import jwd.wafepa.model.Book;

import org.springframework.data.domain.Page;

public interface BookService {
	Book findOne(Long id);
	Page<Book> findAll(int page);
	Book save(Book book);
	Book delete(Long id);
}
