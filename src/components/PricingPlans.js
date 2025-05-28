import React from 'react';
import './PricingPlans.css';
import basicImage from '../image/basic.png';
import standardImage from '../image/standart.png';
import premiumImage from '../image/premium.png';

function PricingPlans() {
  return (
    <div className="pricing-plans">
      <div className="plan">
        <div className="plan-title price-title">10грн (не гроші)</div>
        <img src={basicImage} alt="Базова начос" />
        <div className="plan-title">🔸 Базова</div>
        <ul className="pricing-plan-features">
          <li>Доступ до основних функцій</li>
          <li>Обмежена кількість проєктів</li>
          <li>Підтримка на email</li>
        </ul>
        <button className="pricing-plan-button">Мінімум</button>
      </div>
      <div className="plan">
        <div className="plan-title price-title">60грн (тоже не гроші)</div>
        <img src={standardImage} alt="Стандартна начос" />
        <div className="plan-title">🔸 Стандартна</div>
        <ul className="pricing-plan-features">
          <li>Усі функції базової версії</li>
          <li>Розширені можливості</li>
          <li>Пріоритетна підтримка</li>
        </ul>
        <button className="pricing-plan-button">Класно</button>
      </div>
      <div className="plan">
        <div className="plan-title price-title">∞</div>
        <img src={premiumImage} alt="Преміум начос" />
        <div className="plan-title">🔸 Преміум</div>
        <ul className="pricing-plan-features">
          <li>Повний функціонал</li>
          <li>Необмежені проєкти</li>
          <li>Персональний менеджер</li>
          <li>Ексклюзивні оновлення</li>
        </ul>
        <button className="pricing-plan-button">Потужно</button>
      </div>
    </div>
  );
}

export default PricingPlans; 