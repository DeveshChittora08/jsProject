let newReview, reviews,savedReviews;

function start() {
     newReview = document.getElementById('review');
     reviews=document.getElementById('reviews');
    savedReviews = localStorage.getItem('reviews');
    if(savedReviews){
        //show it on screen
    }
    else{
        savedReviews=[];
    }
}


function addReview(){
      if(newReview.value){
        const review =document.createElement('li');
        const data={
            review:newReview.value,
            replies:[]
        }
        savedReviews.push(data);
        localStorage.setItem('review',JSON.stringify(savedReviews));
      
        review.innerHTML=newReview.value;
        replyLikeDelete(review,data.replies); 
        reviews.appendChild(review);
        newReview.value = null;
      }
      
}

function replyLikeDelete(review,replies){
    const reply=replyFn(review,replies)
    const like = LikeFn(review)
    const deleteBtn = deleteFn(review)
    
  
    review.append(reply,like, deleteBtn);
}

function replyFn(review,replies){
    const reply = document.createElement('button');
    reply.innerHTML='Reply';
    reply.addEventListener('click',(evt) =>{
       creatReviewInput(review,replies);
    });
    return reply;
}
function creatReviewInput(review, replies){
   let cancle,add;
    const br = document.createElement('BR');
    const textArea = document.createElement('TEXTAREA');
    cancle=CancleFn(br,textArea,add);
    add=AddFn(br,textArea,cancle,review,replies);
    
    review.append(br,textArea,add,cancle);
}

  function AddFn(br,textArea,cancle,review, replies){
    const add = document.createElement('button');
    add.innerHTML='Add';
   add.addEventListener('click',(evt)=>{
    const li =document.createElement('li');
    const data={
        review:textArea.value,
        replies:[]
    }

    replies.push(data);
    localStorage.setItem('review',JSON.stringify(savedReviews));

    li.innerHTML=textArea.value;
    replyLikeDelete(li,data.replies); 
    textArea.value = null;

    br.remove();
    textArea.remove();
    add.remove();
    cancle.remove();

    const ul = document.createElement('ul');
    ul.appendChild(li);
    review.appendChild(ul);


   })
    return add;
  }

function CancleFn(br,textArea,add){
    const cancle = document.createElement('button');
    cancle.innerHTML='Cancle';
    cancle.addEventListener('click',(evt)=>{
        br.remove();
        textArea.remove();
        add.remove();
        cancle.remove();
    });
    return cancle;
}


function LikeFn(review){
    const like = document.createElement('button');
    like.innerHTML = 'Like 0';
    like.addEventListener('click',(evt)=>{
        let count = like.innerHTML.split(' ')[1];
        count++;
        like.innerHTML =`Like ${count}`
    })
    return like;
}
function deleteFn(review){
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.addEventListener('click',(evt) =>{
           review.remove();
    })
    return deleteBtn;
}
