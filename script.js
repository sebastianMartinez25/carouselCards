document.addEventListener("DOMContentLoaded", initialized);
function initialized() {
  var cardsContainer = document.querySelector(".cards-container");
  var cards = document.querySelectorAll(".card");
  
  var arrowLeft = document.querySelector(".arrow-left");
  var arrowRight = document.querySelector(".arrow-right");
  var cardStyles=window.getComputedStyle(cards[0]);
  var cardMarginRight = parseFloat(cardStyles.getPropertyValue('margin-right'));
  
  var totalCards = cards.length;
  let currentIndex = 0;

  var cardData = cards[0].getBoundingClientRect();
  //const cardWidth=cardData.width;
  const cardWidth=cards[0].clientWidth;
  console.log(cards);
  console.log(cardData);
  console.log(cardWidth);
  let totalWidthCard= cardMarginRight+cardWidth;
  console.log(totalWidthCard);
  const cardsContainerData= cardsContainer.getBoundingClientRect();
  const cardsContainerWidth= cardsContainerData.width;
  const cardsContainerPosition= cardsContainerData.x;
  
  console.log(cardsContainerWidth);
  console.log(cardsContainerPosition);
  console.log(cardMarginRight);

  let arrayCards=[];
  
  
  var numberCards = parseInt(cardsContainerWidth/(cardWidth+cardMarginRight)); 
  console.log(numberCards);
  if (numberCards>= totalCards)
  {
    numberCards=totalCards-1;
  }
  else{
    numberCards=numberCards;
  }
  console.log(numberCards);
  
  
  let cardPositionInitial=((cardsContainerWidth-(totalWidthCard*numberCards))/2)+cardsContainerPosition;
  let cardPosition;

  arrowLeft.addEventListener("click", function () {
    currentIndex=arrayCards[0];
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarouselPositionLeft();
  });

  arrowRight.addEventListener("click", function () {
      currentIndex=arrayCards[arrayCards.length-1];
      currentIndex = (currentIndex + 1) % totalCards;
    
   
    
    updateCarouselPositionRight();
  });
function updateCarouselPositionLeft()
{
  arrayCards.unshift(currentIndex);
  arrayCards.pop();
  cards.forEach((card, index) => {
    card.style.display="none";
  });
  for (let i =0; i < numberCards; i++)
  {
   
    cards[arrayCards[i]].style.display="block";
    cardPosition=cardPositionInitial+(i*totalWidthCard);
    cards[arrayCards[i]].style.left=cardPosition+"px";
  }
 
}
function updateCarouselPositionRight()
{
  arrayCards.shift();
  console.log(currentIndex);
  arrayCards.push(currentIndex);
 
  cards.forEach((card, index) => {
    card.style.display="none";
  });
  for (let a =0; a < numberCards; a++)
  {
   
    cards[arrayCards[a]].style.display="block";
    cardPosition=cardPositionInitial+(a*totalWidthCard);
    cards[arrayCards[a]].style.left=cardPosition+"px";
  }
}
  function updateCarouselPosition() {

    cards.forEach((card, index) => {
      
      if (numberCards > index)
    {
      arrayCards.push(index);
      card.style.display="block";
      cardPosition=cardPositionInitial+(index*totalWidthCard);
      card.style.left=cardPosition+"px";
      console.log(cardPosition);
    }
    else
    {card.style.display="none";}
      
    });   
  }

  updateCarouselPosition();
};

