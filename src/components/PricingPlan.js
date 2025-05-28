import React from 'react';
import './PricingPlans.css'; // Якщо стилі окремо

const PricingPlans = () => {
  const plans = [
    {
      price: '10грн (не гроші)',
      image: 'nacho1.png',
      name: '🔸 Базова',
      features: [
        'Доступ до основних функцій',
        'Обмежена кількість проєктів',
        'Підтримка на email'
      ],
      button: 'Мінімум'
    },
    {
      price: '60грн (тоже не гроші)',
      image: 'nacho2.png',
      name: '🔸 Стандартна',
      features: [
        'Усі функції базової версії',
        'Розширені можливості',
        'Пріоритетна підтримка'
      ],
      button: 'Класно'
    },
    {
      price: '∞',
      image: 'nacho3.png',
      name: '🔸 Преміум',
      features: [
        'Повний функціонал',
        'Необмежені проєкти',
        'Персональний менеджер',
        'Ексклюзивні оновлення'
      ],
      button: 'Потужно'
    }
  ];

  return (
    <div className="plans">
      {plans.map((plan, index) => (
        <div className="plan" key={index}>
          <div className="plan-title">{plan.price}</div>
          <img src={plan.image} alt={plan.name} />
          <div className="plan-title">{plan.name}</div>
          <ul>
            {plan.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          <button className="btn">{plan.button}</button>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
