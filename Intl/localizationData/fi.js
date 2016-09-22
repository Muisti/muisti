export default {
  locale: 'fi',
  messages: {
    siteTitle: 'Muistiprojekti',
    addPost: 'Lisää viesti',
    switchLanguage: 'Vaihda kieli',
    twitterMessage: 'Twitter viesti',
    by: 'Tekijä',
    deletePost: 'Poista viesti',
    createNewPost: 'Tee uusi viesti',
    authorName: 'Kirjoittajan nimi',
    postTitle: 'Postauksen otsikko',
    postContent: 'Postauksen sisältö',
    submitAdd: 'Lisää',
    submitEdit: 'Tallenna',
    isImportant: 'On tärkeä',
    cancel: 'Peruuta',
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
