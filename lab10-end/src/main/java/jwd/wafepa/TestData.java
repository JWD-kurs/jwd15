package jwd.wafepa;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jwd.wafepa.model.Activity;
import jwd.wafepa.model.Address;
import jwd.wafepa.model.Author;
import jwd.wafepa.model.Book;
import jwd.wafepa.model.User;
import jwd.wafepa.service.ActivityService;
import jwd.wafepa.service.AddressService;
import jwd.wafepa.service.AuthorService;
import jwd.wafepa.service.BookService;
import jwd.wafepa.service.UserService;

@Component
public class TestData {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AddressService addressService;

	@Autowired
	private ActivityService activityService;

	@Autowired
	private AuthorService authorService;

	@Autowired
	private BookService bookService;

	
	@PostConstruct
	public void init(){
		/*Author francKafka = new Author("Franc", "Kafka");
		authorService.save(francKafka);
		
		Book b = new Book("Proces");
		b.getAuthors().add(francKafka);
		bookService.save(b);

		b = new Book("Zamak");
		b.getAuthors().add(francKafka);
		bookService.save(b);
		
		Author martinHajdeger = new Author("Martin", "Hajdeger");
		authorService.save(martinHajdeger);
		
		b = new Book("Bitak i vreme");
		b.getAuthors().add(martinHajdeger);
		bookService.save(b);

		Author fridrihNice = new Author("Fridrih", "Nice");
		authorService.save(fridrihNice);

		b = new Book("Tako je govorio Zaratustra");
		b.getAuthors().add(fridrihNice);
		bookService.save(b);
		
		Author zilDelez = new Author("Zil", "Delez");
		authorService.save(zilDelez);
		Author feliksGatari = new Author("Feliks", "Gatari");
		authorService.save(feliksGatari);

		b = new Book("Hiljadu ravni");
		b.getAuthors().add(zilDelez);
		b.getAuthors().add(feliksGatari);
		bookService.save(b);*/
		
/*	       for (int i = 1; i <= 100; i++) {
	            User user = new User();
	            user.setFirstName("First name " + i);
	            user.setLastName("Last name " + i);
	            user.setEmail("email" + i + "@example.com");
	            user.setPassword("123");
	            userService.save(user);

	            for (int j = 1; j <= 3; j++) {
	                Address address = new Address();
	                address.setNumber(j + "c/7");
	                address.setStreat("Narodnog fronta");

//	                address.setUser(user);
	                user.addAddress(address);
	                addressService.save(address);
	            }
	            Activity activity = new Activity("Activity "+i);
	            activity.getUsers().add(user);
	            activityService.save(activity);
	       }
*/	}
}
