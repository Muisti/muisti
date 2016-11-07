export default {
  locale: 'fi',
  messages: {
    siteTitle: 'Muistiprojekti',
    addPost: 'Lisää viesti',
    switchLanguage: 'Vaihda kieli',
    twitterMessage: 'Twitter viesti',
    by: 'Tekijä',
    deletePost: 'Poista',
    editPostLink: 'Muokkaa',
    createNewPost: 'Uusi viesti',
    editPost: 'Muokkaa viestiä',
    authorName: 'Kirjoittajan nimi',
    postTitle: 'Postauksen otsikko',
    postContent: 'Postauksen sisältö',
    submitAdd: 'Lisää',
    submitEdit: 'Tallenna',
    isPrivate: 'Näytä vain minulle',
    cancel: 'Peruuta',
    displayRegisterModal: 'Rekisteröidy',
    registrationSuccessful_title: 'Rekisteröityminen onnistui!',
    registrationSuccessful_info: 'Vahvistusviesti on lähetetty sähköpostiisi.',
    sendConfirmFail: 'Rekisteröityminen epäonnistui, koska vahvistusviestiä ei voitu lähettää'
                        + 'Onko sähköpostiosoitteesi toimiva?',
    registerTitle: "Uuden käyttäjän rekisteröinti",
    userAlreadyExists: `Käyttäjä {user} on jo olemassa!`,
    emailNotValid: 'Sähköpostiosoitteessa on kirjoitusvirhe!',
    nameNotValid: 'Etunimi tai sukunimi puuttuu.',
    passwordNotValid: 'Salasana ei ole tarpeeksi vahva.'
                            + ' Salasanan on oltava yli 8 merkkiä pitkä',
    formEmail: 'Sähköposti',
    formName: 'Etunimi',
    formSurname: 'Sukunimi',
    formPassword: 'Salasana',
    formPassVerify: 'Vahvista salasana',
    notConfirmedTitle: 'Virhe: Käyttäjätilisi rekisteröintiä ei ole vahvistettu.',
    notConfirmedInfo:  "Klikkaa sähköpostiisi lähetetyssä vahvistusviestissä olevaa linkkiä."
                + " Vahvistamistaminen on tarpeellista huijaustunnusten estämiseksi.",
    loggingIn: "Kirjaudutaan...",
    logInButton: "Kirjaudu",
    
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} (in real app this would be translated to Finnish)`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	} (in real app this would be translated to Finnish)`,
    nestedDateComment: `user {name} {value, plural,
  		  =0 {does not have any comments}
  		  =1 {has # comment}
  		  other {has # comments}
  		} as of {date} (in real app this would be translated to Finnish)`,
  },
};
