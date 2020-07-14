export default async (backend, afterSignMethod, data) => {
  console.log(backend)
  return new Promise((resolve) => {
    const authPopup = new Promise((resolve) => {
      const dialog = document.getElementById('favDialog');
      dialog.returnValue = 'Authorization';
      dialog.showModal();
    
      dialog.addEventListener('submit', () => {
        const userEmail = document.getElementById('signin-email').value;
        const userPassword = document.getElementById('signin-password').value;
        resolve({email: userEmail, password: userPassword});
      });
    
    });


    backend.getNewToken(backend.userId, backend.refreshToken)
        .then(() => {
          backend[afterSignMethod](data).then((result) => {
            resolve (result);
          })
          .catch((error) => {
            console.log(error)
          });
        })
        .catch((e) => {
          authPopup.then((value) => {
            backend.signIn(value.email, value.password)
              .then(() => {
                backend[afterSignMethod](data).then((result) => {
                  console.log(backend)
                  resolve (result);
                });
              })
              .catch((error) => {
                console.log(error)
              });
          });
        })
  });
}
