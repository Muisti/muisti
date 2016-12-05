export default {
  locale: 'fi',
  messages: {
    //General
    siteTitle: 'Muistiprojekti',
    switchLanguage: 'Vaihda kieli',
    logInUser: 'Hei {user}',
    twitterMessage: 'Twitter viesti',
    submitAdd: 'Lisää',
    submitCreate: 'Luo',
    submitEdit: 'Tallenna',
    submitRemove: 'Poista',
    submitGo: 'Siirry',
    submitBack: 'Palaa',
    cancel: 'Peruuta',
    //Posts
    addPost: 'Lisää viesti',
    deletePost: 'Poista',
    editPostLink: 'Muokkaa',
    createNewPost: 'Uusi viesti',
    editPost: 'Muokkaa viestiä',
    authorName: 'Kirjoittajan nimi',
    postTitle: 'Postauksen otsikko',
    postContent: 'Postauksen sisältö',
    isPrivate: 'Näytä vain minulle',
    by: 'Tekijä',
    //Modules
    addModule: 'Lisää moduuli',
    deleteModule: 'Poista moduuli',
    moduleTitle: 'Otsikko',
    moduleContent: 'Kuvaus',
    //Sections
    addSection: 'Lisää osio',
    deleteSection: 'Poista osio',
    sectionTitle: 'Osion otsikko, valinnainen',
    sectionContent: 'Osion sisältö',
    sectionLink: 'Linkki multimediasisältöön (kuvat, videot ym.)',
    sectionLinknotValid:'Ei validi Osoite',
    addingSection: 'Uuden osion lisäys:',
    //Quizzes
    addQuiz: 'Lisää tehtävä',
    addQuizTitle: 'Luodaan uutta tehtävää',
    editQuizTitle: 'Muokataan tehtävää',
    question: 'Kysymys',
    option: 'Vaihtoehto',
    rightAnswer: 'Tämä on oikein',
    quizPanelTitle: 'Tehtävät',
    rightAnswerFeedback: 'Oikein!',
    oneWrongAnswer: 'Yksi valinta väärin!',
    severalWrongAnswers: 'Vääriä valintoja {count}!',
    selectOption: 'Valitse vähintään yksi vaihtoehto',
    check: 'Tarkista',
    //Registration and user control
    displayRegisterModal: 'Rekisteröidy',
    displayEditMenuItem: 'Muuta käyttäjän tietoja',
    displayEditModal: 'Lähetä muutokset',
    registrationSuccessful_title: 'Rekisteröityminen onnistui!',
    registrationSuccessful_info: 'Vahvistusviesti on lähetetty sähköpostiisi.',
    editSuccessful: 'Muokkaukset tallennettu!',
    editFailed: 'Muokkausten tallentaminen epäonnistui!',
    sendConfirmFail: 'Rekisteröityminen epäonnistui, koska vahvistusviestiä ei voitu lähettää'
                        + 'Onko sähköpostiosoitteesi toimiva?',
    registerTitle: "Uuden käyttäjän rekisteröinti",
    editTitle: "Käyttäjän tietojen hallinta",
    userAlreadyExists: `Käyttäjä {user} on jo olemassa!`,
    emailNotValid: 'Sähköpostiosoitteessa on kirjoitusvirhe!',
    nameNotValid: 'Etunimi tai sukunimi puuttuu.',
    passwordNotValid: 'Salasana ei ole tarpeeksi vahva.'
                            + ' Salasanan on oltava yli 8 merkkiä pitkä',
    verifyError: 'Salasanat eivät täsmää. Korjaa kirjoitusvirheet.',
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
    logOutButton: 'Kirjaudu ulos',

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
