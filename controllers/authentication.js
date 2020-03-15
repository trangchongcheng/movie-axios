function checkAuthentication() {
    const credentials = localStorage.getItem("credentials");
    const isLoginPage =window.location.pathname==="/views/login.html";
    if(credentials){
       var page = window.location.pathname;
       if(isLoginPage){
        window.location.assign('index.html');
       }
       return;
    }
    !isLoginPage && window.location.assign('login.html')
    
  }

//   function checkAuthentication() {
//     const credentials = localStorage.getItem("credentials");
//     if(credentials){
//        var page = window.location.pathname;
//        if(page!=="/views/login.html") return;
//         window.location.assign('index.html')
//         return;
//   }
//   window.location.assign('login.html');
// }
  checkAuthentication();