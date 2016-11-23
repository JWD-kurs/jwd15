package jwd.wafepa.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jwd.wafepa.model.Author;
import jwd.wafepa.model.Book;
import jwd.wafepa.repository.AuthorRepository;
import jwd.wafepa.repository.BookRepository;
import jwd.wafepa.service.BookService;

@Service
@Transactional
public class JpaBookService implements BookService{

	@Autowired
	BookRepository bookRepository;

	@Autowired
	AuthorRepository authorRepository;
	
	@Override
	public Book findOne(Long id) {
		return bookRepository.findOne(id);
	}

	@Override
	public Page<Book> findAll(int page) {
		return bookRepository.findAll(new PageRequest(page, 10));
	}

	@Override
	public Book save(Book book) {
		for (Author author : book.getAuthors()) {
			if (author.getId()==null) {
				author = authorRepository.save(author);
			}
		}
		return bookRepository.save(book);
	}

	@Override
	public Book delete(Long id) {
		Book book = bookRepository.findOne(id);
		if (book == null) {
			throw new IllegalArgumentException("Tried to delete"
					+ "non-existant activity");			
		}
		bookRepository.delete(book);
		//posto su authors default lazy, treba da preuzmemo sve vrednosti iz baze
		//da bi objekat mogao da se serijalizuje u JSON
		//nije dovoljno da pozovemo book.getAuthors(), morali smo da uradimo nesto sa 
		//povratnom vrednoscu (System.out.println...), jer se inace metoda ne bi realno izvrsila
		System.out.println(book.getAuthors());
		return book;
	}

}
