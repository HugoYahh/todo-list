export default function loadView(viewName){
    const main = document.querySelector(".main-content");
    main.innerHTML="";
    if(viewName === 'inbox'){
        main.appendChild(renderInbox());
    } else if(viewName ==='today'){
        main.appendChild(renderToday());
    }else if(viewName==='upcoming'){
        main.appendChild(renderUpcoming());
    }else if(viewName==='anytime'){
        main.appendChild(renderAnytime());
    }else if(viewName==='someday'){
        main.appendChild(renderSomeday());
    }else{
        main.textContent="View not implemented yet";
    }
}

function renderToday(){
    
}