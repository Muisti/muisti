export default {
  locale: 'en',
  messages: {
    //General
    siteTitle: 'Memoryproject',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are on Twitter',
    submitAdd: 'Add',
    submitCreate: 'Create',
    submitEdit: 'Save',
    submitRemove: 'Remove',
    submitGo: 'Go',
    submitBack: 'Back',
    cancel: 'Cancel',
    //Posts
    addPost: 'Add Post',
    deletePost: 'Delete post',
    editPostLink: "Edit post",
    createNewPost: 'Create new post',
    editPost: "Edit post",
    authorName: 'Author\'s Name',
    postTitle: 'Post Title',
    postContent: 'Post Content',
    isPrivate: 'Private',
    by: 'By',
    //Modules
    addModule: 'Add module',
    deleteModule: 'Delete module',
    moduleTitle: 'Header',
    moduleContent: 'Introduction',
    //Sections
    addSection: 'Add section',
    deleteSection: 'Delete section',
    sectionTitle: 'Section header',
    sectionContent: 'Section content, optional',
    sectionLink: 'Link to Multimediacontent (images, videos etc.)',
    sectionLinknotValid: 'Not a valid URL',
    addingSection: 'Adding a new section:',
    //Quizzes
    addQuiz: 'Add quiz',
    addQuizTitle: 'Creating a new quiz',
    question: 'Question',
    option: 'Option',
    rightAnswer: 'This is correct',
    quizPanelTitle: 'Quizzes',
    rightAnswerFeedback: 'Congratulations, that is the right answer!',
    oneWrongAnswer: 'One wrong option!',
    severalWrongAnswers: 'The number of wrong options: {count}!',
    selectOption: 'Select at least one option',
    points: 'Points: {points}/{maxPoints}',
    check: 'Check',
    //Registration and user control
    displayRegisterModal: 'Register',
    registrationSuccessful_title: 'Registration successful!',
    registrationSuccessful_info: 'Confirmation link has been sent to your email address.',
    sendConfirmFail: 'Registration failed: Unable to send confirmation email. Is your email address working?',
    registerTitle: "Register new user",
    userAlreadyExists: `User {user} already exists!`,
    emailNotValid: 'Invalid email address!',
    nameNotValid: 'Please fill your name and surname correctly.',
    passwordNotValid: 'Your password is not strong enough. Password minimum length is 8 characters.',
    verifyError: 'Your password does not match with verification.',
    formEmail: 'Email',
    formName: 'First name',
    formSurname: 'Surname',
    formPassword: 'Password',
    formPassVerify: 'Confirm password',
    notConfirmedTitle: 'Error: Your user account is not confirmed.',
    notConfirmedInfo:  'Please open the link sent to your email address.',
    loggingIn: "Logging in...",
    logInButton: "Log in",
    logOutButton: 'Log out',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	}`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,
  },
};
