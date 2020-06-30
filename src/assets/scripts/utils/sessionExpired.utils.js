export default async (backend, afterSignMethod, data) => {
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
  
    authPopup.then((value) => {
      backend.signIn(value.email, value.password)
        .then(() => {
          backend[afterSignMethod](data).then((result) => {
            resolve (result);
          });
        })
        .catch((error) => {
          // console.log(error)
        });
    });

  });
}
