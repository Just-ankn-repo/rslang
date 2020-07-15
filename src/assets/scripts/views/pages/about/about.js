/* eslint-disable no-param-reassign */
const About = {
    render : async () => {
        const view =  /* html */`
            <section class="section">
                <h1 class="about-us__heading"> About Us</h1>
            </section>

            <div class="cards">

                <div class="card">
                  <div class="card__image-holder">
                    <div class="card__image_andrey"></div>
                  </div>
                  <div class="card-title">
                    <a href="#" class="toggle-info btn">
                      <span class="left"></span>
                      <span class="right"></span>
                    </a>
                    <h2>
                        Андрей</br>Кнышенко
                        <small>Team Lead</small>
                    </h2>
                  </div>
                  <div class="card-flap flap1">
                    <div class="card-description">
                    Project structure</br>
                    Routing for SPA</br>
                    Authorization</br>
                    Backend integration</br>
                    Team communication.
                    </div>
                  </div>
                </div>

                <div class="card">
                <div class="card__image-holder">
                  <div class="card__image_sergei"></div>
                </div>
                <div class="card-title">
                  <a href="#" class="toggle-info btn">
                    <span class="left"></span>
                    <span class="right"></span>
                  </a>
                  <h2>
                      Сергей</br>Трусило
                      <small>Software engineer</small>
                  </h2>
                </div>
                <div class="card-flap flap1">
                  <div class="card-description">
                    English puzzle game</br>
                    English Quiz game
                  </div>
                  <div class="card-flap flap2">
                  </div>
                </div>
              </div>

              <div class="card">
              <div class="card__image-holder">
                <div class="card__image_denis"></div>
              </div>
              <div class="card-title">
                <a href="#" class="toggle-info btn">
                  <span class="left"></span>
                  <span class="right"></span>
                </a>
                <h2>
                    Денис</br>Короткевич
                    <small>Software engineer</small>
                </h2>
              </div>
              <div class="card-flap flap1">
                <div class="card-description">
                  Audiochallange game</br>
                  Sprint game
                </div>
                <div class="card-flap flap2">
                </div>
              </div>
            </div>

            <div class="card">
            <div class="card__image-holder">
              <div class="card__image_irina"></div>
            </div>
            <div class="card-title">
              <a href="#" class="toggle-info btn">
                <span class="left"></span>
                <span class="right"></span>
              </a>
              <h2>
              Ирина</br>Тельнова
                  <small>Software engineer</small>
              </h2>
            </div>
            <div class="card-flap flap1">
              <div class="card-description">
                Learning card</br>
                Savannah game
              </div>
              <div class="card-flap flap2">
              </div>
            </div>
          </div>

          <div class="card">
          <div class="card__image-holder">
            <div class="card__image_valeria"></div>
          </div>
          <div class="card-title">
            <a href="#" class="toggle-info btn">
              <span class="left"></span>
              <span class="right"></span>
            </a>
            <h2>
                Валерия</br>Корженевская
                <small>Software engineer</small>
            </h2>
          </div>
          <div class="card-flap flap1">
            <div class="card-description">
            SpeakIt game</br>
            About us page</br>
            Dictionary page</br>
            Design for navigation</br>
            Design for sign up
            </div>
            <div class="card-flap flap2">
            </div>
          </div>
        </div>

        
                

              
              </div>
        `
        return view
    },    
    
    after_render: async () => {
      let zindex = 10;
        
      document.querySelectorAll("div.card").forEach(element => {
        element.addEventListener('click', (e) => {
          e.preventDefault();

          let isShowing = false;

          if (element.classList.contains("show")) {
            isShowing = true
          }

          if (document.querySelector("div.cards").classList.contains("showing")) {
            document.querySelector("div.card.show").classList.remove("show");

            if (isShowing) {
              document.querySelector("div.cards").classList.remove("showing");
            } else {
              element.style.zIndex=zindex;
              element.classList.add("show");
            }
            zindex += 1;
          } else {
            document.querySelector("div.cards").classList.add("showing");
            element.style.zIndex=zindex;
            element.classList.add("show");

            zindex += 1;
          }
        });
      });
    }      
}

export default About;