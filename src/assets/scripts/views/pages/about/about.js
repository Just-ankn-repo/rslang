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
                    <img class="card__image" src=""/>
                  </div>
                  <div class="card-title">
                    <a href="#" class="toggle-info btn">
                      <span class="left"></span>
                      <span class="right"></span>
                    </a>
                    <h2>
                        Андрей</br>Кнышенко
                        <small>Seeking to obtain a position with a company 
                            that has a vision and rewards hard work, strong 
                            ethics and is open to out-of-the-box thinking.
                        </small>
                    </h2>
                  </div>
                  <div class="card-flap flap1">
                    <div class="card-description">
                      This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc.
                    </div>
                    <div class="card-flap flap2">
                      <div class="card-actions">
                        <div class="social-btn_skype"><a href="#"></a></div>
                        <div class="social-btn_discord"><a href="#"></a></div>
                        <div class="social-btn_github"><a href="#"></a></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card">
                <div class="card__image-holder">
                  <img class="card__image" src=""/>
                </div>
                <div class="card-title">
                  <a href="#" class="toggle-info btn">
                    <span class="left"></span>
                    <span class="right"></span>
                  </a>
                  <h2>
                      Сергей</br>Трусило
                      <small>Seeking to obtain a position with a company 
                          that has a vision and rewards hard work, strong 
                          ethics and is open to out-of-the-box thinking.
                      </small>
                  </h2>
                </div>
                <div class="card-flap flap1">
                  <div class="card-description">
                    This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc.
                  </div>
                  <div class="card-flap flap2">
                    <div class="card-actions">
                      <div class="social-btn_telegram"><a href="#"></a></div>
                      <div class="social-btn_vk"><a href="#"></a></div>
                      <div class="social-btn_discord"><a href="#"></a></div>
                      <div class="social-btn_github"><a href="#"></a></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card">
              <div class="card__image-holder">
                <img class="card__image" src=""/>
              </div>
              <div class="card-title">
                <a href="#" class="toggle-info btn">
                  <span class="left"></span>
                  <span class="right"></span>
                </a>
                <h2>
                    Денис</br>Короткевич
                    <small>Seeking to obtain a position with a company 
                        that has a vision and rewards hard work, strong 
                        ethics and is open to out-of-the-box thinking.
                    </small>
                </h2>
              </div>
              <div class="card-flap flap1">
                <div class="card-description">
                  This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc.
                </div>
                <div class="card-flap flap2">
                  <div class="card-actions">
                    <div class="social-btn_telegram"><a href="#"></a></div>
                    <div class="social-btn_vk"><a href="#"></a></div>
                    <div class="social-btn_discord"><a href="#"></a></div>
                    <div class="social-btn_github"><a href="#"></a></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
            <div class="card__image-holder">
              <img class="card__image" src=""/>
            </div>
            <div class="card-title">
              <a href="#" class="toggle-info btn">
                <span class="left"></span>
                <span class="right"></span>
              </a>
              <h2>
              Ирина</br>Тельнова
                  <small>Seeking to obtain a position with a company 
                      that has a vision and rewards hard work, strong 
                      ethics and is open to out-of-the-box thinking.
                  </small>
              </h2>
            </div>
            <div class="card-flap flap1">
              <div class="card-description">
                This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc.
              </div>
              <div class="card-flap flap2">
                <div class="card-actions">
                  <div class="social-btn_telegram"><a href="#"></a></div>
                  <div class="social-btn_vk"><a href="#"></a></div>
                  <div class="social-btn_discord"><a href="#"></a></div>
                  <div class="social-btn_github"><a href="#"></a></div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
          <div class="card__image-holder">
            <img class="card__image" src=""/>
          </div>
          <div class="card-title">
            <a href="#" class="toggle-info btn">
              <span class="left"></span>
              <span class="right"></span>
            </a>
            <h2>
                Валерия</br>Корженевская
                <small>Seeking to obtain a position with a company 
                    that has a vision and rewards hard work, strong 
                    ethics and is open to out-of-the-box thinking.
                </small>
            </h2>
          </div>
          <div class="card-flap flap1">
            <div class="card-description">
              This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc.
            </div>
            <div class="card-flap flap2">
              <div class="card-actions">
                <div class="social-btn_telegram"><a href="#"></a></div>
                <div class="social-btn_vk"><a href="#"></a></div>
                <div class="social-btn_discord"><a href="#"></a></div>
                <div class="social-btn_github"><a href="#"></a></div>
              </div>
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