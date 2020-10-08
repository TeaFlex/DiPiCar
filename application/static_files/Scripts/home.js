client = new appClient();
settings = new appSettings();

function appClient(){
    this.activeTab="confTab";

    this.addComponent = function(node,type,cname,id,value,inner){
        var newElement = document.createElement(type);
        newElement.innerHTML=inner;
        newElement.setAttribute("class",cname);
        newElement.setAttribute("id",id);
        newElement.setAttribute("value",value);
        newElement.addEventListener("click",function(){client.setTab(this.id);});
        document.getElementById(node).after(newElement);
    }
    this.setTab = function(target){
        var current = document.getElementById(this.activeTab);
        current.classList.remove("activeTab");
        document.getElementById(target).classList.add("activeTab");        
        if (target!=client.activeTab){            
            src=document.getElementById(this.activeTab.replace("Tab","View"));
            trg=document.getElementById(target.replace("Tab","View"));
            src.style.opacity="0";
            setTimeout(function() {
                src.style.display="none";
                trg.style.display="block";
                setTimeout(function() {
                    trg.style.opacity="1";
                }, 75);      
            }, 75); 
        }
        this.activeTab=target;
    }

    this.updateInput=function(input){
        switch (input){
            case "gamepad":
                document.getElementById("inputType").src="Images/gamepad-icon.png"
                break;
            default:
                document.getElementById("inputType").src="Images/default-icon.png"
                break;
        }
    }
}

function appSettings(){
    this.carName = localStorage.getItem("carName");
    this.setupState = localStorage.getItem("setupState");
    this.saveProgress= function(step){
        switch (step) {
            case "1":
                localStorage.setItem("setupState", 1);
                localStorage.removeItem("resetProcess");
                localStorage.setItem("carName", document.getElementById("carName").value);
                break;
            case "2":
                localStorage.setItem("setupState", 2);
                break;
            case "3":   
                var setupAddress = document.getElementById("setupAddress").value;  
                localStorage.setItem("setupAddress", setupAddress);
                break;
        }
    }
    this.clear = function(){
        localStorage.clear();
        localStorage.setItem("resetProcess", true);
        slide(document.getElementById("home_7"),document.getElementById("home_0"));
    }
}

function tryConnexion(url,callback,obj)
{
    var req = new XMLHttpRequest();
    req.open('HEAD', url);
    req.onreadystatechange = function() {
        parameters=[this.status,obj]
        callback(parameters);
    };
    req.send();
}
function hostReachable(parameters){
    if (parameters[0]){
        switch (parameters[1].id){
            case "1":
                sendConfiguration(parameters[1]);
                break;
            default:
                slideViews(parameters[1]);
                break;
        }        
    }else{
        alert("Vous n'êtes pas connecté au WiFi NICEcar");
    }
}
function isP2P(){
    if (parameters[0]){
        showView(document.getElementById("home_1"));
    }else{
        setInterface();
    }
}
function sendConfiguration(obj){                    //A TESTER ET ADAPTER
    var inputTrg=document.getElementsByClassName("inputTrg");
    var conf = {
        "hostname":inputTrg[0].value,
        "ssid":inputTrg[1].value,
        "wpa":inputTrg[2].value
     }
     //PAS SUR QUE LA REQUETE SOIT BONNE
    var req = new XMLHttpRequest();
    req.open("POST","URL-DU-CONTROLEUR");
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.onreadystatechange = function() {
        if (req.status!=0){
            settings.saveProgress(obj.id);
            slideViews(obj);
        }
    };
    req.send(JSON.stringify(conf)); //ON ENVOIE L'OBJET conf EN JSON
    
}
function iniPage(){                 //Initialise les éléments et ajoute les events listeners
    var tabItem=document.getElementsByClassName("tabItem");
    for(var i=0;i<tabItem.length;i++){
        tabItem[i].addEventListener("click",function(){client.setTab(this.id);});
    }
    var btn=document.getElementsByClassName("slideViewBtn");
    for(var i=0;i<btn.length;i++){
        btn[i].addEventListener("click",function(){slideViews(this);});
    }
    var checkHost=document.getElementsByClassName("checkHost");
    for(var i=0;i<checkHost.length;i++){
        checkHost[i].addEventListener("click",function(){tryConnexion(window.location,hostReachable,this);});
    }
    var checkConfig=document.getElementsByClassName("checkConfig");
    for(var i=0;i<checkConfig.length;i++){
        checkConfig[i].addEventListener("click",function(){checkConfiguration(this)});
    }
    document.getElementById("inputsValidation").addEventListener("click",function(){inputsValidation(this) ? slideViews(this) : alert("La configuration est incomplète")});
    var saveStep=document.getElementsByClassName("stepAction");
    for(var i=0;i<saveStep.length;i++){
        saveStep[i].addEventListener("click",function(){settings.saveProgress(this.id);});
    }
    var views = document.getElementById("confView").children;
    for (var i=0;i<views.length;i++){
        hideView(views[i]);
    }
    client.setTab(client.activeTab);
    tryConnexion(window.location,isP2P);
    showView(document.getElementById("confView"));
}

function inputsValidation(){                 //Assigne les inputs dans un récapitulatif, vérifie les champs
    var inputSrc=document.getElementsByClassName("inputSrc");
    var inputTrg=document.getElementsByClassName("inputTrg");
    var error=[];
    for (var i=0;i<inputSrc.length;i++){        
        if (!inputSrc[i].value){
            error.push(inputSrc[i].name);
        }
        else
        {
            for (var j=0;j<inputTrg.length;j++){
                if (inputSrc[i].name==inputTrg[j].name){
                    inputTrg[j].value=inputSrc[i].value;
                }
            }
        }
    }
    return error.length==0
}
function setInterface(){                    //Détermine l'affichage de l'application selon la situation
    if (localStorage.getItem("resetProcess")){
        showView(document.getElementById("home_0"));
    }
    else if (settings.setupState)
    {
        var setupAddress = localStorage.getItem("setupAddress");
        if (settings.setupState >= 1){
            showView(document.getElementById("home_7"));  
            document.getElementById("setupAddress").value=setupAddress;
        }else{
            showView(document.getElementById("home_1")); 
        }
    }
    else{
        showView(document.getElementById("home_0"));    
    }
}

function slideViews(obj){                   //Réalise un fondu de transition entre les écrans de paramétrage
    var view=obj.parentElement.id.split("_");
    var ind = parseInt(view[1],10);
    if (obj.value=="next"){
        var target = document.getElementById(view[0]+"_"+(ind+1));
    }else if (obj.value=="previous"){
        var target = document.getElementById(view[0]+"_"+(ind-1));
    }else if (obj.value=="p2pMode"){
        var target = document.getElementById(view[0]+"_8");
    }
    else if (obj.value=="load"){
        loadView();        
    }
    if (target){
            slide(obj.parentElement,target);
    }
}
function slide(src,trg){
    src.style.maxHeight="100px"; 
    setTimeout(function() {
        src.style.opacity="0";                    
        setTimeout(function() {
            src.style.display="none";
            trg.style.display="block";                
            setTimeout(function() {
                trg.style.maxHeight="500px";
                trg.style.opacity="1";                    
            }, 250);      
        }, 250);  
    }, 150); 
}
function hideView(obj){
    obj.style.display="none";
    obj.style.opacity="0";
    obj.style.maxHeight="0";
}
function showView(obj){
    obj.style.display="block";
    obj.style.opacity="1";
    obj.style.maxHeight="100%";
}
function loadView(){
    var carTab = document.getElementById("carTab");
    document.getElementById("confTab").innerHTML="Paramètres";
    carTab.innerHTML=settings.carName;
    carTab.style.display="block";
    client.addComponent("carTab","li","tabItem","statTab",null,"<a>Statistiques</a>")
    client.setTab("carTab");
    var carView = document.getElementById("carView");
    carView.src="http://"+document.getElementById("setupAddress").value+"/deviceview.html"; //TODO change for actual url for the view
    carView.style.display="block";
}

function checkConfiguration(obj){                  //TODO Function that looks if the server is configured or not
    if (true){
        client.addComponent("localMode1","p",null,null,null,"Votre NICEcar est déjà configurée. Vous pouvez la reconfigurer ou ignorer.");
    }else{
        client.addComponent("localMode1","p",null,null,null,"Votre NICEcar n'a pas encore été configurée pour le réseau local.");
    }
    slideViews(obj);
}