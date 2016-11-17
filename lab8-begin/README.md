## Lab 8 - Bootstrap, Forme


### Bootstrap

Bootstrap predstavlja biblioteku CSS (CSS3) klasa, kao i pomoćnih JavaScript funkcija.
Kompatibilan je isključivo sa HTML5 dokumentima. Baziran je na tzv. "responsive design" principu,
i omogućava lako prilagođavanje web aplikacije mobilnim uređajima (tablet, smartphone, ...).

Veoma je dobro dokumentovan, sa velikim brojem primera korišćenja. Bootstrap se može preuzeti na ovom [http://getbootstrap.com/](http://getbootstrap.com/).

----

* Downloadovati Bootstrap CSS i importovati u projekat.

* Iskoristiti neki od Bootstrap primera kao šablon za WAFEPA web aplikaciju. Primeri na [http://getbootstrap.com/getting-started/#examples](http://getbootstrap.com/getting-started/#examples).

* Iskoristiti Bootstrap stilove za tabele na stranici za prikaz aktivnosti.

* Iskoristiti Bootstrap stilove za forme na stranici za prikaz dodavanje/izmenu aktivnosti.

* Ubaciti "loading spinner" koji se prikazuje dok se aktivnosti učitavaju sa servera.

Potreban CSS kod:

```css
.glyphicon-refresh-animate {
    -animation: spin .7s infinite linear;
    -ms-animation: spin .7s infinite linear;
    -webkit-animation: spinw .7s infinite linear;
    -moz-animation: spinm .7s infinite linear;
}
 
@keyframes spin {
    from { transform: scale(1) rotate(0deg);}
    to { transform: scale(1) rotate(360deg);}
}
  
@-webkit-keyframes spinw {
    from { -webkit-transform: rotate(0deg);}
    to { -webkit-transform: rotate(360deg);}
}
 
@-moz-keyframes spinm {
    from { -moz-transform: rotate(0deg);}
    to { -moz-transform: rotate(360deg);}
}
```

### Domaći zadatak

1. Eksperimentisati sa Bootstrap CSS i komponentama
2. Pogledati alternativu za Bootstrap, a to je Material design (by Google) - [http://materializecss.com/](http://materializecss.com/)
3. Napraviti da je alert sa porukom greške na stranici za prikaz aktivnosti "dissmissable", tj. da može da se ugasi.
4. Na stranici za prikaz svih aktivnosti pored naslova stranica ispisati ukupan broj aktivnosti (iskoristiti Bootstrap badges).
5. Na stranici za dodavanje aktivnosti naslov da bude samo "Add activity".
5. Na stranici za izmenu aktivnosti naslov da bude samo "Edit activity".## Lab 7 - AngularJS $http servis, REST

----

### $http servis

$http servis služi za komunikaciju sa HTTP serverom, u ovom slučaju REST serverom. Podržana je većina HTTP metoda, ali najčešće su get, put, post, delete.
Primeri korišćenja:

```javascript
$http.get('route') 									// poziva se GET route (route je putanja resursa ili kolekcije na REST servisu)
		.success(function(data, status) {			// ako je status 2xx (npr. 200 OK), u data se nalaze trazeni podaci
			// do something
		})
		.error(function(data, status) { 			// ako se dogodila greska, tj. ako status nije 2xx
			// handle error
		});
		
		
$http.post('route', { attrName : 'attrValue'})		// route je putanja kolekcije, drugi parametar je objekat koji se dodaje u kolekciju
		.success(...)
		.error(...)
		
$http.put('route', { attrName : 'attrValue'})		// route je putanja resursa, drugi parametar je objekat predstavlja izmenjen resurs
		.success(...)
		.error(...)
		
$http.delete('route')								// route je putanja resursa koji se briše
		.success(...)
		.error(...)
		
```

Za više informacija o $http servisu pogledati AngularJS dokumentaciju [https://docs.angularjs.org/api/ng/service/$http](https://docs.angularjs.org/api/ng/service/$http)

---

* Implementirati prikaz aktivnosti na stranici /activities. Aktivnosti prikazati u tabeli.

* Implementirati brisanje jedne aktivnosti klikom na dugme Delete.

* Implementirati dodavanje nove aktivnosti na stranici /activities/add. Nakon uspešnog dodavanja aktivnosti,
korisnika redirektovati na /activities stranicu.

* Implementirati izmenu postojeće aktivnosti na stranici /activities/edit/:id. Nakon uspešne izmene aktivnosti,
korisnika redirektovati na /activities stranicu.

----

### $location servis

$location servis služi za programsko čitanje i menjanje URL adrese u address baru browsera.
Primer korišćenja:

```javascript
$location.path('/route'); 		// redirekcija korisnika na "/route" stranicu
```

Za više informacija o $location servisu pogledati AngularJS dokumentaciju [https://docs.angularjs.org/api/ng/service/$location](https://docs.angularjs.org/api/ng/service/$location)

----

### $routeParams servis

$routeParams servis služi za čitanje parametara rute. Parametri rute se definišu sa dvotačkom i imenom parametra (npr. :id).
Ukoliko neka ruta sadrži parametre rute, (npr. konkretno za stranicu za izmenu aktivnosti sa id=5 -> /#/activities/edit/5),
vrednost parametra rute se može dobiti kroz $routeParams objekat, koji je zapravo mapa (key-value), tako što se 
traži vrednost po ključu imena parametra (npr. za prethodni primer -> vrednost $routeParams.id će biti 5).

Za više informacija o $routeParams servisu pogledati AngularJS dokumentaciju [https://docs.angularjs.org/api/ngRoute/service/$routeParams](https://docs.angularjs.org/api/ngRoute/service/$routeParams)

----

### Domaći zadaci

* Uraditi za korisnike sve što je urađeno na času za aktivnosti
* Na stranici za dodavanje aktivnosti, onemogućiti klik na dugme "Save" ukoliko je polje za ime aktivnosti prazno.
* Na stranici za prikaz svih aktivnosti, dodati dugme "Reverse". Kada se klikne ovo dugme, obrnuti redosled prikazanih aktivnosti.
* Na stranici za prikaz svih aktivnosti, u koloni "Actions" dodati dugme "View" za svaku aktivnost. Kada se klikne ovo dugme,
otvara se stranica koja je vizuelno ista kao "add" i "edit" stranice, ali je onemogućeno menjanje imena aktivnost i ne postoji dugme "Save".
* Dodati novu stranicu "Countries" u kojoj će se prikazivati spisak zemalja - iskoristiti REST Countries API [http://restcountries.eu/](http://restcountries.eu/)