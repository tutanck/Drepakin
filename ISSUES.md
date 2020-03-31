# Feel free to add any issues you found while developping here as a reminder

- {"type":"NotFoundError","error":{"message":"No document found for query \"{ center_id: 5daad1ccf8472913cbbcc5e7,\n user_id: '1572815170779' }\" on model \"ExpertCenterRate\"","name":"DocumentNotFoundError","filter":{"center_id":"5daad1ccf8472913cbbcc5e7","user_id":"1572815170779"},"query":{"center_id":"5daad1ccf8472913cbbcc5e7","user_id":"1572815170779"}}}

- se connecter puis noter un ec puis se deconnecter -> modal merci votre note a bien été prise en compte

- ne reload pas les ec avec les bonnes infos après connection déconnection

- Ne recharge pas les ecs après login/logout

* Warning: Failed prop type: The prop `children` is marked as required in `ForwardRef(Link)`, but its value is `undefined`.
  in ForwardRef(Link) (created by WithStyles(ForwardRef(Link)))
  in WithStyles(ForwardRef(Link)) (at CenterCard.js:377)
  in p (created by ForwardRef(Typography))
  in ForwardRef(Typography) (created by WithStyles(ForwardRef(Typography)))
  in WithStyles(ForwardRef(Typography)) (at CenterCard.js:374)
  in div (created by ForwardRef(CardContent))
  in ForwardRef(CardContent) (created by WithStyles(ForwardRef(CardContent)))
  in WithStyles(ForwardRef(CardContent)) (at CenterCard.js:350)
  in div (created by Transition)
  in div (created by Transition)
  in div (created by Transition)
  in Transition (created by ForwardRef(Collapse))
  in ForwardRef(Collapse) (created by WithStyles(ForwardRef(Collapse)))
  in WithStyles(ForwardRef(Collapse)) (at CenterCard.js:349)
  in div (created by ForwardRef(Paper))
  in ForwardRef(Paper) (created by WithStyles(ForwardRef(Paper)))
  in WithStyles(ForwardRef(Paper)) (created by ForwardRef(Card))
  in ForwardRef(Card) (created by WithStyles(ForwardRef(Card)))
  in WithStyles(ForwardRef(Card)) (at CenterCard.js:172)
  in CenterCard (at MainPage.js:105)
  in div (created by ForwardRef(Grid))
  in ForwardRef(Grid) (created by WithStyles(ForwardRef(Grid)))
  in WithStyles(ForwardRef(Grid)) (at MainPage.js:104)
  in div (created by ForwardRef(Grid))
  in ForwardRef(Grid) (created by WithStyles(ForwardRef(Grid)))
  in WithStyles(ForwardRef(Grid)) (at MainPage.js:102)
  in div (at MainPage.js:99)
  in MainPage (at App.js:45)
  in ThemeProvider (at App.js:37)
  in div (at App.js:36)
  in div (at App.js:35)
  in App (at src/index.js:7)

  - perf issues on search enter (keyboard input) : too many re-render
