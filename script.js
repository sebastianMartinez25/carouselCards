document.addEventListener("DOMContentLoaded", initialized);
window.addEventListener('resize', initialized);
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
  var controlDots=document.querySelector(".control-dots");
  var elementosli;
  var positionDot;
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
  
  actualizarControlDots();
  escuchador();
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
 
  actualizarControlDots();
  escuchador();
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
    
    actualizarControlDots();
   escuchador(); 
  }

  updateCarouselPosition();

  function actualizarControlDots()
  {
    while (controlDots.firstChild)
    {
    controlDots.removeChild(controlDots.firstChild);
    }
    positionDot=arrayCards[0];
    console.log(positionDot);
    
   for(var r=0; r < totalCards ;r++){
    if(r===positionDot)
    {
      elementosli=document.createElement("li");
    elementosli.classList.add("dot-active");
    controlDots.appendChild(elementosli);
    }
    else{
      elementosli=document.createElement("li");
    elementosli.classList.add("dot");
    controlDots.appendChild(elementosli);
    }
    
   }
      
   console.log("este es el currentIndex: "+ currentIndex);
    console.log("esta es la card inicial " + arrayCards[0]);
  }
  
  function escuchador()
  {
    var dots=document.querySelectorAll("li");
  dots.forEach((li, index) => {
    li.addEventListener("click", (event) => {
      var nowPosition=arrayCards[0];
      var futurePosition = index;
      var diferencePosition=(totalCards-nowPosition)+futurePosition;

      for(var b=0; b<diferencePosition; b++)
      {
        arrowRight.click();
      }
       
    });
  });
  }
  
};