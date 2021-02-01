import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Features() {
  return (
    <div className='cards'>
      <h1>Our Features  </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/notice.jpg'
              text='Keep yourself updated on all events and other happenings '
              label='News feed'
              path='/services'
            />
            <CardItem
              src='images/chatting.jpg'
              text='Chat with your college mates in real time.'
              label='Chat feature'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/like.jpg'
              text='Post pictures and texts to keep others updated about you'
              label='Post Feature'
              path='/services'
            />
            <CardItem
              src='images/chat.jpg'
              text='Follow your college mates'
              label='Follow'
              path='/products'
            />
            <CardItem
              src='images/like.jpg'
              text='Like posts and comment your views'
              label='Like and Comment'
              
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Features;
