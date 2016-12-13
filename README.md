
# Palvelukokonaisuus muistisairaiden kanssa viestintään
[![Build Status](https://travis-ci.org/Muisti/muisti.svg?branch=master)](https://travis-ci.org/Muisti/muisti)

- [Projektikuvaus](https://ohtuprojekti.jamo.fi/topic_descriptions/132)

## Pikakäynnistys

- [Sivut Herokussa](https://ohtumuisti.herokuapp.com/)

## Ohje

Asennusohje: NOT READY / EI VALMIS

Kloonaa tämä kansio

`git clone https://github.com/Muisti/muisti.git <name-of-the-folder>`

Siirry kansion sisälle

`cd <name-of-the-folder>`

Varmista että sinulla on node ja npm. Sitten asenna riippuvuudet kutsulla

`npm install`

Rakenna sovellus 

`npm run bs`
  
Käynnistä sovellus

`npm start MONGO_URL=mongo-url PORT=port EMAIL=confirmation-email EPASSW=confirmation-email-password EMAILHOST=host-of-email`
  
Esimerkki:
```
git clone https://github.com/Muisti/muisti.git muisti

cd muisti

npm install

npm run bs

npm start MONGO_URL=mongodb://username:password@ds147487.mlab.com:47487/osoite PORT=8000 EMAIL=test@gmail.com EPASSW=3fa9Kj49dfcvFD EMAILHOST=smtp.gmail.com
```
  
Myöhemmin voit lisätä adminin lisäämällä muuttujan NEWADMIN=admin-email

## Dokumentaatio

- [Burndown kaaviot ja backlog](https://docs.google.com/spreadsheets/d/1NisT05P_gyy_HbcJHzDIGEkS4Vf98-G_iQiY2LTDpFw/edit?usp=sharing)

Definition of done:

1. Tehty työ noudattaa clean codea ja on kommentoitua toisia kehittäjiä varten.
 
2. Tehty työ automaattitestattua, mikäli kompleksisuus sen vaatii.

3. Tehty työ toimii sekä ihmiskäytössä että Travis CIllä.

## Lisenssi

<H2>[MIT](https://github.com/Muisti/muisti/blob/master/LICENSE)

