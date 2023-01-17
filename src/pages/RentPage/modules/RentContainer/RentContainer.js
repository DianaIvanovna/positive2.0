import React, {useRef} from "react";
import {useOnScreen} from "../../../../hooks/useOnScreen";
import "./RentContainer.scss";

const RentContainer = season => {
    const title = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([title]);

    return (
        <section className={`equipmentContainer ${season === "summer" ? "equipmentContainer_summer" : ""}`} style={{height: "3000px"}}>
            <h2 className="sectionTitle equipmentContainer__title anim__title" ref={title}>
                забронировать прокат
            </h2>
            {/* <div class="equipmentContainer__container" *ngIf="readyForWork; else loadingRent">
    <app-equipment
      *ngFor="let rent of rents; let equipmentIndex = index" [rent]="rent"
      [equipmentIndex]="equipmentIndex"
      [season]="season"
      >
    </app-equipment>
  </div>
  <ng-template #loadingRent>
    <div class="loading">
      <picture class="loading__pulse">
        <source srcset="./assets/images/logo/logo-big_a1b.webp" type="image/webp">
        <img  width="106px" height="106px" src="./assets/images/logo/logo-big.png" alt="логтип positive">
      </picture>
    </div>
  </ng-template> */}

            {season === "summer" ? (
                <div className="equipmentContainer__footer">
                    <h3 className="equipmentContainer__downtitle">*Залог за прокат уточняйте у аднимистратора</h3>
                </div>
            ) : (
                <div className="equipmentContainer__footer">
                    <h3 className="equipmentContainer__downtitle">Залог за прокат одного комплекта снаряжения:</h3>
                    <p className="equipmentContainer__text">
                        Паспорт или водительское удостоверение + 5 000 р
                        <br />
                        <br />
                        Только денежный залог - 12 000 р
                        <br />
                        <br />
                        Только паспорт или водительское удостоверение, если вы едете нашим автобусным туром
                    </p>
                </div>
            )}
        </section>
    );
};

export default RentContainer;
