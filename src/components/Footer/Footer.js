import React from "react";
import "./Footer.scss";

import vk from "../../../public_html/wp-content/themes/pozitiv/img/soc-icon/vk.svg";
import telegram from "../../../public_html/wp-content/themes/pozitiv/img/soc-icon/telegram.svg";
import whatsapp from "../../../public_html/wp-content/themes/pozitiv/img/soc-icon/whatsapp.svg";
import viber from "../../../public_html/wp-content/themes/pozitiv/img/soc-icon/viber.svg";
import payImg from "../../../public_html/wp-content/themes/pozitiv/img/payImg.jpg";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__header">
                <div className="forlink" id="offer"></div>
                <h2 className="footer__title anim__title " id="footer">
                    Контакты
                </h2>
            </div>
            <div className="footer__container">
                <nav className="footer__nav">
                    <a href="tel:+79226999898" className="footer__link">
                        +7 (922) 699-98-98
                    </a>
                    <p className="footer__container-message">
                        <a href="https://t.me/pozitivtour" className="footer__message">
                            (Telegram /{" "}
                        </a>
                        <a href="https://wa.me/79226999898" className="footer__message">
                            WhatsApp /{" "}
                        </a>
                        <a href="viber://chat?number=79226999898" className="footer__message">
                            Viber)
                        </a>
                    </p>
                    <a href="mailto:pozitiv-tour74@yandex.ru" className="footer__link">
                        pozitiv-tour74@yandex.ru
                    </a>
                    <p className="footer__subtitle">Присоединяйтесь в соц. сетях:</p>
                    <ul className="footer__links">
                        <li>
                            <a href="https://vk.com/pozitiv74" target="_blank" rel="noreferrer">
                                <img width="30px" height="30px" src={vk} alt="vk" className="footer__link footer__icon " />
                            </a>
                        </li>
                        {/* <li>
                            <a href="https://www.instagram.com/pozitivtour/" target="_blank" rel="noreferrer">
                                <img width="30px" height="30px" src="./assets/images/soc-icon/instagram.svg" alt="instagram" className="footer__link footer__icon" />
                            </a>
                        </li> */}

                        <li>
                            <a href="https://t.me/pozitivtour" target="_blank" rel="noreferrer">
                                <img width="30px" height="30px" src={telegram} alt="telegram" className="footer__link footer__icon" />
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/79226999898" target="_blank" rel="noreferrer">
                                <img width="30px" height="30px" src={whatsapp} className="footer__link footer__icon" alt="whatsapp" />
                            </a>
                        </li>
                        <li>
                            <a href="viber://chat?number=79226999898" target="_blank" rel="noreferrer">
                                <img width="30px" height="30px" src={viber} alt="viber" className="footer__link footer__icon" />
                            </a>
                        </li>
                    </ul>

                    <p className="footer__subtitle">Принимаем оплату</p>
                    <img src={payImg} alt="мы принимаем карты visa masterCard и Мир" className="footer__img-pay" />
                </nav>

                {/* <div *ngIf="!messageIsSent; else Message">
      <form class="footer__form" action="send.php" method="post" [formGroup]="form" (ngSubmit)="submit()"
      #formNative>
        <h3 class="form__title">Оставьте заявку</h3>
        <p class="form__subtitle">и наш менеджер свяжется с Вами
          в течение 12 минут</p>

        <!-- Hidden Required Fields -->
        <input type="hidden" name="project_name" formControlName="project_name" >
        <input type="hidden" name="admin_email" formControlName="admin_email">
        <input type="hidden" name="form_subject" formControlName="form_subject">
        <!-- END Hidden Required Fields -->

        <input class="form__input" type="text" name="name"
        placeholder="Введите свое имя" formControlName="name" required>
        <input [textMask]="{mask: mask}"  class="form__input form__input_tel"  name="tel"
        placeholder="+7(___) ___-__-__"  formControlName="tel" required >
        <button class="form__button" type="submit" [disabled]="form.invalid" >ОТПРАВИТЬ</button>

        <p class="form__text">Отправляя заявку, вы даете согласие
          на обработку персональных данных</p>
      </form>
    </div> */}
                {/* <ng-template #Message>
      <form class="footer__form" ction="send.php" method="post" [formGroup]="form" (ngSubmit)="submit()"
      #formNative>
        <p class="form__subtitle">Заявка отправлена. Наш менеджер свяжется с Вами
          в течение 12 минут.</p>
      </form>
    </ng-template> */}
            </div>

            {/* <div class="footer__info">
    <picture class="footer__logo">
      <source srcset="./assets/images/logo/logo-big_a1b.webp" type="image/webp">
      <img  width="106px" height="106px"
          src="./assets/images/logo/logo-big.png"
          [routerLink]="['/']"
          alt="логтип positive">
    </picture>
    <div class="footer__bankDetails">
      <p>ИП Жакутов Еркин Нурланович</p>
      <p>ОГРНИП 319745600193403, ИНН 741208548498</p>
      <p>Адрес г. Челябинск, ул. Братьев Кашириных, д.115, кв. 61</p>
      <p (click)="scrollTo($event)" data-href="/offer" data-anchor="offer" class="footer__offer">Договор оферты</p>
    </div>
  </div> */}
        </footer>
    );
};

export default Footer;
